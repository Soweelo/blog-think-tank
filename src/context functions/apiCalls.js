import axios from "axios";
import getCookie from "../functions/cookiesController/getCookie";

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
    const now = new Date();
    const expiryDate = now.getTime() + 31536000;

    res.data.data["expiry"] = expiryDate;
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });

  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
export const loginRegister = (userInfo, dispatch) => {
  dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });
};
export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT_SUCCESS" });
};
export const updateFavorites =(userInfo, dispatch)=>{
  localStorage.setItem("user", JSON.stringify(userInfo));
  dispatch({type:"FAVORITES_UPDATE" , payload: userInfo})
}