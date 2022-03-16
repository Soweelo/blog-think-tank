import {
  ArrowBack,
  Cancel,
  Close,
  EmojiEmotions,
  Label,
  LockOpen,
  MailOutline,
  PermMedia,
  PersonOutline,
  Room,
  StarOutline,
} from "@material-ui/icons";

export default function AccountParams({ session, setMobileView }) {
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
          <div className="account-content__value">youremail@gmail.com</div>
        </div>
      </div>
    </div>
  );
}
