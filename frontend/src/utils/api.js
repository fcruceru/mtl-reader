// Axios setup
const axios = require('axios');
//const qs = require('qs');

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

export function getChapterList(series) {
    return axiosInstance.get(`/chapter-list?series=${series}`);
}