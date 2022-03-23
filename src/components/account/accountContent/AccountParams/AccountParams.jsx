import {
  ArrowBack,
  LockOpen,
  MailOutline,
  PersonOutline,
  StarOutline,
} from "@material-ui/icons";
import { useFetch } from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";
import useTrait from "../../../../hooks/useTrait";

export default function AccountParams({
  session,
  setMobileView,
  setHomeContent,
  setIsValidToken,
}) {
  // console.log("rerender account params");
  const fetch = useFetch();
  const [isFetching, setIsFetching] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [changeUserInfo, setChangeUserInfo] = useState(true);
  const getMemberbySession = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        PF + "/api/members/session?token=" + session[0]
      ).then((r) => r.json());

      if (response.success == true) {
        // console.log(response);
        setEmail(response.data.email);
        setPassword("*********");
        setUserId(response.data.id);
        setStatus(response.data.is_premium);
        setPseudo(response.data.pseudo);
      } else {
        if (response.message === "This session token is not valid") {
          outDateCookieSession(session[0], session[1]);
          console.log("outdatecookies");
          setIsValidToken(false);
          setHomeContent("0");
        }
      }

      setIsFetching(false);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (changeUserInfo) {
      getMemberbySession();
      setChangeUserInfo(false);
    }
  }, [changeUserInfo]);

  return (
    <div className="account-content__account-params-wrapper">
      <ArrowBack
        className="mobileView"
        onClick={() => {
          setMobileView("menu");
        }}
      />
      <h2>My Account</h2>
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    setChangeUserInfo(true);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  RENDER ME*/}
      {/*</button>*/}
      <div className="account-content__info-container">
        <div className="account-content__info-line">
          <div className="account-content__label">
            <PersonOutline />
            Pseudo
          </div>
          <div className="account-content__value">{pseudo}</div>
        </div>
        <div className="account-content__info-line">
          <div className="account-content__label">
            <LockOpen />
            Password
          </div>
          <div className="account-content__value">{password}</div>
        </div>
        <div className="account-content__info-line">
          <div className="account-content__label">
            <StarOutline />
            Status
          </div>
          <div className="account-content__value">
            {status ? "Premium user" : "Basic"}
          </div>
        </div>
        <div className="account-content__info-line">
          <div className="account-content__label">
            <MailOutline />
            Email
          </div>
          <div className="account-content__value">{email}</div>
        </div>
      </div>
    </div>
  );
}
