/** @format */

// services/rtk.api.service.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { APIURL } from "@/constants";
import baseQueryWithAxios from "./baseQueryWithAxios";

export const rtkApi = createApi({
  baseQuery: baseQueryWithAxios,
  tagTypes: ["userProfile", "User"],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getCountryList: builder.query({
      query: () => ({
        url: APIURL.COUNTRY_LIST,
        method: "GET",
        meta: { showSuccess: false },
      }),
    }),
    userSignup: builder.mutation({
      query: (signupBody) => ({
        url: APIURL.REGISTER,
        method: "POST",
        data: signupBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    signupOtp: builder.mutation({
      query: (otpBody) => ({
        url: APIURL.SIGNUP_OTP,
        method: "POST",
        data: otpBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    userLogin: builder.mutation({
      query: (loginDetail) => ({
        url: APIURL.LOGIN,
        method: "POST",
        data: loginDetail,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    forgotTwoFA: builder.mutation({
      query: (twoFABoday) => ({
        url: APIURL.FORGOT_TWO_FA,
        method: "POST",
        data: twoFABoday,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: APIURL.LOGOUT,
        method: "POST",
        meta: { showSuccess: true, showError: true },
      }),
    }),
    txnHistory: builder.mutation({
      query: (txnBody) => ({
        url: APIURL.TXN_HISTORY,
        method: "POST",
        data: txnBody,
        meta: { showSuccess: false, showError: false },
      }),
    }),
    uploadFile: builder.mutation({
      query: (fileUploadBody) => ({
        url: APIURL.FILE_UPLOAD,
        method: "POST",
        data: fileUploadBody,
        meta: {
          showSuccess: true,
          showError: false,
        },
      }),
    }),
    kycSubmit: builder.mutation({
      query: (kycSubmitBody) => ({
        url: APIURL.KYC_SUBMIT,
        method: "POST",
        data: kycSubmitBody,
        meta: { showSuccess: true, showError: true },
      }),
      invalidatesTags: ["userProfile"],
    }),
    regulakycSubmit: builder.mutation({
      query: (kycSubmitBody) => ({
        url: APIURL.KYC_REGULA,
        method: "POST",
        data: kycSubmitBody,
        meta: { showSuccess: true, showError: true },
      }),
      invalidatesTags: ["userProfile"],
    }),
    getTokenPrice: builder.query({
      query: () => ({
        url: APIURL.BUY_PRICE_CONVERSION,
        method: "GET",
        meta: { showSuccess: false, showError: false },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (forgotPassBody) => ({
        url: APIURL.FORGOT_PASSWORD,
        method: "POST",
        data: forgotPassBody,
        meta: {
          showSuccess: true,
          showError: true,
        },
      }),
    }),
    forgotPasswordOtp: builder.mutation({
      query: (otpPassBody) => ({
        url: APIURL.FORGOT_PASSWORD_OTP,
        method: "POST",
        data: otpPassBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    updatePassword: builder.mutation({
      query: (updatePassBody) => ({
        url: APIURL.UPDATE_PASSWORD,
        method: "PATCH",
        data: updatePassBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    changePassword: builder.mutation({
      query: (changePassBody) => ({
        url: APIURL.CHANGE_PASSWORD,
        method: "PATCH",
        data: changePassBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: APIURL.USER_PROFILE,
        method: "GET",
        meta: { showSuccess: false, showError: false },
      }),
      providesTags: ["userProfile"],
    }),
    updateProfile: builder.mutation({
      query: (profileBody) => ({
        url: APIURL.UPDATE_PROFILE,
        method: "PATCH",
        data: profileBody,
        meta: { showSuccess: true, showError: true },
      }),
      invalidatesTags: ["userProfile"],
    }),
    createOrder: builder.mutation({
      query: (createOrderBody) => ({
        url: APIURL.CREATE_ORDER,
        method: "POST",
        data: createOrderBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    placeOrder: builder.mutation({
      query: (placeOrderBody) => ({
        url: APIURL.PLACE_ORDER,
        method: "POST",
        data: placeOrderBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    userWalletbalance: builder.query({
      query: () => ({
        url: APIURL.USER_BALANCE,
        method: "GET",
        meta: { showSuccess: false },
      }),
    }),
    withdrawRequest: builder.mutation({
      query: (withdrawBody) => ({
        url: APIURL.WITHDRAW_REQUEST,
        method: "POST",
        data: withdrawBody,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    phaseDetails: builder.query({
      query: () => ({
        url: APIURL.PHASE_DETAILS,
        method: "GET",
        meta: { showSuccess: false, showError: false },
      }),
      keepUnusedDataFor: 0,
    }),
    setting2Fa: builder.mutation({
      query: (body2fa) => ({
        url: APIURL.SETTING_2FA,
        method: "PATCH",
        data: body2fa,
        meta: { showSuccess: true, showError: true },
      }),
    }),
    googleValidate: builder.mutation({
      query: (googleValidateBody) => ({
        url: APIURL.GOOGLE_VALIDATE,
        method: "PATCH",
        data: googleValidateBody,
        meta: { showSuccess: true, showError: true },
      }),
      invalidatesTags: ["userProfile"],
    }),
    orderHistory: builder.mutation({
      query: (orderHistoryBody) => ({
        url: APIURL.ORDER_HISTORY,
        method: "POST",
        data: orderHistoryBody,
      }),
    }),
    sumSub_kyc: builder.query({
      query: () => ({
        url: APIURL.SUMSUB_KYC,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    contactUs: builder.mutation({
      query: (contactBody) => ({
        url: APIURL.CONTACT_US,
        method: "POST",
        data: contactBody,
        meta: {
          showSuccess: true,
          showError: true,
        },
      }),
    }),
    subscribeUs: builder.mutation({
      query: (contactBody) => ({
        url: APIURL.SUBSCRIBE_US,
        method: "POST",
        data: contactBody,
        meta: {
          showSuccess: true,
          showError: true,
        },
      }),
    }),
    buyWithFiat: builder.mutation({
      query: (buyFiatBody) => ({
        url: APIURL.BUY_FIAT,
        method: "POST",
        data: buyFiatBody,
        meta: {
          showSuccess: true,
          showError: true,
        },
      }),
    }),
    vestingOrder: builder.mutation({
      query: (orderBody) => ({
        url: APIURL.VESTING_ORDERS,
        method: "POST",
        data: orderBody,
        meta: {
          showSuccess: false,
          showError: false,
        },
      }),
    }),
    
  }),
});

export const {
  useGetCountryListQuery,
  useUserSignupMutation,
  useUserLoginMutation,
  useUploadFileMutation,
  useKycSubmitMutation,
  useRegulakycSubmitMutation,
  useLazyGetTokenPriceQuery,
  useForgotPasswordMutation,
  useForgotPasswordOtpMutation,
  useUpdatePasswordMutation,
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useCreateOrderMutation,
  usePlaceOrderMutation,
  useUserWalletbalanceQuery,
  useUserLogoutMutation,
  useWithdrawRequestMutation,
  useTxnHistoryMutation,
  useSetting2FaMutation,
  useGoogleValidateMutation,
  useSignupOtpMutation,
  useForgotTwoFAMutation,
  useUpdateProfileMutation,
  useOrderHistoryMutation,
  usePhaseDetailsQuery,
  useSumSub_kycQuery,
  useContactUsMutation,
  useSubscribeUsMutation,
  useBuyWithFiatMutation,
  useVestingOrderMutation
  
} = rtkApi;
