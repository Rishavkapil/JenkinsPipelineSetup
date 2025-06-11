"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { signupSchema } from "@/schema/customSchema";
import dynamic from "next/dynamic";
import {
  usePhaseDetailsQuery,
  useUserSignupMutation,
} from "@/services/rtk.api.service";
import { RESPONSES } from "@/constants";
import PasswordStrengthBar from "react-password-strength-bar";
import { imagesUrl } from "@/constants/images_url";
import Image from "next/image";
import { phaseDetailsType } from "@/interfaces/user";
import { Button, CustomSelect, Input, PhoneField } from "@/common";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import LoginSidebar from "../login-sidebar/LoginSidebar";
import toaster from "@/common/Toast";
import CheckBox from "@/common/Checkbox";
import logo from "../../../../../public/logo_main.svg";
import { useRouter } from "next/navigation";
import countryList from "react-select-country-list";

const OtpModal = dynamic(() => import("./components/otpModal"), { ssr: false });

type phoneDataType = {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
};

type valuesType = {
  firstName: string;
  lastName: string;
  email: string;
  countryId: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  type: number;
  recaptchaToken: string;
};

const Signup: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { data: phaseData, refetch: fetchPhaseDetails } =
    usePhaseDetailsQuery("");
  const [showOtp, setShowOtp] = useState(false);
  const [hidden, setHidden] = useState<boolean>(true);
  const [hiddenPass, setHiddenPass] = useState<boolean>(true);
  const [userSignup] = useUserSignupMutation();
  const [pstrength, setPstrength] = useState<string>("");
  const [phaseDetails, setPhaseDetails] = useState<phaseDetailsType>();
  const router = useRouter();
  const options: any = useMemo(() => countryList().getData(), []);

  const handleSignupSubmit = async (values: valuesType) => {
    values?.phoneNumber.toString();
    if (!executeRecaptcha) {
      toaster.error("Not available to execute recaptcha");
      return;
    }
    const gRecaptchaToken = await executeRecaptcha("signupSubmit");
    try {
      values.recaptchaToken = gRecaptchaToken;
      try {
        const result = await userSignup(values);
        if (result?.data?.status === RESPONSES.SUCCESS) {
          handleShowOtp();
        }
      } catch (err) {
        console.log(err);
      }
    } catch (error) {}
  };
  const {
    errors,
    handleChange,
    setFieldValue,
    touched,
    handleBlur,
    values,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryId: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      type: 1,
      recaptchaToken: "",
      isChecked: false,
    },

    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const { isChecked, ...updatedUserData } = values;

      handleSignupSubmit(updatedUserData);
    },
  });
  const handlePhoneChange = (value: string, data: phoneDataType) => {
    setFieldValue("phoneNumber", value);
  };

  const handleShowOtp = () => {
    setShowOtp(true);
  };

  const handleCloseOtp = () => {
    setShowOtp(false);
  };

  const toggleShow = () => {
    setHidden(!hidden);
  };

  const toggleShowPass = () => {
    setHiddenPass(!hiddenPass);
  };

  const handlePushToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    if (phaseData?.status === RESPONSES.SUCCESS) {
      setPhaseDetails(phaseData.data);
    }
    fetchPhaseDetails();
  }, [phaseData, fetchPhaseDetails]);

  // const handleSetCountry = () => {
  //   setFieldValue("countryId", options?.label);
  // };
  return (
    <div className="auth-layout">
      <div className="auth-layout_row d-flex flex-wrap w-100">
        <div className="auth-layout_leftcol d-none d-lg-block">
          <LoginSidebar />
        </div>
        <div className="auth-layout_rightcol">
          <div className="auth-card signup_card">
            <div className="auth-card_heading text-center">
              <div className="text-center d-block d-lg-none login_sidebar mb-5">
                <Image
                  className="logo"
                  src={logo}
                  alt="logo"
                  onClick={handlePushToHome}
                />
                <h1>
                <strong>Benefit from the Future of Live Streaming</strong>
                </h1>
              </div>
              <h2>Sign Up</h2>
              <p>Welcome! Sign up for your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    onBlur={handleBlur}
                    value={values.firstName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                    placeholder="First Name"
                    className={
                      touched.firstName && errors.firstName ? "is-invalid" : ""
                    }
                    error={touched.firstName && errors.firstName}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    id="lastName"
                    onBlur={handleBlur}
                    value={values.lastName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                    maxLength={25}
                    placeholder="Last Name"
                    className={
                      touched.lastName && errors.lastName ? "is-invalid" : ""
                    }
                    error={touched.lastName && errors.lastName}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    maxLength={100}
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={
                      touched.email && errors.email ? "is-invalid" : ""
                    }
                    error={touched.email && errors.email}
                  />
                </Col>
                <Col md={6}>
                  <PhoneField
                    className="phone-input"
                    countryCodeEditable={false}
                    label="Phone Number"
                    placeholder="Enter Mobile Number"
                    country="us"
                    value={values.phoneNumber}
                    enableSearch={true}
                    onChange={(value: string, data: phoneDataType) => {
                      handlePhoneChange(value, data);
                    }}
                    error={touched.phoneNumber && errors.phoneNumber}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Password"
                    type={hidden ? "password" : "text"}
                    name="password"
                    id="password"
                    maxLength={50}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    value={values.password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                      setPstrength(event.target.value);
                    }}
                    placeholder="Enter password"
                    className={
                      touched.password && errors.password ? "is-invalid" : ""
                    }
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
                    error={touched.password && errors.password}
                  />
                  <div className="strength">
                    <PasswordStrengthBar password={pstrength} />
                  </div>
                </Col>
                <Col md={6}>
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type={hiddenPass ? "password" : "text"}
                    id="confirmPassword"
                    maxLength={50}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={
                      touched.confirmPassword && errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }
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
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                </Col>
                <Col md={6}>
                  {/* <Input
                    label="Select Country"
                    readOnly={true}
                    required={"false"}
                    value={capitalizeFirstWord(values.countryId)}
                  /> */}
                  <CustomSelect
                    options={options}
                    name="countryId"
                    id="countryId"
                    value={
                      values.countryId && {
                        label: options.find(
                          (options: any) => options.label === values.countryId
                        )["label"],
                      }
                    }
                    onChange={(option: { label: any }) =>
                      setFieldValue("countryId", option?.label)
                    }
                    className="custom-select"
                    placeholder="Select Country"
                    error={touched.countryId && errors.countryId}
                  />
                </Col>
                <Col xs={12}>
                  <CheckBox
                    id="isChecked"
                    name="isChecked"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("isChecked", event.target.checked);
                    }}
                    checked={values?.isChecked}
                    error={touched.isChecked && errors.isChecked}
                    label={
                      <>
                        I agree to the{" "}
                        <Link target="_blank" href="/terms-conditions">
                          Terms{" "}
                        </Link>{" "}
                        and{" "}
                        <Link target="_blank" href="/privacy-policy">
                          Privacy Policy
                        </Link>
                      </>
                    }
                  />
                </Col>
                {!phaseDetails?.phaseDetails && !phaseDetails?.upcomingPhase ? (
                  <h6 className="text-danger">Ico has been ended</h6>
                ) : (
                  false
                )}
                <Col xs={12} className="pt-5 mt-md-4">
                  <Button
                    className="signup-btn"
                    disabled={
                      !phaseDetails?.upcomingPhase &&
                      !phaseDetails?.phaseDetails
                        ? true
                        : false
                    }
                    type="submit"
                    text="Sign Up"
                  />
                </Col>
                <p className="note-text text-center">
                  Already registered?
                  <Link
                    href="/sign-in"
                    className="font-medium text-[#C0317C] hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </Row>
            </form>
          </div>
        </div>
      </div>
      <OtpModal
        showOtp={showOtp}
        handleClose={handleCloseOtp}
        email={values?.email}
        resetForm={resetForm}
      />
    </div>
  );
};

export default Signup;
