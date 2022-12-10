import { TIMER } from "store/actions/action-types";

const INITIAL_STATE = {
    timer:null
}

const reducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case TIMER:
            return{
                ...state,timer:action.timer
            }
        default: return state;
    }
}

export default reducer;