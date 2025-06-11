"use client";

import React, { lazy, Suspense } from "react";
const GoogleReCaptchaProvider = lazy(() =>
  import("react-google-recaptcha-v3").then((module) => ({
    default: module.GoogleReCaptchaProvider,
  }))
);
import { RE_CAPTCHA_SITE_KEY } from "@/constants";

const GoogleCaptchaWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p />} >
      <GoogleReCaptchaProvider 
        reCaptchaKey={RE_CAPTCHA_SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        {children}
      </GoogleReCaptchaProvider>
    </Suspense>
  );
};

export default GoogleCaptchaWrapper;
