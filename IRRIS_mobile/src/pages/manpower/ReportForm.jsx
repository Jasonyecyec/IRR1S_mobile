import ManpowerHeaderNavigation from "@/src/components/ManpowerHeaderNavigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  X,
  Aperture,
  ArrowCounterClockwise,
  Check,
} from "@phosphor-icons/react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import useDebouncedSearch from "@/src/hooks/useDebouncedSearch ";
import { searchFacility } from "@/src/services/api/sharedService";
import { Spinner } from "flowbite-react";
import { getImageUrl } from "@/src/utils/utils";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "@/src/services/state/userStore";
import {
  createReportForm,
  finishReportForm,
} from "@/src/services/api/manpowerService";
import { formatDate, formatDateTime } from "@/src/utils/utils";
import SuccessModal from "@/src/components/SuccessModal";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [form, setForm] = useState({
    facilities_name: "",
    facility_id: null,
    description: "",
    assigned_manpower: null,
  });
  const navigate = useNavigate();
  const [successModal, setOpenSuccessModal] = useState(false);
  const [reportFormInProgress, setReportFormInProgress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [facilities, setFacilities] = useState(null);

  const [openModalImage, setOpenModalImage] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [currentState, setCurrentState] = useState("not-started");

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);

  const [imageFileBefore, setImageFileBefore] = useState(null);
  const [imageSrcBefore, setImageSrcBefore] = useState(null);

  const [imageFileAfter, setImageFileAfter] = useState(null);
  const [imageSrcAfter, setImageSrcAfter] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSubmitButton = (e) => {
    e.preventDefault();

    if (currentState === "not-started" && !imageFileBefore) {
      notifyError("Upload image first.");
      return;
    }

    if (currentState === "started" && !imageFileAfter) {
      notifyError("Upload image first.");
      return;
    }

    setOpenModalConfirm(true);
  };

  useEffect(() => {
    return () => {
      if (dropdownRef.current) {
        clearTimeout(dropdownRef.current);
      }
    };
  }, []);

  const handleSearch = useDebouncedSearch(async (query) => {
    if (query) {
      setIsLoading(true);
      try {
        const { facilities } = await searchFacility(query);
        // console.log("facilites", facilities);
        setFacilities(facilities);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    console.log("query", query);
  }, 300);

  const handleInputChange = (e) => {
    const query = e.target.value;

    setForm((prev) => ({
      ...prev,
      facilities_name: query,
    }));

    setSearchQuery(query);
    handleSearch(query);
  };
  const onBlurLocation = () => {
    // Clear any existing timeouts to avoid multiple dropdown hide calls
    if (dropdownRef.current) {
      clearTimeout(dropdownRef.current);
    }

    // Set a new timeout
    dropdownRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 80); // Adjust timeout as needed
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

        if (currentState === "not-started") {
          // Set the object URL as the source for the image
          setImageSrcBefore(objectURL);

          // Set the file in the state or do something with it (e.g., upload)
          setImageFileBefore(imageFile);
        }

        if (currentState === "started") {
          // Set the object URL as the source for the image
          setImageSrcAfter(objectURL);

          // Set the file in the state or do something with it (e.g., upload)
          setImageFileAfter(imageFile);
        }

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

  const notifyError = (message) =>
    toast.error(message, {
      style: {
        textAlign: "center",
        marginTop: "2rem",
      },
      id: "error",
      duration: 2000,
    });

  const retakeImage = () => {
    setCanvas(null);
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setOpenModalImage(true);
  };

  const onCloseModalImage = () => {
    setOpenModalImage(false);
  };

  const handleConfirmButtonImage = () => {
    if (currentState === "not-started") {
      setImageFileBefore(null);
      setImageSrcBefore(null);
    }

    if (currentState === "started") {
      setImageFileAfter(null);
      setImageSrcAfter(null);
    }

    onCloseModalImage();
  };

  const handleConfirmButton = async (e) => {
    e.preventDefault();

    if (currentState === "not-started") {
      setIsLoading(true);
      try {
        form.assigned_manpower = user?.id;

        // Create a new FormData object
        const formData = new FormData();

        // Append form fields to formData
        formData.append("facilities_name", form.facilities_name);
        formData.append("facility_id", form.facility_id);
        formData.append("description", form.description);
        formData.append("assigned_manpower", user?.id);
        if (imageFileBefore) {
          formData.append("facilities_image", imageFileBefore);
        }

        const { report_form } = await createReportForm(formData);

        setReportFormInProgress(report_form);
        setCurrentState("started");
        localStorage.setItem("report_form", JSON.stringify(report_form));
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
        setOpenModalConfirm(false);

        //clear form
        setForm({
          facilities_name: "",
          facility_id: null,
          description: "",
          assigned_manpower: null,
        });

        setImageFileBefore(null);
        setImageSrcBefore(null);
      }
    }

    if (currentState === "started") {
      setIsLoading(true);
      try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append("_method", "PATCH");
        if (imageFileAfter) {
          formData.append("facilities_image", imageFileAfter);
        }
        const { report_form } = await finishReportForm(
          formData,
          reportFormInProgress.id
        );
        console.log("finish report form", report_form);

        setReportFormInProgress(null);
        // Clear the data from localStorage for the report_form key
        localStorage.removeItem("report_form");
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
        setOpenModalConfirm(false);

        setImageFileAfter(null);
        setImageSrcAfter(null);

        setOpenSuccessModal(true);
      }
    }
  };

  useEffect(() => {
    // Function to check for existing data in localStorage
    const checkLocalStorage = () => {
      const existingReportForm = JSON.parse(
        localStorage.getItem("report_form")
      );
      if (existingReportForm) {
        setReportFormInProgress(existingReportForm);
        setCurrentState("started");
      } else {
        setCurrentState("not-started");
      }
    };

    // Call the function to check localStorage when the component mounts
    checkLocalStorage();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <Toaster />

      <ManpowerHeaderNavigation
        navigateTo={"home"}
        title={"Report Form"}
        showBell={false}
      />

      {openModalImage && (
        <ConfirmationModal
          isLoading={false}
          onCloseModal={onCloseModalImage}
          handleConfirmButton={handleConfirmButtonImage}
          content="Remove image?"
        />
      )}

      {openModalConfirm && (
        <ConfirmationModal
          isLoading={isLoading}
          onCloseModal={() => setOpenModalConfirm(false)}
          handleConfirmButton={handleConfirmButton}
          content={
            currentState === "not-started"
              ? "Are you want to start now?"
              : "Are you want to finish now"
          }
        />
      )}

      {successModal && (
        <SuccessModal
          title={"Report Task Completed"}
          message={
            "This form is specifically designed for reporting issues that have not yet been addressed but require attention from a service provider for resolution."
          }
          handleCloseButton={() => navigate("/manpower/home")}
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

      <div className="p-5">
        <form onSubmit={handleSubmitButton} className="space-y-5">
          <div>
            <p className="font-bold text-lg">Report Form</p>
            <p className="text-sm text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
              vitae dicta ex aspernatur quos unde?
            </p>
          </div>

          {currentState === "not-started" && !reportFormInProgress && (
            <>
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold" htmlFor="facility_id">
                  Facility location/name
                </label>
                <input
                  type="text"
                  className="w-full text-sm rounded-md"
                  id="facility_id"
                  name="facility_id"
                  required
                  value={form.facilities_name}
                  onChange={handleInputChange}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={onBlurLocation}
                />
                {showDropdown && (
                  <div
                    className="absolute w-full shadow border bg-white h-40 top-16 left-0 z-30 p-3 overflow-y-auto space-y-3"
                    ref={dropdownRef}
                  >
                    {isLoading ? (
                      <div className="text-center">
                        <Spinner aria-label="Small spinner example" size="md" />
                      </div>
                    ) : facilities && facilities.length > 0 ? (
                      facilities.map((item) => (
                        <div
                          key={item.id}
                          onClick={(e) => {
                            e.preventDefault();
                            setForm((prev) => ({
                              ...prev,
                              facilities_name: item.facilities_name,
                              facility_id: item.id,
                            }));
                          }}
                          className=" border-t-[1px] border-b-[1px] py-2 flex space-x-3 "
                        >
                          <div>
                            <img
                              src={getImageUrl(item.facilities_image)}
                              className="w-16 h-16 rounded-md"
                            />{" "}
                          </div>

                          <div>
                            <p className="font-semibold">
                              {item.facilities_name}
                            </p>{" "}
                            <p>
                              <span className="text-sm text-gray-500 ">
                                Description:{" "}
                              </span>
                              <span>{item.description}</span>
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="font-semibold text-base text-gray-500">
                        Search facilities..
                      </p>
                    )}
                  </div>
                )}{" "}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  cols="33"
                  className="rounded-md w-full"
                  placeholder="Enter description"
                  onChange={(e) => {
                    e.preventDefault();
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  required
                ></textarea>
              </div>

              <div className="space-y-5">
                <p className="font-semibold text-base flex flex-col">
                  <span> Upload Image </span>

                  <span className="text-gray-500 text-sm">
                    Upload image before starting the task
                  </span>
                </p>

                <div className="flex justify-center space-x-5 ">
                  <button
                    className="border  rounded-md flex flex-col items-center justify-center p-2.5"
                    onClick={initializeCamera}
                  >
                    <Camera size={30} color="#2e39ac" weight="fill" />
                    <p> Take Picture</p>
                  </button>

                  {imageSrcBefore && (
                    <div className="relative shadow-md">
                      <img
                        src={imageSrcBefore}
                        alt="Captured"
                        className="w-24 h-20  rounded-md" // Set your desired width and height
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
            </>
          )}

          {currentState === "started" && reportFormInProgress && (
            <>
              <div className="space-y-2">
                <div className="w-full flex justify-end">
                  <p className="p-2 rounded-md text-mainColor2 bg-blue-100 font-semibold">
                    ONGOING
                  </p>
                </div>
                <p>
                  <span className="text-gray-500">Facilities name: </span>{" "}
                  <span>{reportFormInProgress.facilities_name}</span>
                </p>

                <p>
                  <span className="text-gray-500">Desctiption: </span>{" "}
                  <span>{reportFormInProgress.description}</span>
                </p>

                <p>
                  <span className="text-gray-500">Date and Time Started: </span>{" "}
                  <span>{formatDateTime(reportFormInProgress.created_at)}</span>
                </p>

                <p className="flex flex-col space-y-2">
                  <span className="text-gray-500">Image before: </span>{" "}
                  <span className="flex justify-center w-full ">
                    <img
                      src={getImageUrl(reportFormInProgress.image_before)}
                      className="w-24 h-24 rounded-md"
                    />
                  </span>
                </p>

                <div className="space-y-5">
                  <p className="font-semibold text-base flex flex-col">
                    <span> Upload Image </span>

                    <span className="text-gray-500 text-sm">
                      Upload image before finishing the task
                    </span>
                  </p>

                  <div className="flex justify-center space-x-5 ">
                    <button
                      className="border  rounded-md flex flex-col items-center justify-center p-2.5"
                      onClick={initializeCamera}
                    >
                      <Camera size={30} color="#2e39ac" weight="fill" />
                      <p> Take Picture</p>
                    </button>

                    {imageSrcAfter && (
                      <div className="relative shadow-md">
                        <img
                          src={imageSrcAfter}
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
            </>
          )}

          <button
            className="font-semibold w-full rounded-md bg-mainColor2 text-white p-3 "
            type="submit"
          >
            {currentState === "not-started"
              ? "Start Report Task"
              : "Finish Report Tasks"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
