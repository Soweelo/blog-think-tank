import "./menuitem.scss";
// import {useEffect, useRef, useState} from 'react';
// import { MdClose } from 'react-icons/md';
import AutoCSearchbar from "../autoCSearchBar/AutoCSearchbar";

export default function MenuItem({
  id,
  title,
  text1,
  text2,
  menuOpen,
  setMenuOpen,
  favorites,
  setFavorites,
  allTags,
  selectedTags,
  setSelectedTags,
}) {
  const isCurrent = id === menuOpen ? true : false;

  return (
    <li className={"menu__item btn btn--dropdown " + (isCurrent && "active")}>
      <div
        className="menu__item-wrapper"
        onClick={(e) => (isCurrent ? setMenuOpen(0) : setMenuOpen(id))}
      >
        <div className="menu__item--title">{title}</div>{" "}
        <div
          className="menu__item--seeMore"
          onClick={(e) => (isCurrent ? setMenuOpen(0) : setMenuOpen(id))}
        >
          {isCurrent ? "-" : "+"}
        </div>
      </div>
      {(() => {
        switch (id) {
          case 1:
            return (
              <ul className="menu-how">
                <li>{text1}</li>

                <li className="hoverable">
                  {/*<a href="#bepart"> More about how to create your subject.</a>*/}
                </li>
              </ul>
            );
          case 2:
            return (
              <ul className="menu-read" id="menu-read">
                <li>{text1}</li>

                <li>
                  <AutoCSearchbar
                    selectedItems={selectedTags}
                    setSelectedItems={setSelectedTags}
                    allItems={allTags}
                    id={1}
                  />
                </li>
              </ul>
            );

          case 3:
            return (
              <ul className="menu-fav">
                <li className="hoverable">{text1}</li>
                <li>{text2} </li>
                <li>
                  {" "}
                  <AutoCSearchbar
                    selectedItems={favorites}
                    setSelectedItems={setFavorites}
                    allItems={allTags}
                    id={2}
                  />
                </li>
              </ul>
            );

          default:
            return (
              <ul className="menu-addYours">
                <li className="hoverable">{text1}</li>
                <li className="hoverable">{text2}</li>
              </ul>
            );
        }
      })()}

      {/*{entries.map((entry, index) =>*/}
      {/*    <li key={index} >{entries[index]} </li>)}*/}
    </li>
  );
}
