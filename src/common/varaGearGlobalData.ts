import { SailsCalls } from "sailscalls";
import { Unsubcall } from "@polkadot/extension-inject/types";
import { Wallets, Account } from "./hooks/Account/types";
import { Callback, SailsCallsData } from "./types";

export class WalletsData {
    private wallets: Wallets;
    private account: Account | undefined;
    private unsubsInstance: Unsubcall[];
    private listeners = new Set<Callback>();

    constructor() {
        this.wallets = {};
        this.unsubsInstance = [];
    }

    get getAccount() {
        return this.account;
    }

    get getWallets() {
        return this.wallets;
    }

    private notify() {
        for (const callback of this.listeners) {
            callback();
        }
    }

    addAction(callback: Callback) {
        this.listeners.add(callback);

        return () => this.listeners.delete(callback);
    }

    registerUnsub(unsub: Unsubcall) {
        this.unsubsInstance.push(unsub);
    }

    cleanUnsubs() {
        this.unsubsInstance.forEach(unsub => unsub());
        this.unsubsInstance = [];
    }

    setAccount(account?: Account | ((account?: Account) => Account | undefined)) {
        if (!account) {
            this.account = undefined;
        } else if (typeof account != 'function') {
            this.account = account;
        } else {
            this.account = account(this.account);
        }

        this.notify();
    }

    setWallets(wallets: Wallets | ((wallets: Wallets) => Wallets)) {
        if (typeof wallets != 'function') {
            this.wallets = wallets;
        } else {
            this.wallets = wallets(this.wallets);
        }

        this.notify();
    }
}

let sailscallsInstance: SailsCalls | null = null;
let walletsDataInstance: WalletsData = new WalletsData();

export async function initSailsCalls({rpcUrl, contractId, contractIdl }: SailsCallsData) {
    if (sailscallsInstance) {
        console.warn('Already exists a gear vara global object instance!');
        return;
    }

    sailscallsInstance = await SailsCalls.new({
        network: rpcUrl,
        newContractsData: [
            {
                contractName: 'VaraContract',
                address: contractId,
                idl: contractIdl
            }
        ]
    });
}

export function getSailsCallsInstance(): SailsCalls | null {
    return sailscallsInstance;
}

export function getWalletsData(): WalletsData | null {
    return walletsDataInstance;
}

export async function connectWallets(appName: string) {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    await web3Enable('My Gutenberg Wallet Block');  
    const allAccounts = await web3Accounts();

    return allAccounts;
}

export default {
    initSailsCalls,
    getSailsCallsInstance,
    getWalletsData,
    connectWallets,
};
























































// type Value = {
//   wallets: Wallets | undefined;
//   account: Account | undefined;
//   isAnyWallet: boolean;
//   isAccountReady: boolean;
//   login: (account: Account) => void;
//   logout: () => void;
// };




// type Callback = () => void;

// interface WalletsStore {
//   subscribe: (callback: Callback) => () => void;
//   emitChange: () => void;
// }

// declare global {
//   interface Window {
//     walletsStore?: WalletsStore;
//   }
// }

// if (!window.walletsStore) {
//   let listeners: Callback[] = [];

//   window.walletsStore = {
//     subscribe(callback: Callback) {
//       listeners.push(callback);
//       return () => {
//         listeners = listeners.filter(cb => cb !== callback);
//       };
//     },
//     emitChange() {
//       listeners.forEach(cb => cb());
//     },
//   };
// }

// //
// export function getAccountsData(): Value {
//     return accountsData;
// }

// //
// export function getSailsCallsInstance(): SailsCalls | null {
//     return sailsCallsInstance;
// }

// //
// export async function initSailsCallsInstance(rpcUrl: string, contractId: `0x${string}`, contractIdl: string) {
//     if (sailsCallsInstance) return;

//     console.log('[SailsCalls] Initializing global SailsCalls instance');

//     sailsCallsInstance = await SailsCalls.new({
//         network: rpcUrl,
//         newContractsData: [
//             {
//                 contractName: 'VaraContract',
//                 address: contractId,
//                 idl: contractIdl
//             }
//         ] 
//     });
// }









// export class VaraSailsCalls {
//     private constructor (
//         private sailscalls: SailsCalls,
//     ) {}

//     static async new({rpcUrl, contractId, contractIdl }: SailsCallsData) {
//         const sailsCallsInstance = await SailsCalls.new({
//             network: rpcUrl,
//             newContractsData: [
//                 {
//                     contractName: 'VaraContract',
//                     address: contractId,
//                     idl: contractIdl
//                 }
//             ]
//         });

//         return new VaraSailsCalls()

//         // return new GearGlobalDataAPi(
//         //     appName,
//         //     sailsCallsInstance,
//         //     DEFAULT_VALUE,
//         //     null,
//         //     []
//         // );
//     }

//     setAccount(_account: Account) {
        
//     }

//     get getAppName() {
//         return this.appName;
//     }

//     get getSailsCalls() {
//         return this.sailscalls;
//     }

//     get getAccountsData() {
//         return this.accountsData;
//     }

//     // async connectWallets() {
//     //     const { web3Enable } = await import('@polkadot/extension-dapp');

//     //     await web3Enable(this.appName);  

//     //     startAccountsInterval(this.appName);

//     //     window.addEventListener('beforeunload', cleanup);
//     //     window.addEventListener('pagehide', cleanup);

//     // }
// }





// export async function startAccountsInterval(appName: string) {
//     if (intervalAccountId !== null) return;

//     const login = (_account: Account) => {
//         // setAccount(_account);
//         accountsData.account = _account;
//         localStorage.setItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS, _account.address);
//     };

//     const logout = () => {
//         // setAccount(undefined);
//         accountsData.account = undefined;
//         localStorage.removeItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS);
//     };

//     const handleAccountsChange = (id: string, accounts: Account[]) => {
//         // setWallets((prevWallets) =>
//         //     prevWallets ? { ...prevWallets, [id]: { ...prevWallets[id], accounts } } : prevWallets,
//         // );

//         const prevWallets = accountsData.wallets;

//         accountsData.wallets = prevWallets 
//             ? { ...prevWallets, [id]: { ...prevWallets[id], accounts } }
//             : prevWallets;

//         const prevAccount = accountsData.account;

//         if (!prevAccount || id !== prevAccount.meta.source) {
//             accountsData.account = prevAccount;
//             return;
//             // return prevAccount;
//         }

//         const isLoggedIn = Boolean(accounts.length) && accounts.some(({ address }) => address === prevAccount.address);

//         if (isLoggedIn) {
//             accountsData.account = prevAccount;
//             // return prevAccount;
//         }

//         // setAccount((prevAccount) => {
//         //     if (!prevAccount || id !== prevAccount.meta.source) return prevAccount;

//         //     const isLoggedIn = Boolean(accounts.length) && accounts.some(({ address }) => address === prevAccount.address);

//         //     if (isLoggedIn) return prevAccount;hh
//         // });
//     };

//     const handleWalletChange = (id: string, wallet: Wallet) => {
//         // setWallets((prevWallets) => (prevWallets ? { ...prevWallets, [id]: wallet } : prevWallets));
//         const prevWallets = accountsData.wallets;

//         accountsData.wallets = prevWallets
//             ? { ...prevWallets, [id]: wallet }
//             : prevWallets;
//     }

//     const registerUnsub = (unsub: Unsubcall) => {
//         unsubsInstance.push(unsub);
//         // unsubsRef.current.push(unsub);
//     }


//     intervalAccountId = window.setInterval(async () => {
//         console.log('APP NAME: ', appName);

//         accountsData.isAnyWallet = Object.keys(accountsData.wallets || {}).length > 0;
//         accountsData.isAccountReady = Boolean(accountsData.wallets);

//         getWallets(appName, handleAccountsChange, handleWalletChange, registerUnsub).then(result => {
//             const accountLoggetId = getLoggedInAccount(result);
//             accountsData.wallets = result;
//             accountsData.account = accountLoggetId;
//         });
//     }, DEFAULT_INJECT_TIMEOUT_MS);
// }

// export async function cleanup() {
//   if (intervalAccountId !== null) {
//     clearInterval(intervalAccountId);
//     intervalAccountId = null;
//   }

//   unsubsInstance.forEach(unsub => unsub());
//   unsubsInstance = [];
// }
