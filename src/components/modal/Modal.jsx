import "./modal.scss";
import styled from "styled-components";
import { MdClose } from 'react-icons/md';
import {useRef, useEffect, useCallback, useState} from 'react';
import {useSpring, animated} from 'react-spring'
import { Favorite, Share, Comment} from "@material-ui/icons";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';



const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top:0;
  right:0;
  z-index:21;
`;

const ModalWrapper = styled.div`
  width: min(800px , 90%);
  height: min(500px , 90%);
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
  position:relative;
   overflow: hidden;
  
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
   
  }
  .tags{
    position:absolute;
    bottom: 0;
    right:0;
    color:white;
    padding:1rem;
  }
  .icons{
    position: absolute;
    left: 0;
    top:0;
    height: calc(100% - 2rem);
    padding: 1rem;
    transition: all 0.2s ease-in;
    color:white;
   
    
    .icon1, .icon2{
      margin-bottom: 1rem;
box-shadow: -5px 5px 7px rgba(22,22,22,0.29);
padding: 5px;
background-color: #52525224;
border-radius: 50%;
height: 25px;
width: 30px;
text-align: center;
cursor:pointer;
    }
    .icon3{
      position: absolute;
      bottom:  1rem;
      box-shadow: -5px 5px 7px rgba(22,22,22,0.29);
padding: 5px;
background-color: #52525224;
border-radius: 50%;
height: 25px;
width: 30px;
text-align: center;
cursor:pointer
    }
   }

`;

const ModalContent = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  overflow-y:scroll;
  padding:1rem;
  margin: 1rem;
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

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  border-radius: 50%;
   background-color: #eeeeeec9;
`;
const ModalFloat= styled.div`
    position: absolute;
    left: 0;
    top:0;
`
;
export default function Modal({showModal , setShowModal, image, tags, message, url, text, date}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const modalRef  = useRef()
    const animation = useSpring({
        config: {
            duration: 150
        },
        opacity: showModal ? 1 :0,
        transform: showModal ? `translateY(0%)` : 'translateY(-100%)',
     
    })
    const[isClicked, setIsClicked] = useState(false)
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
        // console.log("click sur le background. modalRef.urrent vaut  ")
        // console.log( modalRef.current )
        // console.log( "et e.target vaut ")
        // console.log(e.target)
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                // console.log(text);
               setIsClicked(false)

            }
        },
        [setShowModal, showModal, setIsClicked,isClicked]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );




    return (
        <>
            {showModal ? (
                <Background onClick={closeModal}  className="backgtound">
                    <animated.div style={animation}  ref={modalRef} className="animated-div">
                        <ModalWrapper  showModal={showModal} className="modal-wrapper">
                            <ModalImgWrapper className="modal-img-wrapper">
                                <img src={PF +"/uploads/thumbs/mobile-"+image} srcSet={`${PF + "/uploads/thumbs/mobile-"+image} 768w, ${PF + "/uploads/"+image} 3200w`} alt={message}/>
                                <div className="tags">
                                        {tags.map((p, index)=>(
                                            <p key={index}>
                                                #{tags[index].name}
                                            </p>
                                        ))}
                                </div>
                                <div className="icons">
                                    <div className="icon1"><Favorite/></div>
                                    <div className="icon2"><Share/></div>
                                    <div  onClick={() => setIsClicked(!isClicked) } className={"icon3  "+ (isClicked && "expand")}>
                                        <Comment/>
                                        <div    className="icon--tocome">...coming soon!</div>
                                    </div>
                                </div>

                            </ModalImgWrapper>

                            <ModalContent className="modal-content">
                                <h1>{message}</h1>
                                <p className="modal__date"><CalendarTodayIcon/>{date}</p>
                                <p dangerouslySetInnerHTML={{ __html: text }}>
                                </p>
                                <a href={"https://"+url} target="blank" >See website</a>
                                <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev =>!prev)}></CloseModalButton>

                            </ModalContent>
                      </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}

        </>

    );
}