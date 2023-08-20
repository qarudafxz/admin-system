import React from "react"

import { Navbar } from "../components/Navbar"
export const Summary: React.FC = () => {
  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1>Summary</h1>
        </div>
      </div>
    </div>
  )
}
