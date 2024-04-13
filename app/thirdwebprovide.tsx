"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

export default function ThirdWebProvide({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider activeChain="base">
      {children}
      <Toaster />
    </ThirdwebProvider>
  );
}
