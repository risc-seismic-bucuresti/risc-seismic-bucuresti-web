const checkCookieValue = (key, value) => {
  return document.cookie.split(';').some((item) => item.includes(`${key}=${value}`));
};

export default {
  checkCookieValue
};