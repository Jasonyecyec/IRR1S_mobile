import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import "../index.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Label, FileInput } from "flowbite-react";
import TextInput from "../components/TextInput";
import { Camera, Aperture, X } from "@phosphor-icons/react";
import ConfirmationModal from "../components/ConfirmationModal";
import useUserStore from "../services/state/userStore";

const ReportIssuePage = () => {
  const { user } = useUserStore();
  const location = useLocation();
  const facility = location.state?.facility;
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const initializeCamera = async () => {
    logAvailableCameras();
    setIsCameraOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const constraints = {
          video: { facingMode: "environment" }, // Default to back camera
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("environment", stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
        try {
          // Fallback to any available camera if the back camera is not accessible
          const fallbackConstraints = { video: true };
          const fallbackStream = await navigator.mediaDevices.getUserMedia(
            fallbackConstraints
          );
          console.log("user ");

          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.play();
          }
        } catch (fallbackErr) {
          console.error("Error accessing any camera: ", fallbackErr);
        }
      }
    }
  };

  const handleSubmit = () => {
    console.log("image", imageFile);
    console.log("user", user);
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

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmButton = () => {
    setImageFile(null);
    setImageSrc(null);
    onCloseModal();
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    // You can then save the image from the canvas as needed

    //set to state
    setCanvas(canvas);
    console.log(canvas);
  };

  const savedImage = () => {
    if (canvasRef.current) {
      // Convert the canvas to a data URL and then to a Blob
      canvasRef.current.toBlob((blob) => {
        // Format the current date and time to use as the file name
        const date = new Date();
        const fileName = `image_${date
          .toISOString()
          .replace(/:|\./g, "-")}.jpg`;

        // Create a file from the blob
        const imageFile = new File([blob], fileName, {
          type: "image/jpeg",
          lastModified: date.getTime(),
        });

        // Create an object URL for the File object
        const objectURL = URL.createObjectURL(imageFile);

        // Set the object URL as the source for the image
        setImageSrc(objectURL);

        // Set the file in the state or do something with it (e.g., upload)
        setImageFile(imageFile);

        // Example: Log the file size to see if the file was created successfully
        console.log("Size of the new File:", imageFile.size);
      }, "image/jpeg");
    }

    stopCameraStream();
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Get the stream from the video element
      const stream = videoRef.current.srcObject;
      // Stop all tracks in the stream
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      // Clear the video source
      videoRef.current.srcObject = null;
      setIsCameraOpen(false); // Close the camera view/modal
      setCanvas(null);
    }
  };

  const retakeImage = () => {
    setCanvas(null);
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
      {openModal && (
        <ConfirmationModal
          onCloseModal={onCloseModal}
          handleConfirmButton={handleConfirmButton}
          content="Remove image?"
        />
      )}

      {isCameraOpen && (
        <div className="fixed top-0  left-0 bg-gray-700 bg-opacity-70 z-10 w-screen h-screen">
          <div className="relative space-y-10">
            {/* <video
              ref={videoRef}
              className="h-[35rem] w-full z-10   object-cover"
            /> */}

            <video
              ref={videoRef}
              className={`h-[35rem] w-full z-10 object-cover ${
                canvas ? "hidden" : ""
              }`} // Hide the video if the image is captured
            />

            <canvas
              ref={canvasRef}
              className={`h-[35rem] w-full z-10 object-cover ${
                canvas ? "" : "hidden"
              }`} // Show the canvas only if the image is captured
            />

            <div className="flex justify-center space-x-5">
              <button
                className="bg-mainColor text-white p-3 w-32 rounded-full text-xl"
                onClick={stopCameraStream}
              >
                Back
              </button>
              {canvas ? (
                <div>
                  <button
                    onClick={retakeImage}
                    className="bg-mainColor text-white p-3 w-32 rounded-full text-xl"
                  >
                    Retake
                  </button>
                  <button
                    className="bg-mainColor text-white p-3 w-32 rounded-full text-xl"
                    onClick={savedImage}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className="bg-mainColor text-white p-3 w-32 rounded-full flex flex-col items-center"
                  onClick={captureImage}
                >
                  <Aperture size={40} color="#ffffff  " />
                  <span>Capture</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <PageTitle title="REPORT ISSUE" />
      <div className="h-full w-full  p-5 pt-16 space-y-16">
        <div>
          <TextInput
            placeholder="Facility ID"
            label="Facility ID"
            value={facility.qr_code}
            disabled={true}
          />
          <TextInput placeholder="Room" label="Room" />

          <div className="">
            <label
              htmlFor="issue-type"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Issue Type
            </label>

            <div className="relative">
              <select id="issue-type" className="rounded-md w-32 ">
                <option>Electric</option>
                <option>Electric</option>
              </select>
            </div>
          </div>

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

            <div className="flex justify-center mt-5 space-x-5">
              <button
                className="bg-white shadow-md rounded-md p-3 flex flex-col items-center space-y-3"
                onClick={initializeCamera}
              >
                <Camera size={42} color="#828282" />
                <span className="text-lg font-semibold">Take Picture</span>
              </button>

              {imageSrc && (
                <div className="bg-red-400 relative">
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="w-32 h-full rounded-md" // Set your desired width and height
                  />

                  <button
                    onClick={() => setOpenModal(true)}
                    className="bg-white absolute top-[-0.5rem] right-[-0.5rem]  rounded-full shadow-lg p-1 border border-mainColor"
                  >
                    <X size={15} color="#2e39ac" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-5 ">
          <button className="bg-mainColor p-3 text-white rounded-lg flex-1 font-bold text-lg">
            Cancel
          </button>
          <button
            className="bg-mainColor p-3 text-white rounded-lg flex-1 font-bold text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;
