import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ApiConst, AppConst } from "../constants";
import { AuthContext } from "../context/AuthContext";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const { login, setToken } = useContext(AuthContext);
  const { tempToken } = useParams({ strict: false });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const callVerifyOtpApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.OTP_VERIFICATION}`;
    const response = await axios.post(URL, { otp, tempToken });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: callVerifyOtpApi,
    onSuccess: (data) => {
      setOtp("");
      login(data.token, data?.user);

      setTimeout(() => {
        if (data?.user?.name !== "") {
          navigate({ to: "/", replace: true });
        } else {
          navigate({ to: "/register", replace: true });
        }
      }, 400);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error, variables, context) => {
      // An error happened!
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-primary text-2xl font-bold mb-4">
          OTP Verification
        </h2>
        <h4 className="text-text-secondary mb-4">Enter the 4 digit OTP</h4>
        <input
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            setOtp(value);
          }}
          type="text"
          maxLength={4}
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 border border-text-secondary rounded"
        />
        <button
          disabled={otp.length !== 4}
          className="w-full bg-primary text-white p-2 rounded disabled:opacity-50"
          onClick={() => {
            mutation.mutate();
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
