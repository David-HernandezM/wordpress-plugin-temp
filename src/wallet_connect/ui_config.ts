import * as Gear from '@gear-js/ui';
import * as Vara from '@gear-js/vara-ui';

import { GearAccountButton, VaraAccountButton } from './account-button';
import { GearWalletButton, VaraWalletButton } from './wallet-button';

import '@gear-js/vara-ui/dist/style.css';

const UI_CONFIG = {
  gear: {
    Button: Gear.Button,
    AccountButton: GearAccountButton,
    WalletButton: GearWalletButton,
    Modal: Gear.Modal,
  },

  vara: {
    Button: Vara.Button,
    AccountButton: VaraAccountButton,
    WalletButton: VaraWalletButton,
    Modal: Vara.Modal,
  },
} as const;

export { UI_CONFIG };
