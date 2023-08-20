import React from "react"
import { Link } from "react-router-dom"

import { BsArrowUpRightCircle } from "react-icons/bs"

import { Navbar } from "../components/Navbar"
export const Summary: React.FC = () => {
  const stallMenu: Array<object> = [
    {
      label: "Stall Sheet",
      link: "/summary/stall-sheet",
    },
    {
      label: "Stall Summary",
      link: "/summary/stall-summary",
    },
  ]

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-bold small:text-xl">Summary</h1>
          <div className="flex flex-col gap-4 mt-2">
            <div className="bg-dark p-4 rounded-md">
              <p className="font-bold text-white small:text-lg">
                Stall Sheet Summary
              </p>
              <p className="text-xs text-white mt-1">
                View to check daily inputs of bets from agents{" "}
              </p>
            </div>
            <h1 className="font-semibold">Menu</h1>
            {stallMenu.map((item: any, idx: number) => {
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className="border border-primary  p-4 rounded-md"
                >
                  <p className="font-bold text-primary flex items-center justify-between small:text-lg">
                    {item.label} <BsArrowUpRightCircle />
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
