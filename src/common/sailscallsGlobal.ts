import { SailsCalls } from "sailscalls";
import { DEFAULT_INJECT_TIMEOUT_MS, LOCAL_STORAGE_KEY } from "./Account/consts";
import { getLoggedInAccount, getWallets } from "./Account/utils";
import { Account, Wallet, Wallets } from "./Account/types";
import { Unsubcall } from "@polkadot/extension-inject/types";
import { useVaraGearData } from "./SaislCallsState/sailscallsHook";

type initGearVaraGLobalProps = {
    appName: string,
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

const DEFAULT_VALUE = {
  wallets: undefined,
  account: undefined,
  isAnyWallet: false,
  isAccountReady: false,
  login: () => {},
  logout: () => {},
} as const;

let sailsCallsInstance: SailsCalls | null = null;
let accountsData: Value = DEFAULT_VALUE;
let intervalAccountId: number | null = null;
let unsubsInstance: Unsubcall[] = [];


export class GearGlobalDataAPi {
    private constructor (
        private appName: string,
        private sailscalls: SailsCalls,
        private accountsData: Value,
        private intervalAccountId: number | null, 
        private unsubsInstance: Unsubcall[]
    ) {}

    static async new({ appName ,rpcUrl, contractId, contractIdl }: initGearVaraGLobalProps) {
        const sailsCallsInstance = await SailsCalls.new({
            network: rpcUrl,
            newContractsData: [
                {
                    contractName: 'VaraContract',
                    address: contractId,
                    idl: contractIdl
                }
            ]
        });

        return new GearGlobalDataAPi(
            appName,
            sailsCallsInstance,
            DEFAULT_VALUE,
            null,
            []
        );
    }

    get getAppName() {
        return this.appName;
    }

    get getSailsCalls() {
        return this.sailscalls;
    }

    get getAccountsData() {
        return this.accountsData;
    }

    async connectWallets() {
        const { web3Enable } = await import('@polkadot/extension-dapp');

        await web3Enable(this.appName);  

        startAccountsInterval(this.appName);

        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('pagehide', cleanup);

    }
}

let gearVaraDataGlobal: GearGlobalDataAPi | null = null;

export async function initGearVaraGlobalObject({ appName, rpcUrl, contractId, contractIdl }: initGearVaraGLobalProps) {
    if (gearVaraDataGlobal) {
        console.warn('Already exists a gear vara global object instance!');
        return;
    }
    gearVaraDataGlobal = await GearGlobalDataAPi.new({
        appName,
        rpcUrl,
        contractId,
        contractIdl
    });

}

export function getGearVaraGlobalInstance(): GearGlobalDataAPi | null {
    return gearVaraDataGlobal;
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

//
export async function connectWallets(appName: string) {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    await web3Enable('My Gutenberg Wallet Block');  
    const allAccounts = await web3Accounts();

    startAccountsInterval(appName);
    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('pagehide', cleanup);

    return allAccounts;
}


export async function startAccountsInterval(appName: string) {
    if (intervalAccountId !== null) return;

    const login = (_account: Account) => {
        // setAccount(_account);
        accountsData.account = _account;
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS, _account.address);
    };

    const logout = () => {
        // setAccount(undefined);
        accountsData.account = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS);
    };

    const handleAccountsChange = (id: string, accounts: Account[]) => {
        // setWallets((prevWallets) =>
        //     prevWallets ? { ...prevWallets, [id]: { ...prevWallets[id], accounts } } : prevWallets,
        // );

        const prevWallets = accountsData.wallets;

        accountsData.wallets = prevWallets 
            ? { ...prevWallets, [id]: { ...prevWallets[id], accounts } }
            : prevWallets;

        const prevAccount = accountsData.account;

        if (!prevAccount || id !== prevAccount.meta.source) {
            accountsData.account = prevAccount;
            return;
            // return prevAccount;
        }

        const isLoggedIn = Boolean(accounts.length) && accounts.some(({ address }) => address === prevAccount.address);

        if (isLoggedIn) {
            accountsData.account = prevAccount;
            // return prevAccount;
        }

        // setAccount((prevAccount) => {
        //     if (!prevAccount || id !== prevAccount.meta.source) return prevAccount;

        //     const isLoggedIn = Boolean(accounts.length) && accounts.some(({ address }) => address === prevAccount.address);

        //     if (isLoggedIn) return prevAccount;hh
        // });
    };

    const handleWalletChange = (id: string, wallet: Wallet) => {
        // setWallets((prevWallets) => (prevWallets ? { ...prevWallets, [id]: wallet } : prevWallets));
        const prevWallets = accountsData.wallets;

        accountsData.wallets = prevWallets
            ? { ...prevWallets, [id]: wallet }
            : prevWallets;
    }

    const registerUnsub = (unsub: Unsubcall) => {
        unsubsInstance.push(unsub);
        // unsubsRef.current.push(unsub);
    }


    intervalAccountId = window.setInterval(async () => {
        console.log('APP NAME: ', appName);

        accountsData.isAnyWallet = Object.keys(accountsData.wallets || {}).length > 0;
        accountsData.isAccountReady = Boolean(accountsData.wallets);

        getWallets(appName, handleAccountsChange, handleWalletChange, registerUnsub).then(result => {
            const accountLoggetId = getLoggedInAccount(result);
            accountsData.wallets = result;
            accountsData.account = accountLoggetId;
        });
    }, DEFAULT_INJECT_TIMEOUT_MS);
}

export async function cleanup() {
  if (intervalAccountId !== null) {
    clearInterval(intervalAccountId);
    intervalAccountId = null;
  }

  unsubsInstance.forEach(unsub => unsub());
  unsubsInstance = [];
}

export default {
    // initSailsCallsInstance,
    initGearVaraGlobalObject,
    getGearVaraGlobalInstance,

    // getSailsCallsInstance,
    connectWallets,
    // getAccountsData,
};