/***
 *  Login Reducers
 ***/

const initialState = {
  user: null,
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.user,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        // user: action.user,
      };
    case "GET_CUSTOMER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
          token: state.user.access_token,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
export default LoginReducer;
