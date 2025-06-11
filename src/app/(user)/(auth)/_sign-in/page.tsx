"use client";

import { useFormik } from "formik";
import { useState } from "react";
import Link from "next/link";
import { useUserLoginMutation } from "@/services/rtk.api.service";
import { useRouter } from "next/navigation";
import { FIELDS } from "@/schema/schemaConstants";
import { loginSchema } from "@/schema/customSchema";
import dynamic from "next/dynamic";
import { RESPONSES } from "@/constants";
import Image from "next/image";
import { imagesUrl } from "@/constants/images_url";
import { LoginFormValues, LoginResponse } from "@/interfaces/user";
import { Button, Input } from "@/common";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import LoginSidebar from "../login-sidebar/LoginSidebar";
import { setIsLogin } from "@/common/CommonCookies/Cookies";
import logo from "../../../../../public/logo_main.svg";

const VerifyEmail = dynamic(() => import("./components/verifyEmail"), {
  ssr: false,
});
const ForgotPass = dynamic(() => import("./components/forgotPassword"), {
  ssr: false,
});
const LoginWithTwoFa = dynamic(() => import("./components/loginWithTwoFa"), {
  ssr: false,
});

const Login = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [showForgotPass, setShowForgotPass] = useState<boolean>(false);
  const [show2FA, SetShow2FA] = useState<boolean>(false);
  const [mutateUserLogin, { isLoading, isError, error, data }] =
    useUserLoginMutation();
  const [hidden, setHidden] = useState<boolean>(true);
  const [showVerifyEmail, SetVerifyEmail] = useState<boolean>(false);

  const handleShowForgot = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowForgotPass(true);
  };

  const handleCloseForgot = () => setShowForgotPass(false);
  const handleShowTwoFa = () => SetShow2FA(true);
  const handleCloseTwoFa = () => SetShow2FA(false);
  //handle veryfyemail modal
  const handleShowVerifyEmail = () => SetVerifyEmail(true);
  const handleCloseVerifyEmail = () => SetVerifyEmail(false);

  const handleLoginSubmit = async (values: LoginFormValues) => {
    if (!executeRecaptcha) {
      console.log("not available to execute recaptcha");
      return;
    }
    const gRecaptchaToken = await executeRecaptcha("loginSubmit");
    values.recaptchaToken = gRecaptchaToken;
    try {
      const { data } = (await mutateUserLogin(values)) as {
        data: LoginResponse;
      };
      if (data?.status === RESPONSES.SUCCESS) {
        if (data?.data?.isVerified) {
          if (data?.data?.is2FA) {
            // If the user is verified and 2FA is enabled
            handleShowTwoFa(); // Show the 2FA modal
          } else {
            // If the user is verified and 2FA is not enabled
            setIsLogin("TRUE", 7);
            router.push("/dashboard");
            router.refresh();
          }
        } else {
          // If the user is not verified
          handleShowVerifyEmail(); // Show the verify email modal
        }
      }
    } catch (error: unknown) {
      // Handle error
      // setChecked(false); // Ensure the checkbox is unchecked on error
    }
  };

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        recaptchaToken: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values: LoginFormValues) => {
        handleLoginSubmit(values);
      },
    });

  const toggleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button action
    setHidden(!hidden);
  };

  const handlePushToHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="auth-layout">
        <div className="auth-layout_row d-flex flex-wrap w-100">
          <div className="auth-layout_leftcol d-none d-lg-block">
            <LoginSidebar />
          </div>
          <div className="auth-layout_rightcol">
            <div className="auth-card auth-card--login">
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
                <h2>Sign In</h2>
                <p>Welcome! Sign in to your account.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  id="email"
                  maxLength={70}
                  name="email"
                  fieldName={FIELDS.EMAIL}
                  type="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                  error={touched.email && errors.email}
                />
                <Input
                  label="Password"
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  maxLength={50}
                  fieldName={FIELDS.PASSWORD}
                  type={hidden ? "password" : "text"}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (/^\S*$/.test(event.target.value)) {
                      handleChange(event);
                    }
                  }}
                  min={8}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
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
                <div className="forgot-text">
                  <button type="button" onClick={handleShowForgot}>
                    Forgot Password?
                  </button>
                </div>
                <div className="pt-3 mt-md-5">
                  <Button
                    className="w-100"
                    text="Sign In"
                    type="submit"
                    disabled={isLoading ? true : false}
                  />
                </div>
                <p className="note-text text-center">
                  Don’t have an account yet?
                  <Link href={"/signup"}>Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Suspense fallback={<Loader />}> */}
      <ForgotPass
        showForgotPass={showForgotPass}
        handleCloseForgot={handleCloseForgot}
      />
      {/* </Suspense> */}
      <LoginWithTwoFa
        show2FA={show2FA}
        handleCloseTwoFa={handleCloseTwoFa}
        email={values.email}
      />
      <VerifyEmail
        handleShowVerifyEmail={handleShowVerifyEmail}
        handleCloseVerifyEmail={handleCloseVerifyEmail}
        resetForm={resetForm}
        email={values?.email}
        showVerifyEmail={showVerifyEmail}
      />
    </>
  );
};

export default Login;
