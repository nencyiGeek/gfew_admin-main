export const signupWithJWT = (signupData) => {
  return dispatch => {
    dispatch({
      type: "SIGNUP_WITH_EMAIL",
      payload: {...signupData}
    })
  }
}
