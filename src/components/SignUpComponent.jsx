import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye } from "react-icons/fa6";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function SignUpComponent() {
  const upperOrLowerRegex = /(?=.*[a-z])|(?=.*[A-Z])/;
  const emailWithDotRegex = /^[^@]+@[^@]+\.[^@]+$/;

  const schema = yup.object().shape({
    fullname: yup.string().required("Full Name is required").min(4),
    username: yup
      .string()
      .required("User Name is required")
      .min(4)
      .matches(/[0-9]/, "Must contain number"),
    email: yup
      .string()
      .required("Email is required")
      .min(4)
      .matches(emailWithDotRegex, "Email must contain '@' and '.'"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Minimum 8 characters")
      .matches(upperOrLowerRegex, "Must contain uppercase or lowercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[@$!%*?&#]/, "Must contain a special character"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()
  const onSubmit = async (data, e) => {

    const payloadData = {
      fullname : data.fullname,
      email : data.email,
      password : data.password,
      username : data.username
    }
    try {
      //   console.log("Form Submitted Successfully", data);
      const response = await axios.post(
        `https://password-manager-backend-mut7.onrender.com/user/signup`,
        payloadData
      );
      // console.log("response", response);
      // console.log("data" , data)

      if (response.status === 200) {
        toast.success(
          `${response.data.message} ${response.data.response.fullname}`
        );
        // console.log(e.target.reset());

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log("Internal Server Error while signup the user!", error);
      console.log("ERRO MESG", error.response, error.status);
      if (error.status === 409) {
        toast.error(error.response.data.message, {
          duration: 3000,
          position: "top-right",
        });
      }
    }
  };

  const [passwordTogger, setpasswordToggler] = useState(false);
  const [confirmPasswordToggler, setConfirmPasswordToggler] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center">
      <div className="max-w-3xl flex-1 px-6 py-6 mx-auto bg-[#181212] rounded-2xl">
        <form
          className="text-slate-200 gap-4 flex flex-col w-9/12 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-semibold my-8 text-center">
            SignUp Page !
          </h1>

          {/* Full Name */}
          <div className="flex gap-2 flex-col">
            <label className="text-xl font-medium">Full Name:</label>
            <input
              {...register("fullname")}
              placeholder="Enter your full name"
              className="border border-slate-500 px-2 py-1 rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.fullname?.message}</p>
          </div>

          {/* Username */}
          <div className="flex gap-2 flex-col">
            <label className="text-xl font-medium">User Name:</label>
            <input
              {...register("username")}
              placeholder="Username123"
              className="border border-slate-500 px-2 py-1 rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div className="flex gap-2 flex-col">
            <label className="text-xl font-medium">Email:</label>
            <input
              {...register("email")}
              type="email"
              placeholder="email@example.com"
              className="border border-slate-500 px-2 py-1 rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
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

          {/* Confirm Password */}
          <div className="flex gap-2 flex-col">
            <div className="flex flex-col relative">
              <label className="text-xl font-medium">Confirm Password:</label>
              <input
                {...register("confirmPassword")}
                type={confirmPasswordToggler ? "text" : "password"}
                placeholder="Re-enter your password"
                className="border border-slate-500 px-2 py-1 rounded-md"
              />
              <i
                className="absolute bottom-2 right-5 cursor-pointer"
                onClick={() =>
                  setConfirmPasswordToggler(!confirmPasswordToggler)
                }
              >
                {confirmPasswordToggler ? (
                  <FaEye fontSize={18} />
                ) : (
                  <FaEyeSlash fontSize={20} />
                )}
              </i>
            </div>

            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <p>
            Already have an account?
            <Link to={"/login"} className="text-blue-500 font-medium underline">
              {" "}
              Login Here!{" "}
            </Link>
          </p>
          <button
            type="submit"
            className="w-fit ml-auto bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default SignUpComponent;
