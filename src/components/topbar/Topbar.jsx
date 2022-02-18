import "./topbar.scss";
import { Person, Favorite, Search,  GTranslate  } from "@material-ui/icons";
import {useEffect, useState} from 'react';
import axios from "axios";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default function Topbar({homeContent, setHomeContent, lang, setLang}) {
    // const [isOpenedGT, setIsOpenedGT]= useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [allLang, setAllLang] = useState([])
   // console.log(topBarContent)


 const [option_header, setOption_header]=useState("")

    function dataLangToArray(data){
        const result = []

        data.map((l) => {
            result.push({value:l.code, label: l.original_name})
            return result
        })
        return result
    }

    function setLangAndCookieLang(option){
        setLang(option)
        document.cookie = "lang=" + option + "; SameSite=Lax; Secure"
    }

    function getFullname(all, code){
        let result =""
        all.map((l) => {
            if(l.code === code){
                result = l.original_name
                return result
            }
            return result
        })
        return result
    }


    useEffect(() => {

        const getLangs = async () =>{
            const answ = await axios
                .get(PF +"/api/langs")
           setAllLang(answ.data.data)

        }

        getLangs()

    },[PF])

function setName (){
    // console.log(lang, allLang)
    if(lang.length !== 0 && allLang.length !== 0){
            document.getElementsByClassName("Dropdown-placeholder")[0].innerHTML = getFullname(allLang,lang)
        }
}
setName()
   const options = dataLangToArray(allLang)


    useEffect(() =>{
        const getOptions = async (key) => {
            const header = await axios.get(PF +"/api/options/getByKey?lang="+lang+"&key=01_header" )
                setOption_header(header.data.data.value)
        }

        if( lang.length !== 0){
            getOptions()
        }

    },[lang])
    return (
        <div className="topbar">
            <div className="wrapper">
                <div className="heading-left">
                    <p onClick={()=>{setHomeContent(0)}} className="heading-left__item">Your world 3.0</p>
                    {/*<div className=" heading__item siteName">BLOG</div>*/}
                </div>
                <div className="heading-center__item foster"> { option_header}</div>
                <div className="nav">
                    <div className="nav__link"><Favorite/></div>
                    <div className="nav__link"><Search/></div>
                    <div className="nav__link"><Person/></div>
                    <div className="nav__link nav__link-GT-icon" ><GTranslate/></div>
                    <Dropdown options={options}  value={lang}   onChange={(e) => setLangAndCookieLang(e.value)} className="nav__link-GT-input" />

                </div>
            </div>
        </div>
    );
}