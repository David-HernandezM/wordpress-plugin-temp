import { SailsCalls } from "sailscalls";
// import { DEFAULT_INJECT_TIMEOUT_MS, LOCAL_STORAGE_KEY } from "./Account/consts";
// import { getLoggedInAccount, getWallets } from "./Account/utils";
// import { Account, Wallet, Wallets } from "./Account/types";
import { Unsubcall } from "@polkadot/extension-inject/types";
// import { useVaraGearData } from "./hooks/useGlobalData/sailscallsHook";



import { Wallets, Account } from "./hooks/Account/types";

type SailsCallsData = {
    rpcUrl: string, 
    contractId: `0x${string}`, 
    contractIdl: string
};

type Value = {
  wallets: Wallets | undefined;
  account: Account | undefined;
  isAnyWallet: boolean;
  isAccountReady: boolean;
  login: (account: Account) => void;
  logout: () => void;
};

// const DEFAULT_VALUE = {
//   wallets: undefined,
//   account: undefined,
//   isAnyWallet: false,
//   isAccountReady: false,
//   login: () => {},
//   logout: () => {},
// } as const;

export class WalletsData {
    // private appName: string,
    // private accountsData: Value,
    // private intervalAccountId: number | null, 
    private wallets: Wallets;
    private account: Account | undefined;
    private unsubsInstance: Unsubcall[]

    constructor() {
        // this.appName = appName;
        // this.accountsData = DEFAULT_VALUE;
        this.wallets = {};
        this.unsubsInstance = [];
    }

    setAccount(account?: Account) {
        this.account = account;
    }

    setWallets(wallets: Wallets | ((wallets: Wallets) => Wallets)) {
        if (typeof wallets != 'function') {
            this.wallets = wallets;
            return;
        }

        const walletsResult = wallets(this.wallets);

        this.wallets = walletsResult;
    }
}

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











export async function connectWallets(appName: string) {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    await web3Enable('My Gutenberg Wallet Block');  
    const allAccounts = await web3Accounts();

    // startAccountsInterval(appName);
    // window.addEventListener('beforeunload', cleanup);
    // window.addEventListener('pagehide', cleanup);

    return allAccounts;
}


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

export default {
    // initSailsCallsInstance,
    initSailsCalls,
    getSailsCallsInstance,
    getWalletsData,
    // getSailsCallsInstance,
    connectWallets,
    // getAccountsData,
};