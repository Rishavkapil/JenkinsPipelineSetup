import { ApprovedIcon, PendingIcon } from "@/app/_ui/svg/_svg";
import React from "react";
import "./KycStatusModal.scss";
import { KYC_STATUS } from "@/constants";
import { Spinner } from "react-bootstrap";

// KYC Status Modal component
function KycStatusModal({ profileData }: any) {
  const kycStatus = profileData?.kycStatus; // Assuming kycStatus is passed in profileData
  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <div className="kyc-status-modal">
            <div className="kyc_icon">
              <span className="icon">
                {kycStatus === KYC_STATUS?.INPROGRESS ? (
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                ) : kycStatus === KYC_STATUS?.APPROVED ? (
                  <ApprovedIcon />
                ) : null}
              </span>
            </div>
            <div className="kyc_heading">
              {/* Display the corresponding heading */}
              <h5>
                {kycStatus === KYC_STATUS?.INPROGRESS
                  ? "Your KYC is in progress, Please wait for a while."
                  : kycStatus === KYC_STATUS?.APPROVED
                    ? "Congratulations, Your KYC has been approved"
                    : null}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KycStatusModal;
