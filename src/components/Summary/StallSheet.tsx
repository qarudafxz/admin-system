import React from "react"

import { Navbar } from "../Navbar"

// import Dropdown from "react-dropdown"
// import "react-dropdown/style.css"

// type StallSheetProps = {
//   agent_name: string
//   draw_time: Date
//   draw_date: Date
//   game_type: string
// }

export const StallSheet: React.FC = () => {
  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-bold small:text-xl">Stall Sheet</h1>
          <input
            type="text"
            placeholder="Enter agent's name"
            className="border border-zinc-200 py-2 pl-1 w-full mt-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
