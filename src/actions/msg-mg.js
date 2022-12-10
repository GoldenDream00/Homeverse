import axios from "axios";
import { ADD_TRANSACTION, CLEAR_MSGS, GET_ALL_MSGS, GET_UNREAD_MSGS, MSG_PREFIX } from "configs/app-config";
import { getCurrentDateTime } from "utilities";
import { getUserToken } from "utilities";

export const addMessage = async (item, address, type) => {
    const token = await getUserToken();

    const res = await axios.post(MSG_PREFIX + ADD_TRANSACTION,{
        type:type,
        item:item,
        address:address,
        dateTime:getCurrentDateTime()
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if(res.status === 200){
        return res.data;
    }
}

export const getUnreadMessages = async (address) => {
    const token = await getUserToken();

    const res = await axios.post(MSG_PREFIX+GET_UNREAD_MSGS, {
        address:address
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if(res.status === 200){
        return res.data;
    }
}

export const getAllMessages = async (address) => {
    const token = await getUserToken();

    const res = await axios.post(MSG_PREFIX+GET_ALL_MSGS,{
        address:address
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    if(res.status === 200){
        return res.data;
    }
}

export const clearMessages = async (id) => {
    const token = await getUserToken();
    
    const res = await axios.post(MSG_PREFIX+CLEAR_MSGS, {
        id:id
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if(res.status === 200) {
        return res.data;
    }
}