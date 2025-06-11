import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../Input/Input.scss";
import "./PhoneField.scss";

const PhoneField = (props: any) => {
  return (
    <div
      className={`input phone-input ${props.className ? props.className : ""}`}
    >
      {props.label ? (
        <Form.Label htmlFor={props.id} className={props.classLabel}>
          {props.label}

          <sup>*</sup>
        </Form.Label>
      ) : null}
      <div className="inner">
        <PhoneInput
          placeholder={props.placeholder}
          country={props.country}
          enableAreaCodes={true}
          value={props.value}
          autoFormat
          enableSearch={true}
          onChange={props.onChange}
        />
      </div>
      {props.error && <span className="error_message">{props.error}</span>}
    </div>
  );
};

export default PhoneField;
