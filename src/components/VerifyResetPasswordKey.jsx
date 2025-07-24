import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function VerifyResetPasswordKey() {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    key: yup
      .string()
      .required("email key is required")
      .min(6, " 6 characters required").max(6)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // HANDLE THE LOGN FORM TO THE SERVER BASED ON EMAIL OR USERNAME
  const navigate = useNavigate();

  //   HANDLE THE LOGIN FORM INPUTS
  const onSubmit = async (data, e) => {
    console.log(data);
    try {
      // THIS WILL EXECUTE WHEN USER ENTER EMAIL NUMBER WHILE LOGIN
        setTimeout(() => {
            navigate(`/reset-password-page/${data.key}`)
        }, 1500);
    } catch (error) {
      console.log("Internal Serever Error while send email", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center">
      <div className="max-w-3xl flex-1 px-6 py-6 mx-auto bg-[#181212] rounded-2xl">
        <form
          className="text-slate-200 gap-4 flex flex-col w-9/12 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-semibold my-8 text-center">
            Reset Password Key Page !
          </h1>

          <p className="text-rose-600 text-center" >Enter the Email Key Carefully</p>

          {/* Username */}
          <div className="flex gap-2 flex-col">
            <label className="text-xl font-medium">Email Key</label>
            <input
              required
              {...register("key")}
              max={6}
              placeholder="Enter your Email Key"
              className="border border-slate-500 px-2 py-1 rounded-md"
            />
            <p className="text-red-500 text-sm">
              {errors.key?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-fit ml-auto hover:bg-blue-700 bg-blue-600 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            {!loading ? " Send Here!" : "sending..."}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default VerifyResetPasswordKey;
