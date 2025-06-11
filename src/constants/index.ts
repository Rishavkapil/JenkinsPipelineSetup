/************************** Used  ***********************/
// export const ETH_URL_TX = process.env.NEXT_PUBLIC_ETH_URL_TX;
// export const ETH_URL = process.env.NEXT_PUBLIC_ETH_URL;

export const SEPOLIA_URL_TX = 'https://sepolia.etherscan.io/tx/';
export const SEPOLIA_TO_URL = 'https://sepolia.etherscan.io/address/';
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const RE_CAPTCHA_SITE_KEY = process.env
  .NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY as string;
export const SMALLEST_UNIT = process.env.NEXT_PUBLIC_SMALLEST_UNIT as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET;
export const REGULA_LICENSE = process.env.NEXT_PUBLIC_REGULA_LICENSE;
export const S3_URL = process.env.NEXT_PUBLIC_S3_URL as string;
export const S3_URL_REPLACE = process.env.NEXT_PUBLIC_S3_URL_REPLACE as string;
export const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
export const AW_TRACKING_ID = process.env.NEXT_PUBLIC_AW_TRACKING_ID;
export const GA4_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_TRACKING_ID;
export const LIMIT = 10;
export const DIGIT_AFTER_DECIMAL = 6;
export const DECIMAL = 100000000;
export const ERROR_DEBOUNCE_TIME = 3;


export const SUMSUB_KYC = 'enable';
export const TOKEN_NAME = 'Ozolio';
export const TOKEN_DECIMAL = 18;
export const TOKEN_SYMBOL = 'OZOT';
export const NON_HEX_CHAIN_ID = '11155111';
export const CHAIN_ID = '0xaa36a7';
export const RPC_URL = 'https://rpc.ankr.com/eth_sepolia';
export const EXPLORER_LINK = 'https://sepolia.etherscan.io';
export const BLOCK_EXPLORER_URL = 'https://sepolia.etherscan.io';
export const NETWORK_NAME = 'Sepolia';
export const NETWORK_SYMBOL = 'SepoliaETH';
export const OWNERS_ADDRESS = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

export enum APIURL {
  COUNTRY_LIST = "country/all",
  REGISTER = "auth/signup",
  SIGNUP_OTP = "auth/verify_otp",
  LOGIN = "auth/login",
  LOGOUT = "auth/logout",
  USER_BALANCE = "User/balance?portfolioBalance=1",
  TXN_HISTORY = "transaction/history",
  FILE_UPLOAD = "file/upload",
  KYC_SUBMIT = "kyc",
  KYC_REGULA = "KYC",
  BUY_PRICE_CONVERSION = "buy/buy_token_price_conversion",
  FORGOT_PASSWORD = "auth/forgot_password",
  FORGOT_PASSWORD_OTP = "auth/verify_otp",
  UPDATE_PASSWORD = "auth/update_password",
  CHANGE_PASSWORD = "user/profile/change_password",
  USER_PROFILE = "user/profile",
  UPDATE_PROFILE = "user/profile",
  CREATE_ORDER = "buy/create_order",
  PLACE_ORDER = "buy/place_order",
  WITHDRAW_REQUEST = "transaction/withdraw_request",
  SETTING_2FA = "user/2Fa_settings",
  GOOGLE_VALIDATE = "user/google2faValidate",
  FORGOT_TWO_FA = "user/forget2FaKey",
  ORDER_HISTORY = "transaction/failed_order",
  PHASE_DETAILS = "phases/active_phase",
  SUMSUB_KYC = "sumsub/sum-sub-token",
  CONTACT_US = "user/contact_us",
  SUBSCRIBE_US = "user/subscribe_us",
  BUY_FIAT = "buy/buy_fiat",
  VESTING_ORDERS = 'transaction/subOrders'
}

export enum RESPONSES {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NOCONTENT = 204,
  BADREQUEST = 400,
  UN_AUTHORIZED = 401,
  INVALID_REQ = 422,
  FORBIDDEN = 403,
  NOTFOUND = 404,
  TIMEOUT = 408,
  TOOMANYREQ = 429,
  INTERNALSERVER = 500,
  BADGATEWAYS = 502,
  SERVICEUNAVILABLE = 503,
  GATEWAYTIMEOUT = 504,
}

export const KYC_STATUS: any = {
  REJECTED: 'REJECTED',
  APPROVED: 'APPROVED',
  INPROGRESS: 'INPROGRESS',
  NOT_INITIATED: 'NOT_INITIATED'
}