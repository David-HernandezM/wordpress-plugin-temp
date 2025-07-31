import type { SailsCalls } from "sailscalls";
import type { WalletsData } from "./varaGearGlobalData";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

export type Callback = () => void;

export type SailsCallsData = {
    rpcUrl: string, 
    contractId: `0x${string}`, 
    contractIdl: string
};

export type WindowFunctions = {
    initSailsCalls: ({ rpcUrl, contractId, contractIdl }: SailsCallsData) => Promise<void>,
    getSailsCallsInstance: () => SailsCalls | null,
    getWalletsData: () => WalletsData,
    connectWallets: (appName: string) => Promise<InjectedAccountWithMeta[]>
}