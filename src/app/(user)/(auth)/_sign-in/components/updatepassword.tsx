"use client";

import { FIELDS } from "@/schema/schemaConstants";
import validationSchemas from "@/schema/validationSchema";
import { useUpdatePasswordMutation } from "@/services/rtk.api.service";
import { useFormik } from "formik";
import { Col, Modal, Row } from "react-bootstrap";
import * as Yup from "yup";
import { RESPONSES } from "@/constants";
import { Button, CommonModal, Input } from "@/common";
import { imagesUrl } from "@/constants/images_url";
import Image from "next/image";
import { useState } from "react";

type Props = {
  closeUpdatePass: () => void;
  showUpdate: boolean;
};

type valuesType = {
  password: string;
  confirmPassword: string;
};
const updatePasswordSchema = Yup.object().shape({
  password: validationSchemas.password,
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Password must match"),
});

function UpdatePassword(props: Props) {
  const { closeUpdatePass, showUpdate } = props;
  const [updatePassword] = useUpdatePasswordMutation();
  const [hidden, setHidden] = useState<boolean>(true);
  const [hiddenPass, setHiddenPass] = useState<boolean>(true);

  const handlePasswordField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\S*$/.test(event.target.value)) {
      handleChange(event);
    }
  };

  const handleUpdatePassSubmit = async (values: valuesType) => {
    try {
      let data = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const response: any = await updatePassword(data);
      if (response?.data?.status === RESPONSES.SUCCESS) {
        closeUpdatePass && closeUpdatePass();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      handleUpdatePassSubmit(values);
    },
  });
  const toggleShow = () => {
    setHidden(!hidden);
  };

  const toggleShowPass = () => {
    setHiddenPass(!hiddenPass);
  };

  return (
    <>
      <CommonModal
        backdrop="static"
        show={showUpdate}
        onHide={closeUpdatePass}
        title="Update Password"
      >
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <Input
                label="New Password"
                placeholder="Enter New Password"
                id="password"
                name="password"
                type={hidden ? "password" : "text"}
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
                fieldName={FIELDS.PASSWORD}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (/^\S*$/.test(event.target.value)) {
                    handleChange(event);
                  }
                }}
                maxLength={21}
                minLength={8}
                value={values.password}
                isInvalid={touched.password && !!errors.password}
                error={touched.password && errors.password}
                required
              />
            </Col>
            <Col xs={12}>
              <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type={hiddenPass ? "password" : "text"}
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
                fieldName={FIELDS.PASSWORD}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (/^\S*$/.test(event.target.value)) {
                    handleChange(event);
                  }
                }}
                maxLength={21}
                minLength={8}
                value={values.confirmPassword}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                required
              />
            </Col>
            <Col xs={12}>
              <Button className="w-100" type="submit" text="Submit" />
            </Col>
          </Row>
        </form>
      </CommonModal>
    </>
  );
}

export default UpdatePassword;
