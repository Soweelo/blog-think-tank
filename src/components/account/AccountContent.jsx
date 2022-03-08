import { useState, useEffect } from "react";
import "./accountcontent.scss";
import AutoCSearchbar from "../autoCSearchBar/AutoCSearchbar";
import { useFetch } from "../../hooks/useFetch";

export default function AccountContent({
  accountContent,
  session,
  setAccountContent,
}) {
  const [allBrands, setAllBrands] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();

  const getAllBrands = async () => {
    try {
      const response = await fetch(PF + "/api/brands/list?token=" + session[0]);
      const data = await response.json();
      console.log(data.data);
      setAllBrands(data.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    getAllBrands();
  }, [session]);
  return (
    <div className="account-content__wrapper">
      {(() => {
        switch (accountContent) {
          case 1:
            return (
              <div>
                <h2>My Posts</h2>
                <div className="account-content__info-line"></div>;
              </div>
            );

          case 2:
            return (
              <div>
                <div className="account-content__info-line">
                  <h2>My Brands</h2>
                  <div className="account-content__buttons">
                    <div
                      className="btn account-content__buttons-btn-create"
                      onClick={() => {
                        setAccountContent(3);
                      }}
                    >
                      ADD NEW BRAND
                    </div>
                  </div>
                </div>

                <div className="account-content__info-container">
                  {allBrands.map((brand, i) => {
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
                          <div className="btn account-content__buttons-btn-edit">
                            EDIT
                          </div>
                          <div className="btn account-content__buttons-btn-delete">
                            DELETE
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );

          default:
            return (
              <div>
                <h2>My Account</h2>
                <div className="account-content__info-container">
                  <div className="account-content__info-line">
                    <div className="account-content__label">Pseudo</div>
                    <div className="account-content__value">{session[1]}</div>
                  </div>
                  <div className="account-content__info-line">
                    <div className="account-content__label">Password</div>
                    <div className="account-content__value">*******</div>
                  </div>
                  <div className="account-content__info-line">
                    <div className="account-content__label">Status</div>
                    <div className="account-content__value">is_Premium</div>
                  </div>
                  <div className="account-content__info-line">
                    <div className="account-content__label">Email</div>
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
