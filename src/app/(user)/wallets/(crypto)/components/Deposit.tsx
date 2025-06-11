"use client";

import QRCode from "react-qr-code";
import useCopyClipboard from "@/app/hooks/useCopyToClipboard";
import toaster from "@/common/Toast";
import { depositProps } from "@/interfaces/user";
import { CommonModal } from "@/common";
import { CopyIcon } from "@/app/_ui/svg/_svg";
import "./style.scss";

function Deposit(props: depositProps) {
  const { selectedWallet, handleClose, show } = props;
  const [setCopied] = useCopyClipboard();
  const copy = (data: any, message?: string) => {
    setCopied(data);
    if (message) toaster.success(message);
  };

  return (
    <>
      <CommonModal
        backdrop="static"
        show={show}
        onHide={handleClose}
        title="Currency deposit"
        className="deposit-modal"
        textcenter
      >
        <>
          {selectedWallet && (
            <div className="deposit-modal__qr">
              <QRCode
                size={250}
                value={selectedWallet && selectedWallet?.address}
                viewBox={`0 0 250 250`}
              />
            </div>
          )}
          <div className="rec-add">
            <label className="form-label">
              Receiver address: {selectedWallet?.coin?.toUpperCase()}
            </label>
            <div className="input-wrap copy_address_input mb-0">
              <div className="address-container">
                <p className="address-text">
                  {selectedWallet?.address &&
                    `${selectedWallet?.address.slice(0, 18)}.....${selectedWallet?.address.slice(-18)}`}
                  <button
                    type="button"
                    className="copy-button"
                    onClick={() =>
                      copy(String(selectedWallet?.address), "Address copied")
                    }
                  >
                    <CopyIcon />
                  </button>
                </p>
              </div>
            </div>
            <p className="deposit_note">
              <b>Note :</b> We will not accept deposit below{" "}
              {selectedWallet?.coin?.toUpperCase() === "ETH"
                ? `0.0004 ${selectedWallet?.coin?.toUpperCase()}`
                : `1 ${selectedWallet?.coin?.toUpperCase()}`}
              . If you do, you will risk losing funds.
            </p>
          </div>
        </>
      </CommonModal>
    </>
  );
}

export default Deposit;
