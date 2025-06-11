import { Col, Container, Row } from "react-bootstrap";
import "./ContactSec.scss";
import { useState } from "react";
import { Button, CommonModal, Input, TextArea } from "@/common";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useContactUsMutation } from "@/services/rtk.api.service";
import validationSchemas from "@/schema/validationSchema";
import { FIELDS } from "@/schema/schemaConstants";
import toaster from "@/common/Toast";
import { RESPONSES } from "@/constants";
import CommonHeading from "@/common/CommonHeading/CommonHeading";

const ContactSec = () => {
  const [show, setShow] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [contactUs] = useContactUsMutation();

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
      name: "",
      email: "",
      subject: "",
      message: "",
      recaptchaToken: "",
    },
    validationSchema: Yup.object().shape({
      name: validationSchemas.firstName,
      email: validationSchemas.email,
      subject: validationSchemas.subject,
      message: validationSchemas.message,
    }),
    onSubmit: async (values) => {
      if (!executeRecaptcha) {
        toaster.error("Not available to execute recaptcha");
        return;
      }
      const gRecaptchaToken = await executeRecaptcha("contactSubmit");
      try {
        values.recaptchaToken = gRecaptchaToken;
        const response: any = await contactUs(values);
        if (response?.data?.status === RESPONSES.SUCCESS) {
          setShow(false);
          resetForm();
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <section className="contact_sec py-100" id="Contact">
        <Container>
          <div className="same_content_sec text-center mw-100">
            <div data-text="Contact us" className="stroke_text"></div>
            <CommonHeading heading="Have any questions?" />
          </div>
          <div className="icontact_sec_inner">
            <Button text="Contact Us" onClick={() => setShow(true)} />
          </div>
        </Container>
      </section>
      <CommonModal
        show={show}
        onHide={() => {
          setShow(false);
          resetForm();
        }}
      >
        <div className="contact-form">
          <h3 className="mb-4 mb-md-5">Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  fieldName={FIELDS.NAME}
                  id="name"
                  placeholder="Enter your name"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(event);
                  }}
                  maxLength={60}
                  className={touched.name && errors.name ? "is-invalid" : ""}
                  error={touched.name && errors.name}
                />
              </Col>
              <Col xs={12}>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  fieldName={FIELDS.EMAIL}
                  maxLength={60}
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  className={touched.email && errors.email ? "is-invalid" : ""}
                  error={touched.email && errors.email}
                />
              </Col>
              <Col xs={12}>
                <Input
                  label="Subject"
                  placeholder="Enter subject"
                  id="subject"
                  name="subject"
                  type="text"
                  maxLength={110}
                  fieldName={FIELDS.SUBJECT}
                  onChange={(e: any) => {
                    handleChange(e);
                  }}
                  value={values.subject}
                  isInvalid={touched.subject && !!errors.subject}
                  error={touched.subject && errors.subject}
                />
              </Col>
              <Col xs={12}>
                <TextArea
                  label="Message"
                  placeholder="Enter message"
                  id="message"
                  name="message"
                  type="text"
                  fieldName={FIELDS.MESSAGE}
                  maxLength={310}
                  onChange={(e: any) => {
                    handleChange(e);
                  }}
                  value={values.message}
                  isInvalid={touched.message && !!errors.message}
                  error={touched.message && errors.message}
                />
              </Col>
              <Col md={12} className="mt-4">
                <Button type="submit" text="Send" className="w-100" />
              </Col>
            </Row>
          </form>
        </div>
      </CommonModal>
    </>
  );
};

export default ContactSec;
