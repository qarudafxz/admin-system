import React from "react"

import { BiSolidUserCircle } from "react-icons/bi"
import { VscSettings } from "react-icons/vsc"

export const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center mt-4 ">
      <div className="flex gap-4">
        <BiSolidUserCircle className="text-2xl text-primary" />
        <h1>
          Hello <span className="font-semibold">Fra,</span>
        </h1>
      </div>
      <VscSettings className="text-3xl bg-dark text-white p-2 rounded-md" />
    </div>
  )
}
