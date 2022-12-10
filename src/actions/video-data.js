import axios from "axios";
import { DATA_PREFIX, GET_ALL_VIDEOS, GET_SEARCH, GET_ALL_TYPES, GET_USER_BY_ADDRESS, GET_DATA_BY_ADDRESS, GET_VIDEO_INFO } from "configs/app-config";
import { LowerCase } from "utilities";

export const getAllVideos = async (start) => {
    const res = await axios.post(DATA_PREFIX+GET_ALL_VIDEOS,{
        start:start
    })
    if(res.status === 200){
        return res.data;
    }
}

export const searchVideoData = async (exploreData, start) => {
    const res = await axios.post(DATA_PREFIX+GET_SEARCH,{
        exploreData:exploreData,
        start:start
    })

    if(res.status === 200){
        return res.data;
    }
}

export const getAllTypes = async () => {
    const res = await axios.post(DATA_PREFIX+GET_ALL_TYPES)
    if(res.status === 200) {
        return res.data;
    }
}

export const getUserByAddress = async (address) => {

    const res = await axios.post(DATA_PREFIX + GET_USER_BY_ADDRESS, {
        address: address
    })

    if (res.status === 200) {
        return res.data;
    }
}

export const getVideoByAddress = async (address, count) => {
    const res = await axios.post(DATA_PREFIX + GET_DATA_BY_ADDRESS, {
        address:LowerCase(address),
        count:count
    })
    if(res.status === 200) {
        return res.data;
    }
}
export const getVideoInfoData = async (id) => {
    const res = await axios.post(DATA_PREFIX + GET_VIDEO_INFO, {
        id:id
    })
    if(res.status === 200) {
        return res.data;
    }
}