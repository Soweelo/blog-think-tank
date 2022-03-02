import "./bepart.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { memo } from "react";
import { useState, useEffect } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default memo(function BePart({ allOptions, setHomeContent }) {
  const [option_join, setOption_join] = useState("");
  const [option_join_text, setOption_join_text] = useState("");
  const changeContent = (e) => {
    setHomeContent(e.target.id);
  };

  useEffect(() => {
    setOption_join(getOptionByKey("05_join_the_project", allOptions));
    setOption_join_text(getOptionByKey("04_join_the_project", allOptions));
  }, [allOptions]);

  return (
    <div id="bepart">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1 dangerouslySetInnerHTML={{ __html: option_join }}></h1>
      <div
        className="bepart__para-container"
        dangerouslySetInnerHTML={{ __html: option_join_text }}
      ></div>
    </div>
  );
});
