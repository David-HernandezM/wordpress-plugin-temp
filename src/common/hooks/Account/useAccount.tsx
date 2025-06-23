import { useEffect, useMemo, useState } from "react";
import { Account, Wallets, Wallet } from "./types";
import { DEFAULT_INJECT_TIMEOUT_MS, LOCAL_STORAGE_KEY } from "./consts";
import { useVaraGearData } from "../VaraGearData/useVaraGearData";
import { Unsubcall } from "@polkadot/extension-inject/types";
import { usePluginData } from "../PluginData/usePluginData";
import { getLoggedInAccount, getWallets } from "./utils";

export function useAccount(from: string) {
    const { walletsData } = useVaraGearData();
    const { gearAppName = '' } = usePluginData();
    const [wallets, setWallets] = useState<Wallets>();
    const [account, setAccount] = useState<Account>();

    const isAnyWallet = Object.keys(wallets || {}).length > 0;
    const isAccountReady = Boolean(wallets);

    const login = (_account: Account) => {
        walletsData.current.setAccount(_account);
        setAccount(_account);
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS, _account.address);
    }

    const logout = () => {
        walletsData.current.setAccount(undefined);
        setWallets(undefined);
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS);
    }

    const handleAccountsChange = (id: string, accounts: Account[]) => {
        walletsData.current.setWallets((prevWallets) =>
            prevWallets ? { ...prevWallets, [id]: { ...prevWallets[id], accounts } } : prevWallets,
        );

        walletsData.current.setAccount((prevAccount) => {
            if (!prevAccount || id !== prevAccount.meta.source) return prevAccount;

            const isLoggedIn = Boolean(accounts.length) && accounts.some(({ address }) => address === prevAccount.address);

            if (isLoggedIn) return prevAccount;
        });

        setWallets((prevWallets) =>
            prevWallets ? { ...prevWallets, [id]: { ...prevWallets[id], accounts } } : prevWallets,
        );

        setAccount((prevAccount) => {
            if (!prevAccount || id !== prevAccount.meta.source) return prevAccount;

            const isLoggedIn = Boolean(accounts.length) && accounts.some(({ address }) => address === prevAccount.address);

            if (isLoggedIn) return prevAccount;
        });
    };

    const handleWalletChange = (id: string, wallet: Wallet) => {
        walletsData.current.setWallets((prevWallets) => (prevWallets ? { ...prevWallets, [id]: wallet } : prevWallets))
        setWallets((prevWallets) => (prevWallets ? { ...prevWallets, [id]: wallet } : prevWallets));
    }
    
    const registerUnsub = (unsub: Unsubcall) => {
        walletsData.current.registerUnsub(unsub);
        // unsubsRef.current.push(unsub);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log('Ciclo from: ', from);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises -- TODO(#1816): resolve eslint comments
            getWallets(gearAppName, handleAccountsChange, handleWalletChange, registerUnsub).then((result) => {
                walletsData.current.setWallets(result);
                walletsData.current.setAccount(getLoggedInAccount(result));
                
                setWallets(result);
                setAccount(getLoggedInAccount(result));
            });
        }, DEFAULT_INJECT_TIMEOUT_MS);

        return () => {
            clearTimeout(timeoutId);
            walletsData.current.cleanUnsubs();

            // unsubsRef.current.forEach((unsub) => unsub());
            // unsubsRef.current = [];
        };
    }, []);

    const value = useMemo(
        () => ({ wallets, account, isAnyWallet, isAccountReady, login, logout }),
        [wallets, account, isAnyWallet, isAccountReady],
    )

    return {
        ...value
    }
}