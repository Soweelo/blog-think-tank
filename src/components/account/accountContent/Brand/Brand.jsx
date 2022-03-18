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
  setHomeContent,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [brandMessage, setBrandMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const allBrands = useTrait([]);
  const getAllBrands = async () => {
    // console.log("in getallbrands");

    try {
      const response = await fetch(PF + "/api/brands/list?token=" + session[0]);
      const data = await response.json();
      // console.log(data.data);
      if (data.success) {
        allBrands.set(data.data);
      } else {
        setHomeContent("0");
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };

  const askConfirm = (e) => {
    e.preventDefault();
    const id = e.target.attributes["data-value"].value;
    setIdToDelete(id);
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
        setBrandMessage(data.message);
        await getAllBrands();
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
    setIdToDelete(null);
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
          <div className="account__message-delete-text">
            You have ... posts with this tag.
            <br /> Still want to delete?
          </div>
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
