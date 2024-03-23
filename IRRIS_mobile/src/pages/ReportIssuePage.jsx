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

// Your maintenance categories data
const issueCategories = {
  "Maintenance and Repairs": {
    "Roof Leaks": "carpentry",
    "Window Breaks": "carpentry",
    "Electrical Issues": "electrical",
    "Plumbing Problems": "plumbing",
    "Broken Chairs/Tables": "carpentry",
    "Elevator Malfunction": "electrical",
    "Pathway Repairs": "carpentry",
    "Outdoor Lighting": "electrical",
  },
  "Cleanliness and Sanitation": {
    "Restroom Cleanliness": "maintenance",
    "Garbage Disposal": "maintenance",
    "Pest Control": "maintenance",
    "Area Cleaning": "maintenance",
    "Garden Maintenance": "maintenance",
  },

  "Temperature and Ventilation": {
    "HVAC Problems": "electrical",
    "Outdoor Lighting": "electrical",
  },

  Others: {
    Others: "others",
  },
};

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
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: Add state for search term
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutIdRef = useRef(null);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: "",
    urgency: false,
    facility_id: "",
    image_before: null,
    issue_type: "",
    issues: "",
    description: "",
    status: "pending",
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to filter categories based on search term
  const filteredCategories = () => {
    const result = [];

    for (const mainCategory in issueCategories) {
      for (const subCategory in issueCategories[mainCategory]) {
        if (
          mainCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subCategory.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          result.push({
            mainCategory,
            subCategory,
            subCategoryType: issueCategories[mainCategory][subCategory],
          });
        }
      }
    }

    return result;
  };

  const handleSearchInputChange = (e) => {
    // Get the current value of the search input
    const value = e.target.value;

    // Update the searchTerm state variable
    setSearchTerm(value);
  };

  const handleSelectIssue = (issueType, issuesSelect) => {
    //set form value
    setForm((prevForm) => ({
      ...prevForm,
      issue_type: issueType,
      issues: issuesSelect,
      description: "",
    }));

    //SET FORM VALUE
    setSearchTerm(issuesSelect);
  };

  const handleIssueOnBlur = () => {
    // Clear any existing timeouts to avoid multiple dropdown hide calls
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a new timeout
    timeoutIdRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100); // Adjust timeout as needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    //set the issue_type and issue to null
    setForm((prevForm) => ({
      ...prevForm,
      issue_type: "",
      issues: "",
      [name]: value,
    }));

    //set search term to empty
    setSearchTerm("");
  };

  // Handler for toggling urgency checkbox
  const handleUrgencyCheckbox = () => {
    setForm((prevForm) => ({
      ...prevForm,
      urgency: !form.urgency,
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
      formData.append("issues", form.issues);
      formData.append("description", form.description);
      formData.append("status", form.status);
      formData.append("urgency", form.urgency);

      // Append the file if it exists
      if (imageFile) {
        formData.append("image_before", imageFile);
      }
      console.log("form", form);
      const response = await reportFacility(formData);
      navigate(response.route);
    } catch (error) {
      console.error("error message", error);
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
    <div className="bg-secondaryColor h-screen w-screen relative">
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
      <div className="h-full w-full  p-5 pt-5 ">
        <form onSubmit={handleSubmitButton} className="space-y-8">
          <div className="space-y-2 text-sm">
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

            {/* <div className=" relative">
              <label
                htmlFor="issue-type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Issue
              </label>

              <input
                type="text"
                placeholder="Search issue"
                className="w-full rounded-md"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onBlur={handleIssueOnBlur}
                onFocus={() => setIsDropdownOpen(true)}
              />

              {isDropdownOpen && (
                <div className="bg-white space-y-4 shadow-lg absolute bottom-[-8.3rem] rounded-b-md  py-3 left-0 w-full h-32 overflow-auto">
                  {filteredCategories().map((category, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-2 px-5 rounded-md"
                      onClick={(e) =>
                        handleSelectIssue(
                          category.subCategoryType,
                          category.subCategory
                        )
                      }
                    >
                      {category.subCategory}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-center font-semibold text-gray-500">Or</p> */}

            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Input Issue details
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pleas provide accurate description of the issue."
                name="description"
                value={form.description}
                required
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="space-x-3  flex items-center py-3">
              <input
                type="checkbox"
                id="urgency"
                name="urgency"
                className="text-mainColor"
                onChange={handleUrgencyCheckbox}
                checked={form.urgency}
              />
              <label for="urgency" className="font-semibold text-base">
                Urgent
              </label>
              <span id="urgencyText" className="text-sm text-gray-500 italic">
                *This task is urgent.
              </span>
            </div>

            <div className="mt-2">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload Picture" />
              </div>

              <div className="flex justify-center  space-x-5">
                <button
                  className="bg-white shadow-md rounded-md p-3 flex flex-col items-center space-y-3"
                  onClick={initializeCamera}
                >
                  <Camera size={28} color="#828282" />
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

          <div className="flex space-x-5 ">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className="border p-3 text-black bg-white shadow rounded-lg flex-1 font-bold text-base"
            >
              Back
            </button>
            <button
              className="bg-mainColor2 p-3 text-white rounded-lg shadow flex-1 font-bold text-base"
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
