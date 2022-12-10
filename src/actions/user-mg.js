import axios from "axios";
import { USER_PREFIX, CONNECT_PREFIX, UPGRADE_PREFIX, PURCHASE_COURSE_PREFIX, UPLOAD_PREFIX, UPDATE_VIEWS, FOLLOW_VIDEO } from "configs/app-config";
import { getUserToken, signInToGetToken } from "utilities";
import { getUserByAddress } from "./video-data";

export const upgradeUserPlan = async (id, plan) => {
    const token = await getUserToken();

    const res = await axios.post(USER_PREFIX + UPGRADE_PREFIX, {
        id: id,
        plan: plan
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if (res.status === 200) {
        return res.data;
    }
}

export const purchaseNewVideo = async (id, olddata, newItem) => {
    const token = await getUserToken();

    const res = await axios.post(USER_PREFIX + PURCHASE_COURSE_PREFIX, {
        id: id,
        olddata: olddata,
        newItem: newItem
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })

    if (res.status === 200) {
        return res.data;
    }
}

export const registerUser = async (address) => {
    const res = await getUserByAddress(address);
    await signInToGetToken();
    const token = await getUserToken();

    if (res.user === undefined) {
        const resConnect = await axios.post(USER_PREFIX + CONNECT_PREFIX, {
            address: address
        },{
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        if ((resConnect.status === 200)) {
            return resConnect.data;
        }
    } else {
        return res.user;
    }
}

export const addVideoData = async (data) => {

    const token = await getUserToken();

    const formData = new FormData();

    formData.append('image', data.posterImage);
    formData.append('video', data.video);
    formData.append('title', data.title);
    formData.append('overview', data.overview);
    formData.append('type', data.type);
    formData.append('address', data.address);
    formData.append('titleKeywords', data.titleKeywords);
    formData.append('overviewKeywords', data.overviewKeywords);
    formData.append('count', data.count);
    formData.append('id', data.id);

    const res = await axios.post(USER_PREFIX + UPLOAD_PREFIX, formData, {
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 200) {
        return res.data.isUploaded;
    }
}

export const updateViews = async (item) => {
    const token = await getUserToken();

    const res = await axios.post(USER_PREFIX + UPDATE_VIEWS, {
        item: item
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if (res.status === 200) {
        return res.data;
    }
}

export const followVideo = async (item, id, userId) => {
    const token = await getUserToken();

    const res = await axios.post(USER_PREFIX + FOLLOW_VIDEO, {
        item: item,
        id: id,
        userId: userId
    },{
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if (res.status === 200) {
        return res.data;
    }
}