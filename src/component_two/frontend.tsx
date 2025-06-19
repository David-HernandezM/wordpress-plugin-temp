import { createRoot, useState } from "@wordpress/element";

function CounterComponent() {
    const [currentNumber, setNumber] = useState<number>(0);

    return (
        <div>
            <p>
                Number: {currentNumber}
            </p>
            <button onClick={async () => {
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
    document.querySelectorAll('.vara-component-two-root').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<CounterComponent />);
    });
});