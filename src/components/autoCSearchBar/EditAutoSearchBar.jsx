import "./autocsearchbar.scss";
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import useTrait from "../../hooks/useTrait";
import getUnique from "../../functions/getUnique";
import toObjectArray from "../../functions/toObjectArray";
export default function EditAutoCSearchbar({
  selectedItems,
  postTags,
  allItems,
  setAllItems,
  id,
  max,
  postId,
  setEMessage,
  setAddTag,
  setDeleteATag,
}) {
  const [isSuggestion, setIsSuggestion] = useState(false);
  const searchText = useTrait("");
  const isNewTag = useTrait(false);
  const equalValues = useTrait(0);
  const updateSuggestion = (e) => {
    // console.log("in update sugg", "e.key", e.target.value);
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
    if (selectedItems.length < max) {
      console.log(e.target.className.includes("suggestion-select-item"));
      let newTagName = e.target.className.includes("suggestion-select-item")
        ? e.target.attributes["tagsuggest"].value
        : e.target.value;
      //**add tag to container
      postTags.set([...postTags.get(), newTagName]);
      //**send signal to parent for updating the post
      if (postId) {
        setAddTag([true, e.target.attributes["tagsuggest"].value, postId]);
      }
      //**cancel current input value
      document.getElementsByClassName(
        "tagcontainer--input" + id + e.target.getAttribute("data-postid")
      )[0].value = "";
      searchText.set("");
      // **close suggestions
      setIsSuggestion(false);
    } else {
      setEMessage(["You can select a maximum of " + max + " tags ", "red"]);
      setIsSuggestion(false);
      searchText.set("");
    }
  };

  const removeItem = (item) => {
    // console.log(id, item, postId);
    const newSelectedItems = selectedItems.filter(
      (selectedItems) => selectedItems !== item
    );
    postTags.set(newSelectedItems);
    // selectedItems = postTags.get();
    // console.log(postTags.get(), id);
    if (postId) {
      setDeleteATag([true, item, postId]);
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
          return (
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
        {isNewTag.get() && (
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
