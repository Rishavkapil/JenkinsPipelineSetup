"use client";

import { useFormik } from "formik";
import OTPInput from "otp-input-react";
import { Dispatch, Action } from "redux";
import { useDispatch } from "react-redux";
import { otpSchema } from "@/schema/customSchema";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useSignupOtpMutation } from "@/services/rtk.api.service";
import { RESPONSES } from "@/constants";
import { setJwtToken } from "@/lib/redux/slices/tokenSlice";
import { Button, CommonModal } from "@/common";
import { setIsLogin } from "@/common/CommonCookies/Cookies";

type Props = {
  showVerifyEmail?: boolean;
  email?: string;
  resetForm?: () => void;
  handleShowVerifyEmail: () => void;
  handleCloseVerifyEmail?: () => void;
};
type valuesType = {
  otp: string;
};

function VerifyEmail(props: Props) {
  const {
    email,
    handleCloseVerifyEmail,
    handleShowVerifyEmail,
    showVerifyEmail,
    resetForm: resetRegisterForm,
  } = props;
  const dispatch: Dispatch<Action<string>> = useDispatch();
  const router = useRouter();
  const [signupOtp] = useSignupOtpMutation();

  const handleOtpSubmit = async (values: valuesType) => {
    try {
      let data = {
        otp: values.otp,
        type: "SignUp",
        email: email,
      };
      const result: any = await signupOtp(data);
      if (result?.data?.status === RESPONSES.SUCCESS) {
        handleCloseVerifyEmail && handleCloseVerifyEmail();
        router.push("/dashboard");
        resetOtp();
        //cookies will set from backend in future
        dispatch(setJwtToken(result?.data?.data?.token));
        setIsLogin("TRUE", 7)

        router.refresh();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const {
    handleSubmit,
    resetForm: resetOtp,
    setFieldValue,
    values,
    errors,
  } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      handleOtpSubmit(values);
    },
  });

  const setOTP = (e: string) => {
    setFieldValue("otp", e);
  };

  return (
    <>
      <CommonModal
        backdrop="static"
        show={showVerifyEmail}
        onHide={() => {
          handleCloseVerifyEmail && handleCloseVerifyEmail();
          resetOtp();
          resetRegisterForm && resetRegisterForm();
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
            {errors?.otp && <p className="error_message">{errors?.otp}</p>}
          </div>
          <Button type="submit" className="w-100" text="Confirm" />
        </form>
      </CommonModal>
    </>
  );
}

export default VerifyEmail;
