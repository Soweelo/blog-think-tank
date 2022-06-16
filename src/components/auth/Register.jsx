import "./auth.scss";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useRef, useState, useContext } from "react";
import { Person, Mail, Lock } from "@material-ui/icons";
import { useFetch } from "../../hooks/useFetch";
import { loginRegister } from "../../context functions/apiCalls";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from "@material-ui/core";

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
  // overflow-y:scroll;
  padding:1rem;
    scrollbar-width: thin;
  scrollbar-color: #fff0 #fff0;
  max-width: 91vw;
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
export default function Register({ setShowAuth, switchContent, isDisplayed }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  const email = useRef();
  const password = useRef();
  const username = useRef();

  const [messageRegister, setMessageRegister] = useState("");
  const { isFetching, dispatch } = useContext(UserContext);
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    };
    const url = PF + "/api/members";
    try {
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success) {
        setShowAuth(false);
        loginRegister(data.data, dispatch);
      } else {
        setMessageRegister(data.message);
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  return (
    <LoginContent>
      <form onSubmit={handleRegisterSubmit}>
        <div className="login__input-wrapper">
          <h1>REGISTER NOW</h1>
          <div className="login__input-container">
            <Person />
            <StyledInput
              className="login__input-field"
              type="text"
              placeholder="Username"
              ref={username}
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
              "Register"
            )}
          </button>
          <div className="login__message--error">{messageRegister}</div>
        </div>

        <div
          className=" login__btn-switch"
          onClick={switchContent}
          disabled={isFetching}
        >
          Already Member?<span> LOGIN HERE </span>!
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
