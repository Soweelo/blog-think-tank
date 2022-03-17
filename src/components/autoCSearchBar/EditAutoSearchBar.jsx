import "./autocsearchbar.scss";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import useTrait from "../../hooks/useTrait";
export default function EditAutoCSearchbar({
  selectedItems,
  postTags,
  allItems,
  setAllItems,
  id,
  max,
  editing,
  postId,
  setEMessage,
  setAddTag,
  setDeleteATag,
}) {
  const [isSuggestion, setIsSuggestion] = useState(false);
  const searchText = useTrait("");
  const updateSuggestion = (e) => {
    setIsSuggestion(false);
    if (e.target.value.length > 1) {
      // console.log("ici aussi?");
      searchText.set(e.target.value);
      setIsSuggestion(true);
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
    if (max === 0 || selectedItems.length < max) {
      setEMessage("");
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
          //attention ici problème probable car avec cette classe dès que le composant est utilisé deux fois
          document.getElementsByClassName("tagcontainer--input" + id)[0].value =
            "";
          e.target.value = "";
          searchText.set("");
          setIsSuggestion(false);
          // console.log("ici!!", searchText.get(), e.target.value);
        } else {
          setEMessage("You already selected this tag");
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
            setEMessage("You already selected this tag");
          }
        } else {
          if (editing) {
            let newTagName = e.target.value;
            if (newTagName.length > 3 && newTagName.length < 40) {
              postTags.set([...selectedItems, newTagName]);
              setAllItems([...allItems, { name: newTagName }]);
              if (postId) {
                setAddTag([true, newTagName, postId]);
              }
              e.target.value = "";
              setIsSuggestion(false);
              setEMessage("Congrats! You created a new tag.");
              searchText.set("");
            } else {
              setEMessage(
                "Sorry, your tag name is currently " +
                  newTagName.length +
                  "  characters long. It should be longer than 3 characters and shorter than 40 characters"
              );
            }
          } else {
            setEMessage("This tag still does not exist");
          }
        }
      }
    } else {
      setEMessage("You can select a maximum of " + max + " tags ");
      setIsSuggestion(false);
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
  // useEffect(() => {
  //   console.log("selectedItems", selectedItems, "posttags", postTags.get());
  // }, [postTags]);
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
          className={"tagcontainer--input" + id}
          onKeyDown={addItem}
          type="text"
          onChange={(e) => updateSuggestion(e)}
          onFocus={(e) => setOpenToCenter(e)}
        />
      </div>

      <div
        className={"suggestion " + (isSuggestion && "active")}
        style={{ position: "relative" }}
      >
        {/*{console.log(toObjectArray(allItems))}*/}
        {toObjectArray(allItems)
          .filter(
            ({ name }) => name.indexOf(searchText.get().toLowerCase()) > -1
          )
          .map((option, i) => {
            return (
              <div
                key={i}
                className="suggestion-select-item"
                tagsuggest={option.name}
                onClick={addItem}
              >
                #{option.name}{" "}
              </div>
            );
          })}
      </div>
    </>
  );
}
