/** @format */
"use client";

import React, { useEffect } from "react";
import { useGetUserProfileQuery } from "@/services/rtk.api.service";
import { KYC_STATUS } from "@/constants";
import "./style.scss";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setUserDetail } from "@/lib/redux/slices/userDetailSlice";
import { socket } from "@/socket";

const RegulaKyc = dynamic(() => import("../regula-kyc/page"), {
  ssr: false,
});
const KycStatusModal = dynamic(
  () => import("../regula-kyc/Components/KycStatusModal"),
  {
    ssr: false,
  }
);
const KycRejectionModal = dynamic(
  () => import("../regula-kyc/Components/KycRejectionModal"),
  {
    ssr: false,
  }
);
const KycPage = () => {
  const dispatch: any = useDispatch();
  const { data: userProfile, refetch } = useGetUserProfileQuery("");
  useEffect(() => {
    refetch();
    dispatch(setUserDetail(userProfile?.data));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("kyc_status", (data: any) => {
        console.log("data", data);
        refetch();
      });
      return () => {
        socket.off("kyc_status");
      };
    }
  }, [socket]);
  return (
    <>
      {userProfile?.data?.kycStatus === KYC_STATUS.INPROGRESS ||
      userProfile?.data?.kycStatus === KYC_STATUS?.APPROVED ? (
        <KycStatusModal profileData={userProfile?.data} />
      ) : userProfile?.data?.kycStatus === KYC_STATUS?.REJECTED ? (
        <KycRejectionModal profileData={userProfile?.data} />
      ) : (
        <RegulaKyc />
      )}
    </>
  );
};

export default KycPage;
