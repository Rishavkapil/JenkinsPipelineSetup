"use client"
import React from "react";
import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import { CloseIcon } from "@/app/_ui/svg/_svg";
import "./CommonModal.scss";

const CommonModal = ({
  show,
  onHide,
  children,
  className,
  title,
  subTitle,
  backdrop,
  textcenter,
}: {
  show?: boolean;
  onHide?: any;
  children?: ReactNode;
  className?: string;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  closeButton?: any;
  backdrop?: any;
  textcenter?: boolean
}) => {
  return (
    <Modal
      backdrop={backdrop}
      show={show}
      onHide={onHide}
      centered
      className={`custom-modal ${className ? className : ""}`}
    >
      <button onClick={onHide} className="custom-modal__action">
        <CloseIcon />
      </button>
      {(title || subTitle) && (
        <div className="custom-modal__header">
          {title && <h2 className={`custom-modal__title ${textcenter ? "text-center" : ""}`}>{title}</h2>}
          {subTitle && <p className={`custom-modal__subTitle ${textcenter ? "text-center" : ""}`}>{subTitle}</p>}
        </div>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CommonModal;
