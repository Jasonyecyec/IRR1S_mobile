import React, { useEffect, useState } from "react";
import { openDB } from "idb"; // Import the IndexedDB API
import { useParams } from "react-router-dom";
import ManpowerHeaderNavigation from "@/src/components/ManpowerHeaderNavigation";
import { getManpowerNotification } from "@/src/services/api/manpowerService";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import useUserStore from "@/src/services/state/userStore";

const ManpowerNotificationPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const { userId } = useParams();
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataFromIndexDB = async () => {
    try {
      const db = await openDB("job_order_notification", 1); // Open the IndexedDB with the same name and version
      const tx = db.transaction("notifications", "readonly"); // Start a read-only transaction on the 'notifications' object store
      const store = tx.objectStore("notifications"); // Get the object store

      const data = await store.getAll();
      // Retrieve all data from the object store
      console.log("Data from IndexedDB:", data[0].content);
      setNotification(data[0].content);
    } catch (error) {
      console.error("Error retrieving data from IndexedDB:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchNotification = async () => {
      try {
        // const { notification } = await getManpowerNotification(userId);
        // const notification = setNotification(notification);
        // console.log(notification);
        // Call the function to retrieve data from IndexedDB
        await getDataFromIndexDB();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotification();
  }, []);

  return (
    <div className="h-full flex flex-col ">
      <ManpowerHeaderNavigation navigateTo={"home"} showBell={false} />

      <div className="p-4 flex-1 flex  flex-col  space-y-5">
        <h1 className="font-bold text-3xl">Notification</h1>

        <div className="flex-1 flex justify-center">
          {isLoading ? (
            <Spinner aria-label="Extra large spinner example" size="xl" />
          ) : (
            <div className=" h-[40rem] overflow-y-scroll flex flex-col space-y-7">
              {" "}
              {notification.length === 0 ? (
                <p>No Notification</p>
              ) : (
                notification.map(
                  (item, index) =>
                    item.assigned_manpower == userId && (
                      <div
                        key={item.id}
                        className="shadow-md bg-white rounded-lg p-5"
                      >
                        <div className="flex justify-between border-b-2 pb-3">
                          <p className="font-bold">
                            Job Order
                            <span className="bg-yellow-300 py-1 px-2 rounded-md ml-2">
                              {item.issue_type ? "REPORT" : "REQUEST"}
                            </span>
                          </p>

                          <Link
                            to={`/manpower/progress/${
                              item.issue_type ? "report" : "request"
                            }/${item?.id}`}
                            className="text-mainColor font-bold "
                          >
                            View
                          </Link>
                        </div>
                        {/* Render your notification item here */}
                        <p className="mt-1">Task No: {item.id}</p>
                        <p className="font-bold mt-2">
                          New Job Order REPORT requires your attention. Click
                          view for more details.
                        </p>
                      </div>
                    )
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManpowerNotificationPage;
