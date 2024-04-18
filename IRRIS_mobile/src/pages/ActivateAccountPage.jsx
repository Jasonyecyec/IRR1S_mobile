import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeSlash,
  CheckCircle,
  UserCircle,
  UserCircleGear,
} from "@phosphor-icons/react";
import "../assets/css/activate-account.css";
import BgEye from "../assets/images/bg_eye.png";
import useUserStore from "../services/state/userStore";
import { activateStudent } from "../services/api/StudentService";
import { useNavigate } from "react-router-dom";
import { Spinner, Modal, Label } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import QCULogo from "../assets/images/qcu_logo.png";
import QCUImage from "../assets/images/qcu_image.jpg";
import TermsAndCondition from "../components/ui/TermsAndCondition";
import { validatePassword } from "../utils/utils";
import { registerStudent, registerStaff } from "../services/api/authService";
import { containsGmail } from "../utils/utils";
import Loading from "../components/Loading";
import "../index.css";

const ActivateAccountPage = () => {
  const { email, setEmail } = useUserStore();
  const navigate = useNavigate();
  // const [emailError, setEmailError] = useState({ isError: false, message: "" });
  // const [userEmail, setUserEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  // const [currentFilter, setCurrentFilter] = useState("student");
  const [currentFilter, setCurrentFilter] = useState(null);
  const [reloadRole, setReloadRole] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleReloadRegister = () => {
    setShowButtons(true);
    setShowForm(false);
    setCurrentFilter(null);
  };

  const handleStudentButtonClick = (filter) => {
    setCurrentFilter("student");
    // Set a timeout to show the form after 1 second
    // setTimeout(() => {
    setShowForm(true);
    setShowButtons(false);
    // }, 2000);
  };

  const handleStaffButtonClick = (filter) => {
    setCurrentFilter("staff");
    // Set a timeout to show the form after 1 second
    // setTimeout(() => {
    setShowForm(true);
    setShowButtons(false);
    // }, 2000);
  };

  // Add a state for termsAndConditions and initialize it as false
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  useEffect(() => {
    // Load the modal when the component mounts
    setTimeout(() => {
      setTermsAndConditions(false); // Change to false after 2 seconds
    }, 800);
  }, []);

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setTermsAndConditions(false);
  };

  //password validation
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    const { isValid, errors } = validatePassword(value);
    const trimmedValue = value.trim(); // Trim whitespace from the input value

    // Check if password is empty or only whitespace
    if (trimmedValue === "") {
      setPasswordValidationMessage("Enter your Password.");
    } else {
      // Validate password strength
      const { isValid, errors } = validatePassword(trimmedValue);
      if (!isValid) {
        setPasswordValidationMessage(errors);
      } else {
        setPasswordValidationMessage("Password Strength: Strong");
      }
    }
    setForm({ ...form, password: value });

    //check if the confirm password match also
    // Check if passwords match when password changes
    // Check if passwords match when password changes
    if (
      form.confirm_password.trim() !== "" &&
      form.confirm_password !== value
    ) {
      setPasswordMatchMessage("Passwords don't match.");
    } else {
      setPasswordMatchMessage(""); // Reset message if confirm password is empty or matches
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim(); // Trim whitespace from the input value

    // Check if passwords match
    // Check if password is empty or only whitespace
    if (trimmedValue === "") {
      setPasswordMatchMessage("Enter a password first.");
    } else {
      // Check if passwords match
      if (trimmedValue !== form.password) {
        setPasswordMatchMessage("Passwords don't match.");
      } else {
        setPasswordMatchMessage("Passwords match.");
      }
    }
    setForm({ ...form, confirm_password: value });
  };

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    student_number: "",
    contact_number: "",
    status: "active",
    password: "",
    department: "",
    confirm_password: "",
    user_role: "",
    referral_code: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const activateButtonRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const notify = (message) => {
    toast.error(message, {
      duration: 1500,
      id: "error", // Set the duration for how long the error message should be displayed
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserEmail(value);
    setEmailError({ ...emailError, isError: false });
  };

  const handleActivateButton = async () => {
    let isError = false;

    if (userEmail === "") {
      setEmailError({ isError: true, message: "Please input email." });
      console.log("Error");
      isError = true;
    } else if (!containsGmail(userEmail)) {
      setEmailError({
        isError: true,
        message: "Please input a valid email address",
      });
      isError = true;
    }

    if (!isError) {
      //disable the button
      activateButtonRef.current.disabled = true;
      setIsLoading(true);
      try {
        if (userEmail) {
          const response = await notify(userEmail);
          console.log("response", response);
          setEmail(userEmail);
          setTimeout(() => {
            navigate(response.route);
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // Re-enable the button after the asynchronous operation
        activateButtonRef.current.disabled = false;
        setIsLoading(false);
      }
    }
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCheckboxChecked) return;

    //check if password the same
    if (form.password !== form.confirm_password) {
      notify("Password not the same.");
      return;
    }

    // Check if password meets strength requirements
    if (passwordValidationMessage !== "Password Strength: Strong") {
      notify("Password must meet strength requirements.");
      return;
    }

    if (currentFilter === "student") {
      try {
        setIsLoading(true);
        // if (form.referral_code === "") {
        //   form.referral_code = null;
        // }
        form.user_role = currentFilter;
        const response = await registerStudent(form);
        console.log("response", response);
        setEmail(form.email);

        navigate(response.route);
      } catch (error) {
        if (error.response.data.message) {
          notify(error.response.data.message);
        }

        if (
          error.response.data.message &&
          error.response.data.message.password
        ) {
          notify(error.response.data.message.password[0]);
        }

        console.log("error", error.response.data);
      } finally {
        setIsLoading(false);
      }
    }

    if (currentFilter === "staff") {
      try {
        setIsLoading(true);
        // if (form.referral_code === "") {
        //   form.referral_code = null;
        // }
        form.user_role = currentFilter;
        const response = await registerStaff(form);
        console.log("response", response);
        setEmail(form.email);

        navigate(response.route);
      } catch (error) {
        if (error.response.data.message) {
          notify(error.response.data.message);
        }

        if (
          error.response.data.message &&
          error.response.data.message.password
        ) {
          notify(error.response.data.message.password[0]);
        }

        console.log("error", error.response.data);
      } finally {
        setIsLoading(false);
      }
    }

    console.log("form", form);
  };

  //Password validation

  return (
    <div className=" h-screen w-screen bg-secondaryColor 2  flex flex-col p-8 py-10   relative overflow-y-auto">
      {isLoading && <Loading />}
      <div>
        <p className="text-black font-bold text-3xl text-center text-mainColor2 flex flex-col">
          <span> Create Account </span>
          {currentFilter === "student" && <span>For Student</span>}
          {currentFilter === "staff" && <span>For Staff</span>}
        </p>

        {/* <div className="w-full text-sm font-bold text-gray-700 space-x-5 flex mt-5">
          <button
            // onClick={() => setCurrentFilter("student")}
            onClick={handleStudentButtonClick}
            className={`flex-1 rounded-md border bg-white p-2 relative ${
              currentFilter === "student" && "border-mainColor2"
            }`}
          >
            Student
            {currentFilter === "student" && (
              <span>
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="text-mainColor2 absolute top-1.5 right-2"
                />
              </span>
            )}
          </button>
          <button
            // onClick={() => setCurrentFilter("staff")}
            onClick={handleStaffButtonClick}
            className={`flex-1 relative rounded-md border border-gray-300 bg-white p-2 ${
              currentFilter === "staff" && "border-mainColor2"
            }`}
          >
            Staff
            {currentFilter === "staff" && (
              <span>
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="text-mainColor2 absolute top-1.5 right-2"
                />
              </span>
            )}
          </button>
        </div> */}
        {currentFilter === null ? (
          <div className="mt-[5rem] ">
            <div className="text-center w-full  flex justify-center">
              <p className="text-center w-[70%] ">
                Choose the type of account you want to create:
              </p>
            </div>

            {showButtons && (
              <div className="rounded-lg p-5 flex items-center">
                {" "}
                <div className="w-full text-sm font-bold text-gray-700   flex  mt-5 space-x-8 ">
                  <button
                    // onClick={() => setCurrentFilter("student")}
                    onClick={handleStudentButtonClick}
                    className={`flex flex-col justify-center items-center flex-1  space-y-3  hover:bg-gray-50 hover:shadow cursor-pointer bg-white  shadow  flex-1 rounded-2xl border    p-3 relative ${
                      currentFilter === "student" && "border-mainColor2"
                    }`}
                  >
                    <span>
                      {" "}
                      <UserCircle
                        size={70}
                        className="text-gray-500"
                        weight="light"
                      />
                    </span>

                    <p className="text-mainColor2 font-bol text-xl ">Student</p>
                    {currentFilter === "student" && (
                      <span>
                        <CheckCircle
                          size={22}
                          weight="fill"
                          className="text-mainColor2 absolute top-1.5 right-2"
                        />
                      </span>
                    )}
                  </button>
                  <button
                    // onClick={() => setCurrentFilter("staff")}
                    onClick={handleStaffButtonClick}
                    className={`flex flex-col justify-center hover:bg-gray-50 hover:shadow space-y-2  items-center cursor-pointer  flex-1 relative shadow rounded-2xl border bg-white text-white p-3 ${
                      currentFilter === "staff" && "border-mainColor2"
                    }`}
                  >
                    {" "}
                    <span>
                      {" "}
                      <UserCircleGear
                        size={70}
                        className="text-gray-500"
                        weight="light"
                      />
                    </span>
                    <p className="text-mainColor2 font-bol text-xl ">Staff</p>
                    {currentFilter === "staff" && (
                      <span>
                        <CheckCircle
                          size={22}
                          weight="fill"
                          className="text-mainColor2 absolute top-1.5 right-2"
                        />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
            <Toaster />
          </div>
        ) : (
          <>
            {showForm && (
              <>
                {/* Your form JSX */}
                {/* <div className="flex flex-col p-2 font-bold text-3xl text-center text-mainColor2">
                  {currentFilter === "student" && (
                    <Label className=" font-bold text-2xl text-center text-mainColor2">
                      Student
                    </Label>
                  )}

                  {currentFilter === "staff" && (
                    <Label className=" font-bold p-2 text-2xl text-center text-mainColor2">
                      Staff
                    </Label>
                  )}
                </div> */}
                <form onSubmit={handleSubmit}>
                  <div className=" flex flex-col w-full space-y-5 mt-5 text-sm">
                    <div className="flex space-x-5">
                      <div className="space-y-2">
                        <label htmlFor="first_name" className="font-semibold">
                          First name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={form.first_name}
                          onChange={handleInputChange}
                          className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                  focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="last_name" className="font-semibold">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={form.last_name}
                          onChange={handleInputChange}
                          className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                  focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                          required
                        />
                      </div>
                    </div>

                    {currentFilter === "student" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="student_number"
                          className="font-semibold"
                        >
                          Student Number
                        </label>
                        <input
                          type="text"
                          id="student_number"
                          name="student_number"
                          value={form.student_number}
                          onChange={handleInputChange}
                          className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="email" className="font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                        required
                      />
                    </div>

                    {currentFilter === "staff" && (
                      <div className="space-y-2">
                        <label htmlFor="department" className="font-semibold">
                          Department
                        </label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={form.department}
                          onChange={handleInputChange}
                          className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                          required
                        />
                      </div>
                    )}

                    {currentFilter === "staff" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="contact_number"
                          className="font-semibold"
                        >
                          Contact number
                        </label>
                        <input
                          type="number"
                          id="contact_number"
                          name="contact_number"
                          value={form.contact_number}
                          onChange={handleInputChange}
                          minLength={11}
                          className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                          required
                        />
                      </div>
                    )}

                    <div className="relative space-y-2">
                      <label htmlFor="password">Password</label>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={form.password}
                        className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                        onChange={handlePasswordChange}
                        required
                      />
                      <p
                        className={
                          passwordValidationMessage ===
                          "Password Strength: Strong"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordValidationMessage}
                      </p>

                      <button
                        className="absolute right-2 top-8 "
                        onClick={(e) => {
                          e.preventDefault();
                          setIsPasswordVisible(!isPasswordVisible);
                        }}
                      >
                        {isPasswordVisible ? (
                          <EyeSlash size="25" color="#969696" weight="light" />
                        ) : (
                          <Eye size="25" color="#969696" weight="light" />
                        )}
                      </button>
                    </div>

                    <div className="relative space-y-2">
                      <label htmlFor="confirm_password">Confirm Password</label>
                      <input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        id="confirm_password"
                        name="confirm_password"
                        value={form.confirm_password}
                        className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                        onChange={handleConfirmPasswordChange}
                        required
                      />
                      <p
                        className={
                          passwordMatchMessage === "Passwords match."
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordMatchMessage}
                      </p>

                      <button
                        className="absolute right-2 top-8 "
                        onClick={(e) => {
                          e.preventDefault();
                          setIsConfirmPasswordVisible(
                            !isConfirmPasswordVisible
                          );
                        }}
                      >
                        {isConfirmPasswordVisible ? (
                          <EyeSlash size="25" color="#969696" weight="light" />
                        ) : (
                          <Eye size="25" color="#969696" weight="light" />
                        )}
                      </button>
                    </div>

                    {currentFilter === "student" && (
                      <div className="relative space-y-2">
                        <label htmlFor="confirm_password">Referral Code</label>
                        <input
                          type="text"
                          id="referral_code"
                          name="referral_code"
                          value={form.referral_code}
                          className="border-gray uppercase-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                          onChange={handleInputChange}
                          placeholder="(Optional)"
                          min={8}
                        />
                      </div>
                    )}

                    <div className="flex items-center mb-5">
                      <input
                        type="checkbox"
                        id="termsCheckbox"
                        checked={isCheckboxChecked}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor="termsCheckbox" className="text-sm">
                        I agree to the{" "}
                        <Link
                          to="#"
                          onClick={() => setTermsAndConditions(true)}
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    <button
                      disabled={!isCheckboxChecked}
                      className={`text-white h-[3rem] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ${
                        !isCheckboxChecked
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Register Account
                    </button>
                  </div>
                </form>
                <button
                  onClick={handleReloadRegister}
                  className={`text-mainColor2 h-[3rem] mt-3 bg-white border shadow hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                  Select Role
                </button>
              </>
            )}
          </>
        )}

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate(-1)}
            className="text-mainColor2 font-bold font-"
          >
            {" "}
            Login
          </span>
        </p>
      </div>
      {termsAndConditions && (
        <TermsAndCondition
          handleCloseModal={handleCloseModal}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ActivateAccountPage;
