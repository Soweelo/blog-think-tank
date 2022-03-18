export default function setCookieSession(option1, option2) {
  document.cookie =
    "YW-session-token=" + option1 + "; SameSite=Lax; Secure;max-age=7200";
  document.cookie =
    "YW-session-pseudo=" + option2 + "; SameSite=Lax; Secure;max-age=7200";
}
