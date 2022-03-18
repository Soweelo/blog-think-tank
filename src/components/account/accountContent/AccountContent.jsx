import { useState, useEffect, useRef } from "react";
import "./accountcontent.scss";
import AutoCSearchbar from "../../autoCSearchBar/AutoCSearchbar";
import { useFetch } from "../../../hooks/useFetch";
import AccountBrandForm from "./Brand/AccountBrandForm";
import useTrait from "../../../hooks/useTrait";
import Post from "./Post/Post";
import Brand from "./Brand/Brand";
import AccountParams from "./AccountParams/AccountParams";
import {
  PersonOutline,
  LockOpen,
  MailOutline,
  StarOutline,
  ArrowBack,
  Close,
  PermMedia,
  Room,
  Label,
  Cancel,
  EmojiEmotions,
} from "@material-ui/icons";
export default function AccountContent({
  accountContent,
  session,
  setAccountContent,
  mobileView,
  setMobileView,
  lang,
  setHomeContent,
  isValidToken,
}) {
  const [brandMessage, setBrandMessage] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  const [accountBrandForm, setAccountBrandForm] = useState(1);
  // const [accountPostForm, setAccountPostForm] = useState(1);
  const [brandContent, setBrandContent] = useState([]);

  return (
    <div className="account-content__wrapper">
      {(() => {
        switch (accountContent) {
          case 1:
            return (
              <Post
                // allPosts={allPosts}
                mobileView={mobileView}
                setMobileView={setMobileView}
                session={session}
                setAccountContent={setAccountContent}
                accountContent={accountContent}
                lang={lang}
                setHomeContent={setHomeContent}
                isValidToken={isValidToken}
              />
            );

          case 2:
            return (
              <Brand
                session={session}
                setMobileView={setMobileView}
                mobileView={mobileView}
                setAccountContent={setAccountContent}
                accountContent={accountContent}
                accountBrandForm={accountBrandForm}
                setAccountBrandForm={setAccountBrandForm}
                brandContent={brandContent}
                setBrandContent={setBrandContent}
                isValidToken={isValidToken}
                setHomeContent={setHomeContent}
              />
            );
          case 3:
            return (
              <div>
                <ArrowBack
                  onClick={() => {
                    setAccountContent(2);
                  }}
                />
                <AccountBrandForm
                  formContent={accountBrandForm}
                  token={session[0]}
                  setBackMessage={setBrandMessage}
                  setAccountContent={setAccountContent}
                  brandContent={brandContent}
                  isValidToken={isValidToken}
                />
              </div>
            );
          default:
            return (
              <AccountParams
                session={session}
                setMobileView={setMobileView}
                isValidToken={isValidToken}
              />
            );
        }
      })()}
    </div>
  );
}
