import "./menuitem.scss"

import {useEffect, useRef, useState} from 'react';
import { MdClose } from 'react-icons/md';


export default function MenuItem({id, title, menuOpen, setMenuOpen,favorites, setFavorites,allTags,selectedTags, setSelectedTags}){


    const [favMessage, setfavMessage] = useState('');
    const [selectMessage, setSelectMessage] = useState('');
    const [isSuggestion, setIsSuggestion] = useState(false);
    const isCurrent =  id === menuOpen ? true :false


    const options = [];
    for (let i = 0;i <allTags.length; i++){
        options[i]={name:allTags[i].toLowerCase()};
    }
    const [selectedOption,setSelectedOption] = useState(null)
    const [searchText,setSearchText] = useState("")


// console.log(options)
    const addTag = (e) =>{
        setSelectMessage('')
        let input = (e.target.className === "suggestion-select-item") ? e.target.attributes["tagsuggest"].value : e.target.value;
        let existSuchTag = allTags.filter(allTags => allTags == input)
        let existSuchSelectedTag = selectedTags.filter(selectedTags => selectedTags == input)

            if(e.target.className === "suggestion-select-item"){

                if(existSuchSelectedTag.length == 0){
                    setSelectedTags([...selectedTags, e.target.attributes["tagsuggest"].value])
                    document.getElementsByClassName('tagcontainer--input')[0].value = ''
                    setIsSuggestion(false)
                }else{
                    setSelectMessage('You already selected this tag')
                }
            }
            if(e.key === 'Enter' && e.target.value.length >0 ){

                if(existSuchTag.length >0){
                    if(existSuchSelectedTag.length == 0){
                        setSelectedTags([...selectedTags, e.target.value])
                        e.target.value =''
                        setIsSuggestion(false)

                    }else{
                        setSelectMessage('You already selected this tag')
                    }
                }else{
                    setSelectMessage('This tag still does not exist')
                }

            }
    }

    const updateSuggestion = (e) => {
        setIsSuggestion(false)
        if(e.target.value.length >1){
            setSearchText(e.target.value)
            setIsSuggestion(true);
        }
    }


    const addFav = (e) =>{
        setfavMessage('')
            if(e.key === 'Enter' && e.target.value.length >0 ){
                let existSuchTag = allTags.filter(allTags => allTags == e.target.value)
                let existSuchFav = favorites.filter(favorites => favorites == e.target.value)

                if(existSuchTag.length >0){
                    if(existSuchFav.length == 0){
                        setFavorites([...favorites, e.target.value])
                         e.target.value =''
                    }else{
                        setfavMessage('This tag is already in your favorites')
                    }
                }else{
                    setfavMessage('This tag still does not exist')
                }
            }
    }


    const removeTag = tag => {
        const newSelectedTags = selectedTags.filter(selectedTags => selectedTags !== tag)
        setSelectedTags(newSelectedTags)
    }
const removeFav = fav => {
        const newSelectedFav = favorites.filter(favorites => favorites !== fav)
        setFavorites(newSelectedFav)

    }

    return(

            <li  className={"menu__item btn btn--dropdown " + (isCurrent && "active")}  >

            <div className="menu__item-title" onClick={(e)=> isCurrent ? setMenuOpen(0): setMenuOpen(id) }>
                <a href="#" >{title}</a> <div className="seeMore"onClick={(e)=> isCurrent ? setMenuOpen(0): setMenuOpen(id) }>{isCurrent ? "-": "+"}</div>
            </div>
                {(() => {switch(id){
                       case 1:
                    return  <ul className="menu-how" >
                        <li >You can read for free your favorite tags, or create your own think tank who ever you are. Adding your name or website link will cost 90 € per month. Post in your language, and the google translation will automatically translate below your text. you can post, photo, video, text, up to you, take note that any post must respect readers.
                            <a href="">more about how to create your think tank.</a>
                            A think tank is a group, a company, or a a single individual, for example : you are an artist and you made a creative video on any subject who can contribute to the world 2.0, you can post your video. or you are a company who already proposes a creative idea or item, then you can post and promote your website.</li>
                    </ul>
                       case 2:
                        return <ul className="menu-read" id="menu-read" >
                        <li>Type a tag below</li>

                        <li>
                            <div className="message">{selectMessage}</div>
                            <div className="tag-container">
                                {selectedTags.map((tag, index)=>{
                                    return (
                                        <div key={index} className="tag">{tag}
                                            <span onClick={()=> removeTag(tag)}>
                                        <MdClose className="mdClose"></MdClose>
                                    </span>
                                        </div>
                                    )}
                                )}
                                <input className="tagcontainer--input" onKeyDown={addTag } type="text"  onChange={ (e) => updateSuggestion(e)} />
                            </div>

                                <div className={"suggestion " + (isSuggestion && "active")}>
                            { options.filter(({name}) => name.indexOf(searchText.toLowerCase()) > -1)
                                .map((option , i) => {
                                return <div  key={i} className="suggestion-select-item" tagSuggest={option.name} onClick={addTag}> #{option.name} </div>
                            })}
                                </div>
                        </li>
                    </ul>


                       case 3:
                           return <ul className="menu-fav">
                                <li >Your favorites tags : </li>
                               <li className="tag-container">{favorites.map((f,i) => {
                                       return (
                                           <div key={i} className="tag">{f}
                                               <span onClick={()=> removeFav(f)}>
                                        <MdClose className="mdClose"></MdClose>
                                    </span>
                                           </div>
                                       )
                                   }
                               )}</li>
                               <li>Add a tag to your favorites!
                                   <input type="text" onKeyDown={addFav}/>
                                   <div className="favMessage">{favMessage}</div>
                               </li>
                               <li>Remember my favorites - Create an account</li>
                           </ul>


                       default:
                           return <ul className="menu-addYours">
                               <li>case 4</li>
                               <li>case 4</li>
                           </ul>
                }
                })()}

                {/*{entries.map((entry, index) =>*/}
                {/*    <li key={index} >{entries[index]} </li>)}*/}




        </li>


    )

}
