import "./moreabout.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState, memo } from "react";
import axios from "axios";
export default memo(function MoreAbout({ lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [option_moreabout_title, setOption_moreabout_title] = useState("");
  const [option_moreabout_text, setOption_moreabout_text] = useState("");

  useEffect(() => {
    const getOptions = async (key) => {
      const moreabout_title = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=05_more_about"
      );
      const moreabout_text = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=04_more_about"
      );

      setOption_moreabout_title(moreabout_title.data.data.value);
      setOption_moreabout_text(moreabout_text.data.data.value);
    };

    if (lang.length !== 0) {
      getOptions();
    }
    // console.log("useffect  de topbar", "lang", lsang,"bottomCcontecnt",bottomBarContent,"topbar:",topBarContent )
  }, [lang]);
  return (
    <div id="moreabout">
      <BackHomeButton />
      <h1>{option_moreabout_title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: option_moreabout_text }}
        className="moreabout__para-container"
      ></div>
    </div>
  );
});
