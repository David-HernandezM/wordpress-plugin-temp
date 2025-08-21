import { useEffect, useMemo, useState } from "react";
import { Account, Wallets } from "./types";
import { LOCAL_STORAGE_KEY } from "./consts";
import { useVaraGearData } from "../VaraGearData/useVaraGearData";

export function useAccount(from: string) {
    const { walletsData } = useVaraGearData();
    const [account, setAccount] = useState<Account | undefined>(walletsData.current.getAccount);
    const [wallets, setWallets] = useState<Wallets>(walletsData.current.getWallets);

    const isAnyWallet = Object.keys(wallets || {}).length > 0;
    const isAccountReady = Boolean(wallets);

    const login = (_account: Account) => {
        walletsData.current.setAccount(_account);
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS, _account.address);
    }

    const logout = () => {
        walletsData.current.setAccount(undefined);
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCOUNT_ADDRESS);
    }

    useEffect(() => {
        const onUpdate = () => {
            const updatedAccount = walletsData.current.getAccount;
            const updatedWallets = walletsData.current.getWallets;
            setAccount(updatedAccount);
            setWallets(updatedWallets);
        };

        walletsData.current.addAction(onUpdate);
    }, []);

    const value = useMemo(
        () => ({ wallets, account, isAnyWallet, isAccountReady, login, logout }),
        [wallets, account, isAnyWallet, isAccountReady],
    );

    return {
        ...value
    };
}