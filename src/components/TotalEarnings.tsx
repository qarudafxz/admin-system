import React from "react"
import { CiMoneyBill } from "react-icons/ci"

export const TotalEarnings: React.FC = () => {
  return (
    <div className="w-full mt-2 text-white rounded-xl bg-primary border border-purple-400 shadow-md px-4 pt-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">{new Date().toDateString()}</h1>
          <CiMoneyBill className="text-white small:text-xl" />
        </div>
        <div className="w-11/12 bg-white rounded-t-md p-2 mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-primary text-xs">Total Earnings</h1>
          </div>
          <h1 className="font-bold text-primary text-center mt-1 small:text-4xl">
            ₱5000
          </h1>
        </div>
      </div>
    </div>
  )
}
