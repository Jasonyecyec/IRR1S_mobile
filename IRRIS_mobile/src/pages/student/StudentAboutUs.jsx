import React, { useState, useEffect, useNavigate } from "react";
import { Link } from "react-router-dom";
import {
  SkipBack,
  SmileyAngry,
  SmileySad,
  SmileyMeh,
  Smiley,
  ArrowLeft,
  Heart,
  HeartBreak,
  SmileyWink,
  SmileyBlank,
  Star,
} from "@phosphor-icons/react";
import { Label, Textarea } from "flowbite-react";
import { Modal } from "flowbite-react";
import { toast } from "react-hot-toast";
import FeedbackCreateModal from "./ConfirmationFeedbackModal";
import { feedbackEvaluation } from "../../services/api/sharedService";
import { getUserDetails } from "@/src/services/api/sharedService";
import useUserStore from "../../services/state/userStore";

const StudentAboutUs = () => {
  const [activeTab, setActiveTab] = useState("about");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  //get the user details ()
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    setIsLoadingUser(true);
    try {
      const { user_details } = await getUserDetails(user?.id);
      console.log("user details", user_details);
      setUserDetails(user_details);

      // Set the ratingName and ratingEmail states with user details
      setRatingName(user_details.first_name + " " + user_details.last_name);
      setRatingEmail(user_details.email);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(user?.id);
  }, []);
  // State to hold the textarea value
  const [textareaValue, setTextareaValue] = useState("");

  // Function to handle textarea value change
  const handleTextareaChange = (event) => {
    const { name, value } = event.target;

    // setRatingOpinion(newRatingOpinion);
    setRatingOpinion(value); // Update the ratingOpinion state

    handleChange(event); // Call handleChange to update formData
    // setTextareaValue(event.target.value);
    // setFormData({
    //   ...formData,
    //   opinion: newRatingOpinion,
    // });
  };

  // multistep
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    // Initialize form data here
    name: `${user?.first_name || ""} ${user?.last_name || ""}`, // Initialize overall rating
    email:  user?.email || "", // Initialize overall rating
    overall: "", // Initialize overall rating
    functionality: "", // Initialize functionality rating
    maintainability: "", // Initialize maintainability rating
    portability: "", // Initialize portability rating
    efficiency: "", // Initialize efficiency rating
    opinion: "", // Initialize opinion
    // Add more fields as needed
  });

  const handleNextPhase = () => {
    setPhase(phase + 1);
  };

  const handlePreviousPhase = () => {
    setPhase(phase - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //opinion evaluation-------------------------------------------------------------------------------------
  const [ratingOpinion, setRatingOpinion] = useState("");
  const [ratingName, setRatingName] = useState(
    `${user?.first_name || ""} ${user?.last_name || ""}`
  );
  const [ratingEmail, setRatingEmail] = useState(user?.email || "");

  // Function to handle name input change
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setRatingName(newName); // Update the ratingName state
    setFormData({
      ...formData,
      name: newName, // Update formData with the new name
    });
  };

  // Function to handle email input change
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setRatingEmail(newEmail); // Update the ratingEmail state
    setFormData({
      ...formData,
      email: newEmail, // Update formData with the new email
    });
  };

  //OOOOOOOOOOOOVVVVVVVVVVVVVVVVVVVEEEEEEEEEEEEERRRRRRRRRRRAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLL----------------
  const [selectedEmoticonOverall, setSelectedEmoticonOverall] = useState(null);
  const [ratingOverall, setRatingOverall] = useState(
    "Heart kita, Kaya i-Heart mo ako!"
  );

  const handleOverallClick = (event, over) => {
    setSelectedEmoticonOverall(over);

    // Update the color of each star based on its position relative to the selected star
    const starsOver = [
      "Star1over",
      "Star2over",
      "Star3over",
      "Star4over",
      "Star5over",
    ];
    const selectedIndex = starsOver.indexOf(over);

    const newRatingOverall = (() => {
      // Update the color of each emoticon based on the selected emoticon
      switch (over) {
        case "Star1over":
          return "Poor";

        case "Star2over":
          return "Fair";

        case "Star3over":
          return "Good";

        case "Star4over":
          return "Very Good";

        case "Star5over":
          return "Excellent";

        default:
          return "None";
      }
    })();

    setRatingOverall(newRatingOverall);
    //handleChange("overall", newRatingOverall); // Update formData
    handleChange(event);
    // Update formData with the new overall rating
    setFormData({
      ...formData,
      overall: newRatingOverall,
    });

    // Update the color of each star
    const updatedStarsOver = starsOver.map((star, index) => {
      if (index <= selectedIndex) {
        // If the star is before or at the selected index, set its color to yellow
        return "#42adff";
      } else {
        // If the star is after the selected index, reset its color
        return "";
      }
    });
    setStarColorsoverall(updatedStarsOver);
    console.log("Overall emote:", newRatingOverall, updatedStarsOver);
  };

  const [starColorsoverall, setStarColorsoverall] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  //functionality stars------------------------------------------------------------------------------------
  const [selectedStarfunctionality, setSelectedStarfunctionality] =
    useState(null);
  const [ratingFunctionality, setRatingfunctionality] = useState("tanginamo");

  const handleFunctionalityClick = (event, func) => {
    setSelectedStarfunctionality(func);

    // Update the color of each star based on its position relative to the selected star
    const stars = ["Star1", "Star2", "Star3", "Star4", "Star5"];
    const selectedIndex = stars.indexOf(func);

    const newRatingFunctionality = (() => {
      switch (func) {
        case "Star1":
          return "Poor";
        case "Star2":
          return "Fair";
        case "Star3":
          return "Good";
        case "Star4":
          return "Very Good";
        case "Star5":
          return "Excellent";
        default:
          return "None";
      }
    })();

    setRatingfunctionality(newRatingFunctionality);
    // handleChange("functionality", newRatingFunctionality); // Update formData
    handleChange(event);
    // Update formData with the new overall rating
    setFormData({
      ...formData,
      functionality: newRatingFunctionality,
    });

    // Update the color of each star
    const updatedStars = stars.map((star, index) => {
      if (index <= selectedIndex) {
        // If the star is before or at the selected index, set its color to yellow
        return "#fbff05";
      } else {
        // If the star is after the selected index, reset its color
        return "";
      }
    });
    setStarColors(updatedStars);
    // Log the stars
    console.log("Functionality Stars:", newRatingFunctionality, updatedStars);
  };
  const [starColors, setStarColors] = useState(["", "", "", "", ""]);

  //maintainabiity stars----------------------------------------------------------------------------------
  const [selectedStarmaintainability, setSelectedStarmaintainability] =
    useState(null);
  const [ratingMaintainability, setRatingMaintainability] =
    useState("tanginamo");

  const handleMaintainabilityClick = (event, maint) => {
    setSelectedStarmaintainability(maint);

    // Update the color of each star based on its position relative to the selected star
    const starsMaint = [
      "Star1main",
      "Star2main",
      "Star3main",
      "Star4main",
      "Star5main",
    ];
    const selectedIndex = starsMaint.indexOf(maint);

    const newRatingMaintainability = (() => {
      switch (maint) {
        case "Star1main":
          return "Poor";
        case "Star2main":
          return "Fair";
        case "Star3main":
          return "Good";
        case "Star4main":
          return "Very Good";
        case "Star5main":
          return "Excellent";
        default:
          return "None";
      }
    })();

    setRatingMaintainability(newRatingMaintainability);
    //handleChange("maintainability", newRatingMaintainability); // Update formData
    handleChange(event);
    // Update formData with the new overall rating
    setFormData({
      ...formData,
      maintainability: newRatingMaintainability,
    });

    // Update the color of each star
    const updatedStarsMaint = starsMaint.map((star, index) => {
      if (index <= selectedIndex) {
        // If the star is before or at the selected index, set its color to yellow
        return "#fbff05";
      } else {
        // If the star is after the selected index, reset its color
        return "";
      }
    });
    setStarColorsMaint(updatedStarsMaint);
    console.log(
      "Maintainability Stars:",
      newRatingMaintainability,
      updatedStarsMaint
    );
  };
  const [starColorsMaint, setStarColorsMaint] = useState(["", "", "", "", ""]);

  //portability stars----------------------------------------------------------------------------------
  const [selectedStarportability, setSelectedStarportability] = useState();
  const [ratingPortability, setRatingPortability] = useState("tanginamo");

  const handlePortabilityClick = (event, port) => {
    setSelectedStarportability(port);

    // Update the color of each star based on its position relative to the selected star
    const starsPort = [
      "Star1port",
      "Star2port",
      "Star3port",
      "Star4port",
      "Star5port",
    ];
    const selectedIndex = starsPort.indexOf(port);

    const newRatingPortability = (() => {
      switch (port) {
        case "Star1port":
          return "Poor";
        case "Star2port":
          return "Fair";
        case "Star3port":
          return "Good";
        case "Star4port":
          return "Very Good";
        case "Star5port":
          return "Excellent";
        default:
          return "None";
      }
    })();

    setRatingPortability(newRatingPortability);
    //handleChange("portability", newRatingPortability); // Update formData
    handleChange(event);
    // Update formData with the new overall rating
    setFormData({
      ...formData,
      portability: newRatingPortability,
    });

    // Update the color of each star
    const updatedStarsPort = starsPort.map((star, index) => {
      if (index <= selectedIndex) {
        // If the star is before or at the selected index, set its color to yellow
        return "#fbff05";
      } else {
        // If the star is after the selected index, reset its color
        return "";
      }
    });
    setStarColorsPort(updatedStarsPort);
    console.log("Portability Stars:", newRatingPortability, updatedStarsPort);
  };
  const [starColorsPort, setStarColorsPort] = useState(["", "", "", "", ""]);

  //efficiency stars----------------------------------------------------------------------------------
  const [selectedStarefficiency, setSelectedStarefficiency] = useState();
  const [ratingEfficiency, setRatingEffieciency] = useState("tanginamo");

  const handleEfficiencyClick = (event, effi) => {
    setSelectedStarmaintainability(effi);

    // Update the color of each star based on its position relative to the selected star
    const starsEffi = [
      "Star1effi",
      "Star2effi",
      "Star3effi",
      "Star4effi",
      "Star5effi",
    ];
    const selectedIndex = starsEffi.indexOf(effi);

    const newRatingEfficiency = (() => {
      switch (effi) {
        case "Star1effi":
          return "Poor";
        case "Star2effi":
          return "Fair";
        case "Star3effi":
          return "Good";
        case "Star4effi":
          return "Very Good";
        case "Star5effi":
          return "Excellent";
        default:
          return "None";
      }
    })();

    setRatingEffieciency(newRatingEfficiency);
    //handleChange("efficiency", newRatingEfficiency); // Update formData
    handleChange(event);
    // Update formData with the new overall rating
    setFormData({
      ...formData,
      efficiency: newRatingEfficiency,
    });

    // Update the color of each star
    const updatedStarsEffi = starsEffi.map((star, index) => {
      if (index <= selectedIndex) {
        // If the star is before or at the selected index, set its color to yellow
        return "#fbff05";
      } else {
        // If the star is after the selected index, reset its color
        return "";
      }
    });
    setStarColorsEffi(updatedStarsEffi);
    console.log("Efficiency Stars:", newRatingEfficiency, updatedStarsEffi);
  };
  const [StarColorsEffi, setStarColorsEffi] = useState(["", "", "", "", ""]);

  //const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // State to manage the visibility of the confirmation modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //open modal

    // Do something with the textarea value, like submitting to a server
    console.log("Textarea value:", textareaValue);
    // Show the confirmation modal
    setShowConfirmationModal(true);
    // Log to confirm that the modal is being opened
    console.log("Confirmation modal opened");
  };

  //-----------------------------------MODAL---------------------------------------------

  const [openFeedbackModal, setOpenFeedbackModal] = useState(false); // State to control the visibility of the Venue modal
  const [isLoading, setIsLoading] = useState(false);

  // Function to toggle the visibility of the Venue modal
  const toggleFeedbackModal = () => {
    setOpenFeedbackModal(!openFeedbackModal);
  };

  //close modal
  const onCloseModal = () => {
    //clear all the formdata
  };

  // const navigate = useNavigate();


  const handleConfirmation = async () => {
    setIsLoading(true);
    try {
      // Perform form submission action here
      // Create a new FormData object
      const formDataFeedback = new FormData();

      // Append each field to the FormData object
      formDataFeedback.append("name", formData.name);
      formDataFeedback.append("email", formData.email);
      formDataFeedback.append("maintainability", formData.maintainability);
      formDataFeedback.append("functionality", formData.functionality);
      formDataFeedback.append("efficiency", formData.efficiency);
      formDataFeedback.append("portability", formData.portability);
      formDataFeedback.append("overall", formData.overall);
      formDataFeedback.append("opinion", formData.opinion);

      // You can now use the formData object to send the data to the server or perform other actions
      // For example, you can log the formData object
      for (const [key, value] of formDataFeedback.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Handle form submission here
      console.log("FEEDBACK : ", formData);
      // You may want to send the data to the server or perform other actions
      // Show toast notification on successful submission
      toast.success("Feedback submitted successfully!");

      // Once submitted successfully, close the confirmation modal
      setShowConfirmationModal(false);
      console.log("showConfirmationModal:", showConfirmationModal); // Log to track the modal's visibility

      // Show toaster notification

      const response = await feedbackEvaluation(formDataFeedback);
      //navigate(response.route);
    } catch (error) {
      console.error(error);
      navigate(error.response.data.route, {
        state: { errorMessage: error.response.data.error },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <header className="  bg-mainColor2 rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
        <div className="backbutton  w-[2rem] ml-2 mt-1">
          <Link to="/student/profile" className="text-white  ">
            <ArrowLeft size={32} />
          </Link>
        </div>
      </header>

      <div className="h-[150vh]  overflow-y-auto pt-5 pb-5">
        <div>
          <div className="flex justify-center items-center mt-5 pt-5">
            <div className="w-[95%] max-w-sm bg-white border border-gray-200 r shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="satisfactory-container  h-[40rem]">
                <div className="flex justify-center items-center">
                  <span className="text-2xl text-white rounded-[2.5rem] bg-blue-700 w-[15rem] h-[3.5rem] mt-[-1rem] flex justify-center items-center">
                    Feedback Form
                  </span>
                </div>
                <div className=" pb-4"></div>
                <div className=" overflow-y-auto">
                  {/* multi step form */}
                  <div className="container mx-auto">
                    {phase === 1 && (
                      <form onSubmit={handleNextPhase}>
                        <div>
                          <h2>UP KEEP : System Evaluation</h2>
                        </div>
                        <div className="">
                          <p>Please Evaluate the system CAREFULLY :</p>
                          {/* Selected option displayed */}
                          <Label className="text-sm mt-1">
                            Functionality: {ratingFunctionality || ""}
                          </Label>
                          <Label className="text-sm mt-1">
                            Maintainability: {ratingMaintainability || ""}
                          </Label>
                          <Label className="text-sm mt-1">
                            Portability: {ratingPortability || ""}
                          </Label>
                          <Label className="text-sm mt-1">
                            efficiency: {ratingEfficiency || ""}
                          </Label>
                        </div>
                        <div className=" items-center justify-center">
                          {/* star rating functionality*/}
                          <div className="mb-4">
                            <div className="flex">
                              <div>
                                {/* Displaying the stars with colors based on starColors state */}
                                {starColors.map((color, index) => (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(event) =>
                                      handleFunctionalityClick(
                                        event,
                                        `Star${index + 1}`
                                      )
                                    }
                                    style={{ color: color }}
                                  >
                                    <Star size={44} weight="fill" />
                                  </button>
                                ))}
                                <label>Rating: {ratingFunctionality}</label>
                              </div>
                            </div>

                            <label htmlFor="functionality">Functionality</label>
                          </div>
                          {/* star rating maintainability */}
                          <div className="mb-4">
                            <div className="flex">
                              <div>
                                {/* Displaying the stars with colors based on starColors state */}
                                {starColorsMaint.map((color, index) => (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(event) =>
                                      handleMaintainabilityClick(
                                        event,
                                        `Star${index + 1}main`
                                      )
                                    }
                                    style={{ color: color }}
                                  >
                                    <Star size={44} weight="fill" />
                                  </button>
                                ))}
                                <label>Rating: {ratingMaintainability}</label>
                              </div>
                            </div>

                            <label htmlFor="maintainability">
                              Maintainability
                            </label>
                          </div>
                          {/* star rating portability */}
                          <div className="mb-4">
                            <div className="flex">
                              <div>
                                {/* Displaying the stars with colors based on starColors state */}
                                {starColorsPort.map((color, index) => (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(event) =>
                                      handlePortabilityClick(
                                        event,
                                        `Star${index + 1}port`
                                      )
                                    }
                                    style={{ color: color }}
                                  >
                                    <Star size={44} weight="fill" />
                                  </button>
                                ))}
                                <label>Rating: {ratingPortability}</label>
                              </div>
                            </div>

                            <label htmlFor="portability">Portability</label>
                          </div>
                          {/* star rating efficiency */}
                          <div className="mb-4">
                            <div className="flex">
                              <div>
                                {/* Displaying the stars with colors based on starColors state */}
                                {StarColorsEffi.map((color, index) => (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(event) =>
                                      handleEfficiencyClick(
                                        event,
                                        `Star${index + 1}effi`
                                      )
                                    }
                                    style={{ color: color }}
                                  >
                                    <Star size={44} weight="fill" />
                                  </button>
                                ))}
                                <label>Rating: {ratingEfficiency}</label>
                              </div>
                            </div>

                            <label htmlFor="efficiency">Efficiency</label>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="text-white  h-[3rem] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-[90%] sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Next
                          </button>
                        </div>
                      </form>
                    )}
                    {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    {phase === 2 && (
                      <form
                        onSubmit={handleSubmit}
                        className="emoticon-input  items-center justify-center"
                      >
                        <h2>UP KEEP : Finale Grande!</h2>
                        {/* Add your form fields for Phase 3 here */}
                        <div>
                          <div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <label>Thank you for evaluating us  </label>
                                <label> {user?.first_name} !</label>
                                <p>Overall Evaluation:</p>
                              </div>
                              {/* ----------------- */}
                              <div>
                                <div>
                                  <label>Evaluator :</label>
                                  <input
                                  disabled
                                    type="text"
                                    name="name"
                                    value={ratingName}
                                    onChange={handleNameChange}
                                  />
                                </div>
                                <div>
                                  <label>Email:</label>
                                  <input
                                  disabled
                                    type="email"
                                    name="email"
                                    value={ratingEmail}
                                    onChange={handleEmailChange}
                                  />
                                </div>
                                {/* Displaying the stars with colors based on starColors state */}
                                {starColorsoverall.map((color, index) => {
                                  // Define an array of icon components to alternate
                                  const icons = [
                                    <HeartBreak size={62} weight="fill" />,
                                    <SmileyAngry size={62} weight="fill" />,
                                    <SmileyMeh size={62} weight="fill" />,
                                    <Smiley size={62} weight="fill" />,
                                    <Heart size={62} weight="fill" />,
                                  ];

                                  return (
                                    <button
                                      type="button"
                                      key={index}
                                      onClick={(event) =>
                                        handleOverallClick(
                                          event,
                                          `Star${index + 1}over`
                                        )
                                      }
                                      style={{ color: color }}
                                    >
                                      {icons[index]}{" "}
                                      {/* Render the icon based on the index */}
                                    </button>
                                  );
                                })}
                              </div>
                              <label>Rating: {ratingOverall}</label>
                              {/* ---------------- */}
                            </div>
                          </div>
                          <div>
                            <p>What's on your mind?</p>
                            <textarea
                              required
                              rows={4}
                              name="opinion"
                              //value={formData.opinion} // Bind textarea value to formData
                              onChange={handleTextareaChange}
                              cols={50} // Width of the textarea in characters
                              placeholder="Write down your opinion here."
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* End of Phase 3 form fields */}
                        <div className="flex mt-5">
                          <button
                            type="button"
                            onClick={handlePreviousPhase}
                            className="text-black h-[3rem] bg-white border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-[90%] sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Previous
                          </button>
                          <button
                            type="submit"
                            onClick={toggleFeedbackModal}
                            className="text-white h-[3rem] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-[90%] sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Confirmation Modal */}

                  {/* Toast Container for Notifications */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div></div>
      </div>
      <FeedbackCreateModal
        isLoading={isLoading}
        handleConfirmation={handleConfirmation}
        modalPropsFeedback={{
          openModalFeedback: openFeedbackModal,
          onCloseModalFeedback: toggleFeedbackModal, // Close modal function

          functionalityRating: ratingFunctionality, // Pass functionality rating as prop
          maintainabilityRating: ratingMaintainability, // Pass maintainability rating as prop
          portabilityRating: ratingPortability,
          efficiencyRating: ratingEfficiency,
          overallRating: ratingOverall,
          opinionRating: ratingOpinion,
          nameRating: ratingName,
          emailRating: ratingEmail,

          // Pass other props as needed
        }}
      />
    </div>
  );
};

export default StudentAboutUs;
