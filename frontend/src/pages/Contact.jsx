import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane, FaUser, FaBuilding } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required.";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "A valid email is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const phone = "919579074013";
      const text = `New RoomFinder inquiry:%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;
      const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
      window.open(url, "_blank");
    }
  };

  const ErrorMessage = ({ message }) => (
    <p className="mt-1 text-xs font-medium text-red-500 flex items-center gap-1">
      {message}
    </p>
  );

  const ContactInfoCard = ({ icon: Icon, title, content }) => (
    <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg bg-white hover:shadow-md transition duration-300">
      <Icon className="text-2xl text-indigo-500   mt-1" />
      <div>
        <h4 className="font-bold text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{content}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">

        {/* Header Section */}
        <div className="bg-indigo-600 p-8 md:p-12 text-white">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Need Assistance?</h2>
          <p className="mt-3 text-indigo-100 text-lg">
            We're here to help you find your perfect room or manage your listings efficiently.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

          {/* Left Contact Details & Info (1/3 Width) */}
          <div className="p-8 md:p-10 space-y-8 bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">Our Details</h3>

            <div className="space-y-4">
              <ContactInfoCard
                icon={FaMapMarkerAlt}
                title="Office Location"
                content="Level 5, City Center, Pune, Maharashtra, India"
              />
              <ContactInfoCard
                icon={FaPhone}
                title="Phone Support"
                content="+91 98765 43210 (Mon-Fri, 9am-5pm)"
              />
              <ContactInfoCard
                icon={FaEnvelope}
                title="Email Us"
                content="support@roomfinder.com"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3"><FaBuilding /> RoomFinder HQ</h4>
              <p className="text-sm text-gray-500">
                We aim to respond to all inquiries within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right Form (2/3 Width) */}
          <div className="lg:col-span-2 p-8 md:p-10">
            <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-indigo-500 pl-3 mb-6">Send Us a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name & Email (Grid for responsiveness) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <ErrorMessage message={errors.name} />}
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-1">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <ErrorMessage message={errors.email} />}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about listing #101 or General Feedback"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.subject && <ErrorMessage message={errors.subject} />}
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-1">Message *</label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your detailed message here"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.message && <ErrorMessage message={errors.message} />}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                <FaPaperPlane className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section (Full Width) */}


      </div>
    </div>
  );
}
