
import axios from "axios";
import toaster from "@/common/Toast";
import { RESPONSES } from "@/constants";
import { setLoading } from "@/lib/redux/slices/loaderSlice";
import axiosInstance from "./axiosInstance";
import { removeIsLogin } from "@/common/CommonCookies/Cookies";

let lastErrorTime = 0;
const ERROR_DEBOUNCE_TIME = 3000; // Time in milliseconds to debounce error messages

const baseQueryWithAxios = async (
  { url, method, data, meta = {} }: any,
  api: any
) => {
  const { showSuccess, showError, successMessage, errorMessage }: any = meta;
  if (url === "transaction/subOrders") {
    api.dispatch(setLoading(false)); // Dispatch loading action
  } else {
    api.dispatch(setLoading(true));
  }

  setTimeout(() => {
    api.dispatch(setLoading(false));
  }, 10000);
  const handleRedirectLogin = () => {
    removeIsLogin();
    localStorage.clear();
    window.location.replace("/");
    // window.location.replace("/sign-in");
  };

  try {
    const response = await axiosInstance({
      url,
      method,
      data,
    });
    api.dispatch(setLoading(false)); // Dispatch loading action
    if (url === 'user/contact_us') {
      toaster.success(successMessage || response?.data?.message, {duration: 10000});
    } 
    // else {
    //   toaster.success(successMessage || response?.data?.message);
    // }
    return { data: response.data };
  } catch (error) {
    api.dispatch(setLoading(false)); // Dispatch loading action
    const currentTime = Date.now();
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        if (currentTime - lastErrorTime > ERROR_DEBOUNCE_TIME) {
          toaster.error(
            "The server is not responding. Please try again later."
          );
          lastErrorTime = currentTime;
          // handleRedirectLogin();
        }
        return {
          error: {
            status: "NETWORK_ERROR",
            data: "The server is not responding.",
          },
        };
      }

      if (error.response?.status === RESPONSES.UN_AUTHORIZED) {
        toaster.error("Session Expired");
        handleRedirectLogin();
        return {
          error: { status: error.response?.status, data: error.response?.data },
        };
      }


      if (showError && currentTime - lastErrorTime > ERROR_DEBOUNCE_TIME) {
        toaster.error(errorMessage || error.response?.data?.message);
        lastErrorTime = currentTime;
      }
      return {
        error: { status: error.response?.status, data: error.response?.data },
      };
    } else {
      if (currentTime - lastErrorTime > ERROR_DEBOUNCE_TIME) {
        toaster.error("An unexpected error occurred. Please try again later.");
        lastErrorTime = currentTime;
      }
      return {
        error: {
          status: "UNEXPECTED_ERROR",
          data: "An unexpected error occurred.",
        },
      };
    }
  } finally {
    api.dispatch(setLoading(false)); // Dispatch loading action
  }
};

export default baseQueryWithAxios;
