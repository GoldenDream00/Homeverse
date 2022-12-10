import axios from "axios";
import { ADD_BLOG, BLOG_PREFIX, GET_VIDEO_BLOGS } from "configs/app-config";
import { getUserToken } from "utilities";

export const addBlogData = async (id, address, userAnswer) => {
    const token = await getUserToken();

    const res = await axios.post(BLOG_PREFIX+ADD_BLOG, {
        videoId:id,
        address:address,
        userAnswer:userAnswer
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

export const getVideoBlogs = async (id) => {
    const token = await getUserToken();

    const res = await axios.post(BLOG_PREFIX + GET_VIDEO_BLOGS, {
        id:id
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    if(res.status === 200) {
        return res.data;
    }
}