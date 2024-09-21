import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"; // Adjust the path as needed
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, backendUrl, setToken, navigate } = useContext(ShopContext);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/user/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
          toast.error("Failed to fetch user data");
        }
      };

      fetchUserData();
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [token, navigate, backendUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/user`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      toast.success("User info updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data", error);
      toast.error("Failed to update user info");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">User Profile</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <button
            onClick={handleUpdate}
            className="w-full rounded bg-blue-600 p-2 text-white transition duration-300 hover:bg-blue-500"
          >
            Update User Info
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4">
            <strong>Password:</strong> ********
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full rounded bg-green-600 p-2 text-white transition duration-300 hover:bg-green-500"
          >
            Edit Info
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
