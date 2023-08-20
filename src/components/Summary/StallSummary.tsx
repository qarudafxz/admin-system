import React from "react"

import { Navbar } from "../Navbar"

export const StallSummary: React.FC = () => {
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
