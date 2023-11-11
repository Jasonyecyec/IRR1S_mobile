import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScannerPage = ({ onScan }) => {
  const qrBoxId = "qr-box"; // Define a unique ID for the div

  useEffect(() => {
    setTimeout(() => {
      // Delay initialization
      const config = { fps: 10, qrbox: { width: 250, height: 500 } };
      const html5QrCode = new Html5Qrcode(qrBoxId); // Use the ID string here

      Html5Qrcode.getCameras()
        .then((cameras) => {
          if (cameras && cameras.length) {
            let cameraId = cameras[0].id;
            for (let camera of cameras) {
              if (camera.facingMode === "environment") {
                cameraId = camera.id;
                break;
              }
            }

            html5QrCode
              .start(
                cameraId,
                config,
                (decodedText, decodedResult) => {
                  onScan(decodedText);
                },
                (errorMessage) => {
                  console.log(errorMessage);
                }
              )
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));

      return () => {
        html5QrCode.stop().catch((err) => console.error(err));
      };
    }, 100); // Delay of 100ms
  }, [onScan]);

  return <div id={qrBoxId} className="h-full"></div>; // Use the ID here
};

export default QRScannerPage;
