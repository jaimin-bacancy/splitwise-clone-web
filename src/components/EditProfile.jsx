import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ApiConst, AppConst } from "../constants";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const [name, setName] = useState("");
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => callGetUserApi(),
  });

  const callGetUserApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.USER_DETAILS}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const callUpdateProfileApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.UPDATE_PROFILE}`;
    const response = await axios.put(
      URL,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: callUpdateProfileApi,
    onSuccess: (data) => {
      alert("Profile updated successfully");
      navigate({ to: "/", replace: true });
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error, variables, context) => {
      // An error happened!
      alert(error.message);
    },
  });

  const callLogoutApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.LOGOUT}`;
    const response = await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const logoutMutation = useMutation({
    mutationFn: callLogoutApi,
    onSuccess: (data) => {
      alert("Logged out successfully");
      logout();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error, variables, context) => {
      // An error happened!
      alert(error.message);
    },
  });

  useEffect(() => {
    if (error?.status == "401") {
      alert(error.message);
      logout();
    }

    if (data?.user?.name) {
      setName(data.user.name);
    }
  }, [data]);

  const handleUpdate = () => {
    mutation.mutate();
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="bg-background min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-primary text-white p-2 rounded mb-4"
        >
          Update
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-secondary text-white p-2 rounded"
        >
          <FontAwesomeIcon icon={faSignOut} className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
