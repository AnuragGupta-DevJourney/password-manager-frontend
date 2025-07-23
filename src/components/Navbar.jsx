import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GiShieldReflect } from "react-icons/gi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { CgLogOut } from "react-icons/cg";
import toast from "react-hot-toast";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleBtn = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleLogoutApplication = () => {
    localStorage.removeItem("token");
    toast.success("Logout Succcessfully", {
      duration: 1500,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1600);
  };

  return (
    <header className="bg-[#110D0C] text-blue-600 content-full py-4">
      <nav className="flex justify-between content-wrapper items-center max-sm:flex-wrap max-sm:justify-center max-sm:gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white max-sm:text-2xl flex items-center gap-1.5">
            <span className="text-blue-600 text-4xl">
              {" "}
              <MdKeyboardDoubleArrowLeft />{" "}
            </span>
            Password<span className="text-blue-600 ">Vault </span>{" "}
            <span className="text-4xl">
              <GiShieldReflect />{" "}
            </span>
          </h1>
        </div>
        <div className="flex gap-2.5 relative items-center gap-4">
          <Link
            to={"/add-credential-page"}
            className="flex gap-1.5 items-center justify-center bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer max-sm:text-sm max-sm:gap-1 "
          >
            <FaPlus className="max-sm:text-sm" fontSize={16} />
            Add Credential
          </Link>

          <div>
            <button onClick={handleToggleBtn} className="text-white text-2xl bg-blue-500 font-medium rounded-full p-2 cursor-pointer" > <FaUserCircle/> </button>
          </div>

          {isOpen ? (
            <div className={`absolute transition-all rounded space-y-2.5 p-2  flex justify-center flex-col -right-10 top-14 bg-slate-700  ${isOpen ? "top-0" : ""}`} >
              <button
                onClick={handleLogoutApplication}
                className="bg-red-500 rounded  cursor-pointer text-sm text-white py-1 font-medium px-2 flex gap-1 items-center"
              >
                <i>
                  <CgLogOut fontSize={20} />{" "}
                </i>
                Logout
              </button>
              <Link
                to={"/change-password"}
                className="bg-indigo-700 rounded  cursor-pointer text-sm text-white py-1 font-medium px-2 flex gap-1 items-center"
              >
                <i>
                  <ImProfile fontSize={18} />{" "}
                </i>
                Update Profile
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
