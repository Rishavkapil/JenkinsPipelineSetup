import React, { useEffect } from "react";
import {
  DocumentReaderService,
  defineComponents,
} from "@regulaforensics/vp-frontend-document-components";

function RegulaKycModal({
  setProcessingData,
  setFilePreview,
  setFileName,
}: any) {
  useEffect(() => {
    window.RegulaDocumentSDK = new DocumentReaderService();

    window.RegulaDocumentSDK.recognizerProcessParam = {
      processParam: {
        scenario:
          "MrzAndLocate" as unknown as typeof window.RegulaDocumentSDK.recognizerProcessParam.processParam.scenario,
        multipageProcessing: true,
      },
    };

    window.RegulaDocumentSDK.imageProcessParam = {
      processParam: {
        scenario:
          "MrzAndLocate" as unknown as typeof window.RegulaDocumentSDK.recognizerProcessParam.processParam.scenario,
      },
    };

    defineComponents().then(() => window.RegulaDocumentSDK.initialize());
    const component: any = document?.querySelector("camera-snapshot");

    if (component) {
      component.settings = {
        locale: "custom",
        regulaLogo: false,
        multipageProcessing: true,
        startScreen: true,
        multipleFileInput: true,
        changeCameraButton: true,
        closeButton: true,
        cameraFrameShapeType: "corners",
        cameraFrameBorderWidth: 7,
      };

      component.translations = {
        custom: {
          scanIDInBrowser: "Scan your ID",
        },
      };
    }

    function listener(event: any) {
      if (event.detail) {
        const response = event.detail;
        if (response?.data?.response[0]?.raw) {
          setProcessingData({
            base64: response?.data?.response[0]?.raw,
          });
        } else {
          setFilePreview(null);
          setProcessingData(null);
          setFileName(null);
        }
      }
    }

    return () => {
      component?.addEventListener("camera-snapshot", listener);
    };
  }, []);
  return (
    <div>
      <camera-snapshot className="my-style"></camera-snapshot>
    </div>
  );
}

export default RegulaKycModal;
