import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { Navbar } from "../components/Navbar"
import { StickyFooterNavbar } from "../components/StickyFooterNavbar"
import { TotalEarnings } from "../components/TotalEarnings"

//icons
import { BsFillGrid1X2Fill } from "react-icons/bs"
import { HiRectangleStack, HiTrophy } from "react-icons/hi2"
import { BiSolidUserAccount, BiSolidStar } from "react-icons/bi"
import { MdStickyNote2 } from "react-icons/md"
import { GiTakeMyMoney } from "react-icons/gi"

export const Dashboard: React.FC = () => {
  const [active, setActive] = useState<number>(0)

  const icons = [
    {
      icon: <HiRectangleStack className="text-sm" />,
    },
    {
      icon: <BsFillGrid1X2Fill className="text-sm" />,
    },
  ]

  useEffect(() => {
    //check token to identify if user logged in
  }, [])
  return (
    <div className="small:mx-small medium:mx-medium large:mx-large">
      <Navbar />
      <div className="my-6">
        <h1 className="font-extrabold small:text-xl">Dashboard</h1>
        <TotalEarnings />
        <div className="flex justify-between items-center mt-4">
          <h1 className="small:text-lg font-semibold">Menu</h1>
          <div className="bg-zinc-200 flex gap-3 items-center p-2 rounded-full">
            {icons.map((icon, idx) => (
              <button
                onClick={() => setActive(idx)}
                className={`${
                  active === idx
                    ? "p-2 shadow-md rounded-full active"
                    : "bg-zinc-200 text-zinc-500"
                }`}
                key={idx}
              >
                {icon?.icon}
              </button>
            ))}
          </div>
        </div>
        {/* menu */}
        <div
          className={`mt-4 ${
            active ? "grid grid-cols-3 gap-2" : "flex flex-col gap-2"
          }`}
        >
          {/* components */}
          {/* User */}
          <Link
            to="/user"
            className={`col-span-2 rounded-md p-2 border border-zinc-400 text-black font-bold text-md ${
              active
                ? "flex flex-col gap-2 h-42"
                : "flex flex-row gap-4 text-[10px] items-center"
            }`}
          >
            <BiSolidUserAccount className="text-4xl bg-primary p-2 rounded-full text-white shadow-xl" />
            User
          </Link>
          <div className="flex flex-col gap-2 w-full">
            {/* Total Summary */}
            <Link
              to="/summary"
              className={`rounded-md p-2 border border-zinc-400 text-black font-bold text-[10px] ${
                active
                  ? "flex flex-col gap-2"
                  : "flex flex-row gap-4 items-center"
              }`}
            >
              <MdStickyNote2 className="text-4xl bg-primary p-2 rounded-full text-white shadow-xl" />
              Summary
            </Link>
            {/* Total Expenses */}
            <Link
              to="/summary"
              className={`rounded-md p-2 border border-zinc-400 text-black font-bold text-[10px] ${
                active
                  ? "flex flex-col gap-2"
                  : "flex flex-row gap-4 items-center"
              }`}
            >
              <GiTakeMyMoney className="text-4xl bg-primary p-2 rounded-full text-white shadow-xl" />
              Expenses
            </Link>
          </div>
          {/* Result */}
          <Link
            to="/result"
            className={`rounded-md p-2 border border-zinc-400 text-black font-bold text-[10px] ${
              active
                ? "flex flex-col gap-2"
                : "flex flex-row gap-4 items-center"
            }`}
          >
            <HiTrophy className="text-4xl bg-primary p-2 rounded-full text-white shadow-xl" />
            Result
          </Link>
          <Link
            to="/result"
            className={`col-span-2 rounded-md p-2 border border-zinc-400 text-black font-bold text-[10px] ${
              active
                ? "flex flex-col gap-2"
                : "flex flex-row gap-4 items-center"
            }`}
          >
            <BiSolidStar className="text-4xl bg-primary p-2 rounded-full text-white shadow-xl" />
            Hits
          </Link>
        </div>
        <StickyFooterNavbar />
      </div>
    </div>
  )
}
