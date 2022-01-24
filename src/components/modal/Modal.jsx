import "./modal.scss";
import styled from "styled-components";
import { MdClose } from 'react-icons/md';
import {useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring'
import { Favorite, Share, Create } from "@material-ui/icons";

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
export default function Modal({showModal , setShowModal, image, tags, message, url}) {
    const modalRef  = useRef()
    const animation = useSpring({
        config: {
            duration: 150
        },
        opacity: showModal ? 1 :0,
        transform: showModal ? `translateY(0%)` : 'translateY(-100%)',
     
    })

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
                // console.log('I pressed');
            }
        },
        [setShowModal, showModal]
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
                                <img src={"assets/"+image} alt={message}/>
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
                                    <div className="icon3"><Create/></div>
                                </div>

                            </ModalImgWrapper>

                            <ModalContent className="modal-content">
                                <h1>{message}</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
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