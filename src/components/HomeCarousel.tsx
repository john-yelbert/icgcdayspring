import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import slide1 from "../assets/images/slide4.png";
import slide2 from "../assets/images/slide1.png";
import slide3 from "../assets/images/slide2.png";

const HomeCarousel = () => {
  return (
    <div className="home-banner mb-5">
      <Carousel
        fade
        indicators
        controls
        interval={5000}
        className="home-banner-carousel"
      >
        {/* Slide 1 */}
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              background: `url(${slide1}) center center / cover no-repeat`,
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="overlay" />
            <div className="carousel-caption">
              <h1 className="display-4">Welcome to ICGC Dayspring Assembly</h1>
              <p className="lead">
                Transforming lives through the Word of God.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <Link to="/visit" className="btn btn-light btn-lg px-4 me-md-2">
                  Plan a Visit
                </Link>
                <Link
                  to="/events"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  View Events
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              background: `url(${slide2}) center center / cover no-repeat`,
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="overlay" />
            <div className="carousel-caption">
              <h1 className="display-4">Sunday Worship Services</h1>
              <p className="lead">
                Join us every Sunday at 8:00 AM and 10:30 AM for powerful
                worship and teaching.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <Link to="/sermons" className="btn btn-light btn-lg px-4">
                  Listen to Sermons
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              background: `url(${slide3}) center center / cover no-repeat`,
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="overlay" />
            <div className="carousel-caption">
              <h1 className="display-4">Be Part of Our Family</h1>
              <p className="lead">
                ICGC Dayspring Assembly offers various ministries to help you
                grow and serve.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <Link to="/prayer" className="btn btn-light btn-lg px-4">
                  Prayer Requests
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
