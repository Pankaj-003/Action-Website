import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} AuctionHub. All Rights Reserved @Pankaj Biswas.</p>
        <div>
          <a href="#" className="text-light mx-2">Privacy Policy</a> | 
          <a href="#" className="text-light mx-2">Terms of Service</a> | 
          <a href="/contact" className="text-light mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
