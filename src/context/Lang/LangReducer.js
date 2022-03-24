const LangReducer = (state, action) => {
  switch (action.type) {
    case "LANG_SUCCESS":
      return {
        lang: action.payload,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};
export default LangReducer;
