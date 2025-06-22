import { createRoot, useState } from "@wordpress/element";

function CounterButton({ number }) {
    const [currentNumber, setNumber] = useState(number);

    return (
        <div>
            <p>
                Number: {currentNumber}
            </p>
            <button onClick={async () => {
                const rpcUrl = window.GearPluginSettings?.rpcUrl || 'nadota rpc xddd';
                const serverUrl = window.GearPluginSettings?.backendUrl || 'nadota backend url xdd';
                const contractId = window.GearPluginSettings?.contractAddress || 'nadota contract address xdd';
                const contractIdl = window.GearPluginSettings?.contractIdl || 'nadota contract idl xdd';

                console.log('RPCURL: ', rpcUrl);
                console.log('sercer udl: ', serverUrl);
                console.log('contract id: ', contractId);
                console.log('contract idl: ', contractIdl);


                setNumber(currentNumber+1);
            }}>
                Increment +
            </button>
            <button onClick={async () => {

                setNumber(currentNumber-1);
            }}>
                Decrement -
            </button>
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vara-counter-button-root').forEach(rootComponent => {
        let initialNumber = rootComponent.dataset.initialnumber;
        console.log(rootComponent);
        console.log(rootComponent.dataset);

        console.log('Se creara raiz con numero: ', initialNumber);
        console.log('Tipo del numero: ', typeof initialNumber);

        const root = createRoot(rootComponent);
        root.render(<CounterButton number={+initialNumber} />);
    });
});
