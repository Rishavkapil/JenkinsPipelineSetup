import React from "react";
import { CommonModal } from "@/common";
import "./SigninModal.scss";

interface UserModalButtonProps {
    handleClose: () => void;
    show: boolean;
}

const SigninModal: React.FC<UserModalButtonProps> = ({
    handleClose,
    show,
}) => {

    return (
        <CommonModal
            backdrop="static"
            show={show}
            onHide={() => {
                handleClose && handleClose();
            }}
        >
            <div className="viewBody">
              <h4>Sign-up will be available when the first phase starts</h4>
            </div>
        </CommonModal>
    );
};
export default SigninModal;
