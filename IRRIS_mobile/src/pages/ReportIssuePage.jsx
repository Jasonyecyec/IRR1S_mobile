import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import "../index.css";
import { useLocation } from "react-router-dom";
import { Label, FileInput } from "flowbite-react";
import TextInput from "../components/TextInput";
import {
  Camera,
  Aperture,
  X,
  Check,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import ConfirmationModal from "../components/ConfirmationModal";
import useUserStore from "../services/state/userStore";
import Cookies from "js-cookie";
import { reportFacility } from "../services/api/sharedService";
import { useNavigate } from "react-router-dom";

const ReportIssuePage = () => {
  const location = useLocation();
  const facility = location.state?.facility;
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSubmit, setOpenModalSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: "",
    facility_id: "",
    image_before: null,
    issue_type: "",
    description: "",
    status: "pending",
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const initializeCamera = async (e) => {
    e.preventDefault();
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

  // const handleSubmit = async () => {

  // };

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

  const onCloseModalSubmit = () => {
    setOpenModalSubmit(false);
  };

  const handleConfirmButton = () => {
    setImageFile(null);
    setImageSrc(null);
    onCloseModal();
  };

  const handleConfirmButtonSubmit = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("user_id", form.user_id);
      formData.append("facility_id", form.facility_id);
      formData.append("issue_type", form.issue_type);
      formData.append("description", form.description);
      formData.append("status", form.status);

      // Append the file if it exists
      if (imageFile) {
        formData.append("image_before", imageFile);
      }
      console.log("form", form);
      const response = await reportFacility(formData);
      navigate(response.route);
    } catch (error) {
      console.error(error);
      navigate(error.response.data.route, {
        state: { errorMessage: error.response.data.error },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    setOpenModalSubmit(true);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // You can then save the image from the canvas as needed

    // Add date and time to the canvas
    const dateTime = new Date().toLocaleString();
    const fontSize = 20; // Choose an appropriate font size
    context.font = `${fontSize}px Arial`; // Set font on context, not canvas

    // Align text in the center horizontally
    context.textAlign = "center";

    // Align text in the middle vertically
    context.textBaseline = "middle";

    // Text color that contrasts with the background
    context.fillStyle = "white";

    // Position the text in the center of the canvas
    // The x-coordinate is half the canvas width
    // The y-coordinate is a certain distance from the bottom, for example, 30 pixels
    context.fillText(dateTime, canvas.width / 2, canvas.height - 50);

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

  useEffect(() => {
    if (!facility) {
      navigate("/scan-facility");
    }

    // Get the cookie by its name
    const userIdCookie = Cookies.get("user_id");

    setForm((prevForm) => ({
      ...prevForm,
      user_id: userIdCookie,
      facility_id: facility.id,
    }));
  }, []);
  return (
    <div className="background h-screen w-screen relative">
      {openModal && (
        <ConfirmationModal
          isLoading={false}
          onCloseModal={onCloseModal}
          handleConfirmButton={handleConfirmButton}
          content="Remove image?"
        />
      )}

      {openModalSubmit && (
        <ConfirmationModal
          isLoading={isLoading}
          onCloseModal={onCloseModalSubmit}
          handleConfirmButton={handleConfirmButtonSubmit}
          content="Do you confirm that the details are correct?"
        />
      )}

      {isCameraOpen && (
        <div className="absolute top-0  left-0 bg-gray-700 bg-opacity-70 z-10 w-full h-full ">
          <div className="relative space-y-10  h-full">
            <video
              ref={videoRef}
              className={`h-full w-full z-10 object-cover object-center	 ${
                canvas ? "hidden" : ""
              }`} // Hide the video if the image is captured
            />

            <canvas
              ref={canvasRef}
              className={`h-full w-full z-10 object-cover object-center absolute top-[-40px] left-0  ${
                canvas ? "" : "hidden"
              }`} // Show the canvas only if the image is captured
            />

            {/* <div className="flex justify-center space-x-5 absolute bottom-0 left-0"> */}
            <button
              className=" text-white mt-0 p-3 w-12 h-12 rounded-full text-xl absolute top-1  right-2 z-20"
              onClick={stopCameraStream}
            >
              <X size={35} color="#ffffff" weight="bold" />{" "}
            </button>
            {canvas ? (
              <div className="absolute bottom-32 left-0  w-full flex justify-center space-x-16 z-20">
                <button
                  onClick={retakeImage}
                  className="bg-mainColor text-white p-3  rounded-full text-xl"
                >
                  <ArrowCounterClockwise
                    size={32}
                    color="#ffffff"
                    weight="bold"
                  />
                </button>
                <button
                  className="bg-mainColor text-white p-3  rounded-full text-xl"
                  onClick={savedImage}
                >
                  <Check size={32} color="#ffffff" weight="bold" />
                </button>
              </div>
            ) : (
              <button
                className="bg-mainColor text-white p-3 w-20 shadow-2xl rounded-full flex flex-col items-center absolute bottom-28 left-1/2 transform -translate-x-1/2"
                onClick={captureImage}
              >
                <Aperture size={40} color="#ffffff  " />
              </button>
            )}
            {/* </div> */}
          </div>
        </div>
      )}
      <PageTitle title="REPORT ISSUE" />
      <div className="h-full w-full  p-5 pt-16 ">
        <form onSubmit={handleSubmitButton} className="space-y-8">
          <div>
            <TextInput
              placeholder="Facility ID"
              label="Facility ID"
              value={facility?.qr_code}
              disabled={true}
            />
            <TextInput
              placeholder="Room"
              label="Room"
              value={facility?.facilities_name}
              disabled={true}
            />

            <div className="">
              <label
                htmlFor="issue-type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Issue Type
              </label>

              <div className="relative">
                <select
                  id="issue-type"
                  className="rounded-md w-40 "
                  name="issue_type"
                  value={form.issue_type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled selected>
                    Select Issue
                  </option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="carpentry">Carpentry</option>
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
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mt-3">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload Picture" />
              </div>

              <div className="flex justify-center  space-x-5">
                <button
                  className="bg-white shadow-md rounded-md p-3 flex flex-col items-center space-y-3"
                  onClick={initializeCamera}
                >
                  <Camera size={32} color="#828282" />
                  <span className=" font-semibold">Take Picture</span>
                </button>

                {imageSrc && (
                  <div className="bg-red-400 relative">
                    <img
                      src={imageSrc}
                      alt="Captured"
                      className="w-32 h-full rounded-md" // Set your desired width and height
                    />

                    <button
                      onClick={handleRemoveImage}
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
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssuePage;
