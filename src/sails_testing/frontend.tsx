import { decodeAddress } from "@gear-js/api";
import { web3FromSource } from "@polkadot/extension-dapp";
import { createRoot, useRef } from "@wordpress/element";
import type { SailsCalls } from "sailscalls";

function CounterComponent() {
    const workerRef = useRef<Worker | null>(null);

    return (
        <div>
            <button onClick={async () => {
                const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || null;
                const contractId = (window as any).GearPluginSettings?.contractAddress || null;
                const contractIdl = (window as any).GearPluginSettings?.contractIdl || null;
                const { getSailsCallsInstance, initSailsCallsInstance } = (window as any).sailscallsGlobalApi;

                
                if(!rpcUrl || !contractId || !contractIdl) {
                    alert('datos faltantes');
                    return
                }
                
                const sailsCallsInstance: SailsCalls = getSailsCallsInstance();

                if (sailsCallsInstance) {
                    console.log('Ya existe una instancia de sails!');
                    return;
                }

                console.log('Se creara instancia:');

                await initSailsCallsInstance(rpcUrl, contractId, contractIdl);

                console.log('Instancia creada');
            }}>
                Create instance
            </button>
            <button onClick={async () => {
                const { getSailsCallsInstance } = (window as any).sailscallsGlobalApi;
                const sailsCallsInstance: SailsCalls = getSailsCallsInstance();

                if (!sailsCallsInstance) {
                    console.log('SailsCalls is not ready');
                    return;
                }

                const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

                await web3Enable('My Gutenberg Wallet Block');
                const allAccounts = await web3Accounts();
                console.log(allAccounts);

                const {signer} = await web3FromSource(allAccounts[0].meta.source);


                console.log('Source:');
                console.log(allAccounts[0].meta.source)

                console.log('Se mandara mensaje:');
                const response = await sailsCallsInstance.command({
                    signerData: {
                        userAddress: decodeAddress(allAccounts[0].address),
                        signer
                    },
                    serviceName: 'TrafficLight',
                    methodName: 'Green'
                })
                
                console.log('Lo que se optuvo:');
                console.log(response);
            }}>
                send message
            </button>
            <button onClick={async () => {
                const { getSailsCallsInstance } = (window as any).sailscallsGlobalApi;
                const sailsCallsInstance: SailsCalls = getSailsCallsInstance();

                if (!sailsCallsInstance) {
                    console.log('SailsCalls is not ready');
                    return;
                }

                const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

                await web3Enable('My Gutenberg Wallet Block');
                const allAccounts = await web3Accounts();
                console.log(allAccounts);

                const {signer} = await web3FromSource(allAccounts[0].meta.source);

                console.log('Se mandara mensaje:');
                const response = await sailsCallsInstance.query({
                    serviceName: 'TrafficLight',
                    methodName: 'TrafficLight'
                })
                
                console.log('Lo que se optuvo:');
                console.log(response);
            }}>
                read state
            </button>

        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vara-sails-testing-root').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<CounterComponent />);
    });
});