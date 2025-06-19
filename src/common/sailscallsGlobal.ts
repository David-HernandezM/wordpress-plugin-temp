import { SailsCalls } from "sailscalls";

let sailsCallsInstance: SailsCalls | null = null;

export function getSailsCallsInstance(): SailsCalls | null {
    return sailsCallsInstance;
}

export async function initSailsCallsInstance(rpcUrl: string, contractId: `0x${string}`, contractIdl: string) {
    if (sailsCallsInstance) return;

    console.log('[SailsCalls] Initializing global SailsCalls instance');

    sailsCallsInstance = await SailsCalls.new({
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

export default {
    initSailsCallsInstance,
    getSailsCallsInstance
};