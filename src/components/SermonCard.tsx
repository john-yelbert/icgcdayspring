// src/components/SermonCard.tsx
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

type Sermon = {
  id: number;
  title: string;
  speaker: string;
  date: string;
};

const SermonCard: React.FC<{ sermon: Sermon }> = ({ sermon }) => {
  return (
    <div className="card h-100 border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
      <Link
        to={`/sermons/${sermon.id}`}
        className="text-decoration-none text-gray-900"
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <FaPlayCircle size={32} className="text-blue-600" />
            <h5 className="card-title mb-0 text-lg font-semibold">
              {sermon.title}
            </h5>
          </div>
          <p className="card-text text-muted mb-1 text-sm">
            <strong>Speaker:</strong> {sermon.speaker}
          </p>
          <p className="card-text text-muted text-xs">{sermon.date}</p>
        </div>
      </Link>
    </div>
  );
};

export default SermonCard;
