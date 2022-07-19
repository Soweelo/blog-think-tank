import "./autocsearchbar.scss";
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import useTrait from "../../hooks/useTrait";
import getUnique from "../../functions/getUnique";
import toObjectArray from "../../functions/toObjectArray";
export default function EditAutoCSearchbar({
  selectedItems,
  postSelectedItems,
  allItems,
  id,
  max,
  postId,
  setEMessage,
  setAddItem,
  setDeleteItem,
  edit,
  postSelectedItemId,
  firstIsBrand,
}) {

  const [isSuggestion, setIsSuggestion] = useState(false);
  const searchText = useTrait("");
  const inputContent = useRef()
  const isNewTag = useTrait(false);
  const equalValues = useTrait(0);
  const updateSuggestion = (e) => {
    // console.log("allitems", allItems);
    setIsSuggestion(false);
    if (e.target.value.length > 1) {
      searchText.set(e.target.value);
      setIsSuggestion(true);

      if (e.target.value.length > 3) {
        allItems.map((tag) => {
          if (tag.name == e.target.value) {
            equalValues.set(equalValues.get() + 1);
            return;
          }
        });
        equalValues.get() ? isNewTag.set(false) : isNewTag.set(true);
        equalValues.set(0);
      }
    }
    if (!e) {
      searchText.set("");
    }
  };

  const addItem = (e) => {
    console.log(inputContent.current.value, searchText.get())
    if (selectedItems.length < (firstIsBrand ? max + 1 : max)) {
      // console.log(e.target.className.includes("suggestion-select-item"));

      let newTagName = e.target.className.includes("suggestion-select-item")
        ? e.target.attributes["tagsuggest"].value
        : e.target.value;

      // check if searched item exists in allItems
      let existsSuchItem = allItems.filter(
        (allItems) => allItems.name === newTagName
      );

      if (edit || existsSuchItem.length > 0) {
        //**add tag to container
        postSelectedItems.set([...postSelectedItems.get(), newTagName]);

        //** send  item id to parent
        if ( e.target.attributes["tagsuggest-id"] && e.target.attributes["tagsuggest-id"].value != 0) {
          let newTagId = e.target.attributes["tagsuggest-id"].value;
         if(postSelectedItemId) {postSelectedItemId.set(newTagId)};
        }
        // console.log("in here");
        //**send signal to parent for updating the post
        if (postId) {
          setAddItem([true, e.target.attributes["tagsuggest"].value, postId]);
        }
        //**cancel current input value
        document.getElementsByClassName(
          "tagcontainer--input" + id + e.target.getAttribute("data-postid")
        )[0].value = "";
        searchText.set("");
        // inputContent.current.value = ""
        // **close suggestions
        setIsSuggestion(false);
      } else {
        setEMessage(["Sorry this item doesnt exist.", "red"]);
      }
    } else {
      setEMessage(["You can select a maximum of " + max + " items ", "red"]);
      setIsSuggestion(false);
      searchText.set("");
    }
  };

  const removeItem = (item) => {
    const newSelectedItems = selectedItems.filter(
      (selectedItems) => selectedItems !== item
    );
    postSelectedItems.set(newSelectedItems);
    if (postId) {
      setDeleteItem([true, item, postId]);
    }
  };

  const setOpenToCenter = (e) => {
    var el = e.nativeEvent.target;
    el.scrollIntoView({ block: "center" });
  };

  if (/Android [4-6]/.test(navigator.appVersion)) {
    window.addEventListener("resize", function () {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  }

  return (
    <>
      <div className="tag-container">
        {selectedItems.map((item, index) => {
          return firstIsBrand && index == 0 ? null : (
            <div key={index} className="tag">
              {item}
              <span onClick={() => removeItem(item)}>
                <MdClose className="mdClose"></MdClose>
              </span>
            </div>
          );
        })}

        <input
          className={"tagcontainer--input" + id + postId}
          type="text"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addItem(e);
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          ref={inputContent}
          onChange={(e) => {
            updateSuggestion(e);
            setEMessage(["", "black"]);
          }}
          onFocus={(e) => setOpenToCenter(e)}
        />
      </div>

      <div
        className={"suggestion " + (isSuggestion && "active")}
        style={{ position: "relative" }}
      >
        {isNewTag.get() && edit && (
          <div
            className="suggestion-select-item new-item-wrapper"
            onClick={addItem}
            tagsuggest={searchText.get()}
          >
            <p>#{searchText.get()}</p>
            <span>New Tag</span>
          </div>
        )}
        {/*{console.log("all items", allItems, removeDuplicates(allItems))}*/}
        {getUnique(
          toObjectArray(allItems).filter(
            ({ name }) => name.indexOf(searchText.get().toLowerCase()) > -1
          ),
          "name"
        ).map((option, i, arr) => {
          return (
            <div
              key={i}
              className="suggestion-select-item"
              tagsuggest={option.name}
              tagsuggest-id={option.id ? option.id : 0}
              data-postid={postId}
              onClick={addItem}
            >
              #{option.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
