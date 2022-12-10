import { combineReducers } from 'redux';
import stateReducer from './user-mg-reducer';
import walletReducer from './wallet-reducer';
import dataReducer from './data-reducer';

const rootReducer = combineReducers({
     userState: stateReducer,
     walletState: walletReducer,
     dataState:dataReducer
});

export default rootReducer;