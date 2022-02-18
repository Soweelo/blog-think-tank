import "./privacy.scss"
import BackHomeButton from "../backHomeButton/BackHomeButton"
import {useEffect, useState} from "react";
import axios from "axios";

export default function Privacy({lang}){

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [option_privacy_title, setOption_privacy_title]=useState("")
    const [option_privacy_text, setOption_privacy_text]=useState("")

    useEffect(() =>{
        const getOptions = async (key) => {
            const privacy_title = await axios.get(PF +"/api/options/getByKey?lang="+lang+"&key=05_privacy" )
            // const privacy_text = await axios.get(PF +"/api/options/getByKey?lang="+lang+"&key=04_privacy" )

            setOption_privacy_title(privacy_title.data.data.value)
            // setOption_privacy_text(privacy_text.data.data.value)



        }

        if( lang.length !== 0){
            getOptions()
        }
        // console.log("useffect  de topbar", "lang", lang,"bottomContent",bottomBarContent,"topbar:",topBarContent )
    },[lang])
    return(
        <div id="privacy">
            <BackHomeButton/>
            <h1>{option_privacy_title}</h1>
            {/*<div dangerouslySetInnerHTML={{ __html: option_privacy_text }} className="privacy__para-container">*/}
            {/*    <p>*/}

            {/*    </p>*/}
            {/*</div>*/}
        </div>
    )
}