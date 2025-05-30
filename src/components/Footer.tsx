import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const churchLocation = {
    name: "ICGC Dayspring Assembly",
    address: "Community 25, Tema, Ghana",
    googleMapsLink: "https://maps.app.goo.gl/rRBvHELfLfW6sxZm8",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.755238724263!2d-0.20040368473414313!3d5.603822995932471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuOCJOIDDCsDExJzU3LjgiVw!5e0!3m2!1sen!2sgh!4v1620000000000!5m2!1sen!2sgh",
    // staticMapUrl:
    //   "https://maps.googleapis.com/maps/api/staticmap?center=5.603823,-0.200404&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C5.603823,-0.200404&key=YOUR_API_KEY",
  };
  return (
    <footer className="footer mt-auto py-4 bg-light border-top">
      <div className="container">
        <div className="row">
          {/* Online Giving Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-dark mb-3">Online Giving</h5>
            <div className="text-muted">
              <div className="mb-3">
                <h6 className="text-primary">Mobile Money (Momo)</h6>
                <div>
                  <strong>Network:</strong> MTN, Vodafone, AirtelTigo
                </div>
                <div>
                  <strong>Number:</strong> 0555 123 4567
                </div>
                <div>
                  <strong>Name:</strong> ICGC Dayspring Assembly
                </div>
              </div>

              <div>
                <h6 className="text-primary">Bank Transfer (UMB)</h6>
                <div>
                  <strong>Account Name:</strong> ICGC Dayspring Assembly
                </div>
                <div>
                  <strong>Account Number:</strong> 1234567890
                </div>
                <div>
                  <strong>Branch:</strong> Accra Main Branch
                </div>
                <div>
                  <strong>SWIFT Code:</strong> UMBGGHAC
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-dark mb-3">Contact</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2 text-primary" />
                ICGC Dayspring Assembly Community 25, Tema
              </li>
              <li className="mb-2">
                <FaPhone className="me-2 text-primary" />
                +233 123 456 789
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2 text-primary" />
                info@icgcdayspring.org
              </li>
            </ul>

            {/* Embedded Google Map */}
            {/* Interactive Map */}
            <div className="map-container rounded overflow-hidden shadow-sm">
              <iframe
                title={`${churchLocation.name} Location`}
                src={churchLocation.embedUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                aria-label="Church location map"
              ></iframe>
            </div>
            <p className="text-center small mt-2">
              <a
                href={churchLocation.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Get Directions
              </a>
            </p>
          </div>

          {/* Connect Section */}
          <div className="col-lg-4 col-md-12">
            <h5 className="text-dark mb-3">Connect With Us</h5>
            <div className="d-flex justify-content-start justify-content-md-center gap-3 mb-3">
              <a
                href="https://facebook.com"
                className="text-primary fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                className="text-primary fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="text-primary fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                className="text-primary fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
            <p className="text-muted small">
              Follow us for daily inspiration, event updates, and live streams
            </p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Copyright and Links */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} ICGC Dayspring Assembly. All
              rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-muted small me-3">
              Privacy Policy
            </a>
            <a href="#" className="text-muted small">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
