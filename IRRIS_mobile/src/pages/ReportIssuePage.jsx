import React, { useEffect, useRef } from "react";
import PageTitle from "../components/PageTitle";
import "../index.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Label, FileInput } from "flowbite-react";
import TextInput from "../components/TextInput";
import { Camera } from "@phosphor-icons/react";

const ReportIssuePage = () => {
  const location = useLocation();
  const facility = location.state?.facility;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const initializeCamera = async () => {
    logAvailableCameras();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        if (videoDevices.length > 1) {
          // Check if the desired camera index exists
          const secondCamera = videoDevices[1]; // Select the second camera

          const constraints = {
            video: { deviceId: { exact: secondCamera.deviceId } },
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } else {
          console.error("Second camera not found.");
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    }
  };

  const logAvailableCameras = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        console.log("Available camera devices:", videoDevices);
      })
      .catch((err) => {
        console.error("Error listing devices:", err);
      });
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    // You can then save the image from the canvas as needed
    console.log(canvas);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!facility) {
      navigate("/student/scan-facility");
    }
  }, []);
  console.log("facility", facility);
  return (
    <div className="background h-screen w-screen relative">
      <PageTitle title="REPORT ISSUE" />
      <div className="h-full  p-5 pt-16 space-y-16">
        <div>
          <TextInput
            placeholder="Facility ID"
            label="Facility ID"
            value={facility.qr_code}
            disabled={true}
          />
          <TextInput placeholder="Room" label="Room" />
          <div>
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Issue Details
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          <div className="mt-3">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload Picture" />
            </div>

            <div className="flex justify-center mt-5">
              <button
                className="bg-white shadow-md rounded-md p-3 flex flex-col items-center space-y-3"
                onClick={initializeCamera}
              >
                <Camera size={42} color="#828282" />
                <span className="text-lg font-semibold">Take Picture</span>
              </button>

              <canvas
                ref={canvasRef}
                // style={{ display: "none" }}
                className="w-32"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-5 ">
          <button className="bg-mainColor p-3 text-white rounded-lg flex-1 font-bold text-lg">
            Cancel
          </button>
          <button className="bg-mainColor p-3 text-white rounded-lg flex-1 font-bold text-lg">
            Submit
          </button>

          <button
            onClick={captureImage}
            className="bg-mainColor p-3 text-white rounded-lg flex-1 font-bold text-lg"
          >
            Take Picture
          </button>
        </div>

        <div className="absolute top-0 left-0 z-10 h-40">
          {" "}
          <video ref={videoRef} className="" />
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;
