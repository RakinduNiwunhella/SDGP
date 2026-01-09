import { useState } from "react";
import InputField from "./InputField";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    district: "",
    address: "",
    photo: null,
    photoPreview: null,
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfile({
      ...profile,
      photo: file,
      photoPreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Ready for Supabase upload later
    console.log("Profile Data:", profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Profile Image */}
      <div className="flex items-center gap-6">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {profile.photoPreview ? (
            <img
              src={profile.photoPreview}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm text-center">
              No Photo
            </span>
          )}
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Upload Photo
          </span>
        </label>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="example@email.com"
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="07XXXXXXXX"
        />
        <InputField
          label="NIC Number"
          name="nic"
          value={profile.nic}
          onChange={handleChange}
          placeholder="200012345678"
        />
        <InputField
          label="District"
          name="district"
          value={profile.district}
          onChange={handleChange}
          placeholder="Enter your district"
        />

        <div className="md:col-span-2">
          <InputField
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;