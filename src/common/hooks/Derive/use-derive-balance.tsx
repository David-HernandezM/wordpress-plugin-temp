// src/hooks/useDeriveBalancesAll.ts
import { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { useEffect, useRef, useState } from 'react';
import { useVaraGearData } from '../VaraGearData/useVaraGearData';

type UseDeriveBalancesAllParams = {
  address?: string;
  watch?: boolean;          // si true, se suscribe
};

type UseDeriveBalancesAllReturn = {
  data?: DeriveBalancesAll;
  error?: string;
  loading: boolean;
};

export function useDeriveBalancesAll({
  address,
  watch = false,
}: UseDeriveBalancesAllParams): UseDeriveBalancesAllReturn {
  // const { api, isApiReady } = useApi();
  const { sailsCallsInstance, isApiReady } = useVaraGearData();

  const [data, setData] = useState<DeriveBalancesAll>();
  const [error, setError]   = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const unsubRef = useRef<() => void>(undefined);

  // ❶ Consulta única o suscripción
  useEffect(() => {
    if (!isApiReady || !address) return;

    setLoading(true);
    setError(undefined);

    // helper que actualiza estado común
    const handleResult = (result: DeriveBalancesAll) => {
      setData(result);
      setLoading(false);
    };

    // modo watch = true ➜ suscripción
    if (watch) {
      sailsCallsInstance.getGearApi.derive.balances
        .all(address, handleResult)
        .then((unsub) => {
          unsubRef.current = unsub;
        })
        .catch((err) => {
          setError(err.message ?? 'Error desconocido');
          setLoading(false);
        });
      return () => unsubRef.current?.();
    }

    // modo sólo fetch una vez
    sailsCallsInstance.getGearApi.derive.balances
      .all(address)
      .then(handleResult)
      .catch((err) => {
        setError(err.message ?? 'Error desconocido');
        setLoading(false);
      });
  }, [sailsCallsInstance, isApiReady, address, watch]);

  // ❷ Limpiar suscripción al desmontar
  useEffect(() => () => unsubRef.current?.(), []);

  return { data, error, loading };
}

















// import { DeriveBalancesAll } from '@polkadot/api-derive/types';
// import { useQueryClient } from '@tanstack/react-query';
// import { useEffect } from 'react';

// // import { QueryParameters } from '../../../types';
// import { QueryParameters } from '../../types';
// // import { useQuery } from '../../use-query';
// import { useQuery } from '../use-query';
// import { useVaraGearData } from '../VaraGearData/useVaraGearData';

// type UseDeriveBalancesAllParameters<T> = QueryParameters<DeriveBalancesAll, T> & {
//   address: string | undefined;
//   watch?: boolean;
// };

// function useDeriveBalancesAll<T = DeriveBalancesAll>({ address, watch, query }: UseDeriveBalancesAllParameters<T>) {
// //   const { api, isApiReady } = useApi();
//     const { sailsCallsInstance, isApiReady } = useVaraGearData();

//   const queryClient = useQueryClient();
//   const queryKey = ['deriveBalancesAll', sailsCallsInstance?.getGearApi.provider.endpoint, address];

//   const getDeriveBalancesAll = () => {
//     if (!isApiReady) throw new Error('API is not initialized');
//     if (!address) throw new Error('Address not found');

//     return sailsCallsInstance.getGearApi.derive.balances.all(address);
//   };

//   useEffect(() => {
//     if (!isApiReady || !address || !watch) return;

//     // two api calls are made on first render, it can be optimized
//     // also, what should happen if watch is enabled, but query itself is disabled?
//     // should watch be in a queryKey?
//     const unsub = sailsCallsInstance.getGearApi.derive.balances.all(address, (result) => {
//       queryClient.setQueryData(queryKey, result);
//     });

//     return () => {
//       // eslint-disable-next-line @typescript-eslint/no-floating-promises -- TODO(#1816): resolve eslint comments
//       unsub.then((unsubCallback) => unsubCallback());
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sailsCallsInstance, address, watch]);

//   return useQuery({
//     ...query,
//     queryKey,
//     queryFn: getDeriveBalancesAll,
//     enabled: isApiReady && Boolean(address) && (query?.enabled ?? true),
//   });
// }

// export { useDeriveBalancesAll };
// export type { UseDeriveBalancesAllParameters };



// import { useEffect, useState, useRef } from 'react';
// import { DeriveBalancesAll } from '@polkadot/api-derive/types';
// import { useVaraGearData } from '../VaraGearData/useVaraGearData';

// type UseDeriveBalancesAllParameters = {
//   address: string | undefined;
//   watch?: boolean;
// };

// function useDeriveBalancesAll({ address, watch }: UseDeriveBalancesAllParameters) {
//   const { sailsCallsInstance, isApiReady } = useVaraGearData();
//   const [data, setData] = useState<DeriveBalancesAll | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);

//   const getDeriveBalancesAll = () => {
//     if (!isApiReady) throw new Error('API is not initialized');
//     if (!address) throw new Error('Address not found');

//     return sailsCallsInstance.getGearApi
//       .derive
//       .balances
//       .all(address);
//   };

//   useEffect(() => {
//     if (!isApiReady || !address) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const result = await sailsCallsInstance.getGearApi.derive.balances.all(address);
//         setData(result);
//         setError(null);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     if (watch) {
//       sailsCallsInstance.getGearApi.derive.balances.all(address, (result) => {
//         setData(result);
//       }).then((unsub) => {
//         unsubRef.current = unsub;
//       });
//     }

//     return () => {
//       if (unsubRef.current) {
//         unsubRef.current();
//       }
//     };
//   }, [isApiReady, address, watch, sailsCallsInstance]);

//   return { data, loading, error };
// }

// export { useDeriveBalancesAll };
