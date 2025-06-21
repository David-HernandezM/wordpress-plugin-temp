import { Wallets } from './types';

const IS_MOBILE_DEVICE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

type InjectedWindow = Window & { walletExtension?: { isNovaWallet: boolean } };
const isNovaWallet = Boolean((window as unknown as InjectedWindow).walletExtension?.isNovaWallet);

const WALLET = isNovaWallet
  ? {
      'polkadot-js': { name: 'Nova Wallet' },
      'subwallet-js': { name: 'SubWallet', },
    }
  : {
      'polkadot-js': { name: 'Polkadot JS', },
      'subwallet-js': { name: 'SubWallet',  },
      talisman: { name: 'Talisman',  },
      enkrypt: { name: 'Enkrypt',  },
    };

const WALLETS = Object.entries(WALLET) as Wallets;

export { IS_MOBILE_DEVICE, WALLET, WALLETS, isNovaWallet };