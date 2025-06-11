"use client";
import Form from "react-bootstrap/Form";

function CheckBox({
  label,
  // labeltext,
  children,
  placeholder,
  value,
  onChange,
  checked,
  onClick,
  type = "checkbox",
  required,
  maxLength,
  error,
  className,
}: any) {
  return (
    <>
      <Form.Group className={`custom-checkbox ${className}`}>
        <Form.Check
          id="check-label"
          type={type}
          placeholder={placeholder}
          value={value}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          required={required || false}
          maxLength={maxLength || 999999999999}
          isInvalid={error}
          label={label || children}
        />
      </Form.Group>
      <Form.Text className="error_message">{error}</Form.Text>
    </>
  );
}
export default CheckBox;
