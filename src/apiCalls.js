import axios from "axios";
import getCookie from "./functions/cookiesController/getCookie";

export const loginCall = async (userCredential, dispatch) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.get(
      PF +
        "/api/members?email=" +
        userCredential.email +
        "&password=" +
        userCredential.password
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (e) {
    dispatch({ type: "LOGIN_FAILURE", payload: e });
  }
};
export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT_SUCCESS" });
};
