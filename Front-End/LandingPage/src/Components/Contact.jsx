import React from "react";
import { Mail, Phone, Ticket } from "lucide-react";

function Contact() {
  return (
    <div className="w-full bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* LEFT SIDE FORM */}
        <div className="bg-white p-8 rounded-xl shadow-md border">
          <h2 className="max-w-6xl mx-auto text-center mb-12 text-4xl font-bold text-gray-800 ">
           Contact <span className="text-green-600"> Us</span> 
        </h2>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring focus:ring-gray-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring focus:ring-gray-200"
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring focus:ring-gray-200"
            />

            <textarea
              placeholder="Message"
              rows="5"
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring focus:ring-gray-200"
            ></textarea>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p className="text-gray-700">
                You agree to our <span className="font-semibold">Privacy Policy.</span>
              </p>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800">
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
           Get In <span className="text-green-600"> Touch</span> 
        </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            You need more information? Check what other persons are saying about our product.
            They are very happy with their purchase.
          </p>

          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-3">
              <Phone className="w-5" />
              <span>+1(424) 535 3523</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5" />
              <span>hello@mail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Ticket className="w-5" />
              <span>Open Support Ticket</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
