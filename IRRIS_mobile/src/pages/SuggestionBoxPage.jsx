import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "../index.css";
import { Label, FileInput } from "flowbite-react";
import TextInput from "../components/TextInput";
import ConfirmationModalSuggestion from "../components/ConfirmationModal";
import useUserStore from "../services/state/userStore";
import Cookies from "js-cookie";
import { reportSuggestion } from "../services/api/sharedService";

import {
  ArrowLeft,
  Aperture,
  Camera,
  X,
  Check,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";

function IssueCategoryDropdown({ onSelect, issueCategoriesData }) {
  const issueCategories = Object.keys(issueCategoriesData);

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    onSelect(selectedCategory);
  };

  return (
    <select
      onChange={handleChange}
      className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="">Select Category</option>
      {issueCategories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

function SuggestionBoxPage() {
  //reportissue
  const location = useLocation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSubmit, setOpenModalSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [issueType, setIssueType] = useState(""); // Combined issue type

  // clear the form inputs when the form is submitted or canceled
  const facilityIdInputRef = useRef(null);
  const roomInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const [form, setForm] = useState({
    facility_id: "",
    image_before: null,
    room: "",
    location: "",
    description: "",
   // issue_type: "",
    status: "pending",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");

  const issueCategoriesData = {
    "Maintenance and Repairs": {
      "Roof Leaks": "carpentry",
      "Window Breaks": "carpentry",
      // other issues...
    },
    "Cleanliness and Sanitation": {
      "Restroom Cleanliness": "maintenance",
      "Garbage Disposal": "maintenance",
      // other issues...
    },
    "Temperature and Ventilation": {
      "HVAC Problems": "electrical",
      "Heating/Cooling": "electrical",
      // other issues...
    },
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedIssue(""); // Reset selected issue when category changes
  };
  const handleIssueSelect = (issue) => {
    console.log("Selected issue:", issue);
    setSelectedIssue(issue);
    // Combine selected category and issue to form the issue type
    const newIssueType = selectedCategory
      ? `${selectedCategory} - ${issue}`
      : issue;
    // Update the form state with the new issue type
    setForm((prevForm) => ({
      ...prevForm,
      issue_type: newIssueType,
    }));
  };
  // Update issue type whenever selected category or issue changes
  useEffect(() => {
    let newIssueType = "";
    if (selectedCategory && selectedIssue) {
      newIssueType = `${selectedCategory} - ${selectedIssue}`;
    } else if (selectedCategory) {
      newIssueType = selectedCategory;
    }
    // Update the issueType state with the new value
    setIssueType(newIssueType);
    // Log the input value for the useEffect hook
    console.log("Input for useEffect:", selectedCategory, selectedIssue);
  }, [selectedCategory, selectedIssue]);

  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to filter categories based on search term

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setOpenModal(true);
    setImageFile(null); // Reset the image file state
  };

  const initializeCamera = async (e) => {
    e.preventDefault();
    //log available camera here
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
    // Clear the form data
    setForm({
      facility_id: "",
      image_before: null,
     // issue_type: "",
      room: "",
      location: "",
      issues: "",
      description: "",
      status: "pending",
    });
    // Clear input values
    facilityIdInputRef.current.value = "";
    roomInputRef.current.value = "";
    locationInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    // Clear selected issue type
    setSelectedIssue("");
    // Clear image file
    setImageFile(null);
    setOpenModal(false);
  };
  const onCloseModalSubmit = () => {
    setOpenModalSubmit(false);
  };
  const handleConfirmButton = () => {
    setImageFile(null);
    setImageSrc(null);
    onCloseModal();
    // Clear the form data
    setForm({
      facility_id: "",
      image_before: null,
     // issue_type: "",
      room: "",
      location: "",
      issues: "",
      description: "",
      status: "pending",
    });
    // Clear input values
    facilityIdInputRef.current.value = "";
    roomInputRef.current.value = "";
    locationInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    // Clear selected issue type
    setSelectedIssue("");
    setImageFile(null);
    setOpenModal(false);
  };
  const handleConfirmButtonSubmit = async () => {
    setIsLoading(true);
    try {
      const formDataReport = new FormData();
      formDataReport.append("facility_id", form.facility_id);
      formDataReport.append("room", form.room);
      formDataReport.append("location", form.location);
     // formDataReport.append("issue_type", form.issueType);
      formDataReport.append("description", form.description);
      formDataReport.append("status", form.status);
      // Append the file if it exists
      if (imageFile) {
        formDataReport.append("image_before", imageFile); // Append image file to form data
        // Log the appended image file
        console.log("Appended image file:", imageFile);
      }
      setOpenModalSubmit(false);
      console.log("form", form);
      const response = await reportSuggestion(formDataReport);
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
    console.log("Form data:", form); // Check if issue_type is included in form data
    setOpenModalSubmit(true);
  };
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    console.log(video.videoWidth);
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
    setCanvas(canvas); // Convert canvas to base64 URL and set it as state
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
        // Log the image file to check if it's correctly created
        console.log("Image File:", imageFile);
        // Set the file in the state or do something with it (e.g., upload)
        setImageFile(imageFile);
        // Log the updated imageFile state
        console.log("Updated Image File State:", imageFile);
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
    setCanvas(null); // Reset the canvas
    setImageFile(null); // Reset the image file
    setImageSrc(null); // Reset the image source
  };

  //------------------------------------------------------------------------------------------------------------------

  //camera open functions

  return (
    // content of the page
    <div className="">
      {openModal && (
        <ConfirmationModalSuggestion
          isLoading={false}
          onCloseModal={onCloseModal}
          handleConfirmButton={handleConfirmButton}
          content="Remove image?"
        />
      )}

      {openModalSubmit && (
        <ConfirmationModalSuggestion
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

      {/* ------------------------------------------------------------------------------------------------------------------ */}
      <header className="fixed z-[-1] top-0 left-0 right-0 bg-mainColor2 rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
        <div className="backbutton  w-[2rem] ml-2 mt-1">
          <Link to="/" className="text-white  ">
            <ArrowLeft size={32} />
          </Link>
        </div>
      </header>

      <div className="flex justify-center mt-[5rem] z-1">
        <div className="banner w-[17rem] h-[3.2rem] pt-1 rounded-full bg-blue-700 flex justify-center align-center  mt-[-2rem]">
          {" "}
          <p className="text-3xl font-medium  text-white dark:text-white">
            Suggestion Box
          </p>
        </div>
      </div>

      {/* SUGGESTION BOX FORM */}

      <div className="form-container max-w-sm mx-auto h-[85vh]  overflow-y-auto">
        <form className="max-w-sm mx-auto mt-2 " onSubmit={handleSubmitButton}>
          <div className="mb-5">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              <span className="flex items-center justify-between">
                Facility ID
              </span>
            </label>
            <span className="text-[0.6rem] font-small">
              N/A or 0, if not applicable
            </span>
            <input
              ref={facilityIdInputRef}
              type="number"
              id="FacilityID"
              name="facility_id"
              value={form.facility_id}
              onChange={(e) =>
                setForm({ ...form, facility_id: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ex. 671354"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Room
            </label>
            <span className="text-[0.6rem] font-small">
              N/A, if not applicable
            </span>
            <input
              ref={roomInputRef}
              type="text"
              id="Room"
              name="room"
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ex. IL503"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <input
              ref={locationInputRef}
              type="text"
              id="Location"
              name="location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ex. Open Ground"
            />
          </div>

          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            ref={descriptionInputRef}
            id="message"
            name="description"
            value={form.description}
            //  onChange={handleChange}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="2"
            className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ex. Issue description/What might it cause/How come?"
          ></textarea>

          {/* ----------------------------------------------------------------------------------------------------------------- */}
          <div className="camera-report-issue mt-3">
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
                  <div className=" relative">
                    <img
                      src={imageSrc}
                      alt="Captured"
                      className="w-24 h-24  rounded-md" // Set your desired width and height
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

          <br />
          <button
            type="submit"
            className="text-white  h-[3rem] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Report Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuggestionBoxPage;
