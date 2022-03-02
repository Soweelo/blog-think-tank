import "./moreabout.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { memo, useState, useEffect } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default memo(function MoreAbout({ allOptions, setHomeContent }) {
  const [option_moreabout, setOption_moreabout] = useState("");
  const [option_moreabout_text, setOption_moreabout_text] = useState("");
  useEffect(() => {
    setOption_moreabout(getOptionByKey("05_more_about", allOptions));
    setOption_moreabout_text(getOptionByKey("04_more_about", allOptions));
  }, [allOptions]);
  return (
    <div id="moreabout">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1 dangerouslySetInnerHTML={{ __html: option_moreabout }}></h1>
      <div
        className="moreabout__para-container"
        dangerouslySetInnerHTML={{ __html: option_moreabout_text }}
      ></div>
    </div>
  );
});
