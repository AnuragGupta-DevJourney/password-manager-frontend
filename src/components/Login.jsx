import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";

function Login() {
  const upperOrLowerRegex = /(?=.*[a-z])|(?=.*[A-Z])/;
  //   const emailWithDotRegex = /^[^@]+@[^@]+\.[^@]+$/;

  const schema = yup.object().shape({
    usernameOrEmail: yup
      .string()
      .required("email or user name is required")
      .min(4, "Minimum 4 characters"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Minimum 8 characters")
      .matches(upperOrLowerRegex, "Must contain uppercase or lowercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[@$!%*?&#]/, "Must contain a special character"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // HANDLE THE LOGN FORM TO THE SERVER BASED ON EMAIL OR USERNAME
  const navigate = useNavigate()
  const handleLoginFormToServer = async (payload) => {
    const response = await axios.post(
      `https://password-manager-backend-mut7.onrender.com/user/login`,
      payload
    );

    if (response.status === 200) {
      toast.success("Login Successfully" , {duration : 1400});
      // console.log("response", response.data);
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/home")
      } , 1500)
    }
    if (response.status === 401) {
      toast.error("Iba", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  //   HANDLE THE LOGIN FORM INPUTS
  const onSubmit = async (data, e) => {
    try {
      // THIS WILL EXECUTE WHEN USER ENTER EMAIL NUMBER WHILE LOGIN
      if (data.usernameOrEmail.includes("@")) {
        const payload = {
          email: data.usernameOrEmail,
          password: data.password,
        };

        await handleLoginFormToServer(payload);
      }
      // THIS WILL EXECUTE WHEN USER ENTER EMAIL NUMBER WHILE LOGIN
      else {
        const payload = {
          username: data.usernameOrEmail,
          password: data.password,
        };
        await handleLoginFormToServer(payload);
      }
    } catch (error) {
      console.log("Internal Serever Error while Login", error);
      if (error.status === 404) {
        toast.error(error.response.data.message, {
          duration: 3000,
          position: "top-right",
        });
      }
      if (error.status === 401) {
        toast.error(error.response.data.message, {
          duration: 3000,
          position: "top-right",
        });
      }
    }
  };

  const [passwordTogger, setpasswordToggler] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center">
      <div className="max-w-3xl flex-1 px-6 py-6 mx-auto bg-[#181212] rounded-2xl">
        <form
          className="text-slate-200 gap-4 flex flex-col w-9/12 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-semibold my-8 text-center">
            Login Page !
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

          {/* Password */}
          <div className="flex gap-2 flex-col relative">
            <div className="flex flex-col relative">
              <label className="text-xl font-medium">Password:</label>
              <input
                {...register("password")}
                type={passwordTogger ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-slate-500 px-2 py-1 rounded-md"
              />
              <i
                className="absolute bottom-2 right-5 cursor-pointer"
                onClick={() => setpasswordToggler(!passwordTogger)}
              >
                {passwordTogger ? (
                  <FaEye fontSize={18} />
                ) : (
                  <FaEyeSlash fontSize={20} />
                )}
              </i>
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
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
          <p>
            Forget the password?
            <Link
              to={"/reset-password-link"}
              className="text-blue-500 font-medium underline"
            >
              reset password here!
            </Link>{" "}
          </p>
          <button
            type="submit"
            className="w-fit ml-auto hover:bg-blue-700 bg-blue-600 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            Login Here!
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
