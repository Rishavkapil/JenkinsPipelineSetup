// Updated SelfieUpload component
import { ImageIcon } from "@/app/_ui/svg/_svg";
import React from "react";
// import Form from "react-bootstrap/Form";
import "./File.scss";

function SelfieUpload({
  label,
  className,
  onChange,
  accept,
  id,
  error,
  status,
}: {
  label?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  accept?: string;
  id?: string;
  error?: string | boolean;
  status?: string;
}) {
  return (
    <div className="uploadField">
      <div className="uploadFieldIn">
        <div className="uploadFieldIn__inner">
          <div className="uploadFieldIn__content">
            <label htmlFor={id} className="form-label">
              {label}
            </label>
            <span className="d-block my-4 py-xl-2">
              <ImageIcon />
            </span>
            <div className="uploadFieldIn__text text-center">
              <p>Drag and Drop File </p>
              <p><span>or</span> browse media on your device</p>
            </div>
            <input
              className="form-control"
              type="file"
              onChange={onChange} // Ensure onChange prop is correctly wired
              // isInvalid={!!error}
              accept={accept}
              id={id}
            />
          </div>
        </div>
        {error && <span className="error_message">{error}</span>}
      </div>
    </div>
  );
}

export default SelfieUpload;
