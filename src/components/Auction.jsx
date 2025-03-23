import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Auction = ({ auctionItems = [] }) => {
  const [bids, setBids] = useState({});
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const initialBids = {};
    const initialTimers = {};

    auctionItems.forEach((item, index) => {
      const uniqueId = item.id || `auction-${index}`; // Generate unique key
      initialBids[uniqueId] = item.startingBid;
      initialTimers[uniqueId] = item.endTime - new Date().getTime();
    });

    setBids(initialBids);
    setTimers(initialTimers);

    const interval = setInterval(() => {
      const updatedTimers = {};
      auctionItems.forEach((item, index) => {
        const uniqueId = item.id || `auction-${index}`;
        const timeLeft = item.endTime - new Date().getTime();
        updatedTimers[uniqueId] = timeLeft > 0 ? timeLeft : 0;
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionItems]);

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return "Auction Ended";
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Live Auctions</h2>
      {auctionItems.length === 0 ? (
        <h4 className="text-center text-muted">No active auctions at the moment.</h4>
      ) : (
        <div className="row">
          {auctionItems.map((item, index) => {
            const uniqueId = item.id || `auction-${index}`;
            return (
              <div className="col-md-4" key={uniqueId}>
                <div className="card mb-4 shadow-sm">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p><strong>Current Bid:</strong> ${bids[uniqueId]}</p>
                    <p className={`fw-bold ${timers[uniqueId] === 0 ? "text-danger" : "text-success"}`}>
                      ⏳ Time Left: {formatTime(timers[uniqueId])}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Auction;
