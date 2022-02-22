import "./faq.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
export default function Faq({ lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  const [loading, setLoading] = useState(false);
  const [option_faq_title, setOption_faq_title] = useState("");
  const [option_faq_text, setOption_faq_text] = useState("");

  useEffect(() => {
    const getOptions = async (key) => {
      setLoading(true);
      try {
        const faq_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=05_faq"
        ).then((r) => r.json());
        const faq_text = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=04_faq"
        ).then((r) => r.json());

        setOption_faq_title(faq_title.data.value);
        setOption_faq_text(faq_text.data.value);
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
    // console.log("useffect  de topbar", "lang", lang,"bottomContent",bottomBarContent,"topbar:",topBarContent )
  }, [lang]);
  return (
    <div id="faq">
      <div className="loader">{<Loader loading={loading} />}</div>
      <BackHomeButton />
      <h1>{option_faq_title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: option_faq_text }}
        className="faq__para-container"
      ></div>
    </div>
  );
}
