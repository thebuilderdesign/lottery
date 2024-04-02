/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { PropagateLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center my-auto text-center ">
      <div className="flex items-center mb-5 space-x-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <h1 className="text-lg text-white text-bold">
          Loading the BasedLuck
        </h1>
      </div>
      <PropagateLoader color="white" size={20} />
    </div>
  );
}

export default Loading;
