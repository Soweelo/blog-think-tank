import "./auth.scss";
import styled from "styled-components";
import {MdClose} from "react-icons/md";
import {useRef, useState, useContext, useEffect} from "react";
import {Mail, Lock, Person} from "@material-ui/icons";
import {loginCall} from "../../context functions/apiCalls";
import {UserContext} from "../../context/UserContext";
import {CircularProgress} from "@material-ui/core";
import sha512 from "../../functions/sha512";

const CloseAuthButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 13;
  border-radius: 50%;
  background-color: #eeeeeec9;
`;

const RecoveryContent = styled.div`
    z-index:12
    position:absolute;
    top:0;
    left:0;
    right:0;
    height:100%;
    width:100%
    box-sizing:border-box;
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
   scrollbar-width: thin;
  scrollbar-color: #fff0 #fff0;
  padding: 0 5px;
  max-width:100vw;

    h1{
  line-height: 2rem;
  font-size:24px;
  
  }
  h2{
  font-size:16px;
  line-height:1.5rem;
  font-weight:400;
  text-align:center;
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
export default function Recover({setRecoveryContent,recoveryContent}) {
    const email = useRef();

    const [message, setMessage] = useState("");
    const {isFetching, dispatch, error} = useContext(UserContext);
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

    };
    useEffect(() => {
        if (error) {
            setMessage(" Please check your username/password.")
        }
    }, [error])
    useEffect(()=>{
      setMessage("")  ;
    },[])

    return (
        <RecoveryContent>
            <div className="recover__wrapper">
                <form onSubmit={handleLoginSubmit}>
                    <div className="recover__input-wrapper ">
                        <h1>Password Recovery</h1>
                        <h2>Enter your user's account email and we will send you a password reset link.</h2>
                        <div className="recover__input-container re">
                            <Person/>
                            <StyledInput
                                className="input-field"
                                type="text"
                                placeholder="Email"
                                ref={email}
                                required
                            />
                        </div>

                        <button
                            className="btn recover__btn-submit"
                            type="submit"
                            disabled={isFetching}
                        >
                            {isFetching ? (
                                <CircularProgress color="secondary" size="20px"/>
                            ) : (
                                "Recover"
                            )}
                        </button>
                        <div className="recover__message--error">{message}</div>

                    </div>

                </form>
            </div>

            <CloseAuthButton
                aria-label="Close Login"
                onClick={()=>{setRecoveryContent(false)}}
                disabled={isFetching}
            ></CloseAuthButton>
        </RecoveryContent>
    );
}
