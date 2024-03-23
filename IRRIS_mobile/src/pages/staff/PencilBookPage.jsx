import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { findFacility } from "@/src/services/api/sharedService";
import TextInput from "@/src/components/TextInput";
import useUserStore from "@/src/services/state/userStore";
import { reserveFacilities } from "@/src/services/api/StaffService";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import SuccessModal from "@/src/components/SuccessModal";
import ErrorModal from "@/src/components/ErrorModal";
import Loading from "@/src/components/Loading";
import { Spinner } from "flowbite-react";

const PencilBookPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [disabledDates, setDisabledDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowConfirmation, SetShowConfirmation] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [form, setForm] = useState({
    description: null,
    dateStart: null,
    dateEnd: null,
    status: "pending",
    event_name: null,
  });

  const fetchFacility = async () => {
    try {
      const { facility } = await findFacility(facilityId);
      console.log("Facility", facility);
      setFacility(facility);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFacility();

    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
    setMinDate(formattedNow);
    const disabledDatesArray = [
      "2024-02-14T12:00",
      "2023-02-18T18:30",
      "2023-02-20T08:45",
    ]; // Example array of disabled dates

    setDisabledDates(disabledDatesArray);
  }, []);

  const isDateDisabled = (date) => {
    const selectedDate = new Date(date);

    return disabledDates.some((disabledDate) => {
      const disabledDateObject = new Date(disabledDate);

      return (
        selectedDate.getDate() === disabledDateObject.getDate() &&
        selectedDate.getMonth() === disabledDateObject.getMonth() &&
        selectedDate.getFullYear() === disabledDateObject.getFullYear() &&
        selectedDate.getHours() === disabledDateObject.getHours()
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetShowConfirmation(true);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (disabledDates.includes(form.dateStart)) {
      console.log("yes");
      return;
    }

    setIsLoading(true);
    SetShowConfirmation(false);
    try {
      form.user_id = user?.id;
      form.facility_id = facility?.id;
      const response = await reserveFacilities(form);
      setIsSuccessModal(true);
      console.log("reserve response", response);
    } catch (error) {
      console.log("pencil book error", error);
      setIsErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const dateName = e.target.name;
    if (isDateDisabled(value)) {
      console.log("Selected date is disabled");
      e.preventDefault();
    } else {
      setForm((prev) => ({
        ...prev,
        [dateName]: value,
      }));
      console.log("dateName", dateName);
      //   console.log("Updated dateStart:", selectedDate);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col ">
      {isShowConfirmation && (
        <ConfirmationModal
          isLoading={isLoading}
          content="Are you sure you want to submit?"
          handleConfirmButton={handleConfirm}
          onCloseModal={() => SetShowConfirmation(false)}
        />
      )}

      {isErrorModal && (
        <ErrorModal
          title={"Time Slot Unavailable"}
          message="Sorry, the selected time slot is already booked. Please select another time slot for your reservation."
          handleCloseButton={() => setIsErrorModal(false)}
        />
      )}

      {isLoading && <Loading />}
      {isSuccessModal && (
        <SuccessModal
          title={"Reservation Submitted"}
          message="Your pencil booking has been successfully submitted. It is now pending approval from the admin. We'll notify you once it's confirmed."
          handleCloseButton={() => navigate("/staff/home")}
        />
      )}

      <PageTitle title="PENCIL BOOK" />
      <div className="flex-1  p-5 pt-14">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextInput
            placeholder="Facility ID"
            label="Facility ID"
            className="font-semibold"
            value={facility?.qr_code}
            disabled={true}
          />

          <div className="flex flex-col space-y-2">
            <label for="date-start" className="font-semibold">
              Date start
            </label>

            <input
              type="datetime-local"
              id="date-start"
              className="rounded-md"
              name="dateStart"
              //   value="2018-06-12T19:30"
              min={minDate}
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label for="date-end" className="font-semibold">
              Date end
            </label>

            <input
              type="datetime-local"
              id="date-end"
              name="dateEnd"
              className="rounded-md"
              min={minDate}
              onChange={handleChange}
              required
              // if (isDateDisabled(selectedDate)) {
              //   console.log(isDateDisabled(selectedDate));
              //   e.preventDefault();
              // } else {
              //   console.log(selectedDate);
              // }

              //   max="2018-06-14T00:00"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Event name</label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              value={form.event_name}
              required
              className="rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label for="message" className="font-semibold">
              Description
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

          <div className="flex space-x-5 font-semibold text-lg">
            <button
              className="flex-1 border-2 text-black rounded-md font-semibold "
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-mainColor text-white rounded-md px-3 py-2 flex-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PencilBookPage;
