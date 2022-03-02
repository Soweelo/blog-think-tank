import "./faq.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useState, useEffect } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default function Faq({ allOptions, setHomeContent }) {
  const [option_faq, setOption_faq] = useState("");
  const [option_faq_text, setOption_faq_text] = useState("");

  useEffect(() => {
    setOption_faq(getOptionByKey("05_faq", allOptions));
    setOption_faq_text(getOptionByKey("04_faq", allOptions));
  }, [allOptions]);

  return (
    <div id="faq">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1 dangerouslySetInnerHTML={{ __html: option_faq }}></h1>
      <div
        className="faq__para-container"
        dangerouslySetInnerHTML={{ __html: option_faq_text }}
      ></div>
    </div>
  );
}
