import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarApi } from "@fullcalendar/core";

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
}

interface EventsCalendarProps {
  events: CalendarEvent[];
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ events }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [view, setView] = useState<"timeGridWeek" | "dayGridMonth">(
    "timeGridWeek"
  );

  const handleDateClick = (info: { date: Date }) => {
    const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(info.date);
      calendarApi.changeView("timeGridWeek");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Upcoming Events</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("timeGridWeek")}
            className={`px-4 py-2 rounded ${
              view === "timeGridWeek"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Weekly View
          </button>
          <button
            onClick={() => setView("dayGridMonth")}
            className={`px-4 py-2 rounded ${
              view === "dayGridMonth"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Monthly View
          </button>
          <a
            href="/plan-visit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Plan a Visit
          </a>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={false}
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
};

export default EventsCalendar;
