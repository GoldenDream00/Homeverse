import { SIGNED, NOTIFIED, CLEARED, PURCHASED_DATA, UPLOADED_DATA, SET_PLAN, SET_VIDEO_COUNT, SET_RATE } from "store/actions/action-types";

const INITIAL_STATE = {
    user_state:0,
    notify_state:0,
    user_id:"",
    purchased_list:[],
    uploaded_list:[],
    plan:0,
    count:0,
    rate:0
}

const reducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case SIGNED:
            return{
                ...state, user_state: 1, user_id: action.id
            }
        case SET_PLAN:
            return{
                ...state, plan: action.data
            }
        case SET_VIDEO_COUNT:
            return{
                ...state, count: action.data
            }
        case SET_RATE:
            return{
                ...state, rate: action.rate
        }
        case PURCHASED_DATA:
            return{
                ...state, purchased_list: [...action.data]
            }
        case UPLOADED_DATA:
            return{
                ...state, uploaded_list: [...action.data]
            }
        case CLEARED:
            return{
                ...state, notify_state: 0
            }
        case NOTIFIED:
            return{
                ...state, notify_state:1
            }
        default: return state;
    }
}

export default reducer;