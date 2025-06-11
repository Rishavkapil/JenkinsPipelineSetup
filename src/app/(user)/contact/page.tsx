"use client";
import React from "react";
import ContactForm from "../(home)/Contact";
import { Col, Container, FormLabel, Row } from "react-bootstrap";
import "./contactUs.scss";
import Image from "next/image";
import getin from "../../../../public/assets/get_form_img.png";
import { Button, Input } from "@/common";
import { useSubscribeUsMutation } from "@/services/rtk.api.service";
import * as Yup from "yup";
import { useFormik } from "formik";
import validationSchemas from "@/schema/validationSchema";
import { RESPONSES } from "@/constants";
import { FIELDS } from "@/schema/schemaConstants";
import toaster from "@/common/Toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [subscribeUs] = useSubscribeUsMutation();

  const {
    resetForm,
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      recaptchaToken: "",
      email: "",
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
      <div className="contact_us py-60 pb-100">
        <Container>
          <div className="common-bg">
            <Row>
              <Col xs={12} lg={6}>
                <div className="contact_us_inner">
                  <div className="contact_us_getIn">
                    <Image src={getin} alt="" />
                    <h2>Get in touch</h2>
                    <h4>
                      Thinking of selling, or you know someone whom we should
                      meet?
                    </h4>
                  </div>
                  {/* <div className="contact_us_stay">
                    <h4>Stay always updated</h4>
                    <p>Sign up for monthly newsletter</p>
                    <form onSubmit={handleSubmit}>
                      <FormLabel>Email</FormLabel>
                      <div className="contact_us_stay_inputletter">
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          fieldName={FIELDS.EMAIL}
                          maxLength={60}
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className={
                            touched.email && errors.email ? "is-invalid" : ""
                          }
                          error={touched.email && errors.email}
                        />
                        <Button text="Submit" type="submit" className="" />
                      </div>
                    </form>
                  </div> */}
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div className="contact_us_inner">
                  <ContactForm />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Contact;
