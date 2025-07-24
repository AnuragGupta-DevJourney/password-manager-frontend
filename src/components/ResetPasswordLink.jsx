import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";


function ResetPasswordLink() {

  const [loading ,setLoading] = useState(false)

  const schema = yup.object().shape({
    usernameOrEmail: yup
      .string()
      .required("email or user name is required")
      .min(4, "Minimum 4 characters"),
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
  const handleLoginFormToServer = async (payload) => {
    setLoading(true)
    const response = await axios.post(
      `https://password-manager-backend-mut7.onrender.com/user/reset-password-link`,
      payload
    );

    if (response.status === 200) {
      toast.success("Password reset link has been sent to your email" , {duration : 1400})
      setLoading(false)
      setTimeout(() => {
        navigate("/reset-password-verify")
      } , 1500)
    }
    else{
      toast.error("Unable to send password link right now")
    }
  };

  //   HANDLE THE LOGIN FORM INPUTS
  const onSubmit = async (data, e) => {
    try {
      // THIS WILL EXECUTE WHEN USER ENTER EMAIL NUMBER WHILE LOGIN
      if (data.usernameOrEmail.includes("@")) {
        const payload = {
          email: data.usernameOrEmail,
        };

        await handleLoginFormToServer(payload);
      }
      // THIS WILL EXECUTE WHEN USER ENTER EMAIL NUMBER WHILE LOGIN
      else {
        const payload = {
          username: data.usernameOrEmail,
        };
        await handleLoginFormToServer(payload);
      }
    } catch (error) {
      console.log("Internal Serever Error while send email", error);
      toast.error(error?.response?.data?.message)
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
            Reset Password Page !
          </h1>

          {/* Username */}
          <div className="flex gap-2 flex-col">
            <label className="text-xl font-medium">userName or Email</label>
            <input
              required
              {...register("usernameOrEmail")}
              placeholder="Enter your userName or Email"
              className="border border-slate-500 px-2 py-1 rounded-md"
            />
            <p className="text-red-500 text-sm">
              {errors.usernameOrEmail?.message}
            </p>
          </div>

                    <p>
            {" "}
            Not have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 font-medium underline"
            >
              Signup here!
            </Link>{" "}
          </p>

          <button
            type="submit"
            className="w-fit ml-auto hover:bg-blue-700 bg-blue-600 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
           {
            !loading ? " Send Here!" : "sending..."
           }
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default ResetPasswordLink;
