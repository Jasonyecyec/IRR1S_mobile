import React, { useEffect, useState } from "react";
import { WarningCircle, X } from "@phosphor-icons/react";
import ErrorModal from "./ErrorModal";
import { requestReschedEvent } from "../services/api/StaffService";
import { Spinner } from "flowbite-react";
import { Toaster, toast } from "sonner";

const ChangeScheduleModal = ({
  onCloseModal,
  pencilBookId,
  fetchPencilBookDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [form, setForm] = useState({
    resched_start_date: "",
    resched_end_date: "",
  });

  useEffect(() => {
    const today = new Date();
    const formattedToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    // Format: "YYYY-MM-DDTHH:mm"

    setMinDate(formattedToday.toISOString().slice(0, 16)); /// Set the minDate to 15 days from now
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form", form);
    setIsLoading(true);
    try {
      const response = await requestReschedEvent(pencilBookId, form);
      setIsLoading(false);
      fetchPencilBookDetails();
      toast.success("Reschedule request submitted successfully.");
      onCloseModal();
      console.log("request resched", response);
    } catch (error) {
      console.log("error", error);
      setIsErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      {isErrorModal && (
        <ErrorModal
          title={"Time Slot Unavailable"}
          message="Sorry, the selected time slot is already booked. Please select another time slot for your reservation."
          handleCloseButton={() => setIsErrorModal(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
          <button
            onClick={() => onCloseModal()}
            className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
          >
            <X size={18} color="#828282" weight="bold" />
          </button>

          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <label for="date-start" className="font-semibold ">
                Reschedule Date Start
              </label>

              <input
                type="datetime-local"
                id="date-start"
                className="rounded-md text-sm"
                name="resched_start_date"
                //   value="2018-06-12T19:30"
                min={minDate}
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label for="date-end" className="font-semibold">
                Reschedule Date End
              </label>

              <input
                type="datetime-local"
                id="date-end"
                name="resched_end_date"
                className="rounded-md text-sm"
                min={minDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            {isLoading ? (
              <Spinner aria-label="Large spinner example" size="lg" />
            ) : (
              <div className="flex font-semibold space-x-5 w-full">
                {" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onCloseModal();
                  }}
                  className="px-4 bg-slate-200 text-black  border-2 shadow-md w-full rounded-md text-lg py-3 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 bg-mainColor2 text-white w-full rounded-md text-lg py-3 mr-2"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeScheduleModal;
