import "./thinktankitem.scss"
import { Favorite, Share, Create, Comment } from "@material-ui/icons";
import {useState, memo, useMemo} from 'react';
// import Modal from "../modal/Modal"

export default memo(function ThinkTankItem ({id, images,title,tags,url,text, date,showModal, setShowModal,modalVar,setModalVar, brand}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const updateModalVar =  e => {
        setModalVar([images,title,tags,url,text,date, brand])
        setShowModal(true)
        console.log([images,title,tags,url,text,date])
    }

    return(
        <>
            <div  className="thinktankItem" onClick={(e) => updateModalVar()}>
                {
                    images ?
                        <img src={PF +"/"+images.small}  srcSet={`${PF +"/"+images.thumb} 768w, ${PF +"/"+images.small} 3200w`} alt={title}/>
                        :
                        <img src={PF +"/storage/app/public/4.jpg"}  alt={title}/>
                }


                <div className="thinktankItem__tags">
                    {tags.map((p, index)=>(
                        <p key={index}>
                            #{tags[index]}
                        </p>
                    ))}
                </div>
                <div className="thinktankItem__message">{title}</div>
                <div className="thinktankItem__url">{url}</div>
                <div className="thinktankItem__icons">
                    <div className="icon1"><Favorite/></div>
                    <div className="icon2"><Share/></div>
                    <div className="icon3"><Comment/></div>
                </div>
            </div>

        </>

    )
})
