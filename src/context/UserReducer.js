const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        lang: state.lang,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        lang: state.lang,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        lang: state.lang,
        isFetching: false,
        error: true,
      };

    case "LOGOUT_SUCCESS":
      return {
        user: null,
        lang: state.lang,
        isFetching: false,
        error: false,
      };
    case "LANG_SUCCESS":
      return {
        user: state.user,
        lang: action.payload,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};
export default UserReducer;
