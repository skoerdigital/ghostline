const cookieBanner = document.querySelector("#cookie-banner");
const acceptCookies = document.querySelector("#cookie-accept");
const cookieSettingsButtons = document.querySelectorAll(".cookie-settings");
const COOKIE_STORAGE_KEY = "ghostlineCookieConsent";

const getCookieConsent = () => {
  try {
    return JSON.parse(localStorage.getItem(COOKIE_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

const setCookieConsent = () => {
  localStorage.setItem(
    COOKIE_STORAGE_KEY,
    JSON.stringify({
      necessary: true,
      updatedAt: new Date().toISOString(),
    }),
  );
};

const showCookieBanner = () => {
  if (cookieBanner) {
    cookieBanner.hidden = false;
  }
};

const hideCookieBanner = () => {
  if (cookieBanner) {
    cookieBanner.hidden = true;
  }
};

if (!getCookieConsent()) {
  showCookieBanner();
}

acceptCookies?.addEventListener("click", () => {
  setCookieConsent();
  hideCookieBanner();
});

cookieSettingsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showCookieBanner();
  });
});
