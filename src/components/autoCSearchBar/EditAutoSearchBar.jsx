import "./autocsearchbar.scss";
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import useTrait from "../../hooks/useTrait";

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
  // console.log(allItems);
  // const removeDuplicates = (arr) => {
  //   const map = new Map();
  //   arr.forEach((v) => map.set(v.abc_buildingid, v)); // having `abc_buildingid` is always unique
  //   return [...map.values()];
  // };

  function getUnique(arr, comp) {
    // store the comparison  values in array
    const unique = arr
      .map((e) => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  const updateSuggestion = (e) => {
    // console.log("in update sugg", "e.key", e.target.value);
    setIsSuggestion(false);
    if (e.target.value.length > 1) {
      searchText.set(e.target.value);
      setIsSuggestion(true);
    }
    if (!e) {
      searchText.set("");
    }
  };
  const toObjectArray = (array) => {
    let result = [];
    array.map((each, i) => {
      // console.log(each);
      result.push(each);
    });
    return result;
  };
  const addItem = (e) => {
    // console.log(max, selectedItems.length);
    // console.log("in additem", e);

    if (selectedItems.length < max) {
      console.log(
        e.target.className,
        e.target.className === "suggestion-select-item"
      );
      let input =
        e.target.className === "suggestion-select-item"
          ? e.target.attributes["tagsuggest"].value
          : e.target.value;
      let existsSuchItem = allItems.filter((allItems) => allItems === input);
      let existsSuchSelectedItem = selectedItems.filter(
        (selectedItems) => selectedItems === input
      );

      if (e.target.className === "suggestion-select-item") {
        if (existsSuchSelectedItem.length === 0) {
          // console.log("selectedItems avant set", postTags.get());
          postTags.set([
            ...postTags.get(),
            e.target.attributes["tagsuggest"].value,
          ]);
          if (postId) {
            setAddTag([true, e.target.attributes["tagsuggest"].value, postId]);
          }

          document.getElementsByClassName(
            "tagcontainer--input" + id + e.target.getAttribute("data-postid")
          )[0].value = "";
          e.target.value = "";
          searchText.set("");
          // console.log(searchText.get());
          setIsSuggestion(false);
          // console.log("ici!!", searchText.get(), e.target.value);
        } else {
          setEMessage(["You already selected this tag", "red"]);
        }
      }
      if (e.key === "Enter" && e.target.value.length > 0) {
        if (existsSuchItem.length > 0) {
          if (existsSuchSelectedItem.length === 0) {
            postTags.set([...selectedItems, e.target.value]);
            if (postId) {
              setAddTag([true, e.target.value, postId]);
            }
            e.target.value = "";
            setIsSuggestion(false);
            searchText.set("");
          } else {
            setEMessage(["You already selected this tag", "red"]);
          }
        } else {
          let newTagName = e.target.value;
          if (newTagName.length > 3 && newTagName.length < 40) {
            postTags.set([...selectedItems, newTagName]);
            setAllItems([...allItems, { name: newTagName }]);
            if (postId) {
              setAddTag([true, newTagName, postId]);
            }
            e.target.value = "";
            setIsSuggestion(false);
            setEMessage(["Congrats! You created a new tag.", "green"]);
            searchText.set("");
            // console.log(searchText.get());
          } else {
            setEMessage([
              "Sorry, your tag name is currently " +
                newTagName.length +
                "  characters long. It should be longer than 3 characters and shorter than 40 characters",
              "red",
            ]);
          }
        }
      }
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
    // console.log(e.nativeEvent.target)
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
        <div className="suggestion-select-item new-item-wrapper">
          <p>#{searchText.get()}</p>
          <span>New Tag</span>
        </div>
        {/*{console.log("all items", allItems, removeDuplicates(allItems))}*/}
        {toObjectArray(allItems)
          .filter(
            ({ name }) => name.indexOf(searchText.get().toLowerCase()) > -1
          )
          .map((option, i, arr) => {
            // don't display twice the same tag or brand:;
            const previousOption = arr[i - 1];
            if (previousOption && previousOption.name == option.name) {
              return null;
            } else {
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
            }
          })}
      </div>
    </>
  );
}
