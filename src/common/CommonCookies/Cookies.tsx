import Cookies from "js-cookie";

export function setIsLogin(isLogin: string, daysToExpire?: number) {
  Cookies.set("isLogin", isLogin);
}

export function removeIsLogin() {
  Cookies.remove("isLogin");
}

export function getIsLogin() {
  return Cookies.get("isLogin");
}
