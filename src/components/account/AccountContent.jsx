import { useState, useEffect } from "react";
import "./accountcontent.scss";
import AutoCSearchbar from "../autoCSearchBar/AutoCSearchbar";
import { useFetch } from "../../hooks/useFetch";
import AccountBrandForm from "./AccountBrandForm";
import { ArrowBack, Close } from "@material-ui/icons";
import useTrait from "../../hooks/useTrait";
import {
  PersonOutline,
  LockOpen,
  MailOutline,
  StarOutline,
} from "@material-ui/icons";
export default function AccountContent({
  accountContent,
  session,
  setAccountContent,
  mobileView,
  setMobileView,
}) {
  const allBrands = useTrait([]);
  const allPosts = useTrait([]);

  const [brandMessage, setBrandMessage] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  const [accountBrandForm, setAccountBrandForm] = useState(1);
  const [accountPostForm, setAccountPostForm] = useState(1);
  const [brandContent, setBrandContent] = useState([]);

  const getAllBrands = async () => {
    try {
      const response = await fetch(PF + "/api/brands/list?token=" + session[0]);
      const data = await response.json();
      // console.log(data.data);
      allBrands.set(data.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  const getAllPosts = async () => {
    try {
      const response = await fetch(
        PF + "/api/posts/postsList?token=" + session[0]
      );
      const data = await response.json();
      // console.log(data.data);
      allPosts.set(data.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  const getBrandById = (id) => {
    allBrands.get().map((brand, i) => {
      if (brand.id === id) {
        setBrandContent([brand.id, brand.name, brand.link]);
        // console.log(brandContent);
        return;
      }
      return;
    });
    return brandContent;
  };
  getBrandById();

  // const getBrandById = async (e) => {
  //   e.preventDefault();
  //   const id = e.target.attributes["data-value"].value;
  //   console.log(id);
  //   try {
  //     const response = await fetch(PF + "/api/brands/" + id);
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.success) {
  //       setBrandContent([1, 2]);
  //       setAccountContent(3);
  //       setAccountBrandForm(1);
  //     } else {
  //       setBrandMessage(data.message);
  //     }
  //   } catch (e) {
  //     if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
  //       console.error(e);
  //     }
  //   }
  // };
  const deleteBrand = async (e) => {
    e.preventDefault();
    // console.log(e.target.attributes["data-value"].value);
    const id = e.target.attributes["data-value"].value;

    try {
      const response = await fetch(
        PF + "/api/brands/" + id + "?token=" + session[0],
        { method: "DELETE" }
      );
      const data = await response.json();
      // console.log("data", data);
      // console.log("response", response);
      if (data.success) {
        // console.log(data);
        setBrandMessage(data.message);
        await getAllBrands();
      } else {
        // console.log(data);
        setBrandMessage(data.message);
        await getAllBrands();
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    getAllBrands();

    // console.log("rerender", allBrands.get());
  }, [accountBrandForm, accountContent]);
  useEffect(() => {
    getAllPosts();

    // console.log("rerender", allBrands.get());
  }, [accountPostForm, accountContent]);
  return (
    <div className="account-content__wrapper">
      {(() => {
        switch (accountContent) {
          case 1:
            return (
              <div>
                {" "}
                <ArrowBack
                  className="mobileView"
                  onClick={() => {
                    setMobileView("menu");
                  }}
                />
                {postMessage && (
                  <div className="account__message">
                    {postMessage}
                    <Close
                      onClick={() => {
                        setPostMessage("");
                      }}
                    />
                  </div>
                )}
                <div className="account-content__info-line">
                  <h2>My Posts</h2>

                  <div className="account-content__buttons">
                    <div
                      className="btn account-content__buttons-btn-create"
                      // onClick={() => {
                      //   setAccountContent(3);
                      //   setAccountBrandForm(0);
                      // }}
                    >
                      ADD NEW POST
                    </div>
                  </div>
                </div>
                <div className="account-content__info-container">
                  {allPosts.get().map((post, i) => {
                    return (
                      <div
                        className="account-content__info-line bordered"
                        key={i}
                      >
                        <div
                          className="account-content__label"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>
                        {/*<div className="account-content__buttons">*/}
                        {/*  <div*/}
                        {/*    className="btn account-content__buttons-btn-edit"*/}
                        {/*    data-value={brand.id}*/}
                        {/*    onClick={() => {*/}
                        {/*      setAccountContent(3);*/}
                        {/*      setAccountBrandForm(1);*/}
                        {/*      getBrandById(brand.id);*/}
                        {/*    }}*/}
                        {/*  >*/}
                        {/*    EDIT*/}
                        {/*  </div>*/}
                        {/*  <div*/}
                        {/*    className="btn account-content__buttons-btn-delete"*/}
                        {/*    data-value={brand.id}*/}
                        {/*    onClick={(e) => deleteBrand(e)}*/}
                        {/*  >*/}
                        {/*    DELETE*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                      </div>
                    );
                  })}
                </div>
              </div>
            );

          case 2:
            return (
              <div>
                <ArrowBack
                  className="mobileView"
                  onClick={() => {
                    setMobileView("menu");
                  }}
                />
                {brandMessage && (
                  <div className="account__message">
                    {brandMessage}
                    <Close
                      onClick={() => {
                        setBrandMessage("");
                      }}
                    />
                  </div>
                )}
                <div className="account-content__info-line">
                  <h2>My Brands</h2>

                  <div className="account-content__buttons">
                    <div
                      className="btn account-content__buttons-btn-create"
                      onClick={() => {
                        setAccountContent(3);
                        setAccountBrandForm(0);
                      }}
                    >
                      ADD NEW BRAND
                    </div>
                  </div>
                </div>

                <div className="account-content__info-container">
                  {allBrands.get().map((brand, i) => {
                    return (
                      <div
                        className="account-content__info-line bordered"
                        key={i}
                      >
                        <div
                          className="account-content__label"
                          dangerouslySetInnerHTML={{ __html: brand.name }}
                        ></div>
                        <div className="account-content__buttons">
                          <div
                            className="btn account-content__buttons-btn-edit"
                            data-value={brand.id}
                            onClick={() => {
                              setAccountContent(3);
                              setAccountBrandForm(1);
                              getBrandById(brand.id);
                            }}
                          >
                            EDIT
                          </div>
                          <div
                            className="btn account-content__buttons-btn-delete"
                            data-value={brand.id}
                            onClick={(e) => deleteBrand(e)}
                          >
                            DELETE
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                />
              </div>
            );
          default:
            return (
              <div>
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
                    <div className="account-content__value">{session[1]}</div>
                  </div>
                  <div className="account-content__info-line">
                    <div className="account-content__label">
                      <LockOpen />
                      Password
                    </div>
                    <div className="account-content__value">*******</div>
                  </div>
                  <div className="account-content__info-line">
                    <div className="account-content__label">
                      <StarOutline />
                      Status
                    </div>
                    <div className="account-content__value">is_Premium</div>
                  </div>
                  <div className="account-content__info-line">
                    <div className="account-content__label">
                      <MailOutline />
                      Email
                    </div>
                    <div className="account-content__value">
                      youremail@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
}
