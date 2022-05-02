import axios from "axios";
const {
    API_ROOT,
} = require("../../../config/index");
export const getPollType = () => {
    return dispatch => {
        axios.get(API_ROOT + "get-poll-types")
            .then(response => {
                dispatch({
                    type: "GET_POLLTYPE",
                    polltype: response.data.data,
                })
            })
            .catch(err => console.log(err))
    }
}

export const getPollData = () => {
    return dispatch => {
        axios.get(API_ROOT + "get-all-polls")
            .then(response => {
                dispatch({
                    type: "GET_POLL_DATA",
                    pollData: response.data.data,
                })
            })
            .catch(err => console.log(err))
    }
}

export const awsfileUpload = (data) => async (getState, dispatch) => {
    return new Promise((resolve, reject) => {
        return axios.post(API_ROOT + "aws-image-upload", data)
            .then(response => {
                resolve(response)
            }).catch(err => console.log(err))

    });
};

export const savePoll = (data) => async (getState, dispatch) => {
    return new Promise((resolve, reject) => {
        return axios.post(API_ROOT + "save-poll", data)
            .then(response => {
                resolve(response)
            }).catch(err => console.log(err))

    });
};

export const deletePoll = (data) => async (getState, dispatch) => {
    return new Promise((resolve, reject) => {
        return axios.post(API_ROOT + "delete-poll", data)
            .then(response => {
                resolve(response)
            }).catch(err => console.log(err))

    });
}