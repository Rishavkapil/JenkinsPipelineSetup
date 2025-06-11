/** @format */

"use client";

import { useFormik } from "formik";
import OTPInput from "otp-input-react";
import { Modal } from "react-bootstrap";
import { useGoogleValidateMutation } from "@/services/rtk.api.service";
import { twoFaOtpSchema } from "@/schema/customSchema";
import { useSelector } from "react-redux";
import { Button, CommonModal } from "@/common";
import { RootState } from "@/lib/redux/store";

type Props = {
  showOtp: boolean;
  handleCloseOtp: () => void;
  google2FAstatus?: Record<string, string>;
  refetchUserProfile: () => void;
};

function OtpModal(props: Props) {
  const { handleCloseOtp, showOtp, google2FAstatus } = props;
  const [googleValidate] = useGoogleValidateMutation();
  const user = useSelector(
    (state: RootState) => state?.reducers?.userDetails?.userDetail
  );

  const { handleSubmit, setFieldValue, values, errors, resetForm } = useFormik({
    initialValues: {
      otp: "",
      token: "",
    },
    validationSchema: twoFaOtpSchema,
    onSubmit: async (values) => {
      const typedata = user?.is2Fa ? "Disable2Fa" : "Enable2Fa";
      let data = {
        otp: values.otp,
        type: typedata,
        token: values?.token,
        secret: google2FAstatus?.secret,
        email: user?.email,
      };
      const response = await googleValidate(data);
      if (response?.data?.status === 200) {
        handleCloseOtp();
        props?.refetchUserProfile();
      }
    },
  });

  const setOTP = (e: string) => {
    setFieldValue("otp", e);
  };
  const setTwoFa = (e: string) => {
    setFieldValue("token", e);
  };

  return (
    <>
      <CommonModal
        title="Security code Verification"
        backdrop="static"
        show={showOtp}
        onHide={() => {
          handleCloseOtp && handleCloseOtp();
          resetForm();
        }}
        className="verify_otp_modal"
        textcenter
        subTitle="Enter Security code sent on your registered email and google authenticator to proceed further."
      >
        <form onSubmit={handleSubmit} className="otp_form">
          <div className="otp_form__inner">
            <label className="form-label">
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

          <div className="otp_form__inner">
            <label className="form-label">
              Verification Code for authenticator
              <span className="astric">*</span>
            </label>
            <OTPInput
              className="otpField"
              value={values.token}
              onChange={setTwoFa}
              OTPLength={6}
              otpType="number"
            />
            {errors.token && <p className="error_message">{errors.token}</p>}
          </div>
          <Button type="submit" className="w-100" text="Confirm" />
        </form>
      </CommonModal>
    </>
  );
}

export default OtpModal;
