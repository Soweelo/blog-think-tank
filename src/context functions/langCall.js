export const langSetter = (lang, dispatch) => {
  dispatch({ type: "LANG_SUCCESS", payload: lang });
};
