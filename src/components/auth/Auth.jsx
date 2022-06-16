import "./auth.scss";
import { useRef, useEffect, useCallback, useState, useContext } from "react";
import { useSpring, animated } from "react-spring";
import { UserContext } from "../../context/UserContext";
import Login from "./Login";
import Register from "./Register";
import styled from "styled-components";
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

export default function Auth({
  showAuth,
  setShowAuth,
  setHomeContent,
  registerContent,
  setRegisterContent,
}) {
  const LoginRef = useRef();
  const { user } = useContext(UserContext);
  const animation = useSpring({
    config: {
      duration: 150,
    },
    opacity: showAuth ? 1 : 0,
    transform: showAuth ? `translateY(0%)` : "translateY(-100%)",
  });
  const [isClicked, setIsClicked] = useState(false);
  const closeAuth = (e) => {
    if (LoginRef.current === e.target) {
      setShowAuth(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showAuth) {
        setShowAuth(false);
        setIsClicked(false);
      }
    },
    [setShowAuth, showAuth, setIsClicked]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  function switchContent() {
    setRegisterContent(!registerContent);
  }

  useEffect(() => {
    if (user) {
      setShowAuth(false);
      setHomeContent("5");
    }
  }, [user]);
  return (
    <>
      {showAuth ? (
        <Background onClick={closeAuth} className="backgtound">
          <animated.div
            style={animation}
            ref={LoginRef}
            className="animated-div auth"
          >
            <LoginWrapper showAuth={showAuth} className="login-wrapper">
              {!registerContent && (
                <Login
                  switchContent={switchContent}
                  setShowAuth={setShowAuth}
                  isDisplayed={!registerContent}
                />
              )}
              {registerContent && (
                <Register
                  switchContent={switchContent}
                  setShowAuth={setShowAuth}
                  isDisplayed={registerContent}
                />
              )}
            </LoginWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
}
