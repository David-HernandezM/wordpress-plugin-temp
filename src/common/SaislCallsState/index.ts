// store.js  (puro)
import { createReduxStore, register } from '@wordpress/data';
import { SailsCalls } from 'sailscalls';

type ReducerActions = 'SET_SAILSCALLS';

type ActionData = {
    type: ReducerActions,
    data: initSailsCallsParameters
}

type initSailsCallsParameters = {
    appName: string;
    rpcUrl: string;
    contractId: `0x${string}`; 
    contractIdl: string;
}
 
export interface VaraPluginGLobalState {
    sailscalls: SailsCalls | null;
}

const DEFAULT_TYPE: VaraPluginGLobalState = {
    sailscalls: null,
}

export const actions = {
    setSailsCalls: (data: initSailsCallsParameters): ActionData => ({ type: 'SET_SAILSCALLS', data })
}
export type Actions = typeof actions;
export type Action = ReturnType<Actions[keyof Actions]>;

export const selectors = {
    getSailsCallsInstance: (state: VaraPluginGLobalState) => state.sailscalls,
    getSailsCallsInit: (state: VaraPluginGLobalState, data: initSailsCallsParameters) => state.sailscalls
}

export type Selectors = typeof selectors;

const store = createReduxStore<VaraPluginGLobalState, Actions, Selectors>('VaraGearGlobalPluginState', {
    reducer(state = DEFAULT_TYPE, action: Action): VaraPluginGLobalState {
        switch(action.type) {
            case 'SET_SAILSCALLS':
                return { ...state, sailscalls: action.data };
            default:
                return state;
        }
    },
    actions,
    selectors,
    resolvers: {
        *getSailsCallsInit(data: initSailsCallsParameters) {
            const sailscallsInstance: SailsCalls = yield initSailsCalls(data);

            return { sailscalls: sailscallsInstance };
        }
    }
});

async function initSailsCalls(data: initSailsCallsParameters): Promise<SailsCalls> {
    return await SailsCalls.new({
        network: data.rpcUrl,
        newContractsData: [
            {
                contractName: 'VaraContract',
                address: data.contractId,
                idl: data.contractIdl
            }
        ]
    });
}

// const store = createReduxStore( 'mi-plugin/estado-global', {
//     reducer( state = { count: 0 }, action ) {
//         if ( action.type === 'TICK' ) {
//             return { ...state, count: state.count + 1 };
//         }
//         return state;
//     },
//     actions: {
//         tick: () => ( { type: 'TICK' } ),
//     },
//     selectors: {
//         getCount: ( state: { count: number } ) => state.count,
//     },
// } );
// register( store );
