import { createRoot, useState, useRef, useEffect } from '@wordpress/element';
import { decodeAddress } from '@gear-js/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { Modal, Button } from '@gear-js/ui';
import { useVaraGearData } from '../common/hooks/VaraGearData/useVaraGearData';
import { Wallet } from './wallet';
import { Balance } from './Balance';
import { usePluginData } from '../common/hooks/PluginData/usePluginData';
import './styles.css';

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

    // useEffect(() => {
    //     console.log('[WalletConnect] Se inicio el componente con gear iniciado: ', gearGlobalDataApi ? 'YES':'NO');
    // }, [gearGlobalDataApi]);

    // const { sailsCallsInstance } = useVaraGearData({
        // appName: 'WalletConnect',
        // rpcUrl: (window as any).GearPluginSettings?.rpcUrl || '',
        // contractId: (window as any).GearPluginSettings?.contractAddress || '0X0000',
        // contractIdl: (window as any).GearPluginSettings?.contractIdl || ''
    // });

    // useEffect(() => {
    //     console.log('[walletconnect] Sailscalls instance Init: ', sailsCallsInstance ? 'YES':'NO');
    // }, [sailsCallsInstance]);

    const connectWallet = async () => {
        setLoading(true);

        // const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

        // await web3Enable('My Gutenberg Wallet Block');
        // const allAccounts = await web3Accounts();
        // console.log(allAccounts);

        // // const { signer } = await web3FromSource(allAccounts[0].meta.source);
        // const a = await web3FromSource(allAccounts[0].meta.source);

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
            {/* <button onClick={connectWallet} style={{ marginBottom: '10px' }}>
                {loading ? 'Conectando......' : 'Conectar Wallet Polkadot!'}
            </button> */}
            {/* <Button
                onClick={() => {
                    console.log('Valor actual hook: ', value);
                }}
                text='See value'
                color='primary'
            />
            <Button
                onClick={() => {
                    setValue('Walletvalue');
                }}
                text='Change value wallet'
                color='primary'
            /> */}

            <Wallet />


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

