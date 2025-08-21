import {
    useState, 
    useEffect,
    useRef,
    useMemo
} from "react";
import type { SailsCalls } from "sailscalls";
import { WalletsData } from "../../varaGearGlobalData";
import type { WindowFunctions } from "../../types";
import { DEFAULT_INJECT_TIMEOUT_MS } from "../Account/consts";
import { getLoggedInAccount, getWallets } from "../Account/utils";
import { Account, Wallet } from "../Account/types";
import { Unsubcall } from "@polkadot/extension-inject/types";

interface Props {
    initSailsCalls?: boolean;
    initWallets?: boolean;
    sailsCallsData?: InitSailsCallsProps;
}

interface InitSailsCallsProps {
    rpcUrl: string;
    contractId: `0x${string}`;
    contractIdl: string;
}

interface PluginData {
    [key: string]: string | undefined
}

export function useVaraGearData(data?: Props) {
    const { 
        getWalletsData,
        initSailsCalls,
        getSailsCallsInstance
    } = (window as any).varaGearGlobalData as WindowFunctions;
    const {
        gearAppName,
        rpcUrl,
        contractAddress,
        contractIdl
    }: PluginData = (window as any).GearPluginSettings;
    const [sailsCallsInstance, setSailsCallsInstance] = useState<SailsCalls>();
    const walletsData = useRef<WalletsData>(getWalletsData());
    const sailscallsIntervalId = useRef<number | null>(null);
    const walletsDataIntervalId = useRef<number | null>(null);

    const handleWalletChange = (id: string, wallet: Wallet) => {
        walletsData.current.setWallets((prevWallets) => (prevWallets ? { ...prevWallets, [id]: wallet } : prevWallets))
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
    };

    const registerUnsub = (unsub: Unsubcall) => {
        walletsData.current.registerUnsub(unsub);
    };

    // useEffect to init wallets and web3 connect part
    useEffect(() => {
        let timeOutId: NodeJS.Timeout | null = null;

        if (data && data.initWallets) {
            timeOutId = setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises -- TODO(#1816): resolve eslint comments
                getWallets(gearAppName ?? "VaraApp", handleAccountsChange, handleWalletChange, registerUnsub).then((result) => {
                    walletsData.current.setWallets(result);
                    walletsData.current.setAccount(getLoggedInAccount(result));
                });
            }, DEFAULT_INJECT_TIMEOUT_MS);

        }

        return () => {
            if (timeOutId) clearTimeout(timeOutId);
            walletsData.current.cleanUnsubs();
        }
    }, []);
    
    // useEffect to init SailsCalls instance
    useEffect(() => {
        const getInstanceIntervalId = window.setInterval(() => {
            const sailsCallsInstance = getSailsCallsInstance();

            if (sailsCallsInstance) {
                setSailsCallsInstance(sailsCallsInstance);
                window.clearInterval(sailscallsIntervalId.current as number);
            }
        }, 600);
        
        sailscallsIntervalId.current = getInstanceIntervalId;

        if (data) {
            if (data.initSailsCalls) {
                if (!data.sailsCallsData) throw new Error('sailscalls data missing');
                initSailsCalls(data.sailsCallsData);
            }
        }

        return () => {
            window.clearInterval(getInstanceIntervalId);
        }
    }, []);

    const value = useMemo(
        () => sailsCallsInstance
            ? { sailsCallsInstance, isApiReady: true as const }
            : { sailsCallsInstance, isApiReady: false as const },
        [sailsCallsInstance],
    )

    return {
        ...value,
        walletsData,
        gearAppName,
        rpcUrl,
        contractAddress,
        contractIdl,
        getWalletsData
    }
}