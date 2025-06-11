/** @format */

import { useForgotPasswordMutation } from "@/services/rtk.api.service";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FIELDS } from "@/schema/schemaConstants";
import dynamic from "next/dynamic";
import { RESPONSES } from "@/constants";
import { Button, CommonModal, Input } from "@/common";
import validationSchemas from "@/schema/validationSchema";
const OtpForgot = dynamic(() => import("./otpForgotModal"), { ssr: false });

const validationSchema = Yup.object().shape({
  email: validationSchemas.email,
});

interface Props {
  showForgotPass: boolean;
  handleCloseForgot: () => void;
}
//type for api response

function ForgotPass(props: Props) {
  const { handleCloseForgot, showForgotPass } = props;
  const [forgotPassword] = useForgotPasswordMutation();

  //handle otp modal for forgot password
  const [showOtp, setShowOtp] = useState(false);
  const handleCloseOtp = () => {
    resetForm();
    setShowOtp(false);
  };
  const handleShowOtp = () => {
    setShowOtp(true);
  };

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          let data = {
            email: values.email,
          };
          const response = await forgotPassword(data);
          if (response?.data?.status === RESPONSES.SUCCESS) {
            handleCloseForgot && handleCloseForgot();
            handleShowOtp && handleShowOtp();
          }
        } catch (error) {}
      },
    });

  return (
    <>
      <CommonModal
        backdrop="static"
        show={showForgotPass}
        onHide={handleCloseForgot}
        title="Forgot Password"
      >
        <form onSubmit={handleSubmit}>
          <Input
            className="mb-4 mb-md-5"
            label="Email"
            placeholder="Enter email"
            id="email"
            name="email"
            fieldName={FIELDS.EMAIL}
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
            value={values.email}
            isInvalid={touched.email && !!errors.email}
            error={touched.email && errors.email}
          />

          <Button type="submit" text="Submit" className="w-100" />
        </form>
      </CommonModal>
      <OtpForgot
        showOtp={showOtp}
        email={values.email}
        handleCloseOtp={handleCloseOtp}
      />
    </>
  );
}

export default ForgotPass;
