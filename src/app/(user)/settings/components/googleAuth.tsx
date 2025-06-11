import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import OtpModal from "./googleOtpModal";
import { Button, CommonModal } from "@/common";

type Props = {
  show: boolean;
  handleClose: () => void;
  google2FAstatus?: Record<string, string>;
  refetchUserProfile: () => void;
};

function GoogleAuth(props: Props) {
  const { show, handleClose, google2FAstatus, refetchUserProfile } = props;
  //handle otp modal
  const [showOtp, setShowOtp] = useState(false);
  const handleCloseOtp = () => {
    setShowOtp(false);
  };
  const handleShowOtp = () => {
    setShowOtp(true);
    //  handle2FA()
  };
  const handleGoogleAuth = () => {
    handleClose();
    // handleGoogleAuth()
    handleShowOtp();
  };
  const { resetForm } = useFormik({
    initialValues: {},
    // validationSchema:
    onSubmit: async (values) => {},
  });
  const handleOTP = () => {
    props?.handleClose();
    handleShowOtp();
    resetForm();
  };

  return (
    <>
      <CommonModal
        title="Two-Factor Authentication"
        show={show}
        backdrop="static"
        onHide={() => {
          props?.handleClose();
          // handleShowOtp();
          resetForm();
        }}
        className="google_auth_modal"
      >
        <div className="text-center">
          <Image
            src={google2FAstatus?.qrImgUrl as string}
            alt=""
            width={250}
            height={250}
          />
          <p className="mt-4">
            Scan the QR code using the Google Authenticator app on your mobile
            device to set up two-factor authentication.
          </p>
          <Button
            className="mt-4"
            text="Continue with security code"
            onClick={handleOTP}
          />
        </div>
      </CommonModal>

      <OtpModal
        // userData={userData}
        refetchUserProfile={refetchUserProfile}
        handleCloseOtp={handleCloseOtp}
        showOtp={showOtp}
        google2FAstatus={google2FAstatus}
      />
    </>
  );
}

export default GoogleAuth;
