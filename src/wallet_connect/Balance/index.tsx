// import varaImage from '../assets/vara.svg';
// import type { GearApi } from '@gear-js/api';
// import './balance.css';

// type Props = {
//     api: GearApi
// }
import { useAccount } from "../../common/hooks/Account/useAccount";
import { useBalanceFormat } from "../../common/hooks/Balance";
import { useDeriveBalancesAll } from "../../common/hooks/Derive/use-derive-balance";
import { useVaraGearData } from "../../common/hooks/VaraGearData/useVaraGearData";
import cx from 'clsx';

type Props = {
  theme: 'gear' | 'vara';
};

export function Balance({ theme }: Props) {
    const { isApiReady } = useVaraGearData();
    const { account } = useAccount('BALANCE COMPONENT');
    const { getFormattedBalance } = useBalanceFormat();

    const { data: balances } = useDeriveBalancesAll({ address: account?.decodedAddress, watch: true });
    const balance =
    isApiReady && balances ? getFormattedBalance(balances.transferable || balances.availableBalance) : undefined;

    if (!balance) return null;

    return(
        <div className='gear-vara-balance-balance'>
            T 
            <p className={cx('gear-vara-balance-text', theme)}>
                <span className='gear-vara-balance-value'>{balance.value}</span>
                <span className='gear-vara-balance-unit'>{balance.unit}</span>
            </p>
        </div>
    );
}