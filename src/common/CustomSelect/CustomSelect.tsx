"use client";
import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "../Input/Input.scss";
import "./CustomSelect.scss";

const CustomSelect = (props: any) => {
  return (
    <div
      className={`common-select-wrapper input ${props.className ? props.className : ""}`}
    >
      {props.label ? (
        <Form.Label htmlFor={props.id} className={props.classLabel}>
          {props.label}
          {props.required && <sup>*</sup>}
        </Form.Label>
      ) : (
        <React.Fragment />
      )}
      <Select
        instanceId={"common-select"}
        options={props.options}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className={`common-select`}
        classNamePrefix="react-select"
        onChange={props.onChange}
        isSearchable={props.isSearchable ? props.isSearchable : false}
        onBlur={props.onBlur}
        isDisabled={props.disabled}
        isLoading={props.isLoading}
        menuIsOpen={props.menuIsOpen}
        value={props.value}
      />
      {props.error && <span className="error_message">{props.error}</span>}
    </div>
  );
};

export default CustomSelect;
