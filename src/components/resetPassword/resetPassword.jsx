import "./resetpassword.scss"
import {UserContext} from "../../context/UserContext";
import {useSpring, animated} from "react-spring";
import styled from "styled-components";

import {useContext, useEffect, useRef, useState} from "react";
import {Lock, Person} from "@material-ui/icons";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import {useFetch} from "../../hooks/useFetch";
import {MdClose} from "react-icons/md";
import sha512 from "../../functions/sha512";
import {loginCall, updatePassword, updateUser} from "../../context functions/apiCalls";

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

const ResetWrapper = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 21;
`;
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
export default function ResetPassword({showResetPassword, setShowResetPassword}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HOME = process.env.REACT_HOME_PUBLIC_FOLDER
    const {user,isFetching, dispatch, error} = useContext(UserContext);
    const [isFetchingTokenValidity, setIsFetchingTokenValidity] = useState(false) //fetch if token is valid
    const [message, setMessage] = useState("")
    const [errorTokenValidity, setErrorTokenValidity] = useState(false)
    const [successUpdated, setSuccessUpdated]=useState(false)
    const [resetEmail, setResetEmail] = useState("")
    const [resetToken, setResetToken] = useState("")
    const [resetUsername, setResetUsername] = useState("")
    const fetch = useFetch();
    const ResetRef = useRef();
    const password = useRef();
    const animation = useSpring({
        config: {
            duration: 150,
        },
        opacity: showResetPassword ? 1 : 0,
        transform: showResetPassword ? `translateY(0%)` : "translateY(-100%)",
    });
    const closeReset = (e) => {
        if (ResetRef.current === e.target) {
            setShowResetPassword(false);
        }
    };
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password:password.current.value,
                }),
            };
            let url = PF + "/api/members?token=" + resetToken;
            let res = await fetch(url, requestOptions).then((res) => res.json());
            console.log(res, password.current.value)
           if(res.success){
               const now = new Date();
               const expiryDate = now.getTime() + 31536000;
               res.data["expiry"] = expiryDate;
               updateUser(res.data,dispatch)
               console.log(res.data);
               setMessage(res.message)
               setSuccessUpdated(true)
           }else{
               setMessage(res.message)
           }
        } catch (e) {
            if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                console.error(e);
            }
        }
    }
    // console.log(user)
    const getUserBySessionToken = async () => {
        setIsFetchingTokenValidity(true)
        try {
            const response = await fetch(
                PF +
                "/api/members/session?token=" +
                resetToken
            ).then((r) =>
                r.json()
            );
            console.log(response)
            if (response.success) {
                setResetUsername(response.data.pseudo)
                setResetEmail(response.data.email)
                setIsFetchingTokenValidity(false)
                setMessage("")
            } else {
                setMessage(response.message)
                setErrorTokenValidity(true)
                setIsFetchingTokenValidity(false)
            }

        } catch (e) {
            if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                console.error(e);
            }
        }
    }
    useEffect(() => {
        let url = window.location.href
        console.log(url)
        if (url.includes("yworld3.com/?token=")) {
            let myArray = url.split("token=");
            setResetToken(myArray[1])
        } else {
            setShowResetPassword(false)
        }
    }, [])
    useEffect(() => {
        if (resetToken.length > 0) {
            getUserBySessionToken()
        }
    }, [resetToken])
    useEffect(()=>{
        if(successUpdated){
            console.log(successUpdated)
            setTimeout(()=>{
                window.location.href = "https://yworld3.com/"
                setShowResetPassword(false)
            },[5000])
        }
    },[successUpdated])
    return (
        <>
            {showResetPassword ? (
                <Background onClick={closeReset} className="background">
                    <animated.div
                        style={animation}
                        ref={ResetRef}
                        className="animated-div reset"
                    >
                        <ResetWrapper className="reset-wrapper">
                            {!isFetchingTokenValidity ?
                                (!errorTokenValidity ?
                                    (!successUpdated?
                                            <form onSubmit={handlePasswordSubmit}>
                                                <h1>Hi {resetUsername}</h1>
                                                <p>Reset your password here beneath</p>
                                                <div className="reset__input-container disabled">
                                                    <Person/>
                                                    <StyledInput
                                                        className="input-field"
                                                        type="text"
                                                        placeholder={resetEmail}
                                                        value={resetEmail}
                                                        required
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="reset__input-container">
                                                    <Lock/>
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
                                                    className="btn reset__btn-submit"
                                                    type="submit"
                                                    disabled={isFetching}
                                                >
                                                    {isFetching ? (
                                                        <CircularProgress color="secondary" size="20px"/>
                                                    ) : (
                                                        "Reset Password"
                                                    )}
                                                </button>


                                            </form>
                                        :   <div className="login__message--error"
                                                 style={{color: "green"}}>{message}</div>
                                    )

                                        : <div className="login__message--error">{message}</div>
                                )
                                : (
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                )
                            }
                            <CloseAuthButton
                                aria-label="Close Login"
                                onClick={() => setShowResetPassword((prev) => !prev)}
                                disabled={isFetching && isFetchingTokenValidity}
                            ></CloseAuthButton>
                        </ResetWrapper>
                    </animated.div>
                </Background>
            ) : null
            }
        </>

    )
};

