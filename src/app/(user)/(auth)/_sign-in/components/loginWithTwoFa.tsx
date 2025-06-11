/** @format */

import { useSignupOtpMutation } from "@/services/rtk.api.service";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import OtpInput from "otp-input-react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Action, Dispatch } from "redux";
import * as Yup from "yup";
import ForgotTwoFaModal from "./forgotTwoFaModal";
import { RESPONSES } from "@/constants";
import { setJwtToken } from "@/lib/redux/slices/tokenSlice";
import { Button, CommonModal } from "@/common";
import { setIsLogin } from "@/common/CommonCookies/Cookies";

type Props = {
  show2FA: boolean;
  handleCloseTwoFa: () => void;
  email: string;
};
type valuesType = {
  otp: string;
  tOtp: string;
};
const twoFaOtpValidation = Yup.object().shape({
  otp: Yup.string()
    .required("Please enter security code")
    .matches(/^\d{6}$/, "Security code must be 6 digits"),
  tOtp: Yup.string()
    .required("Please enter security code")
    .matches(/^\d{6}$/, "Security code must be 6 digits"),
});

function LoginWithTwoFa(props: Props) {
  const router = useRouter();
  const [signupOtp] = useSignupOtpMutation();
  const { show2FA, handleCloseTwoFa, email } = props;
  const dispatch: Dispatch<Action<string>> = useDispatch();
  const [showforgotTwoFaModal, setForgotTwoFaModal] = useState<boolean>(false);

  const handleShowForgotTwoFA = () => setForgotTwoFaModal(true);
  const handleCloseForgotTwoFa = () => {
    setForgotTwoFaModal(false);
    resetForm();
  };
  const handleForgotTwoFa = () => {
    handleCloseTwoFa();
    handleShowForgotTwoFA();
  };

  const handleTwoFaOtpSubmit = async (values: valuesType) => {
    try {
      let data = {
        otp: values.otp,
        type: "SignIn",
        tOtp: values?.tOtp,
        email: email,
      };
      const response: any = await signupOtp(data);
      if (response?.data?.status === RESPONSES.SUCCESS) {
        dispatch(setJwtToken(response?.data?.token));
        setIsLogin("TRUE", 7);
        handleCloseTwoFa();
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {}
  };

  const { values, errors, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues: {
      otp: "",
      tOtp: "",
    },
    validationSchema: twoFaOtpValidation,
    onSubmit: async (values) => {
      handleTwoFaOtpSubmit(values);
    },
  });

  const setOTP = (e: string) => {
    setFieldValue("otp", e);
  };

  const setTwoFa = (e: string) => {
    setFieldValue("tOtp", e);
  };

  return (
    <>
      <CommonModal
        show={show2FA}
        backdrop="static"
        onHide={handleCloseTwoFa}
        title="Two-Factor Authentication"
        className="google_auth_modal"
      >
        <form onSubmit={handleSubmit} className="otp_form">
          <Row>
            <Col xs={12}>
              <div className="otp_form__inner">
                <label>
                  Enter security code sent on email{" "}
                  <span className="astric">*</span>
                </label>
                <OtpInput
                  className="otpField"
                  value={values.otp}
                  onChange={setOTP}
                  OTPLength={6}
                  otpType="number"
                />
                {errors.otp && <p className="error_message">{errors.otp}</p>}
              </div>
            </Col>
            <Col xs={12}>
              <div className="otp_form__inner">
                <label>
                  Verification code for authenticator
                  <span className="astric">*</span>
                </label>
                <OtpInput
                  className="otpField"
                  value={values.tOtp}
                  onChange={setTwoFa}
                  OTPLength={6}
                  otpType="number"
                />
                {errors.tOtp && <p className="error_message">{errors.tOtp}</p>}
              </div>
            </Col>

            <Col xs={6}>
              <Button type="submit" className="w-100" text="Confirm" />
            </Col>
            <Col xs={6}>
              <Button
                type="button"
                className="w-100"
                text="Forgot 2FA"
                onClick={handleForgotTwoFa}
              />
            </Col>
          </Row>
        </form>
      </CommonModal>
      <ForgotTwoFaModal
        handleCloseForgotTwoFa={handleCloseForgotTwoFa}
        email={email}
        showforgotTwoFaModal={showforgotTwoFaModal}
      />
    </>
  );
}

export default LoginWithTwoFa;
