import { Link } from "react-router-dom";
import {
  FaChurch,
  FaPrayingHands,
  FaBible,
  FaHeadphones,
  FaCalendarAlt,
} from "react-icons/fa"; // Import icons

const services = [
  {
    title: "Sunday Service",
    description:
      "Join us every Sunday for a life-transforming worship and Word session.",
    time: "(8:00 AM) & (10:30 AM)",
    icon: <FaChurch size={48} />,
  },
  {
    title: "Wednesday Teaching Service",
    description:
      "In-depth Bible study and teachings to strengthen your walk with Christ.",
    time: "7:30 PM",
    icon: <FaBible size={48} />, // Bible icon
  },
  {
    title: "Friday Prayer Service",
    description: "An atmosphere of prayer, intercession, and spiritual fire.",
    time: "9:00 PM",
    icon: <FaPrayingHands size={48} />,
  },
];

const ServiceFeatures = () => {
  return (
    <section className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Our Weekly Services</h2>
        <p className="text-muted">
          You're warmly invited to attend any of our Spirit-filled gatherings.
        </p>
      </div>

      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm text-center border-0">
              <div className="card-body">
                <div className="mb-3">{service.icon}</div>
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <p className="text-muted small">{service.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-5">
        <Link
          to="/sermons"
          className="btn btn-outline-primary px-4 d-flex align-items-center gap-2"
        >
          <FaHeadphones /> Explore Sermons
        </Link>
        <Link
          to="/events"
          className="btn btn-primary px-4 d-flex align-items-center gap-2"
        >
          <FaCalendarAlt /> View Events
        </Link>
      </div>
    </section>
  );
};

export default ServiceFeatures;
