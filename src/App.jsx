import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Sell from "./components/Sell";
import Auction from "./components/Auction";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auctionItems, setAuctionItems] = useState([]);

  const handleAddItem = (newItem) => {
    setAuctionItems([...auctionItems, newItem]);
  };
  const handleUpdateBid = (id, newBid) => {
    setAuctionItems(
      auctionItems.map((item) =>
        item.id === id ? { ...item, highestBid: newBid } : item
      )
    );
  };
  return (
    <Router> 
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/auction" element={<Auction auctionItems={auctionItems} onUpdateBid={handleUpdateBid} />} />
        <Route path="/sell" element={<Sell onAddItem={handleAddItem} />} />
        <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/contact" element={<Contact />} />  
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
