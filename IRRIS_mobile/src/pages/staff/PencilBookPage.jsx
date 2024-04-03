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
import { CheckCircle } from "@phosphor-icons/react";

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
  const [currentEventType, setCurrentEventType] = useState("");
  const [currentSoundSetup, setCurrentSoundSetup] = useState("");
  const [isErrorModal, setIsErrorModal] = useState(false);

  const [showChairsInput, setShowChairsInput] = useState(false);
  const [showTablesInput, setShowTablesInput] = useState(false);

  const [form, setForm] = useState({
    description: null,
    dateStart: null,
    dateEnd: null,
    status: "pending",
    event_name: null,
    event_type: "",
    attendees: "",
    sound_setup: null,
    chairs: null,
    tables: null,
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

  const handleEventType = (value) => {
    setCurrentEventType(value);

    setForm((prev) => ({
      ...prev,
      event_type: value,
    }));
  };

  const handleSoundSetup = (value) => {
    setCurrentSoundSetup(value);

    setForm((prev) => ({
      ...prev,
      sound_setup: value,
    }));
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
    <div className="w-screen h-screen flex flex-col  ">
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
          handleCloseButton={() => navigate("/staff/pencil-book-history")}
        />
      )}

      <PageTitle title="PENCIL BOOK" />
      <div className="flex-1  p-5 pb-20">
        <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
          <TextInput
            placeholder="Facility ID"
            label="Facility ID"
            className="font-semibold"
            value={facility?.qr_code}
            disabled={true}
          />

          <p className="font-semibold">Event type</p>
          <div className="w-full flex justify-center font-semibold  space-x-3">
            <div
              className={`w-40 ease-in-out duration-150 hover:bg-gray-50 cursor-pointer p-4 rounded-md border flex justify-center items-center relative ${
                currentEventType === "internal" && "border-mainColor2"
              }`}
            >
              <input
                type="radio"
                id="internal"
                name="event_type"
                value="internal"
                className="sr-only"
                required
              />
              <label
                for="internal"
                className={`${
                  currentEventType === "internal"
                    ? "text-black border-mainColor2"
                    : "text-gray-500"
                } `}
                onClick={(e) => {
                  e.preventDefault;
                  handleEventType("internal");
                }}
              >
                Internal Event
              </label>

              {currentEventType === "internal" && (
                <span className="absolute top-1 right-1">
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="text-mainColor2"
                  />
                </span>
              )}
            </div>

            <div
              className={`w-40  ease-in-out duration-150 hover:bg-gray-50 cursor-pointer p-4 rounded-md border flex justify-center items-center relative ${
                currentEventType === "external" && "border-mainColor2"
              }`}
            >
              {" "}
              <input
                type="radio"
                id="external"
                name="event_type"
                value="external"
                className="sr-only"
              />
              <label
                for="external"
                className={`${
                  currentEventType === "external"
                    ? "text-black border-mainColor2"
                    : "text-gray-500"
                } `}
                onClick={(e) => {
                  e.preventDefault;
                  handleEventType("external");
                }}
              >
                External Event
              </label>
              {currentEventType === "external" && (
                <span className="absolute top-1 right-1">
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="text-mainColor2"
                  />
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold">Event name</label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              value={form.event_name}
              required
              className="rounded-md text-sm"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="attendees" className="font-semibold">
              Attendees
            </label>
            <input
              type="number"
              id="attendees"
              name="attendees"
              value={form.attendees}
              required
              placeholder="No. of attendees"
              className="rounded-md text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label for="date-start" className="font-semibold ">
              Date start
            </label>

            <input
              type="datetime-local"
              id="date-start"
              className="rounded-md text-sm"
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
              className="rounded-md text-sm"
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

          <div className="space-y-3">
            <p className="font-semibold">Logistics requirements</p>
            <div className="space-y-5 ">
              <div className="w-full flex justify-center font-semibold space-x-3">
                <div
                  className={`w-40 ease-in-out duration-150 hover:bg-gray-50 cursor-pointer p-4 rounded-md border flex justify-center items-center relative ${
                    currentSoundSetup === "basic" && "border-mainColor2"
                  }`}
                >
                  <input
                    type="radio"
                    id="basic"
                    name="sound_setup"
                    value="basic"
                    className="sr-only"
                  />
                  <label
                    for="basic"
                    className={`${
                      currentSoundSetup === "basic"
                        ? "text-black border-mainColor2"
                        : "text-gray-500"
                    } `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSoundSetup("basic");
                    }}
                  >
                    Basic Sound System
                    {currentSoundSetup === "basic" && (
                      <span className="absolute top-1 right-1">
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-mainColor2"
                        />
                      </span>
                    )}
                  </label>
                </div>

                <div
                  className={`w-40 ease-in-out duration-150 hover:bg-gray-50 cursor-pointer p-4 rounded-md border flex justify-center items-center relative ${
                    currentSoundSetup === "full" && "border-mainColor2"
                  }`}
                >
                  <input
                    type="radio"
                    id="full"
                    name="sound_setup"
                    value="full"
                    className="sr-only"
                  />
                  <label
                    for="full"
                    className={`${
                      currentSoundSetup === "full"
                        ? "text-black border-mainColor2"
                        : "text-gray-500"
                    } `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSoundSetup("full");
                    }}
                  >
                    Full set-up sound system with lights
                    {currentSoundSetup === "full" && (
                      <span className="absolute top-1 right-1">
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-mainColor2"
                        />
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-x-5 flex items-center ">
                <div className="space-x-3 flex items-center">
                  <input
                    type="checkbox"
                    id="chairsCheckbox"
                    name="chairs"
                    className="w-5 h-5 text-lg"
                    onChange={(e) => {
                      e.preventDefault;
                      setShowChairsInput(!showChairsInput);
                    }}
                  />
                  <label for="chairs" className="font-semibold">
                    Chairs
                  </label>
                </div>

                {showChairsInput && (
                  <input
                    type="number"
                    name="chairs"
                    value={form.chairs}
                    onChange={handleChange}
                    placeholder="No. of pcs"
                    min={1}
                    required
                    className="rounded-md text-sm "
                  />
                )}
              </div>

              <div className="space-x-5 flex items-center ">
                <div className="space-x-3 flex items-center">
                  <input
                    type="checkbox"
                    id="tablesCheckbox"
                    name="tables"
                    className="w-5 h-5 text-lg"
                    onChange={(e) => {
                      e.preventDefault;
                      setShowTablesInput(!showTablesInput);
                    }}
                  />
                  <label for="tablesCheckbox" className="font-semibold">
                    Tables
                  </label>
                </div>
                {showTablesInput && (
                  <input
                    type="number"
                    name="tables"
                    value={form.tables}
                    placeholder="No. of pcs"
                    onChange={handleChange}
                    required
                    className="rounded-md text-sm "
                    min={1}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label for="message" className="font-semibold">
              Other details
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Other equipmet/technical requirements."
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex space-x-5 font-semibold text-lg pt-5">
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
              className="bg-mainColor2 text-white rounded-md px-3 py-2 flex-1"
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
