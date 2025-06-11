// "use client"
import { useState } from "react";
import Form from "react-bootstrap/Form";

const Select = ({
  label,
  options,
  onChange,
  error,
  value,
  id,
  readOnly,
  required,
  placeholder,
}: any) => {
  const [active, setActive] = useState(false);

  return (
    <Form.Group className="common_select text-success">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
        id={id}
        onChange={(e) => {
          onChange(e);
        }}
        isInvalid={error}
        value={value}
        disabled={readOnly}
        required={required}
        onClick={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={`${active ? "active" : ""}`}
      >
        {/* {placeholder && <option value="">{placeholder}</option>} */}
        {!value && <option value="">{placeholder}</option>}
        {options &&
          options.map((opn: any) => (
            <option value={opn.name} key={opn.id}>
              {opn.name}
            </option>
          ))}
      </Form.Select>
      <span className={`arrow_icon ${active ? "active" : null}`}></span>
      {error && (
        <Form.Text className="error-msg text-danger">{error}</Form.Text>
      )}
    </Form.Group>
  );
}

export default Select;
