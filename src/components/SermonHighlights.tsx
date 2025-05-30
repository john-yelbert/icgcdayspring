import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

type Sermon = {
  id: number;
  title: string;
  speaker: string;
  date: string;
  //   mediaType: "audio" | "video";
};

const Sermons: Sermon[] = [
  {
    id: 1,
    title: "Walking in the Power of the Spirit",
    speaker: "Rev. John Doe",
    date: "May 19, 2025",
    // mediaType: "audio",
  },
  {
    id: 2,
    title: "Faith for the Impossible",
    speaker: "Pastor Jane Smith",
    date: "May 12, 2025",
    // mediaType: "video",
  },
  {
    id: 3,
    title: "Kingdom Prosperity",
    speaker: "Rev. John Doe",
    date: "May 5, 2025",
    // mediaType: "audio",
  },
];

const SermonHighlights = () => {
  return (
    <section className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Recent Sermons</h2>
        <p className="text-muted">
          Catch up on the latest Spirit-inspired messages.
        </p>
      </div>

      <div className="row g-4">
        {Sermons.map((sermon) => (
          <div className="col-md-4" key={sermon.id}>
            <Link to="/sermons" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <FaPlayCircle size={32} className="text-primary" />
                    <h5 className="card-title mb-0">{sermon.title}</h5>
                  </div>
                  <p className="card-text text-muted mb-1">
                    <strong>Speaker:</strong> {sermon.speaker}
                  </p>
                  <p className="card-text text-muted small">{sermon.date}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/sermons" className="btn btn-primary px-4">
          🎧 View All Sermons
        </Link>
      </div>
    </section>
  );
};

export default SermonHighlights;
