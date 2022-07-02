import "./thinktankitem.scss";
import { Favorite, Share, Comment } from "@material-ui/icons";
import { memo } from "react";
// import Modal from "../modal/Modal"

export default memo(function ThinkTankItem({
  id,
  images,
  title,
  tags,
  url,
  text,
  date,
  setShowModal,
  setModalVar,
  brand,
    type,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const updateModalVar = (e) => {
    setModalVar([images, title, tags, url, text, date, brand, id,type]);
    setShowModal(true);
    // console.log([images,title,tags,url,text,date, brand])
  };

  return (
    <>
      <div className="thinktankItem" onClick={(e) => updateModalVar()}>
        {images ? (
          <img
            src={PF + "/" + images.small}
            srcSet={`${PF + "/" + images.thumb} 768w, ${
              PF + "/" + images.small
            } 3200w`}
            alt={title}
          />
        ) : (
          <img
            src={
              PF +
              "/storage/app/public/your-world-3-0-default-black-background.jpeg"
            }
            alt={title}
          />
        )}

        <div className="thinktankItem__tags">
          {tags.map((p, index) => (
            <p key={index}>#{tags[index]}</p>
          ))}
        </div>
        <div className="thinktankItem__message">{title}</div>
        {url !== 0 && <div className="thinktankItem__url">{brand}</div>}

        <div className="thinktankItem__icons">
          <div className="icon1">
            <Favorite />
          </div>
          <div className="icon2">
            <Share />
          </div>
          <div className="icon3">
            <Comment />
          </div>
        </div>
      </div>
    </>
  );
});
