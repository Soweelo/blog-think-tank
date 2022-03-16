import "./autocsearchbar.scss";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function AutoCSearchbar({
  selectedItems,
  setSelectedItems,
  allItems,
  id,
}) {
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [eMessage, setEMessage] = useState("");
  // const [selectedOption,setSelectedOption] = useState(null)
  const [searchText, setSearchText] = useState("");

  // const options = [];
  // for (let i = 0;i <allItems.length; i++){
  //     options[i]={name:allItems[i].toLowerCase()};
  // }

  const updateSuggestion = (e) => {
    setIsSuggestion(false);
    if (e.target.value.length > 1) {
      setSearchText(e.target.value);
      setIsSuggestion(true);
    }
  };

  const addItem = (e) => {
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
        setSelectedItems([
          ...selectedItems,
          e.target.attributes["tagsuggest"].value,
        ]);
        //attention içi problème probable car dès que cette classe dès que le compoant est utilisé deux fois
        document.getElementsByClassName("tagcontainer--input" + id)[0].value =
          "";
        setIsSuggestion(false);
      } else {
        setEMessage("You already selected this tag");
      }
    }
    if (e.key === "Enter" && e.target.value.length > 0) {
      if (existsSuchItem.length > 0) {
        if (existsSuchSelectedItem.length === 0) {
          setSelectedItems([...selectedItems, e.target.value]);
          e.target.value = "";
          setIsSuggestion(false);
        } else {
          setEMessage("You already selected this tag");
        }
      } else {
        setEMessage("This tag still does not exist");
      }
    }
  };

  const removeItem = (item) => {
    const newSelectedItems = selectedItems.filter(
      (selectedItems) => selectedItems !== item
    );
    setSelectedItems(newSelectedItems);
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
      <div className="message">{eMessage}</div>
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

      <div className={"suggestion " + (isSuggestion && "active")}>
        {/*{console.log(allItems)}*/}
        {allItems
          .filter(({ name }) => name.indexOf(searchText.toLowerCase()) > -1)
          .map((option, i) => {
            return (
              <div
                key={i}
                className="suggestion-select-item"
                tagsuggest={option.name}
                onClick={addItem}
              >
                {" "}
                #{option.name}{" "}
              </div>
            );
          })}
      </div>
    </>
  );
}
