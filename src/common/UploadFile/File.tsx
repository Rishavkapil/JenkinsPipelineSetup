import React from "react";
import { ImageIcon } from "@/app/_ui/svg/_svg";
import "./File.scss";

interface UploadFileProps {
  label: string;
  name: string;
  id: string;
  accept: string;
  error: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: (file: File) => void;
  status: string; // add this prop
}

const UploadFile: React.FC<UploadFileProps> = ({
  label,
  name,
  id,
  accept,
  error,
  onChange,
  onUpload,
  status,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (file) {
      onUpload(file);
    }
    onChange(event);
  };

  return (
    <div className="uploadField">
      <div className="uploadFieldIn">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <div className="uploadFieldIn__inner">
          <div className="uploadFieldIn__content">
            <span>
              <ImageIcon />
            </span>
            <input
              type="file"
              className="form-control"
              id={id}
              name={name}
              accept={accept}
              onChange={handleFileChange}
            />
          </div>
        </div>
        {error && <div className="error_message">{error}</div>}
      </div>
      <button
        type="button"
        className="upload-btn"
        disabled={status === "uploading"}
      >
        {status === "idle" && "Upload"}
        {status === "uploading" && "Uploading..."}
        {status === "uploaded" && "Uploaded"}
        {status === "failed" && "Upload Failed"}
      </button>
    </div>
  );
};

export default UploadFile;
