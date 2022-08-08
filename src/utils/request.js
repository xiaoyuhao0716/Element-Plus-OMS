//引入 axios
import axios from "axios";
import { ElMessage } from 'element-plus';
import { useUserDataStore } from '../store/userData';
import config from '../config';

// base URL
let baseURL;

if (process.env.NODE_ENV == "development") {
    if (config.MOCK_CONFIG) {
        baseURL = "/mockApi/"
    } else {
        baseURL = config.DEV_URL
    }
} else {
    baseURL = config.URL
}

const http = axios.create({
    baseURL: baseURL,
    timeout: 50000
})

// 数据请求拦截
http.interceptors.request.use((config) => {

    //用户 token
    const userData = useUserDataStore()
    if (config.url !== '/login') {
        config.headers.Authorization = userData.token
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// 返回响应数据拦截
http.interceptors.response.use((res) => {
    const data = res.data;
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    if (res.status === 200) {
        // const code = data.code;
        return Promise.resolve(data);
    }
}, (error) => {
    if (error.response.status) {
        // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
        switch (error.response.status) {
            case 404:
                ElMessage({
                    type: 'error',
                    message: '请求路径找不到！',
                    showClose: true
                });
                break;
            case 502:
                ElMessage({
                    type: 'error',
                    message: '服务器内部报错！',
                    showClose: true
                });
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
});

export default http;
