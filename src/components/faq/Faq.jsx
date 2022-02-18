import "./faq.scss"
import BackHomeButton from "../backHomeButton/BackHomeButton"
import {useEffect, useState} from "react";
import axios from "axios";

export default function Faq({lang}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [option_faq_title, setOption_faq_title]=useState("")
    const [option_faq_text, setOption_faq_text]=useState("")

    useEffect(() =>{
        const getOptions = async (key) => {
            const faq_title = await axios.get(PF +"/api/options/getByKey?lang="+lang+"&key=05_faq" )
            const faq_text = await axios.get(PF +"/api/options/getByKey?lang="+lang+"&key=04_faq" )

            setOption_faq_title(faq_title.data.data.value)
            setOption_faq_text(faq_text.data.data.value)



        }

        if( lang.length !== 0){
            getOptions()
        }
        // console.log("useffect  de topbar", "lang", lang,"bottomContent",bottomBarContent,"topbar:",topBarContent )
    },[lang])
    return(
        <div id="faq">
            <BackHomeButton/>
            <h1>{option_faq_title}</h1>
            <div dangerouslySetInnerHTML={{ __html: option_faq_text }} className="faq__para-container">

            </div>
        </div>
    )
}