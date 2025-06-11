import { RoundCrossIcon } from "@/app/_ui/svg/_svg";
import React, { useState } from "react";
import "./KycStatusModal.scss";
import { Button } from "@/common";
import RegulaKyc from "../page";
import { useRouter } from "next/navigation";

// KYC Status Modal component
function KycRejectionModal({ profileData }: any) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <div className="kyc-status-modal">
            <div className="kyc_icon">
              <span className="icon">
                <RoundCrossIcon />
              </span>
            </div>
            <div className="kyc_heading">
              {/* Display the corresponding heading */}
              <h5>Your KYC is rejected</h5>
              <div className="reason_sec">
                <p>
                  <b>Reason:&nbsp;</b> {profileData?.reason}
                </p>
                <p>
                  <b>Remaining retry:&nbsp;</b> {3 - profileData?.kycRetryCount}
                </p>
              </div>
              {profileData?.kycRetryCount < 3 ? (
                <div className="resend_btn">
                  <Button
                    className="btn-style"
                    text="Resubmit"
                    type="button"
                    onClick={() => router.push("/regula-kyc")}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <RegulaKyc />}
    </>
  );
}

export default KycRejectionModal;
