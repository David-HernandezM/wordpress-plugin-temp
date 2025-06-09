import { SailsCalls } from "sailscalls";

let sailscallsInstance: SailsCalls | null = null;

// export async function getSailsCalls(): Promise<SailsCalls> {
//     if (sailscallsInstance) return sailscallsInstance;

//     console.log('[GearApi] Connecting to RPC...');
// }





export async function xd() {
    sailscallsInstance = await SailsCalls.new();
    console.log('xddddd')
}



// import { GearApi } from '@gear-js/api';

// let gearApiInstance: GearApi | null = null;

// export async function getGearApi(): Promise<GearApi> {
//     if (gearApiInstance) {
//         return gearApiInstance;
//     }

//     const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || 'wss://rpc.vara.network';

//     console.log(`[GearApi] Connecting to ${rpcUrl}...`);

//     gearApiInstance = await GearApi.create({
//         providerAddress: rpcUrl
//     });

//     console.log('[GearApi] Connected!');

//     return gearApiInstance;
// }