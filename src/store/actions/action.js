import * as ACTION_TYPES from './action-types';


export const signed = (id) => {
    return{
        type:ACTION_TYPES.SIGNED,
        id:id
    }
}

export const notified = () => {
    return{
        type:ACTION_TYPES.NOTIFIED
    }
}

export const cleared = () => {
    return{
        type:ACTION_TYPES.CLEARED
    }
}

export const connectwallet = (address) => {
    return{
        type:ACTION_TYPES.CONNECTED,
        address:address
    }
}

export const setpurchasedlist = (data) => {
    return{
        type:ACTION_TYPES.PURCHASED_DATA,
        data:data
    }
}

export const setuploadedlist = (data) => {
    return{
        type:ACTION_TYPES.UPLOADED_DATA,
        data:data
    }
}


export const setplan = (data) => {
    return{
        type:ACTION_TYPES.SET_PLAN,
        data:data
    }
}

export const settimer = (timer) => {
    return{
        type:ACTION_TYPES.TIMER,
        timer:timer
    }
}

export const setvideocount = (data) => {
    return{
        type:ACTION_TYPES.SET_VIDEO_COUNT,
        data:data
    }
}

export const setrate = (rate) => {
    return{
        type:ACTION_TYPES.SET_RATE,
        rate:rate
    }
}