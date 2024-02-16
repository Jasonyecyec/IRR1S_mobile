import React, { useEffect, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { getNotification } from "../services/api/sharedService";
import Cookies from "js-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { formatDate } from "../utils/utils";
import "react-loading-skeleton/dist/skeleton.css";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotification = async (id) => {
    setIsLoading(true);
    try {
      const { notification } = await getNotification(id);
      setNotification(notification);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userIdCookie = Cookies.get("user_id");
    fetchNotification(userIdCookie);
  }, []);
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 bg-mainColor flex items-center ">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={32} color="#ffffff" weight="bold" />
        </button>
      </div>

      <div className=" flex-1 p-3 space-y-3">
        <p className="font-semibold text-xl">Notifications</p>

        <div className=" h-[40rem] overflow-auto space-y-5">
          {isLoading ? (
            <div className="w-full ">
              <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                <Skeleton
                  width={"w-full"}
                  height={"6rem"}
                  className="rounded-lg mb-5"
                />

                <Skeleton
                  width={"w-full"}
                  height={"6rem"}
                  className="rounded-lg mb-5"
                />

                <Skeleton
                  width={"w-full"}
                  height={"6rem"}
                  className="rounded-lg"
                />
              </SkeletonTheme>
            </div>
          ) : notification ? (
            notification.map((item) => (
              <div className="shadow-md bg-white rounded-lg p-5" key={item.id}>
                <div className="flex justify-between border-b-2 pb-3">
                  <p className="mt-1">Notif No: </p>
                  <p>{formatDate(item.created_at)}</p>
                </div>
                <p className="font-bold mt-2">{item.message}</p>
              </div>
            ))
          ) : (
            <p>no data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
