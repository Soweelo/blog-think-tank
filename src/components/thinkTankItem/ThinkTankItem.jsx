import "./thinktankitem.scss"
import { Favorite, Share, Create } from "@material-ui/icons";
import {useState, memo, useMemo} from 'react';
// import Modal from "../modal/Modal"

export default memo(function ThinkTankItem ({id, image,message,tags,url,text, date,showModal, setShowModal,modalVar,setModalVar}){

    const updateModalVar =  e => {
        setModalVar([image,message,tags,url,text,date])
        setShowModal(true)
        // console.log("show Modal vaut "+showModal)
    }

    return(
        <>
            <div  className="thinktankItem" onClick={(e) => updateModalVar()}>
                    <img src={"assets/mobile-"+image}  srcSet={`${"assets/mobile-"+image} 768w, ${"assets/"+image} 3200w`} alt={message}/>
                <div className="thinktankItem__tags">
                    {tags.map((p, index)=>(
                        <p key={index}>
                            #{tags[index].name}
                        </p>
                    ))}
                </div>
                <div className="thinktankItem__message">{message}</div>
                <div className="thinktankItem__url">{url}</div>
                <div className="thinktankItem__icons">
                    <div className="icon1"><Favorite/></div>
                    <div className="icon2"><Share/></div>
                    <div className="icon3"><Create/></div>
                </div>
            </div>

        </>

    )
})