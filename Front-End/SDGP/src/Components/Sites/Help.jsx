import React, { useState } from "react";
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../../supabaseClient";

const Help = () => {
  const [form, setForm] = useState({
    full_name: "",
    position: "",
    province: "",
    district: "",
    complaint_type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.message) {
      alert("Full name and complaint are required");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      alert("You must be logged in to submit a complaint.");
      return;
    }

    const payload = {
      user_id: user.id,
      full_name: form.full_name,
      position: form.position || null,
      province: form.province || null,
      district: form.district || null,
      complaint_type: form.complaint_type,
      message: form.message,
    };

    const { error } = await supabase.from("help_faq").insert([payload]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Complaint submitted successfully");
      setForm({
        full_name: "",
        position: "",
        province: "",
        district: "",
        complaint_type: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <QuestionMarkCircleIcon className="w-8 h-8" />
            Help & Support
          </h1>
          <p className="text-gray-500 mt-2 max-w-3xl">
            Find answers to common questions or submit a complaint to our
            support team. We’re here to help you resolve issues quickly.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
              <PhoneIcon className="w-5 h-5" /> Contact Support
            </h3>
            <p className="text-gray-600">
              Reach out to our team for urgent issues or general inquiries.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
              <EnvelopeIcon className="w-5 h-5" /> Email Assistance
            </h3>
            <p className="text-gray-600">
              Send us detailed issues and we’ll respond as soon as possible.
            </p>
          </div>
        </div>

        {/* Complaint Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <ExclamationTriangleIcon className="w-6 h-6" />
            Submit a Complaint
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Complaint Type
                </label>
                <select
                  name="complaint_type"
                  value={form.complaint_type}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
                >
                  <option value="">Select a type</option>
                  <option>Technical Issue</option>
                  <option>Data Error</option>
                  <option>Account Issue</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">
                Complaint Description
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="8"
                className="flex-1 rounded-md border px-4 py-2 resize-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-5 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
