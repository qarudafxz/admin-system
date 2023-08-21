import React from "react"
import { Navbar } from "../components/Navbar"

export const Hits: React.FC = () => {
  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-bold small:text-xl">Hits</h1>
        </div>
      </div>
    </div>
  )
}
