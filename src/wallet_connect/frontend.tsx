import { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { decodeAddress } from '@gear-js/api';
import { web3FromSource } from '@polkadot/extension-dapp';
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
    const { rpcUrl, contractAddress, contractIdl } = usePluginData();
    useVaraGearData({
        initWallets: true,
        initSailsCalls: true,
        sailsCallsData: {
            rpcUrl: rpcUrl || '',
            contractId: contractAddress ? contractAddress as `0x${string}` : '0x0',
            contractIdl: contractIdl || ''
        }
    });

    return (
        <div style={{ border: '1px solid #888', padding: '10px', backgroundColor: "gray" }}>
            <Wallet theme="vara"/>
            <Wallet theme="gear"/>
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
