import {
  ArrowBack,
  LockOpen,
  MailOutline,
  PersonOutline,
  StarOutline,
} from "@material-ui/icons";
import { useFetch } from "../../../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";
import useTrait from "../../../../hooks/useTrait";
import { AuthContext } from "../../../../context/AuthContext";
import { logout } from "../../../../apiCalls";

export default function AccountParams({ setMobileView, setHomeContent }) {
  // console.log("rerender account params");
  const fetch = useFetch();
  const { user, dispatch } = useContext(AuthContext);
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
        PF + "/api/members/session?token=" + user.session
      ).then((r) => r.json());

      if (response.success == true) {
        setEmail(response.data.email);
        setPassword("*********");
        setUserId(response.data.id);
        setStatus(response.data.is_premium);
        setPseudo(response.data.pseudo);
      } else {
        if (response.message === "This session token is not valid") {
          logout(dispatch);
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
