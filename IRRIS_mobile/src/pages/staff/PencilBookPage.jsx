import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { findFacility } from "@/src/services/api/sharedService";
import TextInput from "@/src/components/TextInput";
import useUserStore from "@/src/services/state/userStore";
import { reserveFacilities } from "@/src/services/api/StaffService";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import SuccessModal from "@/src/components/SuccessModal";

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
  const [form, setForm] = useState({
    description: null,
    dateStart: null,
    dateEnd: null,
    status: "pending",
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
    }

    setIsLoading(true);
    try {
      form.user_id = user?.id;
      form.facility_id = facility?.id;
      const response = await reserveFacilities(form);
      console.log("reserve response", response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      SetShowConfirmation(false);
      setIsSuccessModal(true);
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

      {isSuccessModal && (
        <SuccessModal
          message="Pencil book successfully! Please wait for admin approval."
          handleCloseButton={() => navigate("/staff/home")}
        />
      )}

      <PageTitle title="PENCIL BOOK" />
      <div className="flex-1  p-5 pt-14">
        <form className="" onSubmit={handleSubmit}>
          <TextInput
            placeholder="Facility ID"
            label="Facility ID"
            value={facility?.qr_code}
            disabled={true}
          />

          <TextInput
            placeholder="Facility"
            label="Facility"
            value={facility?.facilities_name}
            disabled={true}
          />

          <div>
            <label for="meeting-time">Date start</label>

            <input
              type="datetime-local"
              id="date-start"
              name="dateStart"
              //   value="2018-06-12T19:30"
              min={minDate}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label for="meeting-time">Date end</label>

            <input
              type="datetime-local"
              id="date-end"
              name="dateEnd"
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

          <div>
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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

          <div className="flex space-x-3 ">
            <button
              className="flex-1 bg-mainColor text-white rounded-md"
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
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PencilBookPage;
