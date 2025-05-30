// src/components/UpcomingEvents.tsx

import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
};

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Youth Prayer Meeting",
    location: "Main Auditorium",
    date: "May 30, 2025",
    time: "6:00 PM – 8:00 PM",
  },
  {
    id: 2,
    title: "Men's Fellowship Breakfast",
    location: "Church Hall",
    date: "June 1, 2025",
    time: "8:00 AM – 10:00 AM",
  },
  {
    id: 3,
    title: "Monthly Communion Service",
    location: "Main Sanctuary",
    date: "June 2, 2025",
    time: "10:00 AM – 12:00 PM",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <section className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Upcoming Events</h2>
        <p className="text-muted">
          Stay informed about what’s happening in our community.
        </p>
      </div>

      <div className="row">
        {upcomingEvents.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <article className="card h-100 border-0 shadow-sm">
              <Link
                to="/events"
                className="text-decoration-none text-dark h-100 d-flex flex-column"
              >
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <FaCalendarAlt className="text-primary me-2" size={24} />
                    <h5 className="card-title mb-0">{event.title}</h5>
                  </div>
                  <ul className="list-unstyled text-muted mb-0">
                    <li>
                      <strong>Date:</strong> {event.date}
                    </li>
                    <li>
                      <strong>Time:</strong> {event.time}
                    </li>
                    <li>
                      <strong>Location:</strong> {event.location}
                    </li>
                  </ul>
                </div>
              </Link>
            </article>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/events" className="btn btn-primary px-4">
          📅 View All Events
        </Link>
      </div>
    </section>
  );
};

export default UpcomingEvents;
