import { Unsubcall } from '@polkadot/extension-inject/types';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { ProviderProps } from '../types';

import { LOCAL_STORAGE_KEY, DEFAULT_INJECT_TIMEOUT_MS } from './consts';
import { Account, Wallet, Wallets } from './types';
import { getLoggedInAccount, getWallets } from './utils';

type Value = {
  wallets: Wallets | undefined;
  account: Account | undefined;
  isAnyWallet: boolean;
  isAccountReady: boolean;
  login: (account: Account) => void;
  logout: () => void;
};

const DEFAULT_VALUE = {
  wallets: undefined,
  account: undefined,
  isAnyWallet: false,
  isAccountReady: false,
  login: () => {},
  logout: () => {},
} as const;