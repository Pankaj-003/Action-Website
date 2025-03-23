import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sell = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    startingBid: "",
    duration: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.image || !formData.startingBid || !formData.duration) {
      alert("Please fill in all fields!");
      return;
    }
    
    const newItem = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      image: formData.image,
      startingBid: parseFloat(formData.startingBid),
      endTime: new Date().getTime() + formData.duration * 60 * 1000, // Convert minutes to milliseconds
    };

    onAddItem(newItem);
    alert("Item listed successfully!");
    
    // Reset form
    setFormData({ name: "", description: "", image: "", startingBid: "", duration: "" });
    setPreviewImage(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List an Item for Auction</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} required />
            {previewImage && <img src={previewImage} alt="Preview" className="mt-3 img-thumbnail" style={{ width: "150px" }} />}
          </div>

          <div className="mb-3">
            <label className="form-label">Starting Bid ($)</label>
            <input type="number" className="form-control" name="startingBid" value={formData.startingBid} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Auction Duration (minutes)</label>
            <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">List Item</button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
