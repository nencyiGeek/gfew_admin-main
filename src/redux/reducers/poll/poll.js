const initialState = {
    polltype: [],
    pollData:[]
}

const poll = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POLLTYPE":
            return ({
                ...state,
                polltype: action.polltype,
            });
        case "GET_POLL_DATA":
            return ({
                ...state,
                pollData: action.pollData,
            });
        default:
            return { ...state }
    }
}

export default poll
