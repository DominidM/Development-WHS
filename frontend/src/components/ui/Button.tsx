import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        bg-gradient-to-r from-sky-400 to-blue-500 
        text-white font-semibold py-2 px-5 rounded-full 
        shadow-lg transition-all duration-150 ease-in-out
        hover:from-sky-500 hover:to-blue-600 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-sky-300
        ${props.className ?? ""}
      `}
    >
      {props.children}
    </button>
  );
}