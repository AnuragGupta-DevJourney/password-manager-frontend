import React from "react";

function Loader() {
  return (
    <div className="flex h-screen bg-slate-900 items-center justify-center gap-4 min-h-screen">
        <h1 className="text-4xl font-black max-sm:text-3xl text-white" >Loading...</h1>
    </div>
  );
}

export default Loader;
