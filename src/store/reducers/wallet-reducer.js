import { CONNECTED } from "store/actions/action-types";

const INITIAL_STATE = {
    wallet_state:0,
    wallet_address:""
}

const reducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case CONNECTED:
            return{
                ...state, wallet_state: 1, wallet_address:action.address 
            }
        default: return state;
    }
}

export default reducer;