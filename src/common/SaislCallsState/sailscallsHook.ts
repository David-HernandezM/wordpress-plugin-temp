import { useDispatch, useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";
import VaraGearStore, { 
    VARA_STORE_KEY, 
    selectors as sel, 
    actions as act, 
    VaraPluginGLobalState 
} from "./sailscalls-state";

type Selectors = typeof self;
type Actions = typeof act;

interface Props {
    appName: string;
    rpcUrl: string;
    contractId: `0x${string}`;
    contractIdl: string;
}

export function useVaraGearData(contractData: Props) {
    const varaGearDispatch = useDispatch(VARA_STORE_KEY) as unknown as Actions;
    const _ = useSelect(state => state(VaraGearStore).getSailsCallsInit({...contractData, appName: 'VaraTemp'}), []);
    const sailsCallsInstance = useSelect(state => state(VaraGearStore).getSailsCallsInstance(), []);
    
    useEffect(() => {
        console.log('Ya existe una instancia de sailcalls: ', sailsCallsInstance ? 'YES' : 'NO');
        console.log('Se llamo con: ', contractData.appName);
    }, [sailsCallsInstance])

    useEffect(() => {
        console.log('Componente inicializado con: ', );
    }, [])

    return {
        sailsCallsInstance
    }
}