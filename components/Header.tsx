/* eslint-disable @next/next/no-img-element */

import React from "react";
import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import Image from "next/image";

function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <header className="grid items-center justify-between grid-cols-2 p-4 md:grid-cols-5">
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 rounded-full "
          width={100}
          height={100}
        />

        <div>
          <h1 className="text-lg font-bold text-white">BasedLuck</h1>
          <p className="text-xs text-white truncate">
            User: {address?.substring(0, 5)}...
            {address?.substring(address.length, address.length - 5)}
          </p>
        </div>
      </div>
      <div className="items-center justify-center hidden rounded md:flex md:col-span-3">
        <div className="bg-[#3b82f680] p-4 space-x-2">
          <NavButton isActive title="BUY TICKETS" />
          <NavButton onClick={disconnect} title="LOGOUT" />
        </div>
      </div>
      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon className="w-8 h-8 mx-auto text-white cursor-pointer" />
        <span className="md:hidden">
          <NavButton onClick={disconnect} title="Logout" />
        </span>
      </div>
    </header>
  );
}

export default Header;
