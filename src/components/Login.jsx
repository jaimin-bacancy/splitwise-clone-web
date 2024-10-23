import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import React from "react";
import { ApiConst, AppConst } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [phoneNumber, setPhoneNumber] = React.useState("7600726979");

  const callLoginApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.LOGIN}`;
    const response = await axios.post(URL, { phone: phoneNumber });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: callLoginApi,
    onSuccess: (data) => {
      setPhoneNumber("");
      navigate({
        to: "/otp-verification/$tempToken",
        params: {
          tempToken: data.tempToken,
        },
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
        <h2 className="text-primary text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          maxLength={10}
          placeholder="Phone number"
          className="w-full p-2 mb-4 border border-text-secondary rounded"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            setPhoneNumber(value);
          }}
        />
        <button
          disabled={phoneNumber.length !== 10 || mutation.isPending}
          className="w-full bg-primary text-white p-2 rounded disabled:opacity-50"
          onClick={() => {
            mutation.mutate();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
