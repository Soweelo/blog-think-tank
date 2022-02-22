import "./moreabout.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState, memo } from "react";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
export default function MoreAbout({ lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [option_moreabout_title, setOption_moreabout_title] = useState("");
  const [option_moreabout_text, setOption_moreabout_text] = useState("");
  const fetch = useFetch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getOptions = async (key) => {
      setLoading(true);
      try {
        const moreabout_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=05_more_about"
        ).then((r) => r.json());
        const moreabout_text = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=04_more_about"
        ).then((r) => r.json());

        setOption_moreabout_title(moreabout_title.data.value);
        setOption_moreabout_text(moreabout_text.data.value);
        setLoading(false);
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };

    if (lang.length !== 0) {
      getOptions();
    }
    // console.log("useffect  de topbar", "lang", lsang,"bottomCcontecnt",bottomBarContent,"topbar:",topBarContent )
  }, [lang]);
  return (
    <div id="moreabout">
      <div className="loader">{<Loader loading={loading} />}</div>

      <BackHomeButton />
      <h1>{option_moreabout_title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: option_moreabout_text }}
        className="moreabout__para-container"
      ></div>
    </div>
  );
}
