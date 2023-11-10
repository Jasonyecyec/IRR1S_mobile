import React, { useRef, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScannerPage = ({ onScan }) => {
  const qrRef = useRef(null);
  const qrBoxId = "qr-box"; // Define a unique ID for the div

  useEffect(() => {
    // Define the configuration for the scanner
    const config = { fps: 10, qrbox: 250 };

    // Initialize the QR code scanner
    const html5QrCode = new Html5QrcodeScanner(
      qrBoxId, // Use the ID string here
      config,
      false // Verbose
    );

    html5QrCode.render(
      (decodedText, decodedResult) => {
        // Handle the scanned code
        onScan(decodedText);
      },
      (errorMessage) => {
        // Handle errors, if any
        console.log(errorMessage);
      }
    );

    // Cleanup
    return () => {
      html5QrCode.clear();
    };
  }, [onScan]);

  return <div id={qrBoxId} className="h-full"></div>; // Use the ID here
};

export default QRScannerPage;
