// import { ErrorOnApi, inValidRequestOnApi } from './index';
// import { store } from "../configurStore";
// import { push } from "connected-react-router";
// import { updateIsLoading } from '../action/auth';
import { toast } from 'react-toastify';

const axios = require('axios');

export default class httpProcessor {

    static getUserDetail() {
        const data = localStorage.getItem('getfiteatwellDetails');
        return JSON.parse(data);
    }

    // static setUserDetail(payload) {
    //     localStorage.setItem('userDetails', JSON.stringify(payload));
    //     return;
    // }

    // static header() {
    //     let reqHeaders = {};
    //     const userData = this.getUserDetail();
    //     reqHeaders['Content-Type'] = 'application/json';
    //     if (userData && userData.token) {
    //         const token = userData.token;
    //         reqHeaders['token'] = token;
    //     }
    //     return reqHeaders;
    // }

    static async post(url, payload, isLogin) {
        const userData = this.getUserDetail();
        if ((userData && userData.id) || isLogin) {
            // updateIsLoading(true);
            const res = await axios.post(url, payload)
            .catch(err=>{
                console.log('-erron on api==', err, err.response.status, err.response.data.error);
                if(err?.response?.data?.error){
                    // 
                    toast.error(err.response.data.error);
                    return "ERROR_1";
                }
            }).finally(()=>{
                // updateIsLoading(false);
            });
            // console.log('-res------------', res);
            if(res && res.status === 200){


                // sign up
                if(isLogin && res.data.message === "User already exists with email"){
                    toast.error("User already exists with email");
                    return "ERROR";
                } 

                if(isLogin && res.data.message === "User registered successfully"){
                    toast.success("User registered successfully");
                    return "SUCCESS";
                }

                return res.data;
            }
            // updateIsLoading(false);
            // if (res.status === 200 || res.status === 201) {
            //     return res.data;
            // } else if (res.status === 400 || res.status === 401) {
            //     inValidRequestOnApi('Token expire');
            //     store.dispatch(push("/login"));
            //     window.location.reload();
            // } else {
            //     ErrorOnApi();
            // };
            // return;
        } else {
            // inValidRequestOnApi('Token expire');
            // store.dispatch(push("/login"));
            // window.location.reload();
        }
    }

    // static async get(url, isLogin) {
    //     const userData = this.getUserDetail();
    //     if ((userData && userData.id) || isLogin) {
    //         updateIsLoading(true);
    //         const res = await axios.get(url,
    //             {
    //                 headers: this.header()
    //             }).finally(()=>{
    //                 updateIsLoading(false);
    //             });;
    //             // updateIsLoading(false);
    //         if (res.status === 200 || res.status === 201) {
    //             return res.data;
    //         } else if (res.status === 400 || res.status === 401) {
    //             inValidRequestOnApi('Token expire');
    //             store.dispatch(push("/login"));
    //             window.location.reload();
    //         } else {
    //             ErrorOnApi();
    //         };
    //         return;
    //     } else {
    //         inValidRequestOnApi('Token expire');
    //         store.dispatch(push("/login"));
    //         window.location.reload();
    //     }
    // }

}
