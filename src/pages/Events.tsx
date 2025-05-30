import { useState } from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "dayjs/locale/en";
import eventFlyer from "../assets/images/sunday.jpg";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  flyer: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Sunday Service",
    date: "2025-05-25",
    time: "10:00 AM",
    location: "Main Sanctuary",
    flyer: "https://via.placeholder.com/300x200.png?text=Sunday+Service",
  },
  {
    id: 2,
    title: "Prayer Meeting",
    date: "2025-05-29",
    time: "8:00 PM",
    location: "Zoom / Church Hall",
    flyer: "https://via.placeholder.com/300x200.png?text=Prayer+Meeting",
  },
  {
    id: 3,
    title: "Bible Study",
    date: "2025-05-27",
    time: "7:00 PM",
    location: "Main Auditorium",
    flyer: "https://via.placeholder.com/300x200.png?text=Bible+Study",
  },
  {
    id: 4,
    title: "Early Morning Service",
    date: "2025-05-25",
    time: "8:00 AM",
    location: "Chapel",
    flyer: "https://via.placeholder.com/300x200.png?text=Morning+Service",
  },
];

const Events = () => {
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const renderMonthlyView = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();
    const monthName = currentDate.format("MMMM YYYY");

    const eventsByDate = events.reduce<Record<string, Event[]>>(
      (acc, event) => {
        (acc[event.date] ||= []).push(event);
        return acc;
      },
      {}
    );

    const calendarCells = [];

    // Empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      calendarCells.push(
        <div className="calendar-cell border" key={`empty-${i}`}></div>
      );
    }

    // Cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = currentDate.date(day).format("YYYY-MM-DD");
      const dayEvents = eventsByDate[dateStr] || [];

      calendarCells.push(
        <div
          key={dateStr}
          className="calendar-cell border position-relative p-2"
        >
          <div className="position-absolute top-0 end-0 text-muted small pe-1">
            {day}
          </div>
          <div className="mt-4">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="bg-primary text-white p-1 rounded mb-1 small"
                role="button"
                onClick={() => handleEventClick(event)}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          >
            ◀ Prev
          </button>
          <h4 className="mb-0">{monthName}</h4>
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          >
            Next ▶
          </button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-header">Sun</div>
          <div className="calendar-header">Mon</div>
          <div className="calendar-header">Tue</div>
          <div className="calendar-header">Wed</div>
          <div className="calendar-header">Thu</div>
          <div className="calendar-header">Fri</div>
          <div className="calendar-header">Sat</div>
          {calendarCells}
        </div>
      </>
    );
  };

  const renderWeeklyView = () => {
    const startOfWeek = currentDate.startOf("week");
    const weeklyDates = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day")
    );

    const eventsByDate = events.reduce<Record<string, Event[]>>(
      (acc, event) => {
        (acc[event.date] ||= []).push(event);
        return acc;
      },
      {}
    );

    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-outline-light"
            onClick={() => setCurrentDate((d) => d.subtract(1, "week"))}
          >
            ◀ Prev
          </button>
          <h4 className="mb-0">
            {startOfWeek.format("MMM D")} –{" "}
            {startOfWeek.add(6, "day").format("MMM D, YYYY")}
          </h4>
          <button
            className="btn btn-outline-light"
            onClick={() => setCurrentDate((d) => d.add(1, "week"))}
          >
            Next ▶
          </button>
        </div>

        {/* Weekly view container with matching styling */}
        <div className="weekly-calendar-grid">
          {/* Weekly headers matching monthly view */}
          <div className="calendar-header">Sun</div>
          <div className="calendar-header">Mon</div>
          <div className="calendar-header">Tue</div>
          <div className="calendar-header">Wed</div>
          <div className="calendar-header">Thu</div>
          <div className="calendar-header">Fri</div>
          <div className="calendar-header">Sat</div>

          {/* Weekly days */}
          {weeklyDates.map((date) => {
            const dateStr = date.format("YYYY-MM-DD");
            const dayEvents = eventsByDate[dateStr] || [];
            const dayNumber = date.date();

            return (
              <div
                key={dateStr}
                className="calendar-cell border position-relative p-2"
              >
                <div className="position-absolute top-0 end-0 text-muted small pe-1">
                  {dayNumber}
                </div>
                <div className="mt-4">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-primary text-white p-1 rounded mb-1 small"
                      role="button"
                      onClick={() => handleEventClick(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="container py-4 bg-dark bg-opacity-75 text-light rounded-4 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Church Events</h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as "monthly" | "weekly")}
          className="form-select w-auto"
        >
          <option value="monthly">Monthly View</option>
          <option value="weekly">Weekly View</option>
        </select>
      </div>

      {view === "monthly" ? renderMonthlyView() : renderWeeklyView()}

      {showModal && selectedEvent && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedEvent.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Date:</strong> {selectedEvent.date}
                </p>
                <p>
                  <strong>Time:</strong> {selectedEvent.time}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent.location}
                </p>
                {selectedEvent.flyer && (
                  <img
                    src={eventFlyer}
                    alt="Event Flyer"
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-primary px-4">Plan a Visit</button>
      </div>

      <style>
        {`
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      background-color: rgba(40, 40, 40, 0.7);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 12px;
    }
    
    .calendar-cell {
      min-height: 120px;
      aspect-ratio: 1;
      background: rgba(60, 60, 60, 0.5);
      color: #eee;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(5px);
      transition: all 0.3s ease;
    }
    
    .calendar-cell:hover {
      background: rgba(80, 80, 80, 0.6);
    }
    
    .calendar-header {
      font-weight: bold;
      text-align: center;
      background: rgba(30, 30, 30, 0.8);
      padding: 10px;
      color: #ddd;
      border-radius: 8px;
    }
    
    .weekly-view-container {
      background-color: rgba(40, 40, 40, 0.7);
      border-radius: 12px;
      padding: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .event-card {
      background: #0d6efd;
      color: #eee;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }
    
    .event-card:hover {
      background: rgba(100, 100, 100, 0.7);
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .modal-content {
      background-color: rgba(50, 50, 50, 0.9);
      color: #eee;
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `}
      </style>
    </div>
  );
};

export default Events;
