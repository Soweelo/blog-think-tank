import {
  ArrowBack,
  Close,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import { useFetch } from "../../../../hooks/useFetch";
import { UserContext } from "../../../../context/UserContext";
import { logout } from "../../../../context functions/apiCalls";

export default function Brand({
 setMobileView,
  setAccountContent,
  accountBrandForm,
  setAccountBrandForm,
  brandContent,
  setBrandContent,
                                  // callbackBrandContent,
  getAllBrands,
  allBrands,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(UserContext);
  const [brandMessage, setBrandMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nb_postsToDelete, setnb_postsIdToDelete] = useState(0);
  const [idToUpdate, setIdToUpdate] = useState(null)
  const fetch = useFetch();
  const askConfirm = (e) => {
    e.preventDefault();
    const id = e.target.attributes["data-value"].value;
    const np_posts = e.target.attributes["data-nb_posts"].value;
    setIdToDelete(id);
    setnb_postsIdToDelete(np_posts);
    setOpenConfirm(true);
  };

  const getBrandById = (elemId) => {
    allBrands.get().map((brand, i) => {
        // console.log(brand, elemId)
      if (brand.id === elemId) {
          setBrandContent([brand.id, brand.name, brand.link])
          // console.log([brand.id, brand.name, brand.link]);
           return;
      }
       return;
    });
 return
  };
    const editBrand =(e) =>{
        e.preventDefault();
        const id = e.target.attributes["data-value"].value;
        setIdToUpdate(id);
        // console.log(id, e.target)
        getBrandById(parseInt(id))
        //
        setAccountContent(3);
        setAccountBrandForm(1);
        // console.log(brandContent)
    }
  const deleteBrand = async (id) => {
    try {
      const response = await fetch(
        PF + "/api/brands/" + id + "?token=" + user.session,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (data.success) {
        setBrandMessage(data.message);
        await getAllBrands();
      } else {
        if (data.message === "This session token is not valid") {
          logout(dispatch);
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
// useEffect(()=> {
//     console.log(idToUpdate.get())
//     if(idToUpdate){
//         getBrandById(idToUpdate.get())
//     }
// },[idToUpdate])
// console.log("brandcontent dans BRAND List",brandContent)
  return (
    <div className="account-content__brands-wrapper">
      <ArrowBack
        className="mobileView"
        onClick={(e) => {
          e.preventDefault();
          setMobileView("menu");
        }}
      />
      {openConfirm && (
        <div className="account__message--delete">
          {nb_postsToDelete !== "0" ? (
            <div className="account__message-delete-text">
              You have {nb_postsToDelete} posts tagged with this link.
              <br /> Still want to delete?
            </div>
          ) : (
            <div className="account__message-delete-text">
              Delete this brand?
              <br /> None of your posts is tagged with this link.
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
                setAccountBrandForm(0);
                setAccountContent(3);
            }}
          >
            ADD NEW LINK
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
                  onClick={(e) => {
                  editBrand(e)
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
