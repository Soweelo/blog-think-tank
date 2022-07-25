import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useSpring, animated} from "react-spring";
import {MdClose} from "react-icons/md";
import {logout} from "../../context functions/apiCalls";
import {UserContext} from "../../context/UserContext";

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
  z-index: 23;
`;
const CloseSharePostButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 2000;
  color: #b6b9e2;
`;
const SharePostWrapper = styled.div`
    min-width: 300px;
    min-height:250px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  position: relative;
  border-radius: 10px;
    z-index: 21;
    padding:1rem;
`;
const SharePostTitle = styled.div`
    font-size:20px;
    color: #2f2f2f;  
    font-weight:700;
    padding: 1rem 0.5rem;
`;
const LoginMessage = styled.div`
        color: #b6b9e2;
      text-align: center;
      cursor: pointer;
      padding: 10px 5px;
      font-size: 15px;
`
const SuccessMessage = styled.div`
font-size: 0.9rem;
color: rgba(0, 128, 0, 0.65);
margin-top: 1rem;
`
const ErrorMessage = styled.div`
font-size: 0.9rem;
color: rgba(255, 0, 0, 0.26);
margin-top: 1rem;
`
const LdsRing = styled.div`
 transform: none!important;
          right: unset!important;
          top: unset!important;
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: 2rem;
     
          div{
          position:absolute;
            height: 20px;
            width: 20px;
            border-width: 4px ;
            border: 5px solid grey;
            border-color: grey transparent transparent transparent!important;
          }
`
const SharePostInput = styled.input`
padding: 7px 10px;
`
const ShareBtnSubmit = styled.button`
margin-top:1rem;
border-color:black!important;
width:7rem;
cursor:pointer;
transition: all 0.2s ease-in;
&:hover{
background-color:#e5e5e5;
`

export default function SharePost({setSharePosteOpened, sharePostOpened, postId, setShowModal, setShowAuth}) {
    const {user, dispatch} = useContext(UserContext);
    const animation = useSpring({
        config: {
            duration: 450,
        },
        opacity: sharePostOpened ? 1 : 0,
        transform: sharePostOpened ? `translateY(0%)` : "translateY(-100%)",
    });
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const refEmail = useRef();
    const sharePostRef = useRef();
    const [isLoading, setIsLoading] = useState(false)
    const [isEnterPressed, setIsEnterPressed] = useState(false)
    const [postSharedState, setPostSharedState] = useState("awaiting")
    const [postSharedMessage, setPostSharedMessage] = useState("")
    const closeSharePost = (e) => {
        if (sharePostRef.current === e.target) {
            setSharePosteOpened(false);
        }
    };
    const handleContentChange = (e) => {
        if (e.key === "Enter" && e.target.value.length > 0) {

            submitShare()
        }
    };
    const handleClick = () => {
        console.log("ok")
        if (refEmail.current.value.length > 0){
            console.log("right")
            submitShare()
        }
    }

    const submitShare = async () => {
        console.log("in submit")
        setIsLoading(true)
        try {
            const response = await fetch(
                PF + "/api/posts/" + postId + "/share?token=" + user.session + "&email=" + refEmail.current.value);
            const data = await response.json();
            if (data.success) {
                setPostSharedState("success")
    setPostSharedMessage(data.message)
            } else {
                setPostSharedState("error")
                setPostSharedMessage(data.message)
                if (data.message === "This session token is not valid") {
                    logout(dispatch);
                }
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e);
            setIsLoading(false)
        }

    }

    function openLoginInterface() {
        setSharePosteOpened(false)
        setShowModal(false)
        setShowAuth(true);
    }

    useEffect(() => {
        if (sharePostOpened) {
            setPostSharedState("awaiting")
            setIsEnterPressed(false)
            setPostSharedMessage("")
        }
    }, [sharePostOpened])
    return (
        <>
            {sharePostOpened ? (
                <Background onClick={closeSharePost} className="background">
                    <animated.div
                        style={animation}
                        ref={sharePostRef}
                        className="animated-div sharePostContainer"
                    >
                        <SharePostWrapper>
                            <SharePostTitle className="sharePost_title">Share this post</SharePostTitle>
                            {user ?

                                <>
                                    <SharePostInput type="email"
                                                    placeholder="Your friend's email"
                                                    ref={refEmail}
                                                    onKeyDown={(e) => handleContentChange(e)}/>
                                    <ShareBtnSubmit className="btn" disabled={isLoading} onClick={() => handleClick()}>
                                        {isLoading ?
                                            <LdsRing className="lds-ring">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </LdsRing> : "Share"
                                        }
                                    </ShareBtnSubmit>


                                    {postSharedState === "success" &&
                                    <SuccessMessage>Congratulation, you shared this post</SuccessMessage>}
                                    {postSharedState === "error" &&
                                    <ErrorMessage>{postSharedMessage}</ErrorMessage>}

                                </>


                                :
                                <LoginMessage onClick={() => openLoginInterface()}>Wanna share this post ? <br/> Please
                                    login</LoginMessage>}

                            <CloseSharePostButton
                                aria-label="Close modal"
                                onClick={() => setSharePosteOpened((prev) => !prev)}
                            ></CloseSharePostButton>
                        </SharePostWrapper>

                    </animated.div>
                </Background>
            ) : null}
        </>


    )
};

