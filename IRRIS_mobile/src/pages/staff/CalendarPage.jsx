import React from "react";
import PageTitle from "@/src/components/PageTitle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const CalendarPage = () => {
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

  return (
    <div className="h-screen w-screen flex flex-col">
      <PageTitle title="CALENDAR" />
      <div className=" p-5 pt-10 space-y-3">
        <div className=" p-3 h-[23rem] shadow-md ">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            height="100%"
            displayEventTime={true}
            displayEventEnd={true}
            events={[
              {
                title: "event 2",
                start: "2024-02-19",
                end: "2024-02-19",
                // display: "background",
                // color: "yellow",
              },
              {
                title: "event 3",
                start: "2024-02-20",
                end: "2024-02-28",
                // display: "background",
                color: "#eab308",
                textColor: "white",
              },
            ]}
            eventTimeFormat={{
              // like '14:30:00'
              hour: "2-digit",
              minute: "2-digit",
              // second: '2-digit',
              meridiem: true,
            }}

            // eventContent={renderEventContent}
          />
        </div>

        <div className="bg-red-200 h-[21rem] overflow-y-auto space-y-3">
          <div className="bg-blue-50 p-3 rounded-md space-y-5">
            <p>Library Maintenance</p>
            <p>Today - 9:30 AM - 11:00 AM</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-md space-y-5">
            <p>Library Maintenance</p>
            <p>Today - 9:30 AM - 11:00 AM</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-md space-y-5">
            <p>Library Maintenance</p>
            <p>Today - 9:30 AM - 11:00 AM</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-md space-y-5">
            <p>Library Maintenance</p>
            <p>Today - 9:30 AM - 11:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
