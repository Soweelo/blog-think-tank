import Intro from "./components/intro/Intro"
import Topbar from "./components/topbar/Topbar"
import './app.scss';
import Bottombar from "./components/bottomBar/Bottombar";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";

import BePart from "./components/bePart/BePart";
import {useState, useRef, useEffect} from 'react'
import MainMenu from "./components/mainMenu/MainMenu"

import styled from "styled-components";


function App() {

    const[mainMenuOpen, setMainMenuOpen] = useState(false)
    const[homeContent,setHomeContent] = useState("0")
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
   
    const SectionMain = styled.div`
background-image: url("${PF}/app/public/4.jpg");
`
    useEffect(() =>{

    },[mainMenuOpen,homeContent, setHomeContent]
)

  
  return (
    <div className="app">
        <Topbar homeContent={homeContent} setHomeContent={setHomeContent}/>
        <SectionMain className="sections" >

            {/*<OnePageContent omeContent={homeContent} setHomeContent={setHomeContent}/>*/}
            {(() => {switch(homeContent){
            case "1":
                return <MoreAbout/>
            case "2":
                return <Privacy />

            case "3":
                return  <Faq />
           case "4":
                return    <BePart />

            default:
                return <Intro/>
        }
        })()}

        </SectionMain>


        <MainMenu mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} homeContent={homeContent} setHomeContent={setHomeContent} />
        <Bottombar mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} homeContent={homeContent} setHomeContent={setHomeContent}/>
    </div>
  );
}

export default App;
