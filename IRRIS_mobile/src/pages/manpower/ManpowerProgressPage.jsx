import React, { useEffect, useState, useRef } from "react";
import NotificationIcon from "../../assets/images/bell_icon.png";
import UserSample from "../../assets/images/user_sample.jpg";
import useUserStore from "@/src/services/state/userStore";
import { formatDate, addDays } from "@/src/utils/utils";
import { Link, useParams } from "react-router-dom";
import { getJobOrderDertails } from "@/src/services/api/manpowerService";
import toast, { Toaster } from "react-hot-toast";
import { getImageUrl, isTaskDurationValid } from "@/src/utils/utils";
import {
  Camera,
  Clock,
  CalendarBlank,
  Hash,
  MapPin,
  WarningCircle,
  Aperture,
  X,
  Check,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import TaskDoneModal from "@/src/components/TaskDoneModal";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import {
  updateJobOrderImage,
  acceptJobOrder,
  finishJobOrder,
  notValidJobOrder,
} from "@/src/services/api/manpowerService";
import ImageModal from "@/src/components/ImageModal";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const ManpowerProgressPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const { taskId, task } = useParams();
  const [taskInProgress, setTaskInProgress] = useState(null);
  const [openImageReport, setOpenImageReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState(null);
  const [isNotValidOrDelayModal, setIsNotValidOrDelayModal] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [finishFormData, setFinishFormData] = useState({
    status: "completed",
    comments: null,
    due_date: null,
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);

  const [openModalImage, setOpenModalImage] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalTaskDone, setOpenModalTaskDone] = useState(false);

  const [imageFileBefore, setImageFileBefore] = useState(null);
  const [imageSrcBefore, setImageSrcBefore] = useState(null);

  const [imageFileAfter, setImageFileAfter] = useState(null);
  const [imageSrcAfter, setImageSrcAfter] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const notify = (message) =>
    toast.error(message, {
      style: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "2rem",
      },
      id: "error",
      duration: 2000,
    });

  const handleFinishFormChange = (e) => {
    const { name, value } = e.target;
    setFinishFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    return () => {
      // Clear the toast with ID "error" when the component unmounts
      toast.dismiss("error");
    };
  }, []);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setIsLoading(true);
      console.log("has task id");
      // if (taskId) {
      try {
        console.log("taskid", taskId);
        if (task === "report") {
          const response = await getJobOrderDertails(taskId); // Corrected the function name
          console.log("response", response.job_order);
          setTaskInProgress(response.job_order);
        }

        if (task === "request") {
          console.log("request");
        }

        if (task === "daily") {
          console.log("daily");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      // }
    };

    const fetchTaskDetailsLocal = () => {
      setIsLoading(true);
      console.log("no task id ");
      // Check local storage for task_inProgress
      const storedTaskInProgress = localStorage.getItem("task_inProgress");

      if (storedTaskInProgress) {
        const taskInProgressLocal = JSON.parse(storedTaskInProgress);
        console.log("task local", taskInProgressLocal);
        setTaskInProgress(taskInProgressLocal);
      }

      setIsLoading(false);
    };

    if (taskId) {
      fetchTaskDetails();
    } else {
      fetchTaskDetailsLocal();
    }
  }, [taskId, task]);

  const handleProfileButton = () => {
    // navigate("/student/profile");
  };

  const onCloseImageModal = () => {
    setOpenImageReport(false);
  };

  const handleReportStatus = (e) => {
    setReportStatus(e.target.value);
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

        if (taskInProgress.status === "assigned") {
          // Set the object URL as the source for the image
          setImageSrcBefore(objectURL);

          // Set the file in the state or do something with it (e.g., upload)
          setImageFileBefore(imageFile);
        }

        if (taskInProgress.status === "ongoing") {
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

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setOpenModalImage(true);
  };

  const onCloseModalImage = () => {
    setOpenModalImage(false);
  };

  const onCloseModalConfirm = () => {
    setOpenModalConfirm(false);
  };

  const handleConfirmButtonImage = () => {
    if (taskInProgress.status === "assigned") {
      setImageFileBefore(null);
      setImageSrcBefore(null);
    }

    if (taskInProgress.status === "ongoing") {
      setImageFileAfter(null);
      setImageSrcAfter(null);
    }

    onCloseModalImage();
  };

  const handleConfirmButton = async () => {
    if (taskInProgress.status === "assigned") {
      //proceed to submitting
      setIsLoading(true);
      try {
        //update image_before first
        if (imageFileBefore) {
          const formData = new FormData();
          formData.append("_method", "PATCH");
          formData.append("image_before", imageFileBefore);

          const response = await updateJobOrderImage(
            formData,
            taskInProgress.id
          );
          console.log("response update image", response);
        }

        //UPDATE JOB ORDER STATUS AND OTHERS
        const formObjectData = {
          status: "ongoing",
          report_id: taskInProgress.report_id,
          job_type: taskInProgress.job_type,
        };

        // Add estimated duration to the formObjectData if available
        if (estimatedDuration !== null) {
          formObjectData.estimated_duration_minutes = estimatedDuration;
        }

        const { job_order } = await acceptJobOrder(
          formObjectData,
          taskInProgress.id
        );

        //replace the task_inProgress in localStorage with job_order
        localStorage.setItem("task_inProgress", JSON.stringify(job_order));

        //update task in progress
        setTaskInProgress(job_order);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        onCloseModalConfirm();
      }

      console.log("submit");
    }

    if (taskInProgress.status === "ongoing") {
      //proceed to submitting
      setIsLoading(true);
      try {
        //update image_before first
        if (imageFileAfter) {
          const formData = new FormData();
          formData.append("_method", "PATCH");
          formData.append("image_after", imageFileAfter);

          const response = await updateJobOrderImage(
            formData,
            taskInProgress.id
          );
          console.log("response update image", response);
        }

        //if taskInProgress.due_date is not null pass it to finishFormData object
        if (taskInProgress.due_date !== null) {
          finishFormData.due_date = taskInProgress.due_date;
        }

        finishFormData.user_id = taskInProgress.assigned_manpower;

        //UPDATE JOB ORDER STATUS AND OTHERS
        const { job_order } = await finishJobOrder(
          finishFormData,
          taskInProgress.id
        );

        setOpenModalTaskDone(true);

        console.log("finish task", job_order);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        onCloseModalConfirm();
      }
    }
  };

  const handleEstimatedDuration = (e) => {
    const duration = e.target.value;

    // Validate if the entered value is a positive number
    if (!isNaN(duration) && duration > 0) {
      setEstimatedDuration(duration);
    } else {
      setEstimatedDuration(null);
    }
  };

  const handleDelayOrNotValidConfirm = async () => {
    try {
      setIsLoading(true);

      const response = await notValidJobOrder(taskInProgress?.id);
      console.log("response not valid", response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsNotValidOrDelayModal(false);
      navigate("/manpower/tasks");
    }
  };

  const handleDoneModal = () => {
    //set the taskInProgress local to null
    localStorage.setItem("task_inProgress", JSON.stringify(null));

    navigate(`/manpower/rate/${taskInProgress?.id}`);

    //update task in progress
    setTaskInProgress(null);
  };

  const handleButton = () => {
    // setToastActivated(true);
    if (!reportStatus) {
      console.log("report status", reportStatus);
      notify("Please select status");
      return;
    }

    if (reportStatus === "not-valid" || reportStatus === "delay") {
      setIsNotValidOrDelayModal(true);
      console.log("are you sure you want to submit");
      return;
    }

    // check first if imageSrcFileBefore has value
    if (taskInProgress.status === "assigned") {
      if (estimatedDuration && estimatedDuration <= 2) {
        notify("Should be 3min or longer");
        return;
      }

      if (!imageFileBefore) {
        notify("Image required");
        return;
      }
    }

    if (taskInProgress.status === "ongoing") {
      if (!imageFileAfter) {
        notify("Image required");
        return;
      }

      // check  time of taskInProgress.date_started and time now, if its less than 3min return
      if (!isTaskDurationValid(taskInProgress.date_started)) {
        notify("Task should be at least 2 minutes long");
        return;
      }
    }

    setOpenModalConfirm(true);
  };

  const retakeImage = () => {
    setCanvas(null);
  };

  return (
    <div className="h-full flex flex-col background">
      {/* {isToastActivated && <Toaster />} */}
      <Toaster />

      {openModalTaskDone && <TaskDoneModal handleDone={handleDoneModal} />}

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
          onCloseModal={onCloseModalConfirm}
          handleConfirmButton={handleConfirmButton}
          content="Are you sure you want to start the task now?"
        />
      )}

      {isNotValidOrDelayModal && (
        <ConfirmationModal
          isLoading={isLoading}
          onCloseModal={() => setIsNotValidOrDelayModal(false)}
          handleConfirmButton={handleDelayOrNotValidConfirm}
          content="Are you sure you want to submit?"
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

      <div className="flex justify-between items-center bg-mainColor p-5">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <Link to={`/manpower/notification/${user?.id}`}>
            <img src={NotificationIcon} className="w-10 h-10 " />
          </Link>
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col bg-blue-100 space-y-5">
        <h1 className="capitalize text-2xl">
          <span className="text-3xl font-bold block">Your Task</span>
        </h1>

        <div className="bg-white rounded-lg ">
          {taskInProgress ? (
            <div className="bg-white rounded-lg p-3 shadow-md">
              <p className="font-bold pb-2">Job Order</p>

              <div className="border-y-2  flex pb-5 text-sm space-y-1">
                <div className="flex-1 ">
                  <p className="flex items-center space-x-1 pt-2">
                    <Clock size={20} color="#121212" />
                    <span>
                      Date Assigned: {formatDate(taskInProgress?.created_at)}
                    </span>
                  </p>

                  {taskInProgress?.due_date && (
                    <p className="flex items-center space-x-1">
                      <CalendarBlank size={20} color="#121212" />
                      <span>
                        Due date: {formatDate(taskInProgress?.due_date)}
                      </span>
                    </p>
                  )}

                  <p className="flex items-center space-x-1">
                    <Hash size={20} color="#121212" />
                    <span>Task No. {taskInProgress?.id}</span>
                  </p>
                  <p className="flex items-center space-x-1">
                    <MapPin size={20} color="#121212" />
                    <span>
                      Location:{" "}
                      {taskInProgress?.report?.facility?.facilities_name}
                    </span>
                  </p>
                  <p className="flex items-center space-x-1">
                    <WarningCircle size={20} color="#121212" />
                    <span>Issue: {taskInProgress?.report?.description}</span>
                  </p>
                </div>

                {taskInProgress.status === "assigned" &&
                  taskInProgress?.image_before && (
                    <div className="flex flex-1 justify-center mt-2">
                      <img
                        src={getImageUrl(taskInProgress?.report?.image_before)}
                        alt="report-image"
                        className="w-20 h-20 rounded-lg"
                        onClick={() => setOpenImageReport(true)}
                      />

                      {openImageReport && (
                        <ImageModal
                          onCloseModal={onCloseImageModal}
                          imgSrc={taskInProgress?.report?.image_before}
                        />
                      )}
                    </div>
                  )}
              </div>

              {taskInProgress.status === "assigned" && (
                <div className="space-y-5">
                  <p className="text-center font-bold text-lg">
                    Task{" "}
                    {task === "report"
                      ? "Report"
                      : task === "request"
                      ? "Request"
                      : "Daily"}
                  </p>
                  <div className="flex justify-center space-x-5 ">
                    <button
                      className="shadow-md rounded-md flex flex-col items-center justify-center p-2"
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

                  <div className="space-y-2 items-center">
                    <label for="validity">Status of report:</label>

                    <select
                      name="validity"
                      id="validity"
                      className="w-full rounded-md"
                      value={reportStatus}
                      onChange={handleReportStatus}
                    >
                      <option value="">Please choose an option</option>
                      <option value="valid">Valid</option>
                      <option value="not-valid">Not Valid</option>
                      <option value="delay">Delay</option>
                    </select>
                  </div>
                  <div className="space-y-2 items-center">
                    <p>Estimated time to finish</p>
                    <input
                      type="number"
                      placeholder="Input minutes (Optional)"
                      className="w-full rounded-md"
                      onChange={handleEstimatedDuration}
                    />
                  </div>
                  <button
                    className="bg-mainColor text-white rounded-md w-full p-3 font-bold text-xl"
                    onClick={handleButton}
                  >
                    {reportStatus === "not-valid" || reportStatus === "delay"
                      ? "Submit"
                      : "Start Task"}
                    {/* Start Task */}
                  </button>
                </div>
              )}

              {taskInProgress.status === "ongoing" && (
                <div className="space-y-5">
                  <p className="text-center font-bold text-2xl">
                    Accomplished{" "}
                    {task === "report"
                      ? "Report"
                      : task === "request"
                      ? "Request"
                      : "Daily"}
                  </p>
                  <div className="flex justify-center space-x-5">
                    <button
                      className="shadow-md rounded-md flex flex-col items-center justify-center p-2"
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

                  <div className="flex items-center justify-center space-x-5">
                    <label>Select:</label>
                    <select
                      name="status"
                      className="block appearance-none w-[50%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={finishFormData.status || ""}
                      onChange={handleFinishFormChange}
                    >
                      <option value="completed">Completed</option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                  </div>

                  <div>
                    {" "}
                    <textarea
                      name="comments"
                      className="form-textarea mt-1 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      rows="4"
                      placeholder="Write comment for your tasks"
                      value={finishFormData.comments || ""}
                      onChange={handleFinishFormChange}
                    ></textarea>
                  </div>

                  <button
                    className="bg-mainColor text-white rounded-md w-full p-3 font-bold text-xl"
                    onClick={handleButton}
                  >
                    Finish Task
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center font-bold text-2xl p-5">
              No Task started
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManpowerProgressPage;
