import "./memberloginandregister.scss";

import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Person, Mail, Lock } from "@material-ui/icons";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

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
  overflow-y:scroll;
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
export default function MemberLoginandRegister({ showLogin, setShowLogin }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const LoginRef = useRef();
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
              <LoginContent>
                <form action="">
                  <div className="login__input-wrapper">
                    <h1>REGISTER NOW</h1>
                    <div className="login__input-container">
                      <Person />
                      <StyledInput
                        className="login__input-field"
                        type="text"
                        placeholder="Username"
                        name="usrnm"
                        placeholder="Username"
                      />
                    </div>

                    <div className="login__input-container">
                      <Mail />
                      <StyledInput
                        className="input-field"
                        type="text"
                        placeholder="Email"
                        name="email"
                      />
                    </div>

                    <div className="login__input-container">
                      <Lock />
                      <StyledInput
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        name="psw"
                      />
                    </div>
                    <button className="btn login__btn-submit">Register</button>
                  </div>

                  <div className=" login__btn-switch">
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
