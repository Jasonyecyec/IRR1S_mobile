import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { Dropdown } from "flowbite-react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import SuccessModal from "@/src/components/SuccessModal";
import Loading from "@/src/components/Loading";
import useUserStore from "@/src/services/state/userStore";
import { requestService } from "@/src/services/api/StaffService";
import { useNavigate } from "react-router-dom";
import { getLogistics } from "@/src/services/api/StaffService";
import { Plus } from "@phosphor-icons/react";
import { Toaster, toast } from "sonner";
import { requestLogistic } from "@/src/services/api/StaffService";

const RequestPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const [logistics, setLogistics] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingLogistic, setISFetchingLogistic] = useState(false);
  const [currentSelectLogistic, setCurrentSelectLogistic] = useState(null);
  const [currentLogisticQuantity, setCurrentLogisticQuantity] = useState(0);
  const [isShowConfirmation, SetShowConfirmation] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isSuccessLogisticModal, setIsSucessLogisticModal] = useState(false);

  const [form, setForm] = useState({
    request_type: null,
    description: null,
    date_due: null,
    status: "pending",
    urgency: false,
  });

  const [formLogistic, setFormLogistic] = useState({
    logistics_request: [],
    description: "",
    status: "pending",
    date_assigned: null,
    expected_date: null,
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

  const handleLogisticChange = (e) => {
    const { name, value } = e.target;
    setFormLogistic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchLogistiscs = async () => {
    setISFetchingLogistic(true);
    try {
      const { logistic_tbl } = await getLogistics();
      setLogistics(logistic_tbl);
      console.log("logistic_tbl", logistic_tbl);
    } catch (error) {
      console.log("error", error);
    } finally {
      setISFetchingLogistic(false);
    }
  };

  const handleAddLogistic = (e) => {
    e.preventDefault();

    // Parse the currentLogisticQuantity to an integer
    const parsedQuantity = parseInt(currentLogisticQuantity);

    if (parsedQuantity === 0 || isNaN(parsedQuantity)) {
      toast.warning("Invalid quantity");
      return;
    }

    if (parsedQuantity > currentSelectLogistic.current_quantity) {
      toast.warning("Quantity is greather than available");
      return;
    }

    const existingIndex = formLogistic.logistics_request.findIndex(
      (item) => item.id === currentSelectLogistic.id
    );

    if (existingIndex !== -1) {
      // If the object with the same id exists, update its quantity
      setFormLogistic((prev) => ({
        ...prev,
        logistics_request: prev.logistics_request.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + parsedQuantity }
            : item
        ),
      }));
    } else {
      // If the object with the same id doesn't exist, add it to the array
      const logistic = {
        id: currentSelectLogistic.id,
        logistic_name: currentSelectLogistic.name,
        quantity: parsedQuantity,
      };

      setFormLogistic((prev) => ({
        ...prev,
        logistics_request: [...prev.logistics_request, logistic],
      }));
    }

    // Reset currentLogisticQuantity after adding the logistic
    setCurrentLogisticQuantity(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.request_type === "logistics" &&
      formLogistic.logistics_request.length === 0
    ) {
      toast.warning("Please add logistic ");
      return;
    }

    SetShowConfirmation(true);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (
      form.request_type === "manpower" ||
      form.request_type === "maintenance"
    ) {
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
    }

    if (form.request_type === "logistics") {
      setIsLoading(true);
      try {
        SetShowConfirmation(false);

        const response = await requestLogistic(formLogistic);
        console.log("logistic request response", response);
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        setIsSucessLogisticModal(true);
      }
      console.log("logistic form", formLogistic);
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

  useEffect(() => {
    if (form.request_type === "logistics") {
      fetchLogistiscs();
    }
  }, [form.request_type]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Toaster richColors position="top-center" />
      <PageTitle title="Request" />

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

      {isSuccessLogisticModal && (
        <SuccessModal
          title="Logistic Request Successful"
          message="Your logistic request has been successfully submitted. Please wait for further updates."
          handleCloseButton={() => navigate("/staff/request-history")}
        />
      )}

      <div className="flex-1 p-5 pt-10" onSubmit={handleSubmit}>
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
              <option value="">Select Request </option>
              <option value="manpower">Service Provider Assistance</option>
              <option value="maintenance">Maintenance</option>
              {/* <option value="logistics">Logistics</option> */}
            </select>

            {!form.request_type && (
              <div className="text-sm">
                <p className="font-semibold">
                  Please select a request type first.{" "}
                </p>
                <span className="text-gray-500">
                  Choose a request type above to proceed.
                </span>
              </div>
            )}
          </div>

          {form.request_type === "manpower" ||
          form.request_type === "maintenance" ? (
            <>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="date-due" className="text-sm font-semibold">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="date-due"
                  className="rounded-md"
                  name="date_due"
                  min={minDate}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-semibold">
                  Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Input description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </>
          ) : null}

          {form.request_type == "logistics" && (
            <>
              <div className="space-y-2 flex flex-col">
                <label for="request_type" className="text-sm font-semibold">
                  Choose Logistics
                </label>

                <select
                  name="request_type"
                  id="request_type"
                  className="rounded-md"
                  // value={currentSelectLogistic}
                  onChange={(e) =>
                    setCurrentSelectLogistic(JSON.parse(e.target.value))
                  }
                  required
                >
                  <option value="">Select Desire Logistic</option>
                  {logistics &&
                    logistics.map((item) => (
                      <option
                        value={JSON.stringify(item)}
                        key={item.id}
                        className="capitalize"
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {currentSelectLogistic && (
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <label for="quantity">Quantity:</label>

                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={currentLogisticQuantity}
                      onChange={(e) =>
                        setCurrentLogisticQuantity(e.target.value)
                      }
                      required
                      className="w-full rounded-md"
                    />
                  </div>
                  <button
                    onClick={handleAddLogistic}
                    className="rounded-md bg-mainColor2 h-full w-10 h-full p-3"
                  >
                    {" "}
                    <Plus size={15} className="text-white" />
                  </button>
                </div>
              )}

              {formLogistic.logistics_request.length > 0 && (
                <div>
                  <div className="bg-mainColor2 text-white font-semibold flex justify-between items-center p-1.5 rounded-t-md">
                    <p className="flex-1 text-center">Logisitc name</p>
                    <p className="flex-1 text-center">Quantity</p>
                  </div>

                  <div className="border">
                    {formLogistic.logistics_request.map((item) => (
                      <div className=" font-semibold flex justify-between items-center p-1.5 ">
                        <p className="flex-1 text-center">
                          {item.logistic_name}
                        </p>
                        <p className="flex-1 text-center">{item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <label for="description" className="font-semibold">
                  Description:
                </label>
                <textarea
                  id="description"
                  description="description"
                  className="rounded-md w-full text-sm"
                  rows="4"
                  required
                  name="description"
                  cols="33"
                  value={formLogistic.description}
                  onChange={handleLogisticChange}
                  style={{ resize: "none" }}
                ></textarea>
              </div>

              <div className="flex flex-col space-y-1">
                <label for="date_assigned" className="font-semibold">
                  When needed:
                </label>

                <input
                  type="date"
                  id="date_assigned"
                  name="date_assigned"
                  className="rounded-md"
                  required
                  value={formLogistic.date_assigned}
                  onChange={handleLogisticChange}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label for="date_assigned" className="font-semibold">
                  Expected completion date:
                </label>

                <input
                  type="date"
                  id="expected_date"
                  name="expected_date"
                  value={formLogistic.expected_date}
                  className="rounded-md"
                  required
                  onChange={handleLogisticChange}
                />
              </div>
            </>
          )}

          <div className="flex space-x-5 font-semibold text-lg pt-5">
            <button
              className="flex-1 border  text-gray-500 rounded-md bg-gray-50 hover:bg-gray-100 ease-in-out duration-150"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-mainColor2 text-white rounded-md px-3 py-2 flex-1"
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
