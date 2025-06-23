import { UseQueryOptions } from '@tanstack/react-query';

export type ProviderProps = Omit<React.ProviderProps<never>, 'value'>;

export type QueryParameters<TQueryFnData, TData> = {
  query?: Omit<UseQueryOptions<TQueryFnData, Error, TData, (string | undefined)[]>, 'queryKey' | 'queryFn'>;
};
