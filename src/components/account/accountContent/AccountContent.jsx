import { useState, useEffect, useRef, useContext } from "react";
import "./accountcontent.scss";
import { ArrowBack } from "@material-ui/icons";
import AccountBrandForm from "./Brand/AccountBrandForm";
import useTrait from "../../../hooks/useTrait";
import Post from "./Post/Post";
import AccountParams from "./AccountParams/AccountParams";
import { logout } from "../../../context functions/apiCalls";
import { useFetch } from "../../../hooks/useFetch";
import { UserContext } from "../../../context/UserContext";
import Brand from "./Brand/Brand";
export default function AccountContent({
  accountContent,
  setAccountContent,
  mobileView,
  setMobileView,
  lang,
  setHomeContent,
}) {
  const [brandMessage, setBrandMessage] = useState("");
  const { user, dispatch } = useContext(UserContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  const [accountBrandForm, setAccountBrandForm] = useState(1);
  // const [accountPostForm, setAccountPostForm] = useState(1);
  const [brandContent, setBrandContent] = useState([]);
  const allBrands = useTrait([]);
  const getAllBrands = async () => {
    // console.log("in getallbrands");

    try {
      const response = await fetch(
        PF + "/api/brands/list?token=" + user.session
      );
      const data = await response.json();
      // console.log(data.data);
      if (data.success) {
        allBrands.set(data.data);
      } else {
        if (data.message === "This session token is not valid") {
          logout(dispatch);
          setHomeContent("0");
        }
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);
  // const currentURL = window.location.href
  // let tokenToSave = currentURL.substring(currentURL.indexOf('token=') + 1);
  // console.log(tokenToSave);

  return (
    <div className="account-content__wrapper">
      {(() => {
        switch (accountContent) {
          case 1:
            return (
              <Post
                setMobileView={setMobileView}
                setAccountContent={setAccountContent}
                accountContent={accountContent}
                lang={lang}
                setHomeContent={setHomeContent}
                allBrands={allBrands}
              />
            );

          case 2:
            return (
              <Brand
                setMobileView={setMobileView}
                mobileView={mobileView}
                setAccountContent={setAccountContent}
                accountContent={accountContent}
                accountBrandForm={accountBrandForm}
                setAccountBrandForm={setAccountBrandForm}
                brandContent={brandContent}
                setBrandContent={setBrandContent}
                setHomeContent={setHomeContent}
                getAllBrands={getAllBrands}
                allBrands={allBrands}
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
                  setBackMessage={setBrandMessage}
                  setAccountContent={setAccountContent}
                  brandContent={brandContent}
                  setHomeContent={setHomeContent}
                />
              </div>
            );
          default:
            return (
              <AccountParams
                setMobileView={setMobileView}
                setHomeContent={setHomeContent}
              />
            );
        }
      })()}
    </div>
  );
}
