import "./topbar.scss";
import { Person, Favorite, Search, EmojiObjects, GTranslate  } from "@material-ui/icons";
import {useEffect, useState} from 'react';
import axios from "axios";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default function Topbar({homeContent, setHomeContent, lang, setLang}) {
    const [isOpenedGT, setIsOpenedGT]= useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [allLang, setAllLang] = useState([])

    function dataLangToArray(data){
        const result = []
        data.map((l) => {
            result.push({value:l.code, label: l.original_name})
        })
        return result
    }


    function setLangAndCookieLang(option){
        setLang(option)
        document.cookie = "lang=" + option + "; SameSite=Lax; Secure"
    }

    useEffect(() => {
        const getLangs = async () =>{
            const answ = await axios
                .get(PF +"/api/langs")
           setAllLang(answ.data.data)
        }
        getLangs()
    },[])





   const options = dataLangToArray(allLang)
    return (
        <div className="topbar">
            <div className="wrapper">
                <div className="heading-left">
                    <p onClick={()=>{setHomeContent(0)}} className="heading-left__item">Your world 3.0</p>
                    {/*<div className=" heading__item siteName">BLOG</div>*/}
                </div>
                <div className="heading-center__item foster"> Read your favorite think tanks / <span>Create yours</span> </div>
                <div className="nav">
                    <div className="nav__link"><Favorite/></div>
                    <div className="nav__link"><Search/></div>
                    <div className="nav__link"><Person/></div>
                    <Dropdown options={options}  value={lang} placeholder={lang} onChange={(e) => setLangAndCookieLang(e.value)} className="nav__link-GT-input"/>
                    <div className={"nav__link "+ (isOpenedGT && "active")} onClick={() => setIsOpenedGT(!isOpenedGT)}><GTranslate/>


                    </div>
                </div>
            </div>
        </div>
    );
}