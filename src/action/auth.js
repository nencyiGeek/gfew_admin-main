import httpProcessor from "../config/httpProcessor";
// import { store } from "../redux/storeConfig/store";
// import { push } from "connected-react-router";
import { history } from "../history"

// import { App } from "../constants";
// import { setRefreshToken, putApiHeader, postApiHeader } from "../config";
// import { toast, Bounce } from "react-toastify";
// import { toaster } from "../util";
// import axios from 'axios';
const {
  API_ROOT,
  URI,
//   SuccessOnApi,
//   inValidRequestOnApi,
//   tokenExpired,
//   ErrorOnApi,
//   getApiHeader,
//   TOKEN_KEY
} = require("../config/index");

// export const  helpQuery = async(data) => {
//     updateIsLoading(true);
//     let url = API_ROOT + URI.APP + "/helpQuery";
//     const res = await axios.post(url, data);
//     updateIsLoading(false);
//     return res;
// }


// export const login = async (payload) => {
//   const url = API_ROOT + URI.LOGIN;
//   console.log("login-----");
//   const res = await httpProcessor.post(url, payload, true);
//   if (res && res.id) {
//     httpProcessor.setUserDetail(res);
//     store.dispatch(updateUserData(res));
//     store.dispatch(push("/dashboard"));
//   } else if (res && res.msg) {
//     // inValidRequestOnApi(res.msg);
//   } else {
//     ErrorOnApi();
//   }
//   return res;
// };

export const signUp = async (payload) => {
  const url = API_ROOT + URI.SIGN_UP;

  const res = await httpProcessor.post(url, payload, true);
  // console.log('-sign up res=--', res);
  if (res === "SUCCESS") {
    // SuccessOnApi("Registeration Success !");
    history.push("/login");
  } else {
    // inValidRequestOnApi(res);
  }
  return res;
};

export const emailVerification = async (payload) => {
  const url = API_ROOT + URI.MAIL_VERIFY;
  const res = await httpProcessor.post(url, {token: payload}, true);
  return res;
};


// export const emailVerification = async (payload) => {
//   const url = API_ROOT + URI.EMAIL_VERIFICATION + payload;
//   const res = await httpProcessor.post(url, {}, true);
//   return res;
// };

// export const forgotPassword = async (payload) => {
//   const url = API_ROOT + URI.FORGOT_PASSWORD;
//   const res = await httpProcessor.post(url, payload, true);
//   if (res && res.msg) {
//     // inValidRequestOnApi(res.msg);
//   } else {
//     // SuccessOnApi("Password update request submited !");
//   }
//   return res;
// };

// export const getEmailByToken = async (payload) => {
//   const url = API_ROOT + URI.GET_EMAIL_BY_TOKEN + payload;
//   const res = await httpProcessor.post(url, {}, true);
//   if (res && res.msg) {
//     inValidRequestOnApi(res.msg);
//   }
//   return res;
// };

// export const updatePassword = async (payload) => {
//   const url = API_ROOT + URI.UPDATE_PASSWORD;
//   const res = await httpProcessor.post(url, payload, true);
//   if (res && res.msg) {
//     inValidRequestOnApi(res.msg);
//   } else {
//     SuccessOnApi("Your password is updated !");
//     store.dispatch(push("/login"));
//   }
//   return res;
// };

// export const updateIsLoading = (state) => {
//   store.dispatch({
//     type: App.UPDATE_IS_LOADING,
//     payload: state,
//   });
// };

// export const getCredential = (id) => {
//   return (dispatch) => {
//     updateIsLoading(true);
//     dispatch({
//       type: App.CREDENTIAL_LOADING,
//       payload: 1
//     });
//     dispatch({
//       type: App.BANKDETAILS_LOADNIG,
//       payload: 1
//     });
//     return new Promise((res, rej) => {
//       const requestGetApi = getApiHeader();
//       fetch(API_ROOT + "auth/credential/" + id, requestGetApi)
//         //.then(res => res.json())
//         .then((res) => {
//           if (res.status == 200) {
//             //   const token = res.headers.get(TOKEN_KEY);
//             //   setRefreshToken(token);
//             return res.json();
//           } else if (res.status == 401) {
//             tokenExpired();
//           } else {
//             ErrorOnApi();
//           }
//         })
//         .then((data) => {
//           dispatch({
//             type: App.CREDENTIAL,
//             payload: data,
//           });
//           dispatch({
//             type: App.CREDENTIAL_LOADING,
//             payload: 2
//           });
//           updateIsLoading(false);
//         })
//         .catch((err) => {
//           rej(err);
//         });

//       fetch(API_ROOT + "auth/bankDetails/" + id, requestGetApi)
//         .then((res) => {
//           if (res.status == 200) {
//             //   const token = res.headers.get(TOKEN_KEY);
//             //   setRefreshToken(token);
//             return res.json();
//           } else if (res.status == 401) {
//             tokenExpired();
//           } else {
//             ErrorOnApi();
//           }
//         })
//         .then((data) => {
//           dispatch({
//             type: App.BANKDETAILS,
//             payload: data,
//           });
//           dispatch({
//             type: App.BANKDETAILS_LOADNIG,
//             payload: 2
//           });
//           // updateIsLoading(false);
//           res(data);
//         })
//         .catch((err) => {
//           // console.log(err);
//         });
//       // updateIsLoading(false);
//     });
//     updateIsLoading(false);
//   };
// };

// // -------------------------

// export const addWoocommerce = (data) => {
//   return (dispatch) => {
//     updateIsLoading(true);
//     return new Promise((res, rej) => {
//       // fetch(API_ROOT + "auth/store", {
//       //   method: 'POST',
//       //   headers: {
//       //     "Content-Type": "application/json"
//       //   },
//       //   body: JSON.stringify(data)
//       // })
//       //   .then(res => res.json())
//       const requestPostApi = postApiHeader(data);
//       fetch(API_ROOT + "auth/store", requestPostApi)
//         .then((res) => {
//           if (res.status == 200 || res.status == 500) {
//             // const token = res.headers.get(TOKEN_KEY);
//             // setRefreshToken(token);
//             return res.json();
//           } else if (res.status == 401) {
//             tokenExpired();
//           } else {
//             ErrorOnApi();
//           }
//         })
//         .then((result) => {
//           // if (result.msg) {
//           //   toast("Store Details are not valid.", {
//           //     transition: Bounce,
//           //     closeButton: true,
//           //     autoClose: 2000,
//           //     position: "top-right",
//           //     type: "error",
//           //   });
//           //   dispatch(getStoreDetail(data.venderId));
//           // } else {
//           //   toast("Store verified successfully.", {
//           //     transition: Bounce,
//           //     closeButton: true,
//           //     autoClose: 2000,
//           //     position: "top-right",
//           //     type: "success",
//           //   });
//           //   dispatch(getStoreDetail(data.venderId));
//           // }
//           dispatch(getStoreDetail(data.venderId));
//           if (result && result.msg === "SUCCESS") {
//             toaster.show("Store details updated!");
//           }
//           res(result);
//         })
//         .catch((err) => {
//           rej(err);
//         })
//         .finally(() => {
//           updateIsLoading(false);
//         });
//     });
//   };
// };

// export const keyAuthTesting = () => {
//   return (dispatch) => {
//     return new Promise((res, rej) => {
//       fetch(API_ROOT + "auth/refreshKey", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           apikey: "IR07fDRAwDz5ZevoJMJJvJjOe",
//           secretKey: "cmPOaUQ5fDjwZZgQI8qUX9SLumKyGDOkHKaNKp4E",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           // dispatch({
//           //   type: App.STORE_DETAIL,
//           //   payload: data
//           // })
//           updateIsLoading(false);
//           res();
//         })
//         .catch((err) => {
//           rej(err);
//         });
//     });
//   };
// };

// export const getStoreDetail = (id) => {
//   return (dispatch) => {
//     return new Promise((res, rej) => {
//       // fetch(API_ROOT + "auth/store/"+id, {
//       //   method: 'GET',
//       //   headers: {
//       //     "Content-Type": "application/json"
//       //   }
//       // })
//       dispatch({
//         type: App.STORE_DETAIL_LOADING,
//         payload: 1
//       })
//       const requestGetApi = getApiHeader();
//       fetch(API_ROOT + "auth/store/" + id, requestGetApi)
//         //.then(res => res.json())
//         .then((res) => {
//           if (res.status == 200) {
//             // const token = res.headers.get(TOKEN_KEY);
//             // setRefreshToken(token);
//             return res.json();
//           } else if (res.status == 401) {
//             tokenExpired();
//           } else {
//             ErrorOnApi();
//           }
//         })
//         .then((data) => {
//           dispatch({
//             type: App.STORE_DETAIL,
//             payload: data,
//           });
//           dispatch({
//             type: App.STORE_DETAIL_LOADING,
//             payload: 2
//           })
//           updateIsLoading(false);
//           res();
//         })
//         .catch((err) => {
//           rej(err);
//         });
//     });
//   };
// };

// // export const getServerDetail = () => {
// //   return (dispatch) => {
// //     return new Promise((res, rej) => {
// //       updateIsLoading(true);
// //       const requestGetApi = getApiHeader();
// //       fetch(API_ROOT + "auth/getVendorServerConfig/", requestGetApi)
// //         //.then(res => res.json())
// //         .then((res) => {
// //           if (res.status == 200) {
// //             const token = res.headers.get(TOKEN_KEY);
// //             setRefreshToken(token);
// //             return res.json();
// //           } else if (res.status == 401) {
// //             tokenExpired();
// //           } else {
// //             ErrorOnApi();
// //           }
// //         })
// //         .then((data) => {
// //           dispatch({
// //             type: App.VENDOR_SERVER_CONFIG,
// //             payload: data,
// //           });
// //           updateIsLoading(false);
// //           res();
// //         })
// //         .catch((err) => {
// //           rej(err);
// //         });
// //     });
// //   };
// // };

// export const refreshKey = (id) => {
//   return (dispatch) => {
//     return new Promise((res, rej) => {
//       updateIsLoading(true);
//       // fetch(API_ROOT + "auth/refreshKey/" + id, {
//       //   method: 'PUT',
//       //   headers: {
//       //     "Content-Type": "application/json"
//       //   }
//       // })
//       //   .then(res => res.json())
//       const requstPutApi = putApiHeader({});
//       fetch(API_ROOT + "auth/refreshKey/" + id, requstPutApi)
//         .then((res) => {
//           if (res.status == 200) {
//             // const token = res.headers.get(TOKEN_KEY);
//             // setRefreshToken(token);
//             return res.json();
//           } else if (res.status == 401) {
//             tokenExpired();
//           } else {
//             ErrorOnApi();
//           }
//         })
//         .then((data) => {
//           dispatch(getCredential(id));
//         })
//         .catch((err) => {
//           rej(err);
//         })
//         .finally(() => {
//           updateIsLoading(false);
//         });
//     });
//   };
// };

// // export const getCredential = (id) => {
// //   return (dispatch) => {
// //     return new Promise((res, rej) => {
// //       const requestGetApi = getApiHeader();
// //       fetch(API_ROOT + "auth/credential/" + id, requestGetApi)
// //         //.then(res => res.json())
// //         .then((res) => {
// //           if (res.status == 200) {
// //             const token = res.headers.get(TOKEN_KEY);
// //             setRefreshToken(token);
// //             return res.json();
// //           } else if (res.status == 401) {
// //             tokenExpired();
// //           } else {
// //             ErrorOnApi();
// //           }
// //         })
// //         .then((data) => {
// //           dispatch({
// //             type: App.CREDENTIAL,
// //             payload: data,
// //           });
// //           updateIsLoading(false);
// //         })
// //         .catch((err) => {
// //           rej(err);
// //         });

// //       fetch(API_ROOT + "auth/bankDetails/" + id, requestGetApi)
// //         .then((res) => {
// //           if (res.status == 200) {
// //             const token = res.headers.get(TOKEN_KEY);
// //             setRefreshToken(token);
// //             return res.json();
// //           } else if (res.status == 401) {
// //             tokenExpired();
// //           } else {
// //             ErrorOnApi();
// //           }
// //         })
// //         .then((data) => {
// //           dispatch({
// //             type: App.BANKDETAILS,
// //             payload: data,
// //           });
// //           updateIsLoading(false);
// //           res(data);
// //         })
// //         .catch((err) => {
// //           // console.log(err);
// //         });
// //     });
// //   };
// // };

// // export const getBankDetails = (id) => {
// //   const requestGetApi = getApiHeader();
// //   return async (dispatch) => {
// //     return fetch(API_ROOT + "auth/bankDetails/" + id, requestGetApi)
// //       .then((res) => {
// //         if (res.status == 200) {
// //           const token = res.headers.get(TOKEN_KEY);
// //           setRefreshToken(token);
// //           return res.json();
// //         } else if (res.status == 401) {
// //           tokenExpired();
// //         } else {
// //           ErrorOnApi();
// //         }
// //       })
// //       .then((data) => {
// //         dispatch({
// //           type: App.BANKDETAILS,
// //           payload: data,
// //         });
// //         updateIsLoading(false);
// //         return data;
// //       });
// //   };
// // };

// export const generateKey = (id) => {
//   return (dispatch) => {
//     return new Promise((res, rej) => {
//       updateIsLoading(true);
//       // fetch(API_ROOT + "auth/generateKey/" + id, {
//       //   method: 'GET',
//       //   headers: {
//       //     "Content-Type": "application/json"
//       //   }
//       // })
//       //   .then(res => res.json())
//       const requestGetApi = getApiHeader();
//       fetch(API_ROOT + "auth/generateKey/" + id, requestGetApi)
//         //.then(res => res.json())
//         .then((res) => {
//           if (res.status == 200) {
//             // const token = res.headers.get(TOKEN_KEY);
//             // setRefreshToken(token);
//             return res.json();
//           } else if (res.status == 401) {
//             tokenExpired();
//           } else {
//             ErrorOnApi();
//           }
//         })
//         .then((data) => {
//           dispatch(getCredential(id));
//         })
//         .catch((err) => {
//           rej(err);
//         })
//         .finally(() => {
//           updateIsLoading(false);
//         });
//     });
//   };
// };

// // export const login = (data) => {
// //   return (dispatch) => {
// //     return new Promise((res, rej) => {
// //       fetch(API_ROOT + URI.AUTH, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(data),
// //       })
// //         .then((res) => res.json())
// //         .then((data) => {
// //           if (data && data.status == "ok") {
// //             localStorage.setItem("userDetails", JSON.stringify(data.data));
// //             dispatch(updateUserData(data.data));
// //             res();
// //           } else {
// //             rej(data.data);
// //           }
// //         })
// //         .catch((err) => {
// //           rej(err);
// //         });
// //     });
// //   };
// // };

// export const updateUserData = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: App.UPDATE_USER_DATA,
//       payload: data,
//     });
//   };
// };

// // export const logout = () => {
// //   return (dispatch) => {
// //     localStorage.removeItem("userDetails");
// //     //dispatch(push('/login'));
// //     // window.location = '/login'
// //     setTimeout(() => (window.location = "/login"), 1500);
// //   };
// // };

// export const getShippingMethods = () => {
//   const requestGetApi = getApiHeader();
//   return fetch(`${API_ROOT}${URI.APP}/shippingMethod`, requestGetApi)
//     .then((res) => {
//       if (res.status == 200) {
//         // const token = res.headers.get(TOKEN_KEY);
//         // setRefreshToken(token);
//         return res.json();
//       } else if (res.status == 401) {
//         tokenExpired();
//       } else {
//         ErrorOnApi();
//       }
//     })
// };



// export const updateAppData = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: App.UPDATE_APP_DATA,
//       payload: data,
//     });
//   };
// };