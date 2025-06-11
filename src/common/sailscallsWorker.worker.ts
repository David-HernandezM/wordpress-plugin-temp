import { SailsCalls } from 'sailscalls';
import { web3FromSource } from '@polkadot/extension-dapp';

let sailsCallsInstance: SailsCalls | null = null;

async function initSailsCalls(rpcUrl: string, contractId: string, contractIdl: string) {
    if (sailsCallsInstance) {
        console.log('Instancia ya creada!!!');
        return;
    }

    sailsCallsInstance = await SailsCalls.new({
        network: rpcUrl,
        newContractsData: [
            {
                contractName: 'Trafficlight',
                idl: contractIdl,
                address: contractId as `0x${string  }`
            }
        ]
    });

    postMessage({ type: 'ready' });
}

self.onmessage = async (event) => {
    const { type, payload } = event.data;

    console.log('Type:', type);
    console.log('Payload:');
    console.log(payload);

    if (type == 'init') {
        const { rpcUrl, contractId, contractIdl} = payload;
        await initSailsCalls(rpcUrl, contractId, contractIdl);
    }

    if (!sailsCallsInstance) {
        console.log('NO EXISTE ALGUNA INSTANCIA');
        postMessage({
            type: 'error',
            payload: 'GearApi not initialized'
        })
        return;
    }

    if (type == 'checkInstance') {
        console.log('SIMON SI ESTA ACTIVO');

        postMessage({
            type: 'sailsCallsInfo',
            payload: 'smn si esta activo'
        });
    }

    if (type == 'readState') {
        const response = await sailsCallsInstance.query({
            serviceName: 'TrafficLight',
            methodName: 'TrafficLight'
        });

        postMessage({
            type: 'sailsCallsResponseQuery',
            payload: response
        });
    }

    if (type == 'sendMessage') {
        const { address, signer } = payload;

        const response = sailsCallsInstance.command({
            signerData: {
                userAddress: address,
                signer
            },
            serviceName: 'TrafficLight',
            methodName: 'Green'
        })

        postMessage({
            type: 'sailsCallsResponse',
            payload: response
        });
    }
}