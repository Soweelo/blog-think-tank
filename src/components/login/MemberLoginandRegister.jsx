import "./memberloginandregister.scss";

import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Person, Mail, Lock } from "@material-ui/icons";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useFetch } from "../../hooks/useFetch";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 21;
`;

const LoginWrapper = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 21;
`;

const CloseLoginButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  border-radius: 50%;
  background-color: #eeeeeec9;
`;
const LoginFloat = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;
const LoginContent = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  // overflow-y:scroll;
  padding:1rem;

    scrollbar-width: thin;
  scrollbar-color: #fff0 #fff0;
  
  h1{
  line-height: 2rem;
  }
  p {
    margin-bottom: 1rem;
    
  }
  a {
       padding: 10px 24px;
    background: transparent;
    color: black;
    border: 1px solid black;
    border-radius: 20px;
    -webkit-text-decoration: none;
    text-decoration: none;
    margin: 1rem auto;
    text-align: center;
    max-width: 180px;
    transition: all 0.1s ease-in;
  }
  a:hover{
  font-weight:bolder;
  background-color: rgba(0,0,0,0.1);
`;
// Styling a regular HTML input
const StyledInput = styled.input`
  display: block;
  margin: 0;
  border: none;
  padding: 0 0 0 0.5rem;
  background-color: black;
  opacity: 0.8;
  color: white;
  height: 40px;
`;
export default function MemberLoginandRegister({
  showLogin,
  setShowLogin,
  session,
  setSession,
  setHomeContent,
  setIsValidToken,
  isValidToken,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [registerContent, setRegisterContent] = useState(false);
  const LoginRef = useRef();
  const fetch = useFetch();
  const animation = useSpring({
    config: {
      duration: 150,
    },
    opacity: showLogin ? 1 : 0,
    transform: showLogin ? `translateY(0%)` : "translateY(-100%)",
  });
  const [isClicked, setIsClicked] = useState(false);
  const closeLogin = (e) => {
    if (LoginRef.current === e.target) {
      setShowLogin(false);
    }
    // console.log("click sur le background. LoginRef.urrent vaut  ")
    // console.log( LoginRef.current )
    // console.log( "et e.target vaut ")
    // console.log(e.target)
  };
  function setCookieSession(option1, option2) {
    document.cookie =
      "YW-session-token=" + option1 + "; SameSite=Lax; Secure;max-age=7200";
    document.cookie =
      "YW-session-pseudo=" + option2 + "; SameSite=Lax; Secure;max-age=7200";
  }
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showLogin) {
        setShowLogin(false);
        // console.log(text);
        setIsClicked(false);
      }
    },
    [setShowLogin, showLogin, setIsClicked]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  function switchContent() {
    setRegisterContent(!registerContent);
    setMessageLogin("");
    setMessageRegister("");
  }
  const loginEmail = useRef();
  const regEmail = useRef();
  const loginPassword = useRef();
  const regPassword = useRef();
  const regUsername = useRef();
  const [messageLogin, setMessageLogin] = useState("");
  const [messageRegister, setMessageRegister] = useState("");

  function sha512(str) {
    return crypto.subtle
      .digest("SHA-512", new TextEncoder("utf-8").encode(str))
      .then((buf) => {
        return Array.prototype.map
          .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
          .join("");
      });
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: regUsername.current.value,
        email: regEmail.current.value,
        password: regPassword.current.value,
      }),
    };
    const url = PF + "/api/members";
    try {
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success) {
        setSession([data.data.session, data.data.pseudo]);
        setCookieSession(data.data.session, data.data.pseudo);
        setIsValidToken(true);

        setShowLogin(false);
        setHomeContent("5");
      } else {
        setMessageRegister("Password or email not valid");
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      let hashedPsw = await sha512(loginPassword.current.value);
      const url = await (PF +
        "/api/members?email=" +
        loginEmail.current.value +
        "&password=" +
        hashedPsw);

      const response = await fetch(url)
        .then((r) => r.json())
        .catch((error) => console.log("Form submit error", error));
      const data = await response;
      console.log(response, loginEmail.current.value, url, hashedPsw);
      if (data.success) {
        setSession([data.data.session, data.data.pseudo]);
        setCookieSession(data.data.session, data.data.pseudo);
        setShowLogin(false);
        setHomeContent("5");
        setIsValidToken(true);
      } else {
        setMessageLogin("Password or email not valid");
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  return (
    <>
      {showLogin ? (
        <Background onClick={closeLogin} className="backgtound">
          <animated.div
            style={animation}
            ref={LoginRef}
            className="animated-div"
          >
            <LoginWrapper showLogin={showLogin} className="login-wrapper">
              <LoginContent className={registerContent && "d-none"}>
                <form onSubmit={handleLoginSubmit}>
                  <div className="login__input-wrapper">
                    <h1>LOGIN</h1>

                    <div className="login__input-container">
                      <Mail />
                      <StyledInput
                        className="input-field"
                        type="email"
                        placeholder="Enter email"
                        ref={loginEmail}
                        required
                      />
                    </div>

                    <div className="login__input-container">
                      <Lock />
                      <StyledInput
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        ref={loginPassword}
                        minLength="5"
                        maxLength="25"
                        required
                      />
                    </div>

                    <button className="btn login__btn-submit" type="submit">
                      Login
                    </button>
                    <div className="login__message--error">{messageLogin}</div>
                    <div className="login__forgoten-psw">
                      Forgotten password? <span>Click-here</span>!
                    </div>
                  </div>

                  <div className=" login__btn-switch" onClick={switchContent}>
                    Still not a Member? REGISTER HERE !
                  </div>
                </form>
                <CloseLoginButton
                  aria-label="Close Login"
                  onClick={() => setShowLogin((prev) => !prev)}
                ></CloseLoginButton>
              </LoginContent>
              <LoginContent className={!registerContent && "d-none"}>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="login__input-wrapper">
                    <h1>REGISTER NOW</h1>
                    <div className="login__input-container">
                      <Person />
                      <StyledInput
                        className="login__input-field"
                        type="text"
                        placeholder="Username"
                        name="usrnm"
                        ref={regUsername}
                        required
                        minLength="3"
                      />
                    </div>

                    <div className="login__input-container">
                      <Mail />
                      <StyledInput
                        className="input-field"
                        type="email"
                        placeholder="Email"
                        name="email"
                        ref={regEmail}
                        required
                      />
                    </div>

                    <div className="login__input-container">
                      <Lock />
                      <StyledInput
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        ref={regPassword}
                        minLength="5"
                        maxLength="25"
                        required
                      />
                    </div>

                    <button className="btn login__btn-submit" type="submit">
                      Register
                    </button>
                    <div className="login__message--error">
                      {messageRegister}
                    </div>
                  </div>

                  <div className=" login__btn-switch" onClick={switchContent}>
                    Already Member? LOGIN HERE !
                  </div>
                </form>
                <CloseLoginButton
                  aria-label="Close Login"
                  onClick={() => setShowLogin((prev) => !prev)}
                ></CloseLoginButton>
              </LoginContent>
            </LoginWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
}
