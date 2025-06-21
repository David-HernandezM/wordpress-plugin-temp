import { decodeAddress } from "@gear-js/api";
import { web3FromSource } from "@polkadot/extension-dapp";
import { createRoot, useRef, useEffect } from "@wordpress/element";
import { Button } from "@gear-js/ui";
import type { SailsCalls } from "sailscalls";
import { useVaraGearData } from "../common/SaislCallsState/sailscallsHook";


function CounterComponent() {
    const { sailsCallsInstance } = useVaraGearData({
            appName: 'CounterButton',
            rpcUrl: (window as any).GearPluginSettings?.rpcUrl || '',
            contractId: (window as any).GearPluginSettings?.contractAddress || '0X0000',
            contractIdl: (window as any).GearPluginSettings?.contractIdl || ''
        });
    
        useEffect(() => {
            console.log('[CounterButton] Sailscalls instance Init: ', sailsCallsInstance ? 'YES':'NO');
        }, [sailsCallsInstance]);
        
    return (
        <div>
            <Button 
                text="Create instance"
                color="secondary"
                onClick={async () => {
                    const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || null;
                    const contractId = (window as any).GearPluginSettings?.contractAddress || null;
                    const contractIdl = (window as any).GearPluginSettings?.contractIdl || null;
                    const { getSailsCallsInstance, initSailsCallsInstance } = (window as any).sailscallsGlobalApi;

                    
                    if (!rpcUrl || !contractId || !contractIdl) {
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
                }}
            />
            <Button 
                text="send message"
                color="secondary"
                onClick={async () => {
                    const { getSailsCallsInstance } = (window as any).sailscallsGlobalApi;
                    const sailsCallsInstance: SailsCalls = getSailsCallsInstance();
                    const appName = (window as any).GearPluginSettings?.gearAppName || null;

                    if (!sailsCallsInstance) {
                        console.log('SailsCalls is not ready');
                        return;
                    }

                    if (!appName) {
                        console.log('App name not set');
                        return;
                    }

                    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

                    await web3Enable(appName);
                    const allAccounts = await web3Accounts();
                    console.log(allAccounts);

                    const {signer} = await web3FromSource(allAccounts[0].meta.source);

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
                }}
            />
            <Button 
                text="read state"
                color="secondary"
                onClick={async () => {
                    const { getSailsCallsInstance } = (window as any).sailscallsGlobalApi;
                    const sailsCallsInstance: SailsCalls = getSailsCallsInstance();
                    const appName = (window as any).GearPluginSettings?.gearAppName || null;

                    if (!sailsCallsInstance) {
                        console.log('SailsCalls is not ready');
                        return;
                    }

                    if (!appName) {
                        console.log('App name not set');
                        return;
                    }

                    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

                    await web3Enable(appName);
                    const allAccounts = await web3Accounts();

                    const {signer} = await web3FromSource(allAccounts[0].meta.source);

                    console.log('Se leera el estado:');
                    const response = await sailsCallsInstance.query({
                        serviceName: 'TrafficLight',
                        methodName: 'TrafficLight'
                    })
                    
                    console.log('Lo que se optuvo:');
                    console.log(response);
                }}
            />
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vara-sails-testing-root').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<CounterComponent />);
    });
});