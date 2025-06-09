import { createRoot, useState, useEffect } from "@wordpress/element";
import { xd } from "../common/sailscallsSingleton";

function CounterButton({ number }) {
    const [currentNumber, setNumber] = useState(number);

    useEffect(() => {
        xd()
    }, [currentNumber])
    return (
        <div>
            <p>
                Number: {currentNumber}
            </p>
            <button onClick={() => {setNumber(currentNumber+1)}}>
                Increment +
            </button>
            <button onClick={() => {setNumber(currentNumber-1)}}>
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
