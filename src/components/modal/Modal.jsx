import "./modal.scss";
import styled from "styled-components";
import {MdClose} from "react-icons/md";
import {useRef, useEffect, useCallback, useState, useContext} from "react";
import {useSpring, animated} from "react-spring";
import {Favorite, Share, Comment, Report} from "@material-ui/icons";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WritePostBtn from "../writePostBtn/WritePostBtn";
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
  z-index: 21;
`;

const ModalWrapper = styled.div`
  width: min(800px, 90%);
  height: min(400px, 90vh);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 21;
  border-radius: 10px;
`;

const ModalImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  position: relative;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
  }
`;

const ModalContent = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  overflow-y: scroll;
  padding: 1rem 0 0 0;
  scrollbar-width: thin;
  scrollbar-color: #fff0 #fff0;
  position: relative;
  h1 {
    line-height: 2rem;
  }
  .iconsRight {

    position: relative;
    height: 100%;
    padding: 1rem 0;
    transition: all 0.2s ease-in;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: end;
    z-index: 1500;

    .iconFav,
    .iconShare {
      margin-bottom: 1.2rem;
      padding: 5px;
      height: 25px;
      width: 30px;
      cursor: pointer;
      color: #b6b8de;
    }
    .iconFav{
    margin-bottom: 143%}
  }
    
  .tags {
    display: flex;
    flex-wrap: wrap;
    color: #b6b9e2;
    font-size: 14px;
    justify-content: center;
    margin:0 1rem;
    cursor:pointer
    p {
      padding: 0;
      margin: 0 1rem 0 0;
      &:hover{
      font-weight:bold;
      }
    }
    
  }
  .modal__textWrapper {
    margin: 0 0 1rem 1rem;
    max-height: 100%;
    padding: 0 1rem 0 0;
  }
  a {
    padding: 10px 24px;
    background: transparent;
    color: black;
    border: 1px solid black;
    border-radius: 20px;
    -webkit-text-decoration: none;
    text-decoration: none;
    margin: 0 auto 1rem;
    text-align: center;
    max-width: 180px;
    transition: all 0.1s ease-in;
  }
  a:hover {
    font-weight: bolder;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .modal__bottom {
    .iconComm {
       height: 25px;
      width: 30px;
      cursor: pointer;
      color: #b6b8de;
      margin-right: 10px;
      position: absolute;
      display: flex;
      justify-content: end;
    }
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: #b6b9e2;
`;

export default function Modal({
                                  showModal,
                                  setShowModal,
                                  images,
                                  tags,
                                  title,
                                  url,
                                  text,
                                  date,
                                  id,
                                  loadingModal,
                                  setSelectedTags,
                                  setAccountContent,
                                  setHomeContent,
                                  setShowAuth,

                              }) {
    const {user} = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [reportedPost, setReportedPost] = useState(false);
    const [loadingReport, setLoadingReport] = useState(false)
    const [reportMessage, setReportMessage] = useState("")
    const modalRef = useRef();
    const reportRef = useRef();
    // console.log(reportRef);
    const animation = useSpring({
        config: {
            duration: 450,
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : "translateY(-100%)",
    });
    const [isClicked, setIsClicked] = useState(false);
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal) {
                setShowModal(false);
                // console.log(text);
                setIsClicked(false);
            }
        },
        [setShowModal, showModal, setIsClicked]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);
    //reporting a post

    const reportPost = (e) => {
        e.preventDefault();
        console.log("click")
        if (user) {
            setLoadingReport(true)
            console.log("user")
        } else {
            console.log("no user")
            setReportedPost(true)
           setReportMessage("Please loggin to report")
        }

    };
    useEffect(() => {
        if (showModal) {
            setReportedPost(false);
            setReportMessage("")
        }
    }, [showModal])
    useEffect(() => {
        const getModalReport = async () => {

            try {
                let formData = new FormData();
                formData.append("token", user.session);
                formData.append("post_id", id);
                const requestOptions = {
                    method: "POST",
                    body: formData,
                };
                let url = PF + "/api/reportings/store"
                let res = await fetch(url, requestOptions).then((res) => res.json())
                console.log(res)
                if (res.success) {
                    setReportedPost(true)
                    setReportMessage("reported")
                } else {
                    console.log(res.message)
                    if (res.message == "Member already does reporting for this post") {
                        setReportedPost(true)
                        setReportMessage("Already reported!")
                    }else{
                        setReportedPost(true)
                        setReportMessage("This post was deleted")
                    }
                }
                setLoadingReport(false);
            } catch (e) {
                if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                    console.error(e);
                }
            }
        };
        if (loadingReport) {
            //    call url api with session token and id
            //    --> if success set reported to true
            //    --> if failure "you already signaled this post
            getModalReport()
        }
    }, [loadingReport])
    // console.log(date);
    const handleClickOnTag = (e) => {
        setSelectedTags([e])
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} className="backgtound">
                    {!loadingModal ? (
                        <animated.div
                            style={animation}
                            ref={modalRef}
                            className="animated-div"
                        >
                            <ModalWrapper showModal={showModal} className="modal-wrapper">
                                <ModalImgWrapper className="modal-img-wrapper">
                                    {images ? (
                                        <img
                                            src={PF + "/" + images.small}
                                            srcSet={`${PF + "/" + images.thumb} 768w, ${
                                                PF + "/" + images.small
                                            } 3200w`}
                                            alt={title}
                                        />
                                    ) : (
                                        <img
                                            src={
                                                PF +
                                                "/storage/app/public/your-world-3-0-default-black-background.jpeg"
                                            }
                                            alt={title}
                                        />
                                    )}
                                </ModalImgWrapper>

                                <ModalContent className="modal-content">
                                    <h1>{title}</h1>
                                    <div className="tags">
                                        {tags.map((p, index) => (
                                            <p key={index}
                                               onClick={() => handleClickOnTag(tags[index])}>#{tags[index]}</p>
                                        ))}
                                    </div>
                                    <p className="modal__date">
                                        <CalendarTodayIcon/>
                                        {date}
                                    </p>
                                    <div
                                        className="modal__textWrapper"
                                        dangerouslySetInnerHTML={{__html: text}}
                                    ></div>
                                    {url !== 0 && (
                                        <div className="modal__button-wrapper">
                                            <a href={url} target="blank">
                                                See website
                                            </a>
                                        </div>
                                    )}
                                    <div className="modal__bottom">
                                        <div className="iconsLeft">
                                            <div
                                                className={"modal__report-wrapper " + (reportedPost
                                                    ? "reported"
                                                    : "")
                                                }
                                                title={
                                                    reportedPost
                                                        ? "You reported this Post"
                                                        : "Report this Post"
                                                }
                                                onClick={(e) => reportPost(e)}
                                            >


                                                <Report className="report-icon"/>
                                                <div className="modal__reported"><span>{reportMessage}</span></div>

                                            </div>
                                        </div>
                                        <div className="iconsRight">
                                            <div className="iconShare">
                                                <Share/>
                                            </div>
                                            <div className="iconFav">
                                                <Favorite/>
                                            </div>
                                            <div
                                                onClick={() => setIsClicked(!isClicked)}
                                                className={"iconComm  " + (isClicked && "expand")}
                                            >
                                                <Comment/>
                                                <div className="icon--tocome">...coming soon!</div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="modal__bottom-ref" ref={reportRef}></div>
                                </ModalContent>
                                <CloseModalButton
                                    aria-label="Close modal"
                                    onClick={() => setShowModal((prev) => !prev)}
                                ></CloseModalButton>
                            </ModalWrapper>
                            <div className="modal__WritePostBtnContainer">
                                <WritePostBtn setAccountContent={setAccountContent} setHomeContent={setHomeContent}
                                              setShowAuth={setShowAuth} modal={true} setShowModal={setShowModal}/>
                            </div>
                        </animated.div>
                    ) : (
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                </Background>
            ) : null}
        </>
    );
}
