import Header from "@/components/Header";
import {
  SmartContract,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import CountDown from "./CountDown";
import BuyButton from "./BuyButton";
import Footer from "./Footer";
import { toast } from "react-hot-toast";
import Marquee from "react-fast-marquee";

function HomePage() {
  const [amount, setAmount] = useState<number>(0);
  const [userTickets, setUserTickets] = useState<number>(0);
  const { contract } = useContract<string>(
    process.env.NEXT_PUBLIC_SMART_CONTRACT
  );
  const smart = process.env.NEXT_PUBLIC_SMART_CONTRACT;
  const address = useAddress();
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinning } = useContractRead(
    contract,
    "CurrentWinningReward"
  );

  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    [address]
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: commission } = useContractRead(contract, "ticketCommission");
  const { data: getTickets } = useContractRead(contract, "getTickets");
  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );

  const { data: lotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAmount(e.target.valueAsNumber);
  };

  const handleAction = async (contract: SmartContract<ethers.BaseContract>) => {
    const notify = toast.loading("Withdrawing your winnings...");
    try {
      const data = await contract.call("WithdrawWinnings", [], {});
      toast.success("Winnings successfully withdrawn!", { id: notify });
      console.log("payment successful", data);
    } catch (error) {
      toast.error("Whoops something went wrong!!!", { id: notify });
      console.error("contract call faliure", error);
    }
  };

  useEffect(() => {
    if (!getTickets) return;
    const totalTickets: string[] = getTickets;

    const noOfUserTickets: number = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );
    setUserTickets(noOfUserTickets);
  }, [address, getTickets]);

  return (
    <>
      <Header />
      <Marquee className="bg-[#3b82f680] p-5 mb-5" speed={100} gradient={false}>
        <div className="flex mx-10 space-x-3">
          <h4 className="font-bold text-white">
            Last Winner: {lastWinner?.toString()}
          </h4>
          <h4 className="font-bold text-white">
            Previous Winnings:
            {lastWinnerAmount &&
              ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}
            LUCK
          </h4>
        </div>
      </Marquee>
      {winnings > 0 && (
        <div className="max-w-md mx-auto mt-5 md:max-w-2xl lg:max-w-4xl">
          <Web3Button
            contractAddress={smart!.toString()}
            action={handleAction}
            className="win-btn"
          >
            <p>Winner!!! Winner!!! </p>
            <p>
              {" "}
              Total winnings: {ethers.utils.formatEther(
                winnings.toString()
              )}{" "}
              LUCK
            </p>
            <br />
            <p>Click here to withdraw</p>
          </Web3Button>
        </div>
      )}
      {/* new draw */}
      <div className="relative z-0 space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5 mb-[85px]">
        <div className="stats-container">
          <h1 className="text-4xl font-semibold text-center text-white capitalize">
            the next draw
          </h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm capitalize">total pool</h2>
              <p className="text-lg uppercase">
                {currentWinning &&
                  ethers.utils.formatEther(currentWinning.toString())}{" "}
                LUCK
              </p>
            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets Remaining</h2>
              <p className="text-lg">{remainingTickets?.toNumber()}</p>
            </div>
          </div>
          {/* {countdwon timer} */}
          <div className="mt-5 mb-3">
            <CountDown />
          </div>
        </div>
        <div className="space-y-2 stats-container">
          <div className="stats-container">
            <div className="flex items-center justify-between pb-2 text-white">
              <h2>Price per ticket</h2>
              <p>
                {" "}
                {ticketPrice &&
                  ethers.utils.formatEther(ticketPrice.toString())}{" "}
                LUCK
              </p>
            </div>
            <div className="flex text-white items-center space-x-2 bg-[#08518d] border-[#004337] border p-4">
              <p>TICKETS</p>
              <input
                className="flex w-full text-right bg-transparent outline-none"
                type="number"
                min={1}
                max={10}
                value={amount}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm italic font-extrabold text-white">
                <p>Total Costs of Ticket</p>
                <p>
                  {ticketPrice &&
                    Number(ethers.utils.formatEther(ticketPrice.toString())) *
                      amount}{" "}
                  LUCK
                </p>
              </div>
              <div className="flex items-center justify-between text-xs italic text-white">
                <p>Service Fees</p>
                <p>
                  {" "}
                  {commission &&
                    ethers.utils.formatEther(commission.toString())}{" "}
                  LUCK
                </p>
              </div>
              <div className="flex items-center justify-between text-xs italic text-white">
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>
            </div>
            <BuyButton amount={amount} />
          </div>
          {userTickets > 0 && (
            <div className="stats">
              <p className="mb-2 text-lg">
                You have {userTickets} Tickets in this draw.
              </p>
              <div className="flex flex-wrap max-w-sm gap-x-2 gap-y-4">
                {Array(userTickets)
                  .fill("")
                  .map((_, id) => (
                    <p
                      className="flex items-center justify-center flex-shrink-0 w-12 h-20 text-xs italic text-white rounded-lg bg-emerald-500/30"
                      key={id}
                    >
                      {id + 1}
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
