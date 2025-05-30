import HomeCarousel from "../components/HomeCarousel";
import ServiceFeatures from "../components/ServiceFeatures";
import SermonHighlights from "../components/SermonHighlights";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  return (
    <div className="container-fluid p-0">
      <HomeCarousel />
      <ServiceFeatures />
      <SermonHighlights />
      <UpcomingEvents />
      {/* Other sections like features, sermons, events, etc. will follow */}
    </div>
  );
};

export default Home;
