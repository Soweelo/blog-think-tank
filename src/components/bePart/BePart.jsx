import "./bepart.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState } from "react";
import { useSafeState } from "../../hooks/useSafeState";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
export default function BePart({ lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [option_join_title, setOption_join_title] = useSafeState("");
  const [option_join_text, setOption_join_text] = useSafeState("");
  const fetch = useFetch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getOptions = async (key) => {
      setLoading(true);
      try {
        const join_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=05_join_the_project"
        ).then((r) => r.json());
        const join_text = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=04_join_the_project"
        ).then((r) => r.json());

        setOption_join_title(join_title.data.value);
        setOption_join_text(join_text.data.value);
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
  }, [lang]);

  return (
    <div id="bepart">
      <div className="loader">{<Loader loading={loading} />}</div>
      <BackHomeButton />

      <h1>{option_join_title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: option_join_text }}
        className="bepart__para-container"
      ></div>
    </div>
  );
}
