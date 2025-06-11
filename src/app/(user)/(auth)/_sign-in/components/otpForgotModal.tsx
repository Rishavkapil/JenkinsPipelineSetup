"use client";

import { useFormik } from "formik";
import OTPInput from "otp-input-react";
import { Modal } from "react-bootstrap";
import { useForgotPasswordOtpMutation } from "@/services/rtk.api.service";
import { useState } from "react";
import UpdatePassword from "./updatepassword";
import { otpSchema } from "@/schema/customSchema";
import { RESPONSES } from "@/constants";
import { Button, CommonModal } from "@/common";
import { setJwtToken } from "@/lib/redux/slices/tokenSlice";
import { Action, Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setCookie } from "nookies";
import { setIsLogin } from "@/common/CommonCookies/Cookies";

type Props = {
  email: string;
  handleCloseOtp: () => void;
  showOtp: boolean;
};

function OtpForgot(props: Props) {
  const { handleCloseOtp, showOtp, email } = props;
  const [forgotPasswordOtp] = useForgotPasswordOtpMutation();
  //handle update password modal
  const [showUpdate, setShowUpdate] = useState(false);
  const closeUpdatePass = () => setShowUpdate(false);
  const showUpdatePass = () => setShowUpdate(true);
  const dispatch: Dispatch<Action<string>> = useDispatch();

  const { values, setFieldValue, resetForm, errors, handleSubmit, touched } =
    useFormik({
      initialValues: {
        otp: "",
      },
      validationSchema: otpSchema,
      onSubmit: async (values) => {
        let data = {
          otp: values.otp,
          type: "ForgotPassword",
          email: email,
        };
        const response = await forgotPasswordOtp(data);
        if (response?.data?.status === RESPONSES.SUCCESS) {
          handleCloseOtp();
          resetForm();
          showUpdatePass && showUpdatePass();
          dispatch(setJwtToken(response?.data?.data?.token));
          // setCookie(null, "token",response?.data?.data?.token, {
          //   maxAge: 30 * 24 * 60 * 60,
          //   path: "/",
          // });
          setIsLogin("TRUE", 7);
        }
      },
    });

  const setOTP = (e: string) => {
    setFieldValue("otp", e);
  };

  return (
    <>
      <CommonModal
        backdrop="static"
        show={showOtp}
        onHide={() => {
          handleCloseOtp();
          resetForm();
        }}
        title="Please Enter security code"
      >
        <form onSubmit={handleSubmit} className="otp_form">
          <div className="otp_form__inner">
            <label>
              Enter security code <span className="astric">*</span>
            </label>
            <OTPInput
              className="otpField"
              value={values.otp}
              onChange={setOTP}
              OTPLength={6}
              otpType="number"
            />
            {errors.otp && <p className="error_message">{errors.otp}</p>}
          </div>
          <Button type="submit" className="w-100" text="Confirm" />
        </form>
      </CommonModal>
      <UpdatePassword
        showUpdate={showUpdate}
        closeUpdatePass={closeUpdatePass}
      />
    </>
  );
}

export default OtpForgot;
