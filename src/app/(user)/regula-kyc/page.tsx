"use client";

import React, { useState } from "react";
import "./style.scss";
import { useRegulakycSubmitMutation } from "@/services/rtk.api.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import toaster from "@/common/Toast";

import { Button } from "@/common";
import dynamic from "next/dynamic";

const RegulaKycModal = dynamic(() => import("./RegulaKycModal"), {
  ssr: false,
});
const RegulaKyc = () => {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [processingData, setProcessingData] = useState<any>(null);
  const [regulakycSubmit] = useRegulakycSubmitMutation();
  const router = useRouter();

  const handleFileChange = async (event: any) => {
    let fileData = event.target.files[0];
    const allowedFormats = ["jpg", "jpeg", "png"];
    const fileExtension = fileData.name.split(".").pop()?.toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      toast.error(
        "Unsupported file format. Please upload jpg, jpeg or png files."
      );
      return;
    }
    convertToBase64({ file: event.target.files?.[0], mode: "upload" });
    var ssrc = URL.createObjectURL(fileData);
    const img = new Image();
    img.src = ssrc;
    const loadImage = () => {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    };
    try {
      await loadImage();

      const name = event.target.value.split(`\\`);
      const fileName = name[name.length - 1];

      if (fileData.size < 2000000) {
        setFileName(fileName);
        setFilePreview(URL.createObjectURL(fileData));
      } else {
        // Display an error message
        toast.error("Files must be less than 2 MB and not duplicates.");
      }
    } catch (error) {
      toast.error("Error loading image. Please try again.");
    }
  };

  const convertToBase64 = ({
    file,
    mode,
  }: {
    file: File;
    mode: "sample" | "upload";
  }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const [_, result] = reader.result.split(",");
        setProcessingData({ base64: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (processingData) {
      const dataToSend = {
        document: processingData?.base64,
      };
      const regulakyc = await regulakycSubmit(dataToSend);
      if (!regulakyc?.error) {
        router.push("/dashboard");
      }
    } else {
      toaster.error("Please upload a valid document");
    }
  };

  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 pt-4">
              <label className="formbold-form-label formbold-form-label-2">
                Document
              </label>
              {/* <div id="container">
                <div className="custom-message"></div>

                {isOpen ? (
                  <RegulaKycModal
                    setProcessingData={setProcessingData}
                    setFilePreview={setFilePreview}
                    setFileName={setFileName}
                  />
                ) : (
                  <Button
                    className=" sml-btn"
                    text="Take picture"
                    type="button"
                    onClick={() => setIsOpen(true)}
                  />
                )}
              </div> */}
              {!fileName ? (
                <div className="formbold-mb-5 formbold-file-input">
                  <label htmlFor="file">
                    <div>
                      <span className="formbold-drop-file">
                        Drag your document
                      </span>
                      <span className="formbold-or"> OR </span>
                      <span className="formbold-browse"> Upload a file </span>
                    </div>
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                  />
                </div>
              ) : null}
              {filePreview && (
                <div className="formbold-image-preview">
                  <img src={filePreview} alt="Selected file preview" />
                </div>
              )}

              {fileName && (
                <div className="formbold-file-list formbold-mb-5">
                  <div className="formbold-file-item">
                    <span className="formbold-file-name"> {fileName} </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFileName("");
                        setFilePreview(null);
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="btn-layout">
              <Button className="btn-style" text="Submit KYC" type="submit" />
            </div>
          </form>
          <div className="kyc_note">
            <p>
              <b>Note :</b> We accept only passports or driving licenses.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegulaKyc;
