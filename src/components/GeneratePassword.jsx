import React, { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { IoCheckmarkDone } from "react-icons/io5";


function GeneratePassword({setPasswordGeneratorComponent}) {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [copyToggler , setCopyToggler] = useState(false)


  const mixedCharNumber = `O17|d&eq@uKmnCjyzM3T2o:\`Ri5D\\NQ,HIv\"~\`x}8hEpA6{Ws;.BXJYtfF#g!PU9kZ^b<G$wVaL4rS)0[+=l]-c/*?('%>`;
  const generatePassword = () => {
    // console.log(Number(passwordLength));
    let str = "";
    for (let i = 0; i < Number(passwordLength); i++) {
      const randomNumber = Math.floor(Math.random() * Number(passwordLength));
      str = str + mixedCharNumber[randomNumber];
    }
    setPassword(str);
  };

  const handleCloseBtn = () => {
    setPasswordGeneratorComponent(false)
  }

  const handlePasswordlength = (e) => {
    const value = e?.target?.value;
    // console.log("password Length", value);
    setPasswordLength(value);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password)
    toast.success("Password Copied sucessfully")
    setCopyToggler(true)
    setTimeout(() => {
        setCopyToggler(false)
    } , 2000)
  }

  return (
    <div className="bg-slate-900 z-30 text-white flex flex-col justify-start pt-40 items-center   min-h-full w-full p-5 relative gap-8">    
    <div className="absolute top-4 right-4 cursor-pointer" onClick={handleCloseBtn} >
        <i> <AiOutlineCloseSquare fontSize={32}/> </i>
    </div>
      <div className="flex flex-col gap-4">
        <label className="text" htmlFor="range">Plz Select password length : <span>{passwordLength}</span> </label>
        <input
          type="range"
          min={8}
          max={50}
          value={passwordLength}
          onChange={handlePasswordlength}
        />
      </div>
      <div className="  text-sm overflow-x-scroll max-w-full">
        {" "}
        <p>{password}</p>{" "}
      </div>
      <div>
        <button onClick={handleCopyPassword} className={` ${copyToggler  ? "bg-blue-500" : "bg-green-700"  } cursor-pointer flex items-center gap-2 text-slate-200`}>
            {
                copyToggler ?<i className="flex items-center py-1 px-3 rounded gap-1 font-semibold" >< IoCheckmarkDone /> copied </i> :<i className="flex items-center py-1 px-3 rounded gap-1 font-semibold" ><FaCopy /> copy </i>
            }
        </button>
      </div>
      <Toaster/>
    </div>
  );
}

export default GeneratePassword;
