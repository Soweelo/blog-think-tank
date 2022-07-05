export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const LogoutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
  payload: null,
});

export const updateFavorites = (user) =>({
  type:"FAVORITES_UPDATE",
  payload:user,
})