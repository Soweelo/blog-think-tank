import "./auth.scss";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useRef, useState, useContext } from "react";
import { Mail, Lock } from "@material-ui/icons";
import { loginCall } from "../../context functions/apiCalls";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from "@material-ui/core";
import sha512 from "../../functions/sha512";

const CloseAuthButton = styled(MdClose)`
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

const LoginContent = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
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
export default function Login({ switchContent, setShowAuth }) {
  const email = useRef();
  const password = useRef();
  const [message, setMessage] = useState("");
  const { isFetching, dispatch } = useContext(UserContext);
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    let hashedPsw = await sha512(password.current.value);
    // console.log(email.current.value, hashedPsw);
    await loginCall(
      { email: email.current.value, password: hashedPsw },
      dispatch
    );
  };
  return (
    <LoginContent>
      <form onSubmit={handleLoginSubmit}>
        <div className="login__input-wrapper">
          <h1>LOGIN</h1>

          <div className="login__input-container">
            <Mail />
            <StyledInput
              className="input-field"
              type="email"
              placeholder="Enter email"
              ref={email}
              required
            />
          </div>

          <div className="login__input-container">
            <Lock />
            <StyledInput
              className="input-field"
              type="password"
              placeholder="Password"
              ref={password}
              minLength="5"
              maxLength="25"
              required
            />
          </div>

          <button
            className="btn login__btn-submit"
            type="submit"
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress color="secondary" size="20px" />
            ) : (
              "Log In"
            )}
          </button>
          <div className="login__message--error">{message}</div>
          <div className="login__forgoten-psw" disabled={isFetching}>
            Forgotten password? <span>Click-here</span>!
          </div>
        </div>

        <div
          className=" login__btn-switch"
          onClick={switchContent}
          disabled={isFetching}
        >
          Still not a Member? REGISTER HERE !
        </div>
      </form>
      <CloseAuthButton
        aria-label="Close Login"
        onClick={() => setShowAuth((prev) => !prev)}
        disabled={isFetching}
      ></CloseAuthButton>
    </LoginContent>
  );
}
