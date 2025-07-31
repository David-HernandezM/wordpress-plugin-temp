import { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { decodeAddress } from '@gear-js/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { Modal, Button } from '@gear-js/ui';
import { useVaraGearData } from '../common/hooks/VaraGearData/useVaraGearData';
import { Wallet } from './wallet';
import { Balance } from './Balance';
import { usePluginData } from '../common/hooks/PluginData/usePluginData';
// import './styles.css';
// import '@gear-js/vara-ui/dist/style.css';



// import '@gear-js/vara-ui/dist/style.css';
import '../common/vara-ui-styles.css';
import './account-button/account-button.css';
import './Balance/balance.css';
import './wallet/wallet.css';
import './wallet-button/wallet-button.css';
import './wallet-modal/wallet-modal.css';
// import './styles.css';

function WalletConnectButton() {
    const [accounts, setAccounts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { rpcUrl, contractAddress, contractIdl } = usePluginData();
    const { sailsCallsInstance } = useVaraGearData({
        initSailsCalls: true,
        sailsCallsData: {
            rpcUrl: rpcUrl || '',
            contractId: contractAddress ? contractAddress as `0x${string}` : '0x0',
            contractIdl: contractIdl || ''
        }
    });


    const connectWallet = async () => {
        setLoading(true);

        const { connectWallets } = (window as any).varaGearGlobalData;
        const appName = (window as any).GearPluginSettings?.gearAppName || null;

        if (!appName) {
            console.log('App name not set');
            return;
        }

        const allAccounts = await connectWallets(appName);

        allAccounts.forEach(acc => {
            console.log(acc.address);
            console.log(decodeAddress(acc.address));
        });

        setAccounts(allAccounts.map(acc => acc.address));


        setLoading(false);
    };

    return (
        <div style={{ border: '1px solid #888', padding: '10px' }}>
        
            <Wallet theme='vara'/>


            <Button
                onClick={connectWallet}
                text={loading ? 'Conectando......' : 'Conectar Wallet Polkadot!'}
                color='primary'
            />

            <Button
                onClick={() => setModalOpen(true)}
                text='testing modal component'
                color='primary'
            />
            {
                modalOpen && (
                    <Modal
                        close={() => setModalOpen(false)}
                        heading='Connect wallet'
                        size='large'
                    >
                        <p>Wallets</p>
                    </Modal>
                )
            }
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

    // "react-dom@18.3.1
