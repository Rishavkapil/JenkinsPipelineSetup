"use client";

/** @format */

import { Form } from "react-bootstrap";
import {
  isEmail,
  isName,
  isZipcode,
  isSubject,
  isPassword,
  isConfirmPass,
  isToken,
} from "@/services/form.service";
import { FIELDS } from "@/schema/schemaConstants";
import { allowOnlyString } from "@/services/common.service";
import "./Input.scss";
import React from "react";

/** CUSTOM COMMON INPUT FIELD WITH DYNAMIC PROPS */
const Input = (props: any) => {
  /** RESTRICT USER TO ENTER e, E, +, -, . IN INPUT TYPE NUBER */
  const disabledCharacters = ["e", "E", "+", "-"];
  const onKeyDown = (e: any) => {
    if (props.disableDecimal) {
      disabledCharacters.push(".");
    }
    if (props.type === "text") {
      switch (props.fieldName) {
        case FIELDS.NAME:
          isName(e);
          break;
        case FIELDS.SUBJECT:
          isSubject(e);
          break;
        case FIELDS.EMAIL:
          isEmail(e, props.maxLength || 300);
          break;
        case FIELDS.ZIPCODE:
          isZipcode(e);
          break;
        case FIELDS.PASSWORD:
          isPassword(e, props.onChange);
          break;
        case FIELDS.CONFIRMPASSWORD:
          isConfirmPass(e, props.onChange);
          break;
        default:
          break;
      }
    } else if (props.type === "number") {
      switch (props.fieldname) {
        case FIELDS.TOKEN:
          isToken(e, props.onChange);
          break;
      }
    }
    /** RESTRICT USER TO ENTER MORE THEN MAX LENGTH IN INPUT TYPE NUBER */
    return props.type === "number"
      ? (disabledCharacters.includes(e.key) ||
          (e.key !== "Backspace" &&
            props.maxLength &&
            e.target.value.length === props.maxLength)) &&
          e.preventDefault()
      : props.onlyChar
        ? !allowOnlyString(e.key) && e.preventDefault()
        : null;
  };

  /** PREVENT SCROLLING ON NUMBER INPUTS */
  const onWheel = (e: any) => {
    if (props.type === "number") {
      e.target.blur();
    }
  };

  return (
    <>
      <Form.Group
        className={`input ${props.className ? props.className : ""} ${props.icon ? "right-padd" : ""}`}
        controlId={props.controlId}
      >
        {props.label ? (
          <Form.Label htmlFor={props.id} className={props.classLabel}>
            {props.label}
            {props.label && !props.required ? <sup>*</sup> : null}
          </Form.Label>
        ) : (
          <React.Fragment />
        )}
        <div className="inner">
          <Form.Control
            disabled={props.disabled}
            type={props.type}
            id={props.id}
            as={props.as}
            name={props.name}
            value={props.value}
            onKeyDown={onKeyDown}
            autoSave="true"
            placeholder={props.placeholder}
            onBlur={props.onBlur}
            onChange={props.onChange}
            maxLength={props.maxLength ? props.maxLength : ""}
            required={props.required}
            min={props.min}
            max={props.max}
            isInvalid={props.isInvalid}
            onWheel={onWheel}
            onPaste={(e) =>
              props.onlyChar ? e.preventDefault() : props.onChange
            }
            // onWheel={props.onWheel}
            step={props.step}
            autoComplete={props.autoComplete ? props.autoComplete : "off"}
            // pattern="\S(.*\S)?"
            // title={props.title ? props.title : 'Blank space are not allowed'}
            onInvalid={props.onInvalid}
            onInput={props.onInput}
            className={`${props.className} ${props.inputtext} ${props.icon ? "right-padd" : ""}`}
            readOnly={props.readOnly}
            error={props.error}
          />
          {props.icon && <span className="right-content">{props.icon}</span>}
          {props.children}
        </div>
        {props.error && <span className="error_message">{props.error}</span>}
        {props.smallText ? (
          <Form.Text id="" muted className="small-text-form">
            {props.smallText}
          </Form.Text>
        ) : (
          <React.Fragment />
        )}
      </Form.Group>
    </>
  );
};
export default Input;
