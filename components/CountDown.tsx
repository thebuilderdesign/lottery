import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import Countdown from "react-countdown";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

function CountDown() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
  const { data: expiration, isLoading: isExpired } = useContractRead(
    contract,
    "expiration"
  );
  const renderer = ({ hours, minutes, seconds, completed }: Props) => {
    if (completed) {
      return (
        <>
          <div className="text-[#a12] text-center text-sm mb-2 animate-bounce">
            <h2>Ticket Sales have now CLOSED for this draw.</h2>
          </div>
          <div className="flex space-x-5">
            <div className="flex-1">
              <div className="countdown animate-pulse">{hours}</div>
              <div className="countdown-label">hours</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{minutes}</div>
              <div className="countdown-label">minutes</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{seconds}</div>
              <div className="countdown-label">seconds</div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <h3 className="text-white text-sm mb-2 italic">Tickets remaining</h3>
          <div className="flex space-x-5">
            <div className="flex-1">
              <div className="countdown">
                {Number.isNaN(hours) ? "-" : hours}
              </div>
              <div className="countdown-label">hours</div>
            </div>
            <div className="flex-1">
              <div className="countdown">
                {Number.isNaN(minutes) ? "-" : minutes}
              </div>
              <div className="countdown-label">minutes</div>
            </div>
            <div className="flex-1">
              <div className="countdown">
                {Number.isNaN(seconds) ? "-" : seconds}
              </div>
              <div className="countdown-label">seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown date={new Date(expiration * 1000)} renderer={renderer} />
    </div>
  );
}

export default CountDown;
