import * as Gear from '@gear-js/ui';
import * as Vara from '@gear-js/vara-ui';
import { FunctionComponent, ReactNode, SVGProps } from 'react';
import cx from 'clsx';

type Props = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

type WalletProps = {
  SVG: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  name: string;
};

function Wallet({ SVG, name }: WalletProps) {
  return (
    <span className='wallet-button-wallet'>
      <SVG className='wallet-button-icon' />
      {name}
    </span>
  );
}

function VaraWalletButton({ children, SVG, name, ...props }: Props & WalletProps) {
  return (
    <Vara.Button className='wallet-button-button' color="plain" size="small" block {...props}>
      <Wallet SVG={SVG} name={name} />
      {children}
    </Vara.Button>
  );
}

function GearWalletButton({ children, SVG, name, ...props }: Props & WalletProps) {
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
      <Wallet SVG={SVG} name={name} />
      {children}
    </button>
  );
}

function VaraWalletButtonChange({ SVG, name, children, ...props }: Omit<Props, 'disabled'> & WalletProps) {
  return (
    <Vara.Button color="transparent" {...props}>
      <Wallet SVG={SVG} name={name} />
      {children}
    </Vara.Button>
  );
}

function GearWalletButtonChange({ SVG, name, children, ...props }: Omit<Props, 'disabled'> & WalletProps) {
  return (
    <button type="button" className={cx(Gear.buttonStyles.button, Gear.buttonStyles.transparent)} {...props}>
      <Wallet SVG={SVG} name={name} />
      {children}
    </button>
  );
}

VaraWalletButton.Change = VaraWalletButtonChange;
GearWalletButton.Change = GearWalletButtonChange;

export { VaraWalletButton, GearWalletButton };
