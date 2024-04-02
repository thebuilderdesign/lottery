/* eslint-disable @next/next/no-img-element */

import { useMetamask } from "@thirdweb-dev/react";
import Image from "next/image";

function Login() {
  const connectMetaMask = useMetamask();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    connectMetaMask();
  };
  return (
    <div className="flex flex-col items-center text-center justify-items-center ">
      <div className="flex flex-col items-center text-center justify-items-center ">
        {" "}
        <Image
          src="/logo.png"
          alt="logo"
          className="w-40 h-40 mt-5 mb-10 rounded-full"
          width={50}
          height={50}
        />
        <h1 className="text-4xl font-bold text-white">BASEDLUCK</h1>
        <h2 className="mt-3 mb-3 text-white">Login to get started</h2>
        <button
          onClick={handleClick}
          className="flex items-center justify-center p-3 mt-10 font-bold bg-white rounded-lg shadow-lg"
        >
          <Image
            src="https://img.icons8.com/color/48/metamask-logo.png"
            alt="metamask-logo"
            className="mr-3"
            width={48}
            height={48}
          />
          Login with MetaMask
        </button>
      </div>
      <p className="mt-4 text-white">
        <span className="font-bold">NOTE: </span>Install the Metamask extension
        on your browser for you to login.
      </p>
    </div>
  );
}

export default Login;
