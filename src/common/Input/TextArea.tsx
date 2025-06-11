/** @format */

"use client";
import React from "react";
import { Form } from "react-bootstrap";

import "./Input.scss";

const TextArea = (props: any) => {
  return (
    <Form.Group
      className={`input ${props.className ? props.className : ""} ${props.icon ? "right-padd" : ""}`}
      controlId={props.controlId}
    >
      {props.label ? (
        <Form.Label htmlFor={props.id} className={props.classLabel}>
          {props.label}
          {props.label && <sup>*</sup>}
        </Form.Label>
      ) : (
        <React.Fragment />
      )}
      <div className='inner'>
        <textarea
          rows={props.rows ? props.rows : 4}
          disabled={props.disabled}
          id={props.id}
          name={props.name}
          value={props.value}
          autoSave='true'
          placeholder={props.placeholder}
          onBlur={props.onBlur}
          onChange={props.onChange}
          maxLength={props.maxLength ? props.maxLength : ""}
          required={props.required}
          onPaste={(e) =>
            props.onlyChar ? e.preventDefault() : props.onChange
          }
          // onWheel={props.onWheel}

          autoComplete={props.onlyChar ? props.autoComplete : "off"}
          // pattern="\S(.*\S)?"
          // title={props.title ? props.title : 'Blank space are not allowed'}
          onInvalid={props.onInvalid}
          onInput={props.onInput}
          readOnly={props.readOnly}
        />
      </div>
      {props.error && <span className='error_message'>{props.error}</span>}
    </Form.Group>
  );
};

export default TextArea;
