import React from "react";

interface Props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavButton({ title, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-[#3b82f6]"
      } hover:bg-[#5696f5] text-white py-2 px-2 rounded font bold`}
    >
      {title}
    </button>
  );
}

export default NavButton;
