import React from "react";
import PageTitle from "@/src/components/PageTitle";
import useUserStore from "@/src/services/state/userStore";
import { useNavigate } from "react-router-dom";

const RequestHistoryPage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col">
      <PageTitle
        title="REQUEST HISTORY"
        closeFunction={() => navigate(`/${user?.user_role}/home`)}
      />

      <div className=" p-5 flex-1 pt-10 space-y-3 ">s</div>
    </div>
  );
};

export default RequestHistoryPage;
