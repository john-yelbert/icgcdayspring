import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import pastorPic from "../assets/images/slide1.png";
import gallery1 from "../assets/images/slide1.png";
import gallery2 from "../assets/images/slide2.png";
import gallery3 from "../assets/images/slide3.png";
import gallery4 from "../assets/images/slide4.png";

const AboutUs = () => {
  const galleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    // "https://via.placeholder.com/600x400?text=Bible+Study",
    // "https://via.placeholder.com/600x400?text=Community+Outreach",
    // "https://via.placeholder.com/600x400?text=Youth+Group",
    // "https://via.placeholder.com/600x400?text=Choir+Performance",
    // "https://via.placeholder.com/600x400?text=Church+Building",
  ];

  return (
    <Container className="py-5 bg-light rounded-4 shadow-sm">
      {/* Header Section */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4 mb-3 text-dark">About Our Church</h1>
          <div className="border-top border-dark w-25 mx-auto my-3"></div>
          <p className="lead text-muted">
            Serving the community with faith, hope, and love since 1995
          </p>
        </Col>
      </Row>

      {/* Mission & Vision */}
      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="bg-white border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center h3 text-primary">
                <i className="bi bi-compass me-2"></i>Our Mission
              </Card.Title>
              <Card.Text className="mt-4 text-dark">
                "To lead people into a growing relationship with Jesus Christ
                through worship, discipleship, and service. We strive to be a
                beacon of light in our community."
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="bg-white border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center h3 text-primary">
                <i className="bi bi-eye me-2"></i>Our Vision
              </Card.Title>
              <Card.Text className="mt-4 text-dark">
                "To create a thriving spiritual community where every individual
                discovers their God-given purpose through Christ-centered
                ministry."
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pastor's Message */}
      <Row className="mb-5">
        <Col>
          <Card className="bg-white border-0 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={3} className="text-center mb-4 mb-md-0">
                  <img
                    src={pastorPic}
                    alt="Pastor"
                    className="img-fluid rounded-circle border border-3 border-primary shadow"
                  />
                  <h4 className="mt-3 text-dark">Pastor John Smith</h4>
                  <p className="text-muted">Senior Pastor</p>
                </Col>
                <Col md={9}>
                  <Card.Title className="h3 text-primary mb-4">
                    A Word From Our Pastor
                  </Card.Title>
                  <blockquote className="blockquote">
                    <p className="mb-4 text-dark">
                      "Welcome to our church family! For over 25 years, we've
                      been committed to sharing the transformative love of
                      Christ in our community."
                    </p>
                    <p className="text-dark">
                      "We believe the church should be a place of hope, healing,
                      and authentic community for all people at every stage of
                      their spiritual journey."
                    </p>
                    <footer className="blockquote-footer mt-3 text-muted">
                      Pastor John, <cite>May 2023</cite>
                    </footer>
                  </blockquote>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Core Values */}
      <Row>
        <Col>
          <h2 className="text-center mb-4 text-dark">Our Core Values</h2>
          <div className="border-top border-dark w-25 mx-auto my-3"></div>

          <Row className="g-4">
            {[
              {
                icon: "bi-heart",
                title: "Love",
                text: "Demonstrating Christ-like compassion",
              },
              {
                icon: "bi-book",
                title: "Truth",
                text: "Grounding our lives in Biblical teaching",
              },
              {
                icon: "bi-people",
                title: "Community",
                text: "Building authentic relationships",
              },
              {
                icon: "bi-hand-thumbs-up",
                title: "Service",
                text: "Using our gifts to serve others",
              },
              {
                icon: "bi-stars",
                title: "Excellence",
                text: "Honoring God with our best",
              },
              {
                icon: "bi-globe",
                title: "Mission",
                text: "Sharing the Gospel worldwide",
              },
            ].map((item, index) => (
              <Col md={4} key={index}>
                <Card className="bg-white border-0 shadow-sm h-100">
                  <Card.Body className="text-center">
                    <i className={`bi ${item.icon} text-primary h1 mb-3`}></i>
                    <h4 className="text-dark">{item.title}</h4>
                    <p className="text-dark">{item.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Church History Timeline */}
      {/* <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4 text-dark">Our History</h2>
          <div className="border-top border-dark w-25 mx-auto my-3"></div>

          <div className="timeline">
            {[
              {
                year: "1995",
                event: "Church founded by Pastor John and 12 members",
              },
              { year: "2000", event: "First church building constructed" },
              { year: "2005", event: "Community outreach program launched" },
              { year: "2010", event: "Youth ministry established" },
              { year: "2015", event: "20th anniversary celebration" },
              { year: "2020", event: "Online ministry expansion" },
              { year: "2023", event: "Current sanctuary renovation completed" },
            ].map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year bg-primary text-white">
                  {item.year}
                </div>
                <div className="timeline-content shadow-sm">
                  <p className="mb-0 text-dark">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row> */}

      {/* Photo Gallery */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4 text-dark">Gallery</h2>
          <div className="border-top border-dark w-25 mx-auto my-3"></div>

          <Row xs={2} md={3} lg={4} className="g-4">
            {galleryImages.map((img, index) => (
              <Col key={index}>
                <Card className="border-0 shadow-sm h-100">
                  <Image
                    src={img}
                    alt="Church activity"
                    className="card-img-top"
                    fluid
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Social Media Links */}
      <Row className="mb-5">
        <Col>
          <Card className="bg-white border-0 shadow-sm">
            <Card.Body className="text-center">
              <h2 className="mb-4 text-dark">Connect With Us</h2>
              <div className="border-top border-dark w-25 mx-auto my-3"></div>

              <div className="d-flex justify-content-center gap-4 mt-4">
                <a href="https://facebook.com" className="text-primary fs-2">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" className="text-primary fs-2">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" className="text-primary fs-2">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" className="text-primary fs-2">
                  <FaYoutube />
                </a>
              </div>

              <p className="mt-4 text-muted">
                Follow us for daily inspiration, event updates, and live streams
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding-left: 50px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #0d6efd;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        .timeline-year {
          position: absolute;
          left: -50px;
          top: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .timeline-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          position: relative;
        }
        .timeline-content::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 15px;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 10px solid white;
        }
        .card {
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </Container>
  );
};

export default AboutUs;
