"use client";

import {
  useGetUserProfileQuery,
  useSetting2FaMutation,
} from "@/services/rtk.api.service";
import { useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import dynamic from "next/dynamic";
import { Action, Dispatch } from "redux";
import "./style.scss";

const GoogleAuth = dynamic(() => import("./components/googleAuth"), {
  ssr: false,
});
const OtpModal = dynamic(() => import("./components/googleOtpModal"), {
  ssr: false,
});
const Userprofile = dynamic(() => import("./components/userprofile"), {
  ssr: false,
});
const ChangePassword = dynamic(() => import("./components/changePassword"), {
  ssr: false,
});

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useDispatch } from "react-redux";
import { setUserDetail } from "@/lib/redux/slices/userDetailSlice";
import { RESPONSES } from "@/constants";
import { Button } from "@/common";
import { UserData } from "@/interfaces/user";
import { Container } from "react-bootstrap";
import { useSearchParams } from "next/navigation";

function SettingPage() {
  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileQuery("");
  const [userData, setUserData] = useState<UserData>();
  const [setting2Fa] = useSetting2FaMutation();
  const [google2FAstatus, setGoogle2Fa] = useState();
  const dispatch: Dispatch<Action<string>> = useDispatch();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  // Handle OTP modal
  const [showOtp, setShowOtp] = useState(false);
  const handleCloseOtp = () => {
    setShowOtp(false);
  };
  const handleShowOtp = () => {
    setShowOtp(true);
  };

  // Handle GoogleAuth modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    if (userData?.is2Fa) {
      handleShowOtp();
      handle2FA();
    } else {
      handle2FA();
    }
  };

  const handle2FA = async () => {
    const is2Fa = userData?.is2Fa ? 0 : 1;
    const payload = { is2Fa };
    const response = await setting2Fa(payload);
    if (!response?.error) {
      refetchUserProfile(); // Refetch the user profile after enabling/disabling 2FA
      setGoogle2Fa(response?.data?.data);
      if (!userData?.is2Fa) {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    if (userProfile?.status === RESPONSES.SUCCESS) {
      setUserData(userProfile?.data);
      dispatch(setUserDetail(userProfile?.data));
    }
  }, [userProfile]);
  return (
    <div className="setting-page pt-5 mt-2 pb-100">
      <Container>
        <div className="common-page">
          <h3 className="mb-4">Settings</h3>
          <Tabs defaultActiveKey={tab || "profile"} className="common-tabs">
            <Tab eventKey="profile" title="Profile">
              <Userprofile />
            </Tab>
            <Tab eventKey="2fa" title="2FA">
              <div className="common-bg">
                <div className="auth-setting">
                  <h3>Two Factor Authentication</h3>
                  <Button
                    text={userData?.is2Fa ? "Disable 2FA" : "Enable 2FA"}
                    onClick={handleShow}
                  />
                </div>
              </div>
            </Tab>
            <Tab eventKey="changePassword" title="Change Password">
              <ChangePassword />
            </Tab>
          </Tabs>
          <GoogleAuth
            show={show}
            handleClose={handleClose}
            google2FAstatus={google2FAstatus}
            // userData={userData}
            refetchUserProfile={refetchUserProfile}
          />
          <OtpModal
            handleCloseOtp={handleCloseOtp}
            showOtp={showOtp}
            google2FAstatus={google2FAstatus}
            refetchUserProfile={refetchUserProfile}
          />
        </div>
      </Container>
    </div>
  );
}

export default SettingPage;
