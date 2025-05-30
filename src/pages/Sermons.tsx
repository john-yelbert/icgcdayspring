import React from "react";
import SermonCard from "../components/SermonCard";

const sermons = [
  {
    id: 1,
    title: "Faith Over Fear",
    speaker: "Rev. John Doe",
    date: "2024-11-10",
  },
  {
    id: 2,
    title: "Walking in the Spirit",
    speaker: "Rev. Jane Smith",
    date: "2024-11-03",
  },
  {
    id: 3,
    title: "Kingdom Principles",
    speaker: "Dr. James K. Mensah",
    date: "2024-10-27",
  },
  {
    id: 4,
    title: "Faith Over Fear",
    speaker: "Rev. John Doe",
    date: "2024-11-10",
  },
  {
    id: 5,
    title: "Walking in the Spirit",
    speaker: "Rev. Jane Smith",
    date: "2024-11-03",
  },
  {
    id: 6,
    title: "Kingdom Principles",
    speaker: "Dr. James K. Mensah",
    date: "2024-10-27",
  },
];

const Sermons: React.FC = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-2xl font-bold">Sermons</h2>
      <div className="row g-4">
        {sermons.map((sermon) => (
          <div className="col-md-4" key={sermon.id}>
            <SermonCard sermon={sermon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sermons;
