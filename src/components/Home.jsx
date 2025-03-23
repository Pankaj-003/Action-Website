import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import VaseImage from "../assets/vase.jpg";
import WatchImage from "../assets/watch.jpg";

const auctionItems = [
  {
    id: 1,
    name: "Antique Vase",
    image: VaseImage,
    description: "A beautiful antique vase from the 18th century.",
    startingBid: 100,
    endTime: new Date().getTime() + 5 * 60 * 1000, // Auction ends in 5 minutes
  },
  {
    id: 2,
    name: "Vintage Watch",
    image: WatchImage,
    description: "A rare Swiss-made vintage watch.",
    startingBid: 250,
    endTime: new Date().getTime() + 10 * 60 * 1000, // Auction ends in 10 minutes
  },
  {
    id: 2,
    name: "Vintage Watch",
    image: WatchImage,
    description: "A rare Swiss-made vintage watch.",
    startingBid: 250,
    endTime: new Date().getTime() + 10 * 60 * 1000, // Auction ends in 10 minutes
  },
 
];

const Home = () => {
  const [bids, setBids] = useState(
    auctionItems.reduce((acc, item) => {
      acc[item.id] = item.startingBid;
      return acc;
    }, {})
  );

  const [bidAmounts, setBidAmounts] = useState({});
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      auctionItems.forEach((item) => {
        const timeLeft = item.endTime - new Date().getTime();
        updatedTimers[item.id] = timeLeft > 0 ? timeLeft : 0;
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleBidChange = (e, id) => {
    setBidAmounts({ ...bidAmounts, [id]: e.target.value });
  };

  const placeBid = (id) => {
    const newBid = parseFloat(bidAmounts[id]);
    if (!newBid || newBid <= bids[id]) {
      alert("Your bid must be higher than the current highest bid.");
      return;
    }
    if (timers[id] <= 0) {
      alert("Auction time is over! You cannot place a bid.");
      return;
    }
    setBids({ ...bids, [id]: newBid });
    alert("Bid placed successfully!");
    setBidAmounts({ ...bidAmounts, [id]: "" });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Live Auctions</h2>
      <div className="row">
        {auctionItems.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card mb-4 shadow-sm">
              <img src={item.image} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p><strong>Current Bid:</strong> ${bids[item.id]}</p>
                <p className={`fw-bold ${timers[item.id] === 0 ? "text-danger" : "text-success"}`}>
                  ⏳ Time Left: {timers[item.id] > 0 ? formatTime(timers[item.id]) : "Auction Ended"}
                </p>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Enter your bid"
                  value={bidAmounts[item.id] || ""}
                  onChange={(e) => handleBidChange(e, item.id)}
                  disabled={timers[item.id] === 0}
                />
                <button
                  className="btn btn-primary w-100"
                  onClick={() => placeBid(item.id)}
                  disabled={timers[item.id] === 0}
                >
                  {timers[item.id] === 0 ? "Auction Ended" : "Place Bid"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
