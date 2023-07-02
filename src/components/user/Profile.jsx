import { useGetUserQuery } from "../../store/api/UserSlice";

const Profile = () => {
  const { data: user = {} } = useGetUserQuery();


  return (
    <div className="min-h-screen flex flex-row justify-center items-center bg-blue-600">
      <div className="bg-blue-400 h-[10%] p-5 mb-[4%] rounded-md shadow-xl w-auto ">
        <h4 className="mb-5 text-2xl font-bold">Profile</h4>
          <p className="mb-5 text-2xl">Name: {user.name} </p>
        <p className="mb-5 text-2xl">Email: {user.email} </p>
      </div>
    </div>
  );
};

export default Profile;