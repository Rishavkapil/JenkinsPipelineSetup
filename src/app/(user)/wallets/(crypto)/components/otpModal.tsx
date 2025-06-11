/** @format */

"use client";

import { useFormik } from "formik";
import OTPInput from "otp-input-react";
import { usePlaceOrderMutation } from "@/services/rtk.api.service";
import { otpSchema } from "@/schema/customSchema";
import { RESPONSES } from "@/constants";
import { Button, CommonModal } from "@/common";
import { OtpModalBuyProps } from "@/interfaces/user";
import { useRouter } from "next/navigation";

function OtpModalBuy(props: OtpModalBuyProps) {
  const [placeOrder] = usePlaceOrderMutation();
  const router = useRouter();

  const { values, resetForm, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values: { otp: string }) => {
      let data = {
        transactionId: props?.orderData?.transactionId,
        otp: values?.otp,
        email: props?.orderData?.email,
        type: "BuyToken",
      };
      const result = await placeOrder(data);
      if (result?.data?.status === RESPONSES.SUCCESS) {
        props.handleCloseOtp();
        props.refetchWalletBalance();
        router.push("/order-details");
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
        show={props?.showOtp}
        onHide={() => {
          props.handleCloseOtp();
          resetForm();
        }}
        title="Please enter security code"
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
    </>
  );
}

export default OtpModalBuy;
