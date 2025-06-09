import { createRoot, useState } from '@wordpress/element';
// import s from '!!worker-loader!../common/gearApiWorker.ts';
// import * from '../common/sailscallsWorker';
import SailsCallsWorker from '!!worker-loader!../common/gearApiWorker';
import { xd } from '../common/sailscallsSingleton';

function WalletConnectButton() {
    const [accounts, setAccounts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const connectWallet = async () => {
        xd()
        setLoading(true);

        // 👉 Code splitting: import dinámico (solo en este momento se carga la librería)
        const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

        const rpcUrl = (window as any).GearPluginSettings?.rpcUrl || 'nadota xdddd';

        console.log(rpcUrl);

        await web3Enable('My Gutenberg Wallet Block');
        const allAccounts = await web3Accounts();
        console.log(allAccounts);

        setAccounts(allAccounts.map(acc => acc.address));
        setLoading(false);
    };

    return (
        <div style={{ border: '1px solid #888', padding: '10px' }}>
            <button onClick={connectWallet} style={{ marginBottom: '10px' }}>
                {loading ? 'Conectando......' : 'Conectar Wallet Polkadot!'}
            </button>
            {accounts.length > 0 && (
                <div>
                    <strong>Cuentas conectadas:</strong>
                    <ul>
                        {accounts.map(addr => (
                            <li key={addr}>{addr}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wp-block-jsonsender-walletconnect').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<WalletConnectButton />);
    });
});

