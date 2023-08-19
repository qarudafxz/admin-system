import React from "react"

import { StickyFooterNavbar } from "../components/StickyFooterNavbar"

export const User: React.FC = () => {
  return (
    <div>
      {/* Content here */}
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <h1>User</h1>
      </div>
      <StickyFooterNavbar />
    </div>
  )
}
