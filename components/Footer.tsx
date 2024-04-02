/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
const currentYear = new Date().getFullYear();
function Footer() {
  return (
    <footer className=" z-10 border-t border-[#08518d]  bg-[#3274c0] flex items-center text-white justify-between p-5 fixed bottom-0 left-0 w-full">
      <Image
        src="/logo.png"
        alt="logo"
        className="w-10 h-10 rounded-full "
        width={100}
        height={100}
      />
      <p className="pl-5 text-xs text-emerald-200">BasedLuck </p>
      <p className="pl-5 text-xs text-emerald-200">{currentYear} </p>
    </footer>
  );
}

export default Footer;
