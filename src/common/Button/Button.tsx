"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import "./Button.scss";

interface ButtonProps {
  id?: string;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fluid?: boolean;
  transparent?: boolean;
  btnIcon?: string;
  onlyIcon?: ReactNode;
  text?: any;
  icon?: ReactNode;
  role?: string;
  to?: string;
  rightIcon?: ReactNode;
}

const Button = ({
  id,
  text,
  onClick,
  className = "",
  disabled,
  icon,
  role,
  type,
  to,
  title,
  rightIcon,
}: ButtonProps) => {
  const [isPulsating, setPulsating] = useState(false);

  const handleClick = () => {
    if (!onClick) {
      setPulsating(true);
      setTimeout(() => setPulsating(false), 800);
    }
    onClick?.();
  };

  const buttonClass = `btn-style custom-button ${className} ${icon ? "custom-button--icon" : ""} ${isPulsating ? "pulse" : ""}`;

  return role === "link" && to ? (
    <Link
      href={to}
      className={buttonClass}
      onClick={handleClick}
      id={id}
      title={title}
    >
      {text}
      {icon && <span className="btn-icon">{icon}</span>}
    </Link>
  ) : (
    <button
      id={id}
      disabled={disabled}
      className={buttonClass}
      onClick={handleClick}
      type={type}
      title={title}
    >
      {text}
      {rightIcon && <span className="rightIcon">{rightIcon}</span>}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;
