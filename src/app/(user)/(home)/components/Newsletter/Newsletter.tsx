"use client";
import { Col, Container, Row } from "react-bootstrap";
import "./Newsletter.scss";
import { ArrowIcon } from "@/app/_ui/svg/_svg";
import { Button, Input } from "@/common";
import { useSubscribeUsMutation } from "@/services/rtk.api.service";
import { useFormik } from "formik";
import validationSchemas from "@/schema/validationSchema";
import { RESPONSES } from "@/constants";
import * as Yup from "yup";
import { FIELDS } from "@/schema/schemaConstants";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toaster from "@/common/Toast";

const Newsletter = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [subscribeUs] = useSubscribeUsMutation();

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      recaptchaToken: "",
    },
    validationSchema: Yup.object().shape({
      email: validationSchemas.email,
    }),
    onSubmit: async (values) => {
      if (!executeRecaptcha) {
        toaster.error("Not available to execute recaptcha");
        return;
      }
      const gRecaptchaToken = await executeRecaptcha("subscribeSubmit");
      try {
        values.recaptchaToken = gRecaptchaToken;
        const response: any = await subscribeUs(values);
        if (response?.data?.status === RESPONSES.SUCCESS) {
          resetForm();
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <div className="letter_field">
        <Container>
          <div className="letter_field_in">
            <Row className="align-items-center">
              <Col lg={6} md={12}>
                <div className="letter_left">
                  <h2>Subscribe to Our Newsletter</h2>
                </div>
              </Col>
              <Col lg={6} md={12}>
                <form onSubmit={handleSubmit}>
                  <div className="letter_right">
                    {/* <input type="text" placeholder="Email ID" typeof="email" /> */}
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      fieldName={FIELDS.EMAIL}
                      maxLength={60}
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required={"false"}
                      className={
                        touched.email && errors.email
                          ? "is-invalid newsletter"
                          : "newsletter"
                      }
                      // error={touched.email && errors.email}
                    />
                    <p className="error-txt">{touched.email && errors.email}</p>
                    <Button
                      type="submit"
                      text="Send"
                      className="right_icon_btn"
                      rightIcon={<ArrowIcon />}
                    />
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Newsletter;
