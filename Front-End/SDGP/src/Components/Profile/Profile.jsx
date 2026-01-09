import ProfileForm from "./ProfileForm";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800">
          User Profile
        </h1>
        <p className="text-gray-500 mb-8">
          Update your profile details and photo
        </p>

        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;