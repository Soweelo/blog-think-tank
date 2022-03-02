import "./backhomebutton.scss";
import Home from "@material-ui/icons/Home";

export default function BackHomeButton({ setHomeContent }) {
  const changeContent = (e) => {
    setHomeContent(e.target.id);
    // console.log("click" + e.target.id);
  };
  return (
    <div className="bckHome" onClick={(e) => changeContent(e)} id="0">
      <Home />
    </div>
  );
}
