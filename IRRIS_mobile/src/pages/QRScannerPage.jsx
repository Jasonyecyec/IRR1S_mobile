import React, { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
import PageTitle from "@/src/components/PageTitle";
import { Html5Qrcode } from "html5-qrcode";
import "../styles/qrscanner/qrscanner.css";
import { findFacility } from "../services/api/sharedService";
import { useNavigate } from "react-router-dom";

const QRScannerPage = ({ onScan }) => {
  const qrBoxId = "qr-box"; // Define a unique ID for the div
  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Define a callback function to handle the scan results.
  const handleScanSuccess = (decodedText, decodedResult) => {
    // Handle the decoded text, e.g., by storing it in state or sending it to a parent component
    console.log(decodedText);
    // Stop scanning after a successful scan if desired
    // html5QrCodeRef.current.stop();
    // setIsScanning(false);
  };

  const findFacilityByQrCode = async (decodedText) => {
    try {
      const response = await findFacility(decodedText);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true; // Add a flag to check if component is still mounted

    // Delay initialization
    const config = {
      fps: 25,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.1,
      facingMode: { exact: "environment" },
    };

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrBoxId);
    }
    // const html5QrCode = new Html5Qrcode(qrBoxId); // Use the ID string here

    // Html5Qrcode.getCameras()
    //   .then((cameras) => {
    //     if (cameras && cameras.length) {
    //       let cameraId = cameras[0].id;
    //       for (let camera of cameras) {
    //         console.log("camera", cameras);
    //         console.log("facing mode", camera.facingMode);
    //         console.log("camera id", camera.id);
    //         if (camera.facingMode === "environment") {
    //           cameraId = camera.id;
    //           break;
    //         }
    //       }

    //       html5QrCode
    //         .start(
    //           { facingMode: { exact: "environment" } },
    //           config,
    //           (decodedText, decodedResult) => {
    //             onScan(decodedText);
    //           },
    //           (errorMessage) => {
    //             console.log(errorMessage);
    //           }
    //         )
    //         .catch((err) => console.error(err));
    //     }
    //   })
    //   .catch((err) => console.error(err));

    // Html5Qrcode.getCameras().then(cameras => {
    //   if (cameras && cameras.length) {
    //     // Use the environment camera if available, otherwise fallback to another camera
    //     const cameraId = cameras.find(camera => camera.facingMode === "environment")?.id || cameras[0].id;
    //     html5QrCode.start(
    //       cameraId,
    //       config,
    //       (decodedText, decodedResult) => {
    //         onScan(decodedText);
    //       },
    //       (errorMessage) => {
    //         console.log(errorMessage);
    //       }
    //     ).catch((err) => console.error("Error starting QR scanner: ", err));
    //   }
    // }).catch((err) => {
    //   console.error("Error getting cameras: ", err);
    // });

    // Define a function to start the QR scanner
    const startScanner = async () => {
      if (isScanning) return; // If already scanning, do not start again.

      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length) {
        const cameraId =
          cameras.find((camera) => camera.facingMode === "environment")?.id ||
          cameras[0].id;
        // Create an instance of Html5Qrcode
        const html5QrCode = new Html5Qrcode(qrBoxId);
        // Assign it to the ref
        html5QrCodeRef.current = html5QrCode;

        // Start scanning
        await html5QrCode.start(
          { facingMode: { exact: "environment" } },
          config,
          async (decodedText, decodedResult) => {
            console.log(decodedText);
            // You can call stop here if you want to stop scanning after a successful scan
            setIsLoading(true);
            try {
              await html5QrCodeRef.current.stop(); // Stop the scanner immediately after a QR code is detected.
              setIsScanning(false); // Update the scanning state.
              setIsScanning(true);
              // const data = await findFacilityByQrCode(decodedText); // Now you can use await here
              const response = await findFacility(decodedText);
              const facility = response.facility;

              if (response) {
                navigate("/report-issue", { state: { facility } });
              }
            } catch (error) {
              console.log("cant find facility");
              navigate("/facility-not-found");
            } finally {
              // await html5QrCodeRef.current.stop();
              setIsLoading(false);
            }
          }
        );
      } else {
        throw new Error("No cameras found.");
      }
    };

    startScanner();

    // Cleanup function to stop the scanner
    return () => {
      mounted = false; // Set mounted to false when component unmounts
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().catch((error) => {
          console.error("Error stopping QR scanner: ", error);
        });
      }
    };
  }, []);

  const handleStopClick = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          setIsScanning(false);
          console.log("Scanner stopped");
        })
        .catch((err) => {
          console.error("Error stopping QR scanner: ", err);
        });
      console.log("handleStopClick");
    }

    navigate("/scan-facility");
  };

  return (
    <div className="h-screen w-screen relative">
      <PageTitle title="QR Scanner" closeFunction={handleStopClick} />
      <div className="h-full w-full  flex  flex-col pt-10 ">
        <p className="p-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat non
          corrupti cupiditate quo excepturi quidem maxime. Id eos voluptas
          illum.
        </p>
        <div
          id={qrBoxId}
          ref={html5QrCodeRef}
          className="bg-blue-400 w-full"
        ></div>
      </div>

      {isLoading && (
        <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center">
          <Spinner
            color="info"
            aria-label="Info spinner example"
            size="xl"
            className="text-white"
          />
        </div>
      )}
    </div>
  );
};

export default QRScannerPage;
