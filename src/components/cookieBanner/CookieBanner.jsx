import "./cookiebanner.scss";
import { useEffect, useState } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default function CookieBanner({ setCookieBanner, allOptions }) {
  const closeCookiesBanner = () => {
    document.cookie =
      "YWORLD3-cookies-consent= acknowledged; SameSite=Lax; Secure;max-age=34187400";
    setCookieBanner(false);
  };
  const [option_cookie_text, setOption_cookie_text] = useState("");

  useEffect(() => {
    setOption_cookie_text(getOptionByKey("04_cookies", allOptions));
  }, [allOptions]);

  return (
    <div className="cookie-banner">
      <div className="cookie_banner__wrapper">
        <div
          className="cookie-banner__text"
          dangerouslySetInnerHTML={{ __html: option_cookie_text }}
        ></div>
        <div className="cookie-banner__button" onClick={closeCookiesBanner}>
          OK
        </div>
      </div>
    </div>
  );
}
