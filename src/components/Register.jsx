import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ApiConst, AppConst } from "../constants";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const callRegisterApi = async () => {
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
    mutationFn: callRegisterApi,
    onSuccess: (data) => {
      setName("");
      navigate({
        to: "/",
        replace: true,
      });
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error, variables, context) => {
      // An error happened!
      alert(error.message);
    },
  });

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-primary text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 mb-4 border border-text-secondary rounded"
        />
        <button
          className="w-full bg-primary text-white p-2 rounded"
          onClick={() => mutation.mutate()}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
