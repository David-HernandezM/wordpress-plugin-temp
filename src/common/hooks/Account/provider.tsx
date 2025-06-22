import { useEffect, useReducer } from "react";
import { useVaraGearData } from "../useGlobalData/sailscallsHook";

export function useAccount() {
    const { sailsCallsInstance } = useVaraGearData();

    // const login = (_account: Account) => {
    //     gearGlobalDataApi.
    // }

}