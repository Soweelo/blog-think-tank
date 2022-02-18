import "./menuitem.scss"
// import {useEffect, useRef, useState} from 'react';
// import { MdClose } from 'react-icons/md';
import AutoCSearchbar from "../autoCSearchBar/AutoCSearchbar";

export default function MenuItem({id, title, menuOpen, setMenuOpen,favorites, setFavorites,allTags,selectedTags, setSelectedTags}){

    const isCurrent =  id === menuOpen ? true :false
    // const setOpenToCenter = (e) =>{
    //     // console.log(e.nativeEvent.target)
    //     var el = e.nativeEvent.target
    //     el.scrollIntoView({block: "center"})
    // }
    // if(/Android [4-6]/.test(navigator.appVersion)) {
    //     window.addEventListener("resize", function() {
    //         if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
    //             window.setTimeout(function() {
    //                 document.activeElement.scrollIntoViewIfNeeded();
    //             },0);
    //         }
    //     })
    // }

    return(

        <li  className={"menu__item btn btn--dropdown " + (isCurrent && "active")}  >

            <div className="menu__item-wrapper" onClick={(e)=> isCurrent ? setMenuOpen(0) : setMenuOpen(id)  }>
                <div className="menu__item--title">{title}</div> <div className="menu__item--seeMore"onClick={(e)=> isCurrent ? setMenuOpen(0): setMenuOpen(id) }>{isCurrent ? "-": "+"}</div>
            </div>
            {(() => {switch(id){
                case 1:
                    return  <ul className="menu-how" >
                        <li >You can read and comment on your favorite subjects or create yours,<span >for free</span> , whoever you are. Post in your language, Google translation tools will automatically translate below the text. <br/>
                            Take note that any post must respect readers.
                        </li>
                        <li>
                            If you want to promote an idea, feel free to add your company link, artist link, designer link etc...for only 90€ per month.
                        </li>

                        <li className="hoverable">
                            <a href="#bepart"> More about how to create your subject.</a>
                        </li>

                    </ul>
                case 2:
                    return <ul className="menu-read" id="menu-read" >
                        <li>Type a tag below</li>

                        <li>
                            <AutoCSearchbar selectedItems={selectedTags} setSelectedItems={setSelectedTags} allItems={allTags} id={1}/>
                        </li>
                    </ul>


                case 3:
                    return <ul className="menu-fav">
                        <li className="hoverable">Remember my favorites - Create an account</li>
                        <li >Your favorites tags : </li>
                        <li>   <AutoCSearchbar selectedItems={favorites} setSelectedItems={setFavorites} allItems={allTags} id={2}/>
                        </li>

                    </ul>


                default:
                    return <ul className="menu-addYours">
                        <li className="hoverable">Create your account</li>
                        <li className="hoverable">Subscribe and become a poster</li>
                    </ul>
            }
            })()}

            {/*{entries.map((entry, index) =>*/}
            {/*    <li key={index} >{entries[index]} </li>)}*/}




        </li>


    )

}