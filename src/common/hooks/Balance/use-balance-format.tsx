import { formatBalance } from '@polkadot/util';
import { BigNumber } from 'bignumber.js';
import { useVaraGearData } from '../VaraGearData/useVaraGearData';

function useBalanceFormat() {
    const { sailsCallsInstance, isApiReady } = useVaraGearData();
//   const { api, isApiReady } = useApi();

  const [decimals] = isApiReady ? sailsCallsInstance.getGearApi.registry.chainDecimals : [0];
  const valuePerGas = isApiReady ? sailsCallsInstance.getGearApi.valuePerGas.toString() : '1000';

  const balanceMultiplier = new BigNumber(10).exponentiatedBy(decimals);

  const getChainBalanceValue = (value: string | number) => new BigNumber(value).multipliedBy(balanceMultiplier);

  const getFormattedBalanceValue = (value: string | number) => new BigNumber(value).dividedBy(balanceMultiplier);

  const getChainGasValue = (value: string | number) =>
    new BigNumber(value).multipliedBy(balanceMultiplier).dividedBy(valuePerGas).integerValue(BigNumber.ROUND_UP);

  const getFormattedGasValue = (value: string | number) =>
    new BigNumber(value).multipliedBy(valuePerGas).dividedBy(balanceMultiplier);

  const getFormattedBalance = (balance: Exclude<Parameters<typeof formatBalance>[0], undefined>) => {
    if (!isApiReady) throw new Error('API is not initialized');

    const [unit] = sailsCallsInstance.getGearApi.registry.chainTokens;

    const value = formatBalance(balance, {
      decimals,
      forceUnit: unit,
      withSiFull: false,
      withSi: false,
      withUnit: unit,
    });

    return { value, unit };
  };

  return {
    balanceMultiplier,
    decimals,
    getChainBalanceValue,
    getChainGasValue,
    getFormattedBalanceValue,
    getFormattedGasValue,
    getFormattedBalance,
  };
}

export { useBalanceFormat };