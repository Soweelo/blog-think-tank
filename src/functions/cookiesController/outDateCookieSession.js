export default function outDateCookieSession(option1, option2) {
  document.cookie =
    "YW-session-token=" +
    option1 +
    "; SameSite=Lax; Secure;expires=Thu, 18 Dec 2013 12:00:00 UTC;";
  document.cookie =
    "YW-session-pseudo=" +
    option2 +
    "; SameSite=Lax; Secure;expires=Thu, 18 Dec 2013 12:00:00 UTC;";
}
