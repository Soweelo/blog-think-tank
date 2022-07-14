import "./menuitem.scss";
import {useContext, useEffect, useRef, useState} from "react";
// import { MdClose } from 'react-icons/md';
import AutoCSearchbar from "../autoCSearchBar/AutoCSearchbar";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
import {UserContext} from "../../context/UserContext";
import {Create} from "@material-ui/icons";
import findNewItemInArray from "../../functions/findNewItemInArray";
import getTagId from "../../functions/getTagId";
import {logout, updateFavorites} from "../../context functions/apiCalls";
import useTrait from "../../hooks/useTrait";

export default function MenuItem({
                                     id,
                                     menuOpen,
                                     setMenuOpen,
                                     favorites,
                                     setFavorites,
                                     allTags,
                                     selectedTags,
                                     setSelectedTags,
                                     allOptions,
                                     setHomeContent,
                                     setShowAuth,
                                     setRegisterContent,
                                 }) {
    const {user, dispatch} = useContext(UserContext);
    const isCurrent = id === menuOpen ? true : false;
    const readByTag = useRef();
    const [favoritesBeforeChanges, setFavoritesBeforeChanges] = useState(favorites)
    const [favoritesMessage,setFavoritesMessage]=useState("")
    const isLoading = useTrait(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let formData = new FormData();
    function getTitle(id) {
        switch (id) {
            case 1:
                return option_read_by_tag_title;
            case 2:
                return option_how_it_works_title;
            case 3:
                return option_my_favorite_tags_title;
            default:
                return option_create_title;
        }
    }

    const [option_how_it_works_title, setOption_how_it_works_title] =
        useState("");
    const [option_how_it_works_text, setOption_how_it_works_text] = useState("");
    const [option_read_by_tag_title, setOption_read_by_tag_title] = useState("");
    const [option_create_title, setOption_create_title] = useState("");
    const [option_create_text_1, setOption_create_text_1] = useState("");
    const [option_create_text_2, setOption_create_text_2] = useState("");
    const [option_my_favorite_tags_title, setOption_my_favorite_tags_title] =
        useState("");
    const [option_my_favorite_tags_text_1, setOption_my_favorite_tags_text_1] =
        useState("");
    const [option_my_favorite_tags_text_2, setOption_my_favorite_tags_text_2] =
        useState("");
    const [option_read_by_tag_text, setOption_read_by_tag_text] = useState("");
    useEffect(() => {
        setOption_how_it_works_title(getOptionByKey("02_how_it_works", allOptions));
        setOption_how_it_works_text(getOptionByKey("03_how_it_works", allOptions));
        setOption_read_by_tag_title(getOptionByKey("02_read_by_tag", allOptions));
        setOption_read_by_tag_text(getOptionByKey("02_type_a_tag", allOptions));
        setOption_my_favorite_tags_title(
            getOptionByKey("02_my_favorite_tags", allOptions)
        );
        setOption_create_title(getOptionByKey("02_create", allOptions));
        setOption_my_favorite_tags_text_1(
            getOptionByKey("02_remember_my_favorite", allOptions)
        );
        setOption_my_favorite_tags_text_2(
            getOptionByKey("02_your_favorite_tags", allOptions)
        );
        setOption_create_text_1(getOptionByKey("02_create_account", allOptions));
        setOption_create_text_2(getOptionByKey("02_subscribe", allOptions));
    }, [allOptions]);

    function openLoginInterface() {
        if (user) {
            setHomeContent("5");
        } else {
            setRegisterContent(true);
            setShowAuth(true);
        }
    }

    //read by tag modification
    // custom suggestion list margin to make it appear correct bottom
    const customMargin = readByTag.current
        ? readByTag.current.getBoundingClientRect().height
        : null;
    useEffect(() => {
        if (document.querySelector(".suggestion") && customMargin) {
            document.querySelector(".suggestion").style.cssText +=
                "margin-top:" + customMargin + "px";
        }
    }, [customMargin]);
    // on first load, set favorites from user context if user is logged in
    useEffect(() => {
        if (user) {
            let array = []
            user.tags.map((tag, i) => {
                array.push(tag.name)
            })
            setFavorites(array)
            setFavoritesBeforeChanges(array)
        }
    }, [])
    const deleteFavorite = async (itemToRemove_id) => {
        try {
            const res = await fetch(
                PF + "/api/members/tags/" + itemToRemove_id + "/delete?token=" + user.session,
                {method: "DELETE"}
            );
            const data = await res.json();
            if (data.success) {
                //    update the context
                let updatedUser = user
                let updatedFavoritesTagsContext = []
             user.tags.map((tag)=>{
                    if((tag.id !== itemToRemove_id)){
                        // remove
                       updatedFavoritesTagsContext.push(tag)
                    }
                })
                updatedUser.tags = updatedFavoritesTagsContext
                updateFavorites(updatedUser,dispatch)
                isLoading.set(false)
                setFavoritesMessage(data.message)
            } else {
                setFavoritesMessage(data.message)
                if (data.message === "This session token is not valid") {
                    logout(dispatch);
                }
            }
        } catch (e) {
            console.log(e);

        }
    };
    const submitNewFavorite = async (itemToAdd_id, itemToAdd) => {
        try {
            formData.append("tag_id", itemToAdd_id);
            const requestOptions = {
                method: "POST",
                body: formData,
            };
            let url = PF + "/api/members/tags/add?token=" + user.session;
            let res = await fetch(url, requestOptions).then((res) => res.json());
            if (res.success) {
                setFavoritesMessage(res.message)
            //    update the context
                let updatedUser = user
                let favoritesTagsContext = user.tags
               favoritesTagsContext.push({"id":itemToAdd_id,"name":itemToAdd[0]})
                updatedUser.tags = favoritesTagsContext
                updateFavorites(updatedUser,dispatch)
                isLoading.set(false)
            } else {
                setFavoritesMessage(res.message)
                if (res.message === "This session token is not valid") {
                    logout(dispatch);
                }

            }
        } catch (e) {
            console.log(e);

        }
    };

    // if number of favorites changes add or remove it from database and update context
    useEffect(() => {
      //only if we are in the fav submenu (id ===3)
        if(id===3){
            //    if favorites is longer than favoritesBeforeChanges, it means one favorite tag was added
            //    otherwise, it means one item was removed
            if ((favorites.length > favoritesBeforeChanges.length) && !isLoading.get()) {
                //    find the new tag
                let itemToAdd = findNewItemInArray(favoritesBeforeChanges, favorites)
                let itemToAdd_id = getTagId(itemToAdd, allTags)
                //    update favorites before changes
                setFavoritesBeforeChanges(favorites)
                if(!isLoading.get()){
                    isLoading.set(true)
                    submitNewFavorite(itemToAdd_id, itemToAdd )
                }
                // update the displayed items?
            }
            if (favorites.length < favoritesBeforeChanges.length && !isLoading.get()) {
                //    find the new tag
                let itemToRemove = findNewItemInArray(favorites, favoritesBeforeChanges)
                let itemToRemove_id = 0
                // look at the itemToRemove_id in user context
                let favoritesTags = user.tags
                favoritesTags.map((tag) => {
                   if(tag.name === itemToRemove[0]){
                       itemToRemove_id = tag.id
                   }
                   return
                })
                deleteFavorite(itemToRemove_id)
                setFavoritesBeforeChanges(favorites)
            }
        }


    }, [favorites])
    return (
        <li className={"menu__item btn btn--dropdown " + (isCurrent && "active")}>
            {(() => {
                switch (id) {
                    case 1:
                        return (
                            <>
                                <div
                                    className="menu__item-wrapper menu-read"
                                    ref={readByTag}
                                    id="menu-read"
                                    onClick={(e) =>
                                        isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                                    }
                                >
                                    <AutoCSearchbar
                                        selectedItems={selectedTags}
                                        setSelectedItems={setSelectedTags}
                                        allItems={allTags}
                                        id={1}
                                        placeholder={getTitle(id)}
                                    />
                                </div>
                            </>
                        );
                    case 2:
                        return (
                            <>
                                <div
                                    className="menu__item-wrapper"
                                    onClick={(e) =>
                                        isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                                    }
                                >
                                    <div className="menu__item--title">{getTitle(id)}</div>
                                    <div
                                        className="menu__item--seeMore"
                                        onClick={(e) =>
                                            isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                                        }
                                    >
                                        {isCurrent ? <span>-</span> : <span>+</span>}
                                    </div>
                                </div>
                                <ul className="menu-how">
                                    <li
                                        dangerouslySetInnerHTML={{
                                            __html: option_how_it_works_text,
                                        }}
                                    ></li>
                                    <li className="hoverable"></li>
                                </ul>
                            </>
                        );

                    default:
                        return (
                            <>
                                <div
                                    className="menu__item-wrapper"
                                    onClick={(e) =>
                                        isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                                    }
                                >
                                    <div className="menu__item--title">{getTitle(id)}</div>
                                    <div
                                        className="menu__item--seeMore"
                                        onClick={(e) =>
                                            isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                                        }
                                    >
                                        {isCurrent ? <span>-</span> : <span>+</span>}
                                    </div>
                                </div>
                                <ul className="menu-fav">
                                    <li
                                        className="hoverable"
                                        dangerouslySetInnerHTML={{
                                            __html: option_my_favorite_tags_text_1,
                                        }}
                                    ></li>
                                    <li
                                        dangerouslySetInnerHTML={{
                                            __html: option_my_favorite_tags_text_2,
                                        }}
                                    ></li>
                                    {user ?
                                        <li>
                                            <AutoCSearchbar
                                                selectedItems={favorites}
                                                setSelectedItems={setFavorites}
                                                allItems={allTags}
                                                id={2}
                                            />
                                            {favoritesMessage && <div className="message  display-message">{favoritesMessage}</div>}
                                        </li>
                                        :
                                        <li>
                                            <div className="menu__login-required" onClick={() => setShowAuth(true)}>
                                                <span>Wanna add your favorite tags ? </span>
                                                <span className="link">Please Login</span>
                                            </div>
                                        </li>
                                    }

                                </ul>
                            </>
                        );

                    // default:
                    //     return (
                    //         <>
                    //             <div
                    //                 className="menu__item-wrapper"
                    //                 onClick={(e) =>
                    //                     isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                    //                 }
                    //             >
                    //                 <div className="menu__item--title">{getTitle(id)}</div>
                    //                 <div
                    //                     className="menu__item--seeMore"
                    //                     onClick={(e) =>
                    //                         isCurrent ? setMenuOpen(0) : setMenuOpen(id)
                    //                     }
                    //                 >
                    //                     {isCurrent ? <span>-</span> : <span>+</span>}
                    //                 </div>
                    //             </div>
                    //             <ul className="menu-addYours">
                    //                 <li
                    //                     className="hoverable"
                    //                     dangerouslySetInnerHTML={{__html: option_create_text_1}}
                    //                     onClick={() => openLoginInterface()}
                    //                 ></li>
                    //                 <li
                    //                     className="hoverable"
                    //                     dangerouslySetInnerHTML={{__html: option_create_text_2}}
                    //                     onClick={() => openLoginInterface()}
                    //                 ></li>
                    //             </ul>
                    //         </>
                    //     );
                }
            })()}

            {/*{entries.map((entry, index) =>*/}
            {/*    <li key={index} >{entries[index]} </li>)}*/}
        </li>
    );
}
