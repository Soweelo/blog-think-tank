import "./menuitem.scss";
import { useEffect, useRef, useState } from "react";
// import { MdClose } from 'react-icons/md';
import AutoCSearchbar from "../autoCSearchBar/AutoCSearchbar";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
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
}) {
  const isCurrent = id === menuOpen ? true : false;
  function getTitle(id) {
    switch (id) {
      case 1:
        return option_how_it_works_title;
      case 2:
        return option_read_by_tag_title;
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

  return (
    <li className={"menu__item btn btn--dropdown " + (isCurrent && "active")}>
      <div
        className="menu__item-wrapper"
        onClick={(e) => (isCurrent ? setMenuOpen(0) : setMenuOpen(id))}
      >
        <div className="menu__item--title">{getTitle(id)}</div>
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
                <li
                  dangerouslySetInnerHTML={{ __html: option_how_it_works_text }}
                ></li>

                <li className="hoverable"> </li>
              </ul>
            );
          case 2:
            return (
              <ul className="menu-read" id="menu-read">
                <li
                  dangerouslySetInnerHTML={{ __html: option_read_by_tag_text }}
                ></li>

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
                <li>
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
                <li
                  className="hoverable"
                  dangerouslySetInnerHTML={{ __html: option_create_text_1 }}
                ></li>
                <li
                  className="hoverable"
                  dangerouslySetInnerHTML={{ __html: option_create_text_2 }}
                ></li>
              </ul>
            );
        }
      })()}

      {/*{entries.map((entry, index) =>*/}
      {/*    <li key={index} >{entries[index]} </li>)}*/}
    </li>
  );
}
