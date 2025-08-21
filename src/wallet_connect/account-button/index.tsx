import * as Gear from '@gear-js/ui';
import * as Vara from '@gear-js/vara-ui';
import { Identicon } from '@polkadot/react-identicon';
// import { Button as ButtonV, ButtonProps as ButtonPropsV } from '@gear-js/vara-ui';
// import { ButtonProps as ButtonPropsG, buttonStyles } from '@gear-js/ui';
import cx from 'clsx';
// import './account-button.css';

// type Props<T extends ButtonPropsV | ButtonPropsG> = {
//   name: string | undefined;
//   address: string;
// } & Pick<T, 'block' | 'color' | 'size' | 'onClick'>;

type Props<T extends Vara.ButtonProps | Gear.ButtonProps> = {
  name: string | undefined;
  address: string;
} & Pick<T, 'block' | 'color' | 'size' | 'onClick'>;

function VaraAccountButton({ address, name, color = 'primary', size, block, onClick }: Props<Vara.ButtonProps>) {
    
    return (
      <Vara.Button type="button" size={size} color={color} onClick={onClick} block={block}>
        <Identicon value={address} size={16} theme="polkadot" className="gear-vara-wallet-connect-account-button-gear-icon" />
        <span>{name}</span>
      </Vara.Button>
    )
}

function GearAccountButton(props: Props<Gear.ButtonProps>) {
  const { address, name, size = 'medium', color = 'light', block, onClick } = props;

  return (
    <button
      type="button"
      className={cx(
        "gear-vara-wallet-connect-account-button-gear-button", // Gear.buttonStyles.button,
        "gear-vara-wallet-connect-account-button-gear-nowrap", // Gear.buttonStyles.noWrap,
        `gear-vara-wallet-connect-account-button-gear-size-${size}`,
        `gear-vara-wallet-connect-account-button-gear-color-${color}`, // Gear.buttonStyles[color],
        block && "gear-vara-wallet-connect-account-button-gear-block" // Gear.buttonStyles.block,
      )}
      onClick={onClick}>
      <span>{name}</span>
    </button>
  );
}

type ModalProps<T extends Gear.ButtonProps | Vara.ButtonProps> = Omit<Props<T>, 'size' | 'block' | 'color'> & {
  color: 'primary' | 'plain';
};

function VaraAccountButtonModal(props: ModalProps<Vara.ButtonProps>) {
  return <VaraAccountButton size="small" block {...props} />;
}

function GearAccountButtonModal({ color, ...props }: ModalProps<Gear.ButtonProps>) {
  return <GearAccountButton size="large" color={color === 'plain' ? 'light' : 'primary'} block {...props} />;
}

VaraAccountButton.Modal = VaraAccountButtonModal;
GearAccountButton.Modal = GearAccountButtonModal;

export { VaraAccountButton, GearAccountButton };