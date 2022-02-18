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
   const [lang, setLang] = useState("")
    const SectionMain = styled.div`
background-image: url("${PF}/storage/app/public/4.jpg");
`

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

//     useEffect(() =>{
//
//     },[mainMenuOpen,homeContent, setHomeContent]
// )



    useEffect(() =>{
getCookie(lang)
        if(getCookie("lang").length == 0){
            setLang(navigator.language.substr(0,2))

            // console.log("nocookie")
        }else{
            setLang(getCookie("lang"))
            // console.log("there is a cookie, now lang is updates to", lang)
        }

        // console.log("lang: ",lang,"navigator:", navigator.language,"getCookielang",getCookie(lang).length)
    },[]
)
    // console.log("is there a cookie?",document.cookie, getCookie("lang"))
    // console.log(lang)
  return (
      <>
          <div className="app">
              <Topbar homeContent={homeContent} setHomeContent={setHomeContent} setLang={setLang} lang={lang} />
              <SectionMain className="sections" >

                  {/*<OnePageContent omeContent={homeContent} setHomeContent={setHomeContent}/>*/}
                  {(() => {switch(homeContent){
                      case "1":
                          return <MoreAbout/>
                      case "2":
                          return <Privacy  />

                      case "3":
                          return  <Faq  />
                      case "4":
                          return    <BePart/>

                      default:
                          return <Intro lang={lang} />
                  }
                  })()}

              </SectionMain>


              <MainMenu mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} homeContent={homeContent} setHomeContent={setHomeContent} />
              <Bottombar mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} homeContent={homeContent} setHomeContent={setHomeContent} />
          </div>

      </>


  );
}

export default App;
