// import { useDispatch, useSelect } from "@wordpress/data";
// import { useState, useEffect } from "@wordpress/element";
// import VaraGearStore, { 
//     VARA_STORE_KEY, 
//     selectors as sel, 
//     actions as act, 
//     VaraPluginGLobalState 
// } from "./sailscalls-state";

// type Selectors = typeof self;
// type Actions = typeof act;

import {
    useState, 
    useEffect,
    useRef
} from "@wordpress/element";
import type { SailsCalls } from "sailscalls";
import type { WalletsData } from "../../varaGearGlobalData";
import { useMemo } from "react";

type  Value = 
    | {
        sailsCallsInstance: undefined,
        isApiReady: false
      }
    | {
        sailsCallsInstance: SailsCalls,
        isApiReady: true
      };


interface Props {
    initSailsCalls?: boolean;
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
    const { getWalletsData } = (window as any).varaGearGlobalData;
    const {
        gearAppName,
        rpcUrl,
        contractAddress,
        contractIdl
    }: PluginData = (window as any).GearPluginSettings;
    const [sailsCallsInstance, setSailsCallsInstance] = useState<SailsCalls>();
    const walletsData = useRef<WalletsData>(getWalletsData());
    const sailscallsIntervalId = useRef<number | null>(null);
    
    // useEffect to init SailsCalls instance
    useEffect(() => {
        const { initSailsCalls, getSailsCallsInstance, getWalletsData } = (window as any).varaGearGlobalData;

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
        contractIdl
    }
}