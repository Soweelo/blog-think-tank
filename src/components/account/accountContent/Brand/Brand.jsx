import "./brand.scss";
import {
  ArrowBack,
  Cancel,
  Close,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";
import { useFetch } from "../../../../hooks/useFetch";

export default function Brand({
  setMobileView,
  mobileView,
  session,
  accountContent,
  setAccountContent,
  accountBrandForm,
  setAccountBrandForm,
  brandContent,
  setBrandContent,
  isValidToken,
  setIsValidToken,
  setHomeContent,
  getAllBrands,
  allBrands,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [brandMessage, setBrandMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nb_postsToDelete, setnb_postsIdToDelete] = useState(0);

  const fetch = useFetch();

  const askConfirm = (e) => {
    e.preventDefault();
    const id = e.target.attributes["data-value"].value;
    const np_posts = e.target.attributes["data-nb_posts"].value;
    setIdToDelete(id);
    setnb_postsIdToDelete(np_posts);
    setOpenConfirm(true);
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
  const deleteBrand = async (id) => {
    // e.preventDefault();
    // // console.log(e.target.attributes["data-value"].value);
    // const id = e.target.attributes["data-value"].value;
    // console.log("delete");
    try {
      // console.log("in try", "id", id, "session", session[0]);

      const response = await fetch(
        PF + "/api/brands/" + id + "?token=" + session[0],
        { method: "DELETE" }
      );

      const data = await response.json();
      // console.log("data", data);
      // console.log("response", response, id);
      if (data.success) {
        // console.log(data);
        setBrandMessage(data.message);
        await getAllBrands();
      } else {
        // console.log(data);
        if (data.message === "This session token is not valid") {
          console.log("session expired");
          outDateCookieSession(session[0], session[1]);
          setIsValidToken(false);
          setHomeContent("0");
        } else {
          setBrandMessage(data.message);
          await getAllBrands();
        }
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
    setIdToDelete(null);
    setnb_postsIdToDelete(0);
    setOpenConfirm(false);
  };
  useEffect(() => {
    getAllBrands();
  }, [accountBrandForm]);
  return (
    <div>
      <ArrowBack
        className="mobileView"
        onClick={() => {
          setMobileView("menu");
        }}
      />
      {openConfirm && (
        <div className="account__message--delete">
          {nb_postsToDelete !== "0" ? (
            <div className="account__message-delete-text">
              You have {nb_postsToDelete} posts tagged with this brand.
              <br /> Still want to delete?
            </div>
          ) : (
            <div className="account__message-delete-text">
              Delete this brand?
              <br /> None of your posts is tagged with this brand.
            </div>
          )}

          <div className="account__message-delete-btn">
            <button
              onClick={() => {
                // console.log(idToDelete);
                deleteBrand(idToDelete);
              }}
            >
              yes
            </button>
            <button
              onClick={() => {
                setOpenConfirm(false);
                setIdToDelete(null);
                setnb_postsIdToDelete(0);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
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
            <div className="account-content__info-line bordered" key={i}>
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
                  data-nb_posts={brand.nb_posts}
                  onClick={(e) => askConfirm(e)}
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
}
