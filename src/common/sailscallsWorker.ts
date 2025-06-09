import { SailsCalls } from 'sailscalls';

let sailsCallsInstance: SailsCalls | null = null;

async function initSailsCalls(rpcUrl: string) {
    if (sailsCallsInstance) return;

    sailsCallsInstance = await SailsCalls.new({
        network: rpcUrl
    });

    postMessage({ type: 'ready' });
}

self.onmessage = async (event) => {
    const { type, payload } = event.data;

    if (type == 'init') {
        await initSailsCalls(payload.rpcUrl);
    }

    if (type == 'checkInstance') {
        if (!sailsCallsInstance) {
            postMessage({
                type: 'error',
                payload: 'GearApi not initialized'
            })
            return;
        }

        postMessage({
            type: 'sailsCallsInfo',
            payload: 'smn si esta activo'
        });
    }
}