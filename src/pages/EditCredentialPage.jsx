import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdSaveAs } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

function EditCredentialPage() {
  const { id } = useParams();

  const initilizeCredentialDetails = {
    siteNameOrUrl: "",
    userNameOrEmail: "",
    password: "",
  };
  const [creadentialDetails, setCreadentialDetails] = useState(
    initilizeCredentialDetails
  );
  const [passwordTogger, setpasswordToggler] = useState(false);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const handleCredentialFormInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setCreadentialDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleCredentialFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        siteName: creadentialDetails.siteNameOrUrl,
        email: creadentialDetails.userNameOrEmail,
        password: creadentialDetails.password,
      };
      // console.log(payload)
      const response = await axios.put(
        `https://password-manager-backend-mut7.onrender.com/auth/single-credential-update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response" , response)
      if (response.status === 200) {
        toast.success("Credential Updated Successfully!", {
          duration: 1200,
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(
        "internal Server Error while adding credential information",
        error
      );
    }
  };

  const fetchSingleCredentialData = async (id) => {
    try {
      const response = await axios.get(
        `https://password-manager-backend-mut7.onrender.com/auth/single-credential-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)

      const { _id, email, siteName, password } = response.data.response;
      setCreadentialDetails({
        siteNameOrUrl: siteName,
        userNameOrEmail: email,
        password: password,
      });
      setLoader(false)
    } catch (error) {
      toast.error("Failed to fetch the data")
    }
  };

  useEffect(() => {
    fetchSingleCredentialData(id);
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-black flex items-center  ">
      <div className="max-w-3xl flex-1 px-6 py-12 mx-auto bg-[#181212]">
        <Link
          to={"/"}
          className=" font-medium text-slate-400 flex justify-start gap-1.5 items-center"
        >
          <FaArrowLeftLong /> Back to Home
        </Link>

        <form
          className="text-slate-200 gap-4 flex flex-col w-9/12 mx-auto max-sm:w-11/12"
          action="#"
          method="POST"
          onSubmit={(e) => handleCredentialFormSubmit(e)}
        >
          <h1 className="text-3xl font-semibold my-6 max-sm:text-2xl text-white max-sm:text-center">
            Add New Credential !
          </h1>

          <div className="flex flex-col">
            <label
              className="text-xl text-slate-300 font-medium"
              htmlFor="siteNameOrUrl"
            >
              Site Name Or URL :
            </label>
            <input
              value={creadentialDetails.siteNameOrUrl}
              onChange={handleCredentialFormInput}
              type="text"
              name="siteNameOrUrl"
              placeholder="enter your name or link of sites"
              required
              className="border border-slate-500 px-2 py-1 rounded-md focus:outline-none placeholder:font-normal"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-xl text-slate-300 font-medium"
              htmlFor="userNameOrEmail"
            >
              User Name or Email :
            </label>
            <input
              value={creadentialDetails.userNameOrEmail}
              type="text"
              name="userNameOrEmail"
              placeholder="enter your email or username"
              required
              onChange={handleCredentialFormInput}
              className="border border-slate-500 px-2 py-1 rounded-md focus:outline-none placeholder:font-normal"
            />
          </div>

          {/* Password */}
          <div className="flex gap-2 flex-col relative">
            <div className="flex flex-col relative">
              <label className="text-xl font-medium" htmlFor="password">
                Password:
              </label>
              <input
                value={creadentialDetails.password}
                name="password"
                type={passwordTogger ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-slate-500 px-2 py-1 rounded-md"
                onChange={handleCredentialFormInput}
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
          </div>

          <button
            type="submit"
            className=" w-fit ml-auto flex gap-1.5 items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            Upadte Credential
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default EditCredentialPage;
