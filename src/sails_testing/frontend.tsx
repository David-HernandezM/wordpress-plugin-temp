import { decodeAddress } from "@gear-js/api";
import { web3FromSource } from "@polkadot/extension-dapp";
import { createRoot, useRef, useEffect } from "@wordpress/element";
import { Button } from "@gear-js/ui";
import type { SailsCalls } from "sailscalls";
import { useVaraGearData } from "../common/hooks/VaraGearData/useVaraGearData";


function SailsTesting() {
    const { sailsCallsInstance } = useVaraGearData();

    // useEffect(() => {
    //     console.log('[CounterButton] isntancia de sailscalls: ', gearGlobalDataApi ? 'YES':'NO');
    // }, [sailsCallsInstance]);


    // const { sailsCallsInstance } = useVaraGearData({
    //         appName: 'CounterButton',
    //         rpcUrl: (window as any).GearPluginSettings?.rpcUrl || '',
    //         contractId: (window as any).GearPluginSettings?.contractAddress || '0X0000',
    //        b contractIdl: (window as any).GearPluginSettings?.contractIdl || ''
    //     });
    
    //     useEffect(() => {
    //         console.log('[CounterButton] Sailscalls instance Init: ', sailsCallsInstance ? 'YES':'NO');
    //     }, [sailsCallsInstance]);

 

        
    return (
        <div>
{/* 
            <Button
                onClick={() => {
                    console.log('Valor actual hook: ', value);
                }}
                text='See value'
                color='secondary'
            />
            <Button
                onClick={() => {
                    setValue('SailsTesting');
                }}
                text='Change value sails'
                color='secondary'
            /> */}



            <Button 
                text="send message"
                color="secondary"
                onClick={async () => {
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
        root.render(<SailsTesting />);
    });
});