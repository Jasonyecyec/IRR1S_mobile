import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { getAllEvents, getPencilBook } from "@/src/services/api/sharedService";
import { getImageUrl, formatDate } from "@/src/utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CalendarPage = () => {
  const [events, setEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [facilities, setFacilities] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");

  const fetchEvents = async () => {
    try {
      const { events } = await getAllEvents();
      setEvents(events);
      console.log("response", events);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const fetchFacilities = async () => {
    setIsFetching(true);
    try {
      const { facilities } = await getPencilBook(currentFilter);
      console.log("response", facilities);
      setFacilities(facilities);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const renderEventContent = (eventInfo) => {
    const eventStartDate = new Date(eventInfo.event.start);
    const eventEndDate = new Date(eventInfo.event.end);

    const eventStartTime = eventStartDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const eventEndTime = eventEndDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="border-blue-400  text-white border-2 bg-blue-400 ">
        <p className="font0">{eventInfo.event.title}</p>
        <p>asdasd</p>

        <p>
          {eventStartTime} - {eventEndTime}
        </p>
        <p></p>
      </div>
    );
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    console.log("filter", selectedFilter);
    setCurrentFilter(selectedFilter);
    // Optionally, you can call the fetchFacilities function here to fetch data based on the selected filter
  };

  useEffect(() => {
    fetchEvents();
    fetchFacilities();
  }, [currentFilter]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <PageTitle title="CALENDAR" />
      <div className=" p-5 pt-10 space-y-3">
        <div className=" p-3 h-[22.5rem] shadow-md ">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            height="100%"
            displayEventTime={false}
            displayEventEnd={false}
            events={events}

            // eventContent={renderEventContent}
          />
        </div>
        <div className="flex flex-col w-[12rem]">
          <select
            name="filter"
            id="filter"
            className="p-1 rounded-md"
            value={currentFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="accepted">Pencil Booked</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        <div className=" h-[20rem] overflow-y-auto space-y-6">
          {isFetching ? (
            <div className="w-full">
              <Skeleton width={"100%"} height={"10rem"} className="mb-2" />
              <Skeleton width={"100%"} height={"10rem"} />
            </div>
          ) : facilities && facilities.length > 0 ? (
            facilities
              .filter((item) => item.status !== "rejected")
              .map((item) => (
                <div
                  className="border shadow-md flex p-3 space-x-3 justify-between items-center rounded-md"
                  key={item.id}
                >
                  <div>
                    <img
                      src={getImageUrl(item.facility?.facilities_image)}
                      className="w-20 h-20 "
                      alt="facility-img"
                    />
                  </div>

                  <div className="flex-1 ">
                    <div className="text-sm">
                      <p className="font-semibold text-base ">
                        {item.facility?.facilities_name} -{" "}
                        {item.facility?.location}
                      </p>
                      <p className="text-sm">Event name: {item.event_name}</p>
                      <p className="text-sm">Purpose: {item.description}</p>
                      <p className="text-sm">
                        Date start: {formatDate(item.start_date)}
                      </p>
                      <p className="text-sm">
                        Date end: {formatDate(item.end_date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
