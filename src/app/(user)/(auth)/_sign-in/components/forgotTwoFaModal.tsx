import { Button, CommonModal, Input } from "@/common";
import { RESPONSES } from "@/constants";
import { FIELDS } from "@/schema/schemaConstants";
import validationSchemas from "@/schema/validationSchema";
import { useForgotTwoFAMutation } from "@/services/rtk.api.service";
import { useFormik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";

interface propType {
  handleCloseForgotTwoFa: () => void;
  email: string;
  showforgotTwoFaModal: boolean;
}

const forgotTwoFaValidation = Yup.object().shape({
  email: validationSchemas.email,
});

function ForgotTwoFaModal(props: propType) {
  const { handleCloseForgotTwoFa, email, showforgotTwoFaModal } = props;
  const [forgotTwoFA] = useForgotTwoFAMutation();

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotTwoFaValidation,
      onSubmit: async (values) => {
        try {
          let data = {
            email: values?.email,
          };
          const response = await forgotTwoFA(data);
          if (response?.data?.status === RESPONSES.SUCCESS) {
            handleCloseForgotTwoFa();
            resetForm();
          }
        } catch (error) {}
      },
    });
  return (
    <>
      <CommonModal
        backdrop="static"
        show={showforgotTwoFaModal}
        onHide={handleCloseForgotTwoFa}
        title="Forgot 2FA"
      >
        <form onSubmit={handleSubmit}>
          <Row className="copyBox">
            <Col lg={12}>
              <div className="textinput mb-4">
                <Input
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
                />
                <p className="error-msg">{touched.email && errors.email}</p>
              </div>
            </Col>
            <Col lg={12}>
              <Button type="submit" text="Submit" />
            </Col>
          </Row>
        </form>
      </CommonModal>
    </>
  );
}

export default ForgotTwoFaModal;
