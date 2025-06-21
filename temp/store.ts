import { register, createReduxStore } from "@wordpress/data";
import { SailsCalls } from "sailscalls";

interface GearStore {
    sailscalls: SailsCalls | null;
}

interface VaraGearActions {
    "setSailsCalls": (rpcUrl: string, contractId: `0x${string}`, contractIdl: string) => { type: 'SET_SAILSCALLS'; sailscalls: SailsCalls }
}

interface VaraGearSelectors {
    getSailsCalls: (state: GearStore) => SailsCalls | null;
}

const DEFAULT_DATA: GearStore = {
    sailscalls: null
}

// const store = createReduxStore<GearStore, VaraGearActions, VaraGearSelectors>('VaraGearStore', {
const store = createReduxStore('VaraGearStore', {
    reducer(state = DEFAULT_DATA, action) {
        switch(action.type) {
            case 'SET_SAILSCALLS':
                return { ...state, sailscalls: action.sailscalls }
                break;
            default:
                return state;
        }
    },
    
    
})

// const store = createReduxStore( 'mi-plugin/estado-global', {
//     reducer( state = { nombre: '', edad: 0 }, action ) {
//         switch ( action.type ) {
//             case 'SET_NOMBRE':
//                 return { ...state, nombre: action.nombre };
//             case 'SET_EDAD':
//                 return { ...state, edad: action.edad };
//             default:
//                 return state;
//         }
//     },
//     actions: {
//         setNombre: ( nombre ) => ( { type: 'SET_NOMBRE', nombre } ),
//         setEdad: ( edad ) => ( { type: 'SET_EDAD', edad } ),
//     },
//     selectors: {
//         getNombre: ( state ) => state.nombre,
//         getEdad: ( state ) => state.edad,
//     },
//     resolvers
// } );

// register( store );

// export default store;
// const store = createReduxStore( 'demo', {
//     reducer: ( state = 'OK' ) => state,
//     selectors: {
//         getValue: ( state ) => state,
//     },
// } );
// register( store );