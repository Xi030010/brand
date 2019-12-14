import axios from 'axios';
import qs from 'qs';


let http = axios;
// http.defaults.timeout = 10000;
http.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8;';
http.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8;';
//http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.baseURL = "http://47.104.148.196:8081";

export {
    http,
    qs,
};
