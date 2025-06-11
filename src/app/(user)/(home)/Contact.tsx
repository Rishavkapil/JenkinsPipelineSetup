/** @format */

import { useFormik } from "formik";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Input, TextArea } from "@/common";
import { useContactUsMutation } from "@/services/rtk.api.service";
import validationSchemas from "@/schema/validationSchema";
import { RESPONSES } from "@/constants";
import { FIELDS } from "@/schema/schemaConstants";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toaster from "@/common/Toast";

function ContactForm({}) {
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
          resetForm();
        }
      } catch (error) {}
    },
  });

  return (
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
  );
}

export default ContactForm;
