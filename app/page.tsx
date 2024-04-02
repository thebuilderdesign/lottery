/* eslint-disable @next/next/no-img-element */
"use client";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useAddress, useContract } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_SMART_CONTRACT
  );

  return isLoading ? <Loading />  : <HomePage />;
}
