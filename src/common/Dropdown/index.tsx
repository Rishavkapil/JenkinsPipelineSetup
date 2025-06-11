"use client";

import { Dropdown, Form } from "react-bootstrap";

function CustomDropDown({
  children,
  label,
  error,
  addclass,
  onSelect,
  onChange,
  defaultValue,
  defaultsel,
}: any) {
  return (
    <Form.Group className="dropform">
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Dropdown
        className={`commonDropdown_style ${addclass}`}
        onSelect={onSelect}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <Dropdown.Toggle id="dropdown-basic" className="commonToggle_style">
          {defaultsel}
        </Dropdown.Toggle>
        <Dropdown.Menu>{children}</Dropdown.Menu>
      </Dropdown>
      <Form.Text className="text-muted" color={"red"}>
        {error}
      </Form.Text>
    </Form.Group>
  );
}

export default CustomDropDown;
