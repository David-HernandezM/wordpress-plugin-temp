import { decodeAddress, encodePayload } from "@gear-js/api";
import { web3FromSource } from "@polkadot/extension-dapp";
import { createRoot, useRef } from "@wordpress/element";
import { SailsCalls } from "sailscalls";
import { sendMessageToWorker } from "../common/workerUtils";

function CounterComponent() {
    const sailsInstance = useRef<SailsCalls | null>(null);
    const workerRef = useRef<Worker | null>(null);

    return (
        <div>
            <button onClick={async () => {
                const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || null;
                const contractId = (window as any).GearPluginSettings?.contractAddress || null;
                const contractIdl = (window as any).GearPluginSettings?.contractIdl || null;

                if(!rpcUrl || !contractId || !  contractIdl) {
                    alert('datos faltantes');
                    return
                }

                if (sailsInstance.current) {
                    console.log('Ya existe uja instancia de sails!');
                    return;
                }

                console.log('Se creara instancia:');
                const sails = await SailsCalls.new({
                    network: rpcUrl,
                    newContractsData: [
                        {
                            contractName: 'temp',
                            idl: contractIdl,
                            address: contractId
                        }
                    ]
                });
                sailsInstance.current = sails;
                console.log('Instancia creada');
            }}>
                Create instance
            </button>
            <button onClick={async () => {
                const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || null;
                const contractId = (window as any).GearPluginSettings?.contractAddress || null;
                const contractIdl = (window as any).GearPluginSettings?.contractIdl || null;

                if(!rpcUrl || !contractId || !contractIdl) {
                    alert('datos faltantes');
                    return
                }

                if (!sailsInstance.current) {
                    console.log('Ya existe uja instancia de sails!');
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
                const response = await sailsInstance.current.command({
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
                const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || null;
                const contractId = (window as any).GearPluginSettings?.contractAddress || null;
                const contractIdl = (window as any).GearPluginSettings?.contractIdl || null;

                if(!rpcUrl || !contractId || !contractIdl) {
                    alert('datos faltantes');
                    return
                }

                if (!sailsInstance.current) {
                    console.log('Ya existe uja instancia de sails!');
                    return;
                }

                const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

                await web3Enable('My Gutenberg Wallet Block');
                const allAccounts = await web3Accounts();
                console.log(allAccounts);

                const {signer} = await web3FromSource(allAccounts[0].meta.source);

                console.log('Se mandara mensaje:');
                const response = await sailsInstance.current.query({
                    serviceName: 'TrafficLight',
                    methodName: 'TrafficLight'
                })
                
                console.log('Lo que se optuvo:');
                console.log(response);
            }}>
                read state
            </button>
            <button onClick={async () => {
                if (workerRef.current) {
                    console.log('Ya se inicializo el worker!');
                    return;
                }

                const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || null;
                const contractId = (window as any).GearPluginSettings?.contractAddress || null;
                const contractIdl = (window as any).GearPluginSettings?.contractIdl || null;

                if(!rpcUrl || !contractId || !contractIdl) {
                    alert('datos faltantes!!');
                    return
                }

                workerRef.current = (window as any).gearApiWorker;

                const response = await sendMessageToWorker(workerRef.current, {
                    type: 'init',
                    payload: {
                        rpcUrl,
                        contractId,
                        contractIdl
                    }
                });

                console.log('Worker response at init:');
                console.log(response);
            }}>
                connect worker
            </button>
            <button onClick={async () => {
                if (!workerRef.current) {
                    console.log('worker no se a inicializado!');
                    return;
                }

                const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

                await web3Enable('My Gutenberg Wallet Block');
                const allAccounts = await web3Accounts();
                console.log(allAccounts);

                const firstAccount = allAccounts[0];

                console.log('se optendra el signer: ');

                const { signer } = await web3FromSource(firstAccount.meta.source);

                console.log('Se le mandara el mensaje al worker con signer:');
                console.log(signer);

                const response = await sendMessageToWorker(workerRef.current, {
                    type: 'sendMessage',
                    payload: {
                        address: decodeAddress(firstAccount.address),
                        signer
                    }
                })

                console.log('Worker response at message:');
                console.log(response);
            }}>
                worker message
            </button>

            <button onClick={async () => {
                if (!workerRef.current) {
                    console.log('worker no se a inicializado!');
                    return;
                }

                console.log('Se leera el estado del worker:');

                const response = await sendMessageToWorker(workerRef.current, {
                    type: 'readState',
                })

                console.log('Worker response at state:');
                console.log(response);
            }}>
                worker state
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