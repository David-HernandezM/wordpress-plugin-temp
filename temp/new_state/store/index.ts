import { createReduxStore, register } from '@wordpress/data';
import { MiClienteSDK, crearMiClienteSDK } from '@api/crearMiClienteSDK';

interface EstadoGlobal {
  cliente: MiClienteSDK | null;
}

const actions = {
  setCliente: (cliente: MiClienteSDK) => ({
    type: 'SET_CLIENTE',
    cliente
  })
};

function reducer(state: EstadoGlobal = { cliente: null }, action: any): EstadoGlobal {
  switch (action.type) {
    case 'SET_CLIENTE':
      return { ...state, cliente: action.cliente };
    default:
      return state;
  }
}

const selectors = {
  getCliente: (state: EstadoGlobal) => state.cliente
};

const resolvers = {
  *getCliente() {
    const cliente = yield crearMiClienteSDK();
    return { cliente };
  }
};

const store = createReduxStore<EstadoGlobal>('mi-plugin/estado-global', {
  reducer,
  actions,
  selectors,
  resolvers
});

register(store);