/** @format */

import React from "react";
import Image from "next/image";
import swap_img from "../../../../../public/assets/swap_img.png";
import swap_img_red from "../../../../../public/assets/reject_icon.png";
import "./InfoCard.scss";
import { FAIcon, KycIcon } from "@/app/_ui/svg/_svg";

const InfoCard = ({
  title,
  status,
  statusClass,
  showImg,
}: {
  title?: string;
  status?: string;
  statusClass?: any;
  showImg?: Boolean;
}) => {
  return (
    <div className="info-card">
      {showImg ? (
        <span className="info-card__icon">
          <FAIcon />
        </span>
      ) : (
        <span className="info-card__icon">
          <KycIcon />
        </span>
      )}
      <h3>{title}</h3>
      <p>
        Status : <span className={statusClass}>{status}</span>
      </p>
    </div>
  );
};

export default InfoCard;
