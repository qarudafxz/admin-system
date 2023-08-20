import React from "react"

import { Navbar } from "../Navbar"

type StallSheetProps = {
  agent_name: string
  draw_time: Date
  draw_date: Date
  game_type: string
}

export const StallSheet: React.FC = () => {
  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1>Stall Sheet</h1>
        </div>
      </div>
    </div>
  )
}
