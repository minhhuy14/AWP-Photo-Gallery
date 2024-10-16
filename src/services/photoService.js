import axios from "../config/axios.config"


const baseURL = 'https://api.unsplash.com'

const fetchPhotoList = (page, per_page) => {
    return axios.get(`${baseURL}/photos/?page=${page}&per_page=${per_page}`);
}

const fetchPhotoInfo = (id) => {
    return axios.get(`${baseURL}/photos/${id}`);
}


export {
    fetchPhotoList, fetchPhotoInfo
}

