import "./modal.scss";
import styled from "styled-components";
import {MdClose} from "react-icons/md";
import {useRef, useEffect, useCallback, useState} from "react";
import {useSpring, animated} from "react-spring";
import {Favorite, Share, Comment, Report} from "@material-ui/icons";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WritePostBtn from "../writePostBtn/WritePostBtn";


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
  display: grid;
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
                                  loadingModal,
                                  reported = false,
                                  setSelectedTags,
                                  setAccountContent,
                                  setHomeContent,
    setShowAuth,
                              }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [reportedPost, setReportedPost] = useState(reported);
    //lorsque la donnée de signalement d'un post sera délivrée par l'api, la récupérer dans le parent de ce composant et la faire passer dans cette prop "reported" (bool)
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
        // console.log("click sur le background. modalRef.urrent vaut  ")
        // console.log( modalRef.current )
        // console.log( "et e.target vaut ")
        // console.log(e.target)
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
        //call api and send it the new value of report (if it was true, send false, i it was false send true)
        setReportedPost(!reportedPost);
    };
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
                                                <div className="modal__reported"><span>reported</span></div>

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
                                <WritePostBtn setAccountContent={setAccountContent} setHomeContent={setHomeContent} setShowAuth={setShowAuth} modal={true} setShowModal={setShowModal}/>
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
