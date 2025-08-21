import { useState, useEffect } from "react";
import { useAccount } from "../../common/hooks/Account/useAccount";
import { Button } from "@gear-js/ui";
import { VaraAccountButton } from "../account-button";
import { GearAccountButton } from "../account-button";
import { Balance } from "../Balance";
import { WalletModal } from "../wallet-modal";

type Props = {
    theme?: 'gear' | 'vara';
    displayBalance?: boolean;
    // temp solution to support responsiveness in dApps MenuHandler, until it's supported here
    accountButtonClassName?: string;
}

export function Wallet({ theme='vara', displayBalance = true, accountButtonClassName }: Props) {
    const { account, isAccountReady } = useAccount('wallet-main');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        console.log("CAMBIO ACCOUNT IN MAIN COMPONENT!!");
    }, [account]);

    if (!isAccountReady) return null;

    return (
        <>
            <div className="gear-vara-wallet">
                { account && displayBalance && <Balance theme={theme} /> }
                {
                    account ? (
                        <div className={accountButtonClassName}>
                            {
                                theme == 'vara' ? (
                                    <VaraAccountButton address={account.address} name={account.meta.name} onClick={openModal} />
                                ) : (
                                    <GearAccountButton address={account.address} name={account.meta.name} onClick={openModal} />
                                )
                            }
                        </div>
                    ) : (
                        <Button text="Connect Wallet" color="primary" onClick={openModal} />
                    )
                }
            </div>
            { isModalOpen && <WalletModal theme={theme} close={closeModal} /> }
        </>
    );
}





// type Props = {
//   displayBalance?: boolean;

//   // temp solution to support responsiveness in dApps MenuHandler, until it's supported here
//   accountButtonClassName?: string;
// };

// export function Wallet({ displayBalance = true, accountButtonClassName }: Props) {
//   const { account, isAccountReady } = useAccount();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   if (!isAccountReady) return null;
//   const { Button, AccountButton } = UI_CONFIG[theme];

//   return (
//     <>
//       <div className={styles.wallet}>
//         {displayBalance && <Balance theme={theme} />}

//         {account ? (
//           <div className={accountButtonClassName}>
//             <AccountButton address={account.address} name={account.meta.name} onClick={openModal} />
//           </div>
//         ) : (
//           <Button text="Connect Wallet" color="primary" onClick={openModal} />
//         )}
//       </div>

//       {isModalOpen && <WalletModal theme={theme} close={closeModal} />}
//     </>
//   );
// }