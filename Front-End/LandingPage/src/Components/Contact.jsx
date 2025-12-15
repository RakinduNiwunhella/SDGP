import React from "react";
import { Mail, Phone, Ticket } from "lucide-react";

function Contact() {
  return (
    <section id="contact">
    <div className="w-full bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">

        {/* LEFT SIDE FORM */}
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact <span className="font-bold text-green-600">Us</span></h2>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-200 rounded-lg px-4 py-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-200 rounded-lg px-4 py-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-200 rounded-lg px-4 py-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200"
            />

            <textarea
              placeholder="Message"
              rows="6"
              className="border border-gray-200 rounded-lg px-4 py-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200"
            ></textarea>



            <button
              type="button"
              className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-900 transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="flex flex-col justify-center mt-8 md:mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get In <span className="text-green-600"> Touch</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
Need help? Get in touch with us.          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-black text-white rounded-full p-3">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-semibold text-gray-900">+94 77 249 2154</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-black text-white rounded-full p-3">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-semibold text-gray-900">ricevisionlanka@gmail.com</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    </section>
  );
}

export default Contact;
