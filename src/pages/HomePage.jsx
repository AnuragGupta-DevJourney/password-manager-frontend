import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import GeneratePassword from "../components/GeneratePassword";
import Loader from "../components/Loader";


function HomePage() {
  const [credentialsData, setCredentialData] = useState([]);
  const [passwordGeneratorComponent, setPasswordGeneratorComponent] =
    useState(false);
  const [loader ,setLoader] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCredentialData = async () => {
    try {
      const response = await axios.get(
        `https://password-manager-backend-mut7.onrender.com/auth/all-credential-data`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const addIsPasswordVisible = response?.data?.map((credential) => ({
        ...credential,
        isPasswordVisible: false,
      }));
      setCredentialData(addIsPasswordVisible);
      setLoader(false)
    } catch (error) {
      console.log("Error while fetching data", error);
      toast.error("Internal Error While Fetching Data");
    }
  };

  useEffect(() => {
    fetchCredentialData();
    // console.log(credentialsData);
  }, [setCredentialData]);

  // HANDLE PASSWORD TOGGLER IF VISIBLE THEN HIDE VICE VERSA
  const handlePasswordToggler = (id) => {
    setCredentialData((prev) => {
      return prev.map((stat) => {
        if (stat._id === id) {
          return { ...stat, isPasswordVisible: !stat.isPasswordVisible };
        }
        return stat;
      });
    });
  };

  // HANDLE DELETE OF THE CREDENTIAL
  const handleDeleteCredential = async (id) => {
    try {
      const response = await axios.delete(
        `https://password-manager-backend-mut7.onrender.com/auth/credential-delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        toast.success("Credential Deleted Sucessfully", {
          position: "top-right",
          duration: 1000,
        });

        setTimeout(() => {
          fetchCredentialData();
        }, 1200);
      }
    } catch (error) {
      console.log("Internal Sevre Error", error);
      toast.error("Internal Error while deleting the credential");
    }
  };

  // HANDLE THE SEARCH QUERY

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchQuerySubmit = (e) => {
    e.preventDefault();
    // console.log(searchQuery);
  };


  return (
    <nav className="relative">
      <Navbar />
      {
        loader && <Loader/>
      }
      {credentialsData <= 0 && (
        <h1 className="h-screen font-black flex items-center justify-center text-4xl max-sm:text-3xl max-sm:text-center text-white">
          No Credential Information found!
        </h1>
      )}

      {/* SEARCH SECTION */}
      {credentialsData.length >= 4 && (
        <div>
          <form
            className="max-w-5xl mx-auto my-6 px-4"
            action=""
            onSubmit={handleSearchQuerySubmit}
          >
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchQuery}
              autoFocus
              placeholder="Enter your site name or email or username"
              className="bg-slate-800 text-white w-full px-3 py-0.5 text-xl"
            />
          </form>
        </div>
      )}

      {/* PASSWORD CARDS LAYOUT CONTAINER */}
      <div className=" grid grid-cols-3 p-4 h-full gap-8 max-sm:grid-cols-1 ">
        {credentialsData
          .filter(
            (credential) =>
              credential.siteName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              credential.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((credential) => {
            const {
              siteName,
              email,
              password,
              createdAt,
              upadtedAt,
              isPasswordVisible,
            } = credential;

            return (
              <div
                key={credential._id}
                className="bg-[#181212] h-fit rounded-md border-l-8 border-blue-500 text-white py-6 px-4 max-sm:py-2"
              >
                <div className="flex gap-3 justify-between items-start">
                  <div className="flex  flex-col gap-3 w-full">
                    {/* SITE NAME AND SITE PATH PART */}
                    <div
                      className={` text-xl font-semibold mn-4 capitalize font-poppins`}
                    >
                      {siteName?.startsWith("http") ? (
                        <div>
                          <span> Site Link : </span>
                          <Link
                            to={siteName}
                            target="_blank"
                            className="text-sm mb-6 text-blue-400 underline line-clamp-1"
                          >
                            {" "}
                            {siteName}{" "}
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <span>Site Name : </span>
                          <span className="text-xl text-slate-300">
                            {siteName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* EMAIL AND USERNAME PART */}
                    <div className={`text-white `}>
                      {email?.includes("@") ? (
                        <div>
                          <span className="font-semibold text-xl">Email: </span>
                          <span className="text-gray-200"> {email} </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-semibold text-xl">
                            username:{" "}
                          </span>
                          <span className="text-gray-200"> {email} </span>
                        </div>
                      )}
                    </div>

                    <div className="relative w-fit">
                      <label
                        htmlFor="password"
                        className="text-xl font-medium text-white"
                      >
                        Password :{" "}
                      </label>
                      <input
                        className="border-gray-400 border px-2 py-0.5 max-sm:w-full"
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        defaultValue={password}
                      />
                      <button
                        onClick={() => handlePasswordToggler(credential._id)}
                        className="absolute right-2 bottom-2 cursor-pointer"
                      >
                        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-gray-300">
                      <span className="text-white font-medium">
                        CreateadAt :
                      </span>{" "}
                      {moment(createdAt).format("MMMM, Do YYYY, h:mm a")}{" "}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-white font-medium">
                        {" "}
                        upadtedAt :
                      </span>
                      {moment(upadtedAt).format("MMMM , Do YYYY, h:mm a")}{" "}
                    </p>
                  </div>
                  <div className="flex gap-1.5 items-center justify-center">
                    <Link
                      to={`/edit-credential/${credential._id}`}
                      className={`cursor-pointer text-2xl text-green-400 `}
                    >
                      <BiSolidEdit fontWeight={900} />
                    </Link>

                    <button
                      className=" cursor-pointer text-2xl text-red-500"
                      onClick={() => handleDeleteCredential(credential._id)}
                    >
                      <RiDeleteBinFill fontWeight={900} />
                    </button>
                  </div>
                </div>
                <Toaster />
              </div>
            );
          })}
      </div>

      {/* GENERATE PASSWORD BTN */}
      <div className="fixed bottom-4/12 right-0 z-30">
        <button
          onClick={() => {
            setPasswordGeneratorComponent(!passwordGeneratorComponent);
          }}
          className="text-white bg-rose-700 px-3 py-0.5 rounded cursor-pointer"
        >
          Generate Password
        </button>
      </div>
      {/* HERE HANDLING THE GERNATE PASSWORD COMPONENT BASED ON GENERATE PASSWORD BTN */}
      <div
        className={`absolute max-sm:w-10/12 w-8/12 h-screen top-0 transition-all duration-500 ${
          passwordGeneratorComponent
            ? "left-0"
            : "-translate-x-[80rem] transition-all"
        } `}
      >
        {passwordGeneratorComponent ? (
          <GeneratePassword
            setPasswordGeneratorComponent={setPasswordGeneratorComponent}
          />
        ) : (
          ""
        )}
      </div>
      <Toaster />
    </nav>
  );
}

export default HomePage;
