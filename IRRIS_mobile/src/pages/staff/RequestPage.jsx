import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { Dropdown } from "flowbite-react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import SuccessModal from "@/src/components/SuccessModal";
import Loading from "@/src/components/Loading";
import useUserStore from "@/src/services/state/userStore";
import { requestService } from "@/src/services/api/StaffService";
import { useNavigate } from "react-router-dom";

const RequestPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowConfirmation, SetShowConfirmation] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [form, setForm] = useState({
    request_type: null,
    description: null,
    date_due: null,
    status: "pending",
    urgency: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetShowConfirmation(true);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      SetShowConfirmation(false);
      form.user_id = user?.id;
      console.log("form", form);

      const response = await requestService(form);
      console.log("reserve response", response);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      setIsSuccessModal(true);
    }
  };

  // Handler for toggling urgency checkbox
  const handleUrgencyCheckbox = () => {
    setForm((prevForm) => ({
      ...prevForm,
      urgency: !form.urgency,
    }));
  };

  useEffect(() => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
    setMinDate(formattedNow);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <PageTitle title="REQUEST" />

      {isShowConfirmation && (
        <ConfirmationModal
          isLoading={isLoading}
          content="Are you sure you want to submit?"
          handleConfirmButton={handleConfirm}
          onCloseModal={() => SetShowConfirmation(false)}
        />
      )}

      {isLoading && <Loading />}

      {isSuccessModal && (
        <SuccessModal
          message={`Request ${
            form.request_type === "manpower"
              ? "Manpower assistance"
              : "Maintenance"
          } successfully! Please wait for admin approval.`}
          handleCloseButton={() => navigate("/staff/request-history")}
        />
      )}

      <div className="flex-1 p-5 pt-14" onSubmit={handleSubmit}>
        <form className="space-y-5">
          <div className="space-y-2 flex flex-col">
            <label for="request_type" className="text-sm font-semibold">
              Type of Request
            </label>

            <select
              name="request_type"
              id="request_type"
              className="rounded-md"
              onChange={handleChange}
              required
            >
              <option value="">Select Request</option>
              <option value="manpower">Manpower Assistance</option>
              <option value="maintenance">Maintenance</option>
              <option value="logistics" disabled>
                Logistics
              </option>
            </select>
          </div>

          <div className="space-y-2 flex flex-col">
            <label for="date-due" className="text-sm font-semibold">
              Due Date
            </label>

            <input
              type="datetime-local"
              id="date-due"
              className="rounded-md"
              name="date_due"
              //   value="2018-06-12T19:30"
              min={minDate}
              required
              onChange={handleChange}
            />
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
              *This request is urgent.
            </span>
          </div>

          <div className="space-y-2">
            <label for="message" className="font-semibold">
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex space-x-3 font-semibold text-lg pt-5">
            <button
              className="flex-1 bg-mainColor text-white rounded-md"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-mainColor text-white rounded-md px-3 py-2 flex-1"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestPage;
