import { Balance } from '@polkadot/types/interfaces';
import { useEffect, useState } from '@wordpress/element';
import { useVaraGearData } from '../VaraGearData/useVaraGearData';

// import { useAlert, useApi } from '@/context';

function useBalance(address: string | undefined) {
    const { sailsCallsInstance, isApiReady } = useVaraGearData();
    const [balance, setBalance] = useState<Balance>();

    const isBalanceReady = balance !== undefined;

    useEffect(() => {
        setBalance(undefined);

        if (!isApiReady || !address) return;


        sailsCallsInstance.getGearApi.balance
        .findOut(address)
        .then((result) => {
            setBalance(result);
        })
        // [TODO]: set the alert hook for notifications
        .catch(({ message }: Error) => console.error(message));

        const unsub = sailsCallsInstance.getGearApi.gearEvents.subscribeToBalanceChanges(address, (result) => setBalance(result));

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises -- TODO(#1816): resolve eslint comments
            unsub.then((unsubCallback) => unsubCallback());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isApiReady, address]);

    return { balance, isBalanceReady };
}

export { useBalance };
