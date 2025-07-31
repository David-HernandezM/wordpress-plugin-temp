import * as Gear from '@gear-js/ui';
import * as Vara from '@gear-js/vara-ui';
import { FunctionComponent, ReactNode, SVGProps } from 'react';
import cx from 'clsx';
// import './wallet-button.css';

type Props = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

type WalletProps = {
  // SVG: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  name: string;
};

function Wallet({ name }: WalletProps) {
  return (
    <span className='wallet-button-wallet'>
      {name}
    </span>
  );
}

function VaraWalletButton({ children, name, ...props }: Props & WalletProps) {
  return (
    <Vara.Button className='wallet-button-button' color="plain" size="small" block {...props}>
      <Wallet name={name} />
      {children}
    </Vara.Button>
  );
}

function GearWalletButton({ children, name, ...props }: Props & WalletProps) {
  return (
    <button
      type="button"
      className={cx(
        Gear.buttonStyles.button,
        Gear.buttonStyles.large,
        Gear.buttonStyles.light,
        Gear.buttonStyles.block,
        'wallet-button-button',
      )}
      {...props}>
      <Wallet name={name} />
      {children}
    </button>
  );
}

function VaraWalletButtonChange({ name, children, ...props }: Omit<Props, 'disabled'> & WalletProps) {
  return (
    <Vara.Button color="transparent" {...props}>
      <Wallet name={name} />
      {children}
    </Vara.Button>
  );
}

function GearWalletButtonChange({name, children, ...props }: Omit<Props, 'disabled'> & WalletProps) {
  return (
    <button type="button" className={cx(Gear.buttonStyles.button, Gear.buttonStyles.transparent)} {...props}>
      <Wallet  name={name} />
      {children}
    </button>
  );
}

VaraWalletButton.Change = VaraWalletButtonChange;
GearWalletButton.Change = GearWalletButtonChange;

export { VaraWalletButton, GearWalletButton };
