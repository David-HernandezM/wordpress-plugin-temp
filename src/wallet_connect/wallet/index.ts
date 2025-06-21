type Props = {
    displayBalance?: boolean;
    // temp solution to support responsiveness in dApps MenuHandler, until it's supported here
    accountButtonClassName?: string;
}

function  Wallet({ displayBalance, accountButtonClassName }: Props) {
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