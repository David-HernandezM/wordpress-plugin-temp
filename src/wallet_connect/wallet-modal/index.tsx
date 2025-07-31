import { useAccount } from "../../common/hooks/Account/useAccount";
import { VaraWalletButton, GearWalletButton } from "../wallet-button"
import { useWallet } from "../hooks";
import { IS_MOBILE_DEVICE, WALLETS } from "../consts";
import { Button as ButtonG, Modal as ModalG } from "@gear-js/ui";
import { Button as ButtonV, Modal as ModalV } from "@gear-js/vara-ui";
import { GearAccountButton, VaraAccountButton } from "../account-button";
import { copyToClipboard } from "../../common/utils";
// import './wallet-modal.css';
import cx from 'clsx';

type Props = {
    theme?: "gear" | "vara";
    close: () => void;
}

export function WalletModal({ theme = "vara", close }: Props) {
    // [TODO]: set a hook for alerts

    const { wallets, isAnyWallet, account, login, logout } = useAccount('WALLETMODAL');
    const { wallet, walletAccounts, setWalletId, resetWalletId } = useWallet();

    const getWallets = () =>
    WALLETS.map(([id, { name }]) => {
      const { status, accounts, connect } = wallets?.[id] || {};
      const isEnabled = Boolean(status);
      const isConnected = status === 'connected';

      const accountsCount = accounts?.length || 0;
      const accountsStatus = `${accountsCount} ${accountsCount === 1 ? 'account' : 'accounts'}`;

      return theme == 'vara' ? (
        <li key={id}>
          <VaraWalletButton
            name={name}
            onClick={() => (isConnected ? setWalletId(id) : connect?.())}
            disabled={!isEnabled}>
            <span className={'vara-gear-wallet-modal-status'}>
              <span className={cx('statusText', theme)}>{isConnected ? 'Enabled' : 'Disabled'}</span>

              {isConnected && <span className={cx('statusAccounts', theme)}>{accountsStatus}</span>}
            </span>
          </VaraWalletButton>
        </li>
      ) : (
        <GearWalletButton
            name={name}
            onClick={() => (isConnected ? setWalletId(id) : connect?.())}
            disabled={!isEnabled}>
            <span className={'vara-gear-wallet-modal-status'}>
              <span className={cx('statusText', theme)}>{isConnected ? 'Enabled' : 'Disabled'}</span>

              {isConnected && <span className={cx('statusAccounts', theme)}>{accountsStatus}</span>}
            </span>
        </GearWalletButton>
      )
    });

    const getAccounts = () =>
    walletAccounts?.map((_account) => {
      const { address, meta } = _account;

      const isActive = address === account?.address;
      const color = isActive ? 'primary' : 'plain';

      const handleClick = () => {
        if (isActive) {
            console.log("This account is active: ", meta.name);
            return;
        }

        console.log("Se va a iniciar sesion: ", meta.name);

        login(_account);
        close();
      };

      const handleCopyClick = () => {
        copyToClipboard({ value: address });
        close();
      };

      return (
        <li key={address} className={'account'}>
            {
                theme == 'vara' ? (
                    <VaraAccountButton.Modal address={address} name={meta.name} color={color} onClick={handleClick} />
                ) : (
                    <GearAccountButton.Modal address={address} name={meta.name} color={color} onClick={handleClick} />
                )
            }

            {
                theme == 'vara' ? (
                    <ButtonV 
                        // icon={CopySVG}
                        text="copy"
                        size="medium"
                        color="transparent"
                        onClick={handleCopyClick}
                        className={cx('vara-gear-wallet-modal-copyButton', 'theme')}
                    />
                ) : (
                    <ButtonG 
                        // icon={CopySVG}
                        text="copy"
                        size="medium"
                        color="transparent"
                        onClick={handleCopyClick}
                        className={cx('vara-gear-wallet-modal-copyButton', 'theme')}
                    />
                )
            }
        </li>
      );
    });

    const handleLogoutButtonClick = () => {
        logout();
        resetWalletId();
        close();
    };

    const render = () => {
        if (!isAnyWallet)
        return IS_MOBILE_DEVICE ? (
            <p className={cx('vara-gear-wallet-modal-text', theme)}>
            To use this application on mobile devices, open this page inside compatible wallets like Nova or SubWallet.
            </p>
        ) : (
            <p className={cx('vara-gear-wallet-modal-text', theme)}>
            A compatible wallet was not found or is disabled. Install it following the{' '}
            <a href="https://wiki.vara.network/docs/account" target="_blank" rel="noreferrer">
                instructions
            </a>
            .
            </p>
        );

        if (!walletAccounts) return <ul className={'vara-gear-wallet-modal-list'}>{getWallets()}</ul>;
        if (walletAccounts.length) return <ul className={'vara-gear-wallet-modal-list'}>{getAccounts()}</ul>;

        return (
        <p className={cx('vara-gear-wallet-modal-text', theme)}>
            No accounts found. Please open your extension and create a new account or import existing.
        </p>
        );
    };

    const renderFooter = () => {
        if (!wallet) return null;

        return (
        <div className={'vara-gear-wallet-modal-footer'}>
                {/* [TODO]: Set the form to set an image in this parts */}
            {
                theme == 'vara' ? (
                    <VaraWalletButton.Change name={wallet.name} onClick={resetWalletId}>
                        Edit
                    </VaraWalletButton.Change>
                ) : (
                    <GearWalletButton.Change name={wallet.name} onClick={resetWalletId}>
                        Edit
                    </GearWalletButton.Change>
                )
            }
            {
                account && theme == 'vara' ? (
                    <ButtonV
                        // icon={ExitSVG}
                        text="Logout"
                        size="medium"
                        color="transparent"
                        onClick={handleLogoutButtonClick}
                        className={cx('vara-gear-wallet-modal-logoutButton', theme)}
                    />
                ) : (
                    <ButtonG
                        // icon={ExitSVG}
                        text="Logout"
                        size="medium"
                        color="transparent"
                        onClick={handleLogoutButtonClick}
                        className={cx('vara-gear-wallet-modal-logoutButton', theme)}
                    />
                )
            }
        </div>
        );
    };

    return theme == 'vara' ? (
        <ModalV heading="Connect Wallet" close={close} footer={renderFooter()}>
            {render()}
        </ModalV>
    ) : (
        <ModalG heading="Connect Wallet" close={close} footer={renderFooter()}>
            {render()}
        </ModalG>
    )
}