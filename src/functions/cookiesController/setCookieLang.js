export default function setCookieLang(lang) {
  document.cookie = "YW-lang=" + lang + "; SameSite=Lax; Secure";
}
