/** @format */

export interface User {
  name: string;
  id: string;
}

export interface KycFormValues {
  documentType: string;
  documentNumber: string;
  documentFront: File | null;
  documentBack: File | null;
  selfie: File | null;
}

export interface DocumentUpload {
  documentFront: string;
  documentBack: string;
  selfie: string;
}
//otp modal on buy token
interface OrderData {
  email: string;
  transactionId: string;
}
export interface OtpModalBuyProps {
  showOtp: boolean;
  orderData: OrderData;
  handleCloseOtp: () => void;
  refetchWalletBalance: () => void;
}

// buy modal interfaces

export interface PropsType {
  showBuy: boolean;
  userWallets: any[];
  handleCloseBuy: () => void;
  refetchWalletBalance: () => void;
  mergedCoinData: any;
  phaseDetails: any;
  selectedWallet?: any
}
export interface CurrencyType {
  coin: string;
  balance: number;
  address?: string;
  is_crypto?: number;
}

//deposit modal props interface
export interface depositProps {
  handleClose: () => void;
  selectedWallet: any;
  show: boolean;
}

//withdraw token props interface
interface CoinBalance {
  coin: string;
  address: string;
  balance: number;
  locked_balance: number;
  is_crypto: number;
  [key: string]: any; // Add this if there are other optional properties
}
export interface withdrawProps {
  allCoinBalance: CoinBalance[];
  handleCloseWithdraw: () => void;
  showWithdraw: boolean;
  selectedWallet: string | null;
}

// txn history interface
export interface HistoryItem {
  tx_id: string;
  coin: string;
  amount: number;
  address: string;
  status: string;
}

// interface for login response

interface Data {
  maxOtpCount: number;
  is2FA: number;
}

export type LoginResponse = {
  data: { token?: string; maxOtpCount?: number; is2FA?: number, isVerified: true };
  error: false;
  message: string;
  status: number;
};

export type LoginFormValues = {
  email: string;
  password: string;
  recaptchaToken: string;
};

// PhaseDetail type
interface PhaseDetail {
  icoPhaseName: string;
  id: string;
  isDeleted: string;
  isPhaseActive: string;
  limit: number;
  phaseEndDate: string;
  phaseNumber: number;
  phaseStartDate: string;
  contractAddress: string;
  price: number;
  reason: string;
  sold: number;
}

// phaseDetailsType
export interface phaseDetailsType {
  upcomingPhase: any;
  phaseDetails: PhaseDetail[];
}

// propType for withdraw
interface coinDetrtails {
  coin?: string;
  address?: string;
  balance?: number;
  locked_balance?: number;
  is_crypto?: number;
  icon_url?: string;
  full_name?: string;
}
export interface withdrawInterface {
  showWithdraw: boolean;
  allCoinBalance: coinDetrtails[];
  handleCloseWithdraw: () => void;
  coin: string;
  selectedCoin: {
    coin?: string;
    address?: string;
    balance?: number;
    locked_balance?: number;
    is_crypto?: number;
    icon_url?: string;
    full_name?: string;
  };
}

// type for userData
interface UserDetail {
  firstName: string;
  dob: string;
  lastName: string;
  gender: string;
  state: string;
  city: string;
  address: string;
  postCode: string;
  countryId: string;
  NIN_number: string | null;
  BVN_number: string | null;
  currency: string;
  passport: string | null;
  country: string | null;
}

export interface UserData {
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE"; // Assuming status can be either ACTIVE or INACTIVE
  phoneNumber: string;
  profileImage: string;
  is2Fa: boolean;
  user_role: "USER" | "ADMIN" | "MODERATOR"; // Assuming roles can be USER, ADMIN, or MODERATOR
  kycStatus:
  | "NOT_INITIATED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUBMITTED"; // Assuming KYC status can be PENDING, APPROVED, or REJECTED
  isCompleted: number;
  kycRetryCount: number;
  userDetail: UserDetail;
}
