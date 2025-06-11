/** @format */

import { useChangePasswordMutation } from "@/services/rtk.api.service";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FIELDS } from "@/schema/schemaConstants";
import * as Yup from "yup";
import { useUserLogoutMutation } from "@/services/rtk.api.service";
import { RESPONSES } from "@/constants";
import { Button, Input } from "@/common";
import { imagesUrl } from "@/constants/images_url";
import Image from "next/image";
import validationSchemas from "@/schema/validationSchema";

type valuesType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const validationSchema = Yup.object()
  .shape({
    oldPassword: Yup.string().required("Required"),
    newPassword: validationSchemas?.password,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  })
  .test(
    "passwords-not-same",
    "All three passwords cannot be the same",
    function (value) {
      const { oldPassword, newPassword, confirmPassword } = value;
      return !(oldPassword === newPassword && newPassword === confirmPassword);
    }
  );
function ChangePassword() {
  const [userLogout] = useUserLogoutMutation();
  const [changePassword] = useChangePasswordMutation();
  const [hidden, setHidden] = useState<boolean>(true);
  const [hiddenPass, setHiddenPass] = useState<boolean>(true);
  const [hiddenPassOld, setHiddenPassOld] = useState<boolean>(true);
  const router = useRouter();
  // No need for logout api here.
  const handleChangePasswordSubmit = async (values: valuesType) => {
    try {
      const response: any = await changePassword(values);
      if (response?.data?.status === RESPONSES.SUCCESS) {
        resetForm();
        const logoutResponse: any = await userLogout("");
        // if (logoutResponse?.data?.status === RESPONSES.SUCCESS) {
        //   removeIsLogin();
        //   router.push("/");
        //   localStorage.clear();
        // }
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };
  const toggleShow = () => {
    setHidden(!hidden);
  };

  const toggleShowPass = () => {
    setHiddenPass(!hiddenPass);
  };
  const toggleShowPassOld = () => {
    setHiddenPassOld(!hiddenPassOld);
  };

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        handleChangePasswordSubmit(values);
      },
    });

  return (
    <div className="user-profile change_password common-bg common-page">
      <form onSubmit={handleSubmit} className="user-profile__form">
        <div className="change_password_inputs">
          <Input
            label="Old Password"
            placeholder="Enter Old Password"
            id="oldPassword"
            name="oldPassword"
            type={hiddenPassOld ? "password" : "text"}
            fieldName={FIELDS.PASSWORD}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (/^\S*$/.test(event.target.value)) {
                handleChange(event);
              }
            }}
            min={8}
            value={values.oldPassword}
            isInvalid={touched.oldPassword && !!errors.oldPassword}
            error={touched.oldPassword && errors.oldPassword}
            icon={
              <button type="button" onClick={toggleShowPassOld}>
                {!hiddenPassOld ? (
                  <Image
                    src={imagesUrl.eye}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src={imagesUrl.show}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                )}
              </button>
            }
          />
          <Input
            label="New Password"
            placeholder="Enter New Password"
            id="newPassword"
            name="newPassword"
            type={hidden ? "password" : "text"}
            fieldName={FIELDS.PASSWORD}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (/^\S*$/.test(event.target.value)) {
                handleChange(event);
              }
            }}
            maxLength={21}
            min={8}
            value={values.newPassword}
            isInvalid={touched.newPassword && !!errors.newPassword}
            error={touched.newPassword && errors.newPassword}
            icon={
              <button type="button" onClick={toggleShow}>
                {!hidden ? (
                  <Image
                    src={imagesUrl.eye}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src={imagesUrl.show}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                )}
              </button>
            }
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={hiddenPass ? "password" : "text"}
            fieldName={FIELDS.PASSWORD}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (/^\S*$/.test(event.target.value)) {
                handleChange(event);
              }
            }}
            maxLength={21}
            min={8}
            value={values.confirmPassword}
            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
            error={touched.confirmPassword && errors.confirmPassword}
            icon={
              <button type="button" onClick={toggleShowPass}>
                {!hiddenPass ? (
                  <Image
                    src={imagesUrl.eye}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src={imagesUrl.show}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                )}
              </button>
            }
          />
          <div className="pt-3 pt-xl-5">
            <Button type="submit" text="Submit" className="w-100" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
