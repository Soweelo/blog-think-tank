import "./bepart.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BePart({ lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [option_bepart_title, setOption_bepart_title] = useState("");
  const [option_bepart_text, setOption_bepart_text] = useState("");

  useEffect(() => {
    const getOptions = async (key) => {
      const bepart_title = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=05_join_the_project"
      );
      const bepart_text = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=04_join_the_project"
      );

      setOption_bepart_title(bepart_title.data.data.value);
      setOption_bepart_text(bepart_text.data.data.value);
    };
    getOptions();
  });

  return (
    <div id="bepart">
      <BackHomeButton />
      <h1>{option_bepart_title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: option_bepart_text }}
        className="bepart__para-container"
      ></div>
    </div>
  );
}
