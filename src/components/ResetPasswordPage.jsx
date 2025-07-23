import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


function ResetPasswordPage() {
  const upperOrLowerRegex = /(?=.*[a-z])|(?=.*[A-Z])/;

  const schema = yup.object().shape({
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

  const { token } = useParams();
  // console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data, e) => {
    const payloadData = {
      newPassword: data.password,
    };
    // console.log(payloadData);
    try {
      const response = await axios.put(
        `https://password-manager-backend-mut7.onrender.com/user/reset-password-page/${token}`,
        payloadData
      );
      // console.log("response", response);
      // console.log("data", data);

      if (response.status === 200) {
        toast.success(
          `Password updated successfully.`
         , {duration : 1100 });
        // console.log(e.target.reset());

        setTimeout(() => {
          navigate("/login");
        }, 1400);
      }
    } catch (error) {
      console.log("Internal Server Error while signup the user!", error);
      console.log("ERRO MESG", error.response, error.status);
      if (error.status === 400) {
        toast.error("Invalid or expired token");
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
            Reset Password Page !
          </h1>

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

          <button
            type="submit"
            className="w-fit ml-auto bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            Reset Password
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
