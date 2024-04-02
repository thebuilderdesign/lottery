import {
  ArrowPathIcon,
  ArrowUturnDownIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  SmartContract,
  Web3Button,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import { toast } from "react-hot-toast";

function AdminControls() {
  const { contract } = useContract<string>(
    process.env.NEXT_PUBLIC_SMART_CONTRACT
  );

  const { data: totalCommission } = useContractRead(
    contract,
    "operatorTotalCommission"
  );

  const handleAction = async (contract: SmartContract<ethers.BaseContract>) => {
    const notify = toast.loading("Withdrawing your commission...");
    try {
      await contract.call("WithdrawCommission", [], {});
      toast.success("Commission successfully withdrawn!", { id: notify });
    } catch (error) {
      toast.error("Whoops something went wrong!!!", { id: notify });
      console.error("contract call faliure", error);
    }
  };
  const handleDraw = async (contract: SmartContract<ethers.BaseContract>) => {
    const notify = toast.loading("Draw raffle is in progress...");
    try {
      await contract.call("DrawWinnerTicket", [], {});
      toast.success("Draw has been completed", { id: notify });
    } catch (error) {
      toast.error("Whoops something went wrong!!!", { id: notify });
      console.error("contract call faliure", error);
    }
  };

  const handleRestart = async (
    contract: SmartContract<ethers.BaseContract>
  ) => {
    const notify = toast.loading("Restarting the draw...");
    try {
      await contract.call("restartDraw", [], {});
      toast.success("Draw has been restarted!", { id: notify });
    } catch (error) {
      toast.error("Whoops something went wrong!!!", { id: notify });
      console.error("contract call faliure", error);
    }
  };

  const handleReFundAll = async (
    contract: SmartContract<ethers.BaseContract>
  ) => {
    const notify = toast.loading("Refunding the wallet...");
    try {
      await contract.call("RefundAll", [], {});
      toast.success("Wallet has been refunded!", { id: notify });
    } catch (error) {
      toast.error("Whoops something went wrong!!!", { id: notify });
      console.error("contract call faliure", error);
    }
  };

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commission to be withdrawn:{" "}
        {totalCommission &&
          ethers.utils.formatEther(totalCommission.toString())}{" "}
        LUCK
      </p>
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
          action={handleDraw}
          className="admin-btn"
        >
          {" "}
          <StarIcon className="h-6 mx-auto mb-2" /> Draw Winner
        </Web3Button>

        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
          action={handleAction}
          className="admin-btn"
        >
          {" "}
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commision
        </Web3Button>

        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
          action={handleRestart}
          className="admin-btn"
        >
          {" "}
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </Web3Button>
        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
          action={handleReFundAll}
          className="admin-btn"
        >
          {" "}
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </Web3Button>
      </div>
    </div>
  );
}

export default AdminControls;
