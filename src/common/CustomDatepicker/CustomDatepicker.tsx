/** @format */

"use client";
import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "../Input/Input.scss";
import "./CustomDatepicker.scss";

const CustomDatepicker = (props: any) => {
  return (
    <div
      className={`input custom-datepicker ${props.className ? props.className : ""} `}
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
        <DatePicker
          maxDate={new Date()}
          format={props.format}
          name={props.name}
          className={props.className}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
      {props.error && <span className='error_message'>{props.error}</span>}
    </div>
  );
};

export default CustomDatepicker;
