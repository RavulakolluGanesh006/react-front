
import React, { useState } from "react";
import "./GenerationForm.css";
import axios from "axios"

const GenerationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Generationform`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    // try {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_API_URL}/api/Generationform`,
    //     { name, email, company, message }
    //   );
      const result = await response.json();

      if (response.ok) {
        alert("✅ Form submitted and forwarded to automation!");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      alert("❌ Could not connect to backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <h2>Generation Form</h2>

      <div className="form-group">
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Name*"
  />
  {errors.name && <span className="error">{errors.name}</span>}
</div>

<div className="form-group">
  <input
    type="text"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email*"
  />
  {errors.email && <span className="error">{errors.email}</span>}
</div>

<div className="form-group">
  <input
    type="text"
    name="company"
    value={formData.company}
    onChange={handleChange}
    placeholder="Company"
  />
</div>

<div className="form-group">
  <textarea
    name="message"
    value={formData.message}
    onChange={handleChange}
    placeholder="Message"
  />
</div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default GenerationForm;