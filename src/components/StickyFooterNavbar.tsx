import React from "react"
import { useNavigate } from "react-router-dom"

import { AiOutlineHome } from "react-icons/ai"

export const StickyFooterNavbar: React.FC = () => {
  const navigate = useNavigate()
  return (
    <footer className="w-full bg-primary rounded-t-xl">
      <button
        onClick={() => {
          navigate("/dashboard")
        }}
        className="relative bottom-4 left-[90px] bg-primary rounded-full p-4 border-4 border-white"
      >
        <AiOutlineHome className="text-white" />
      </button>
    </footer>
  )
}
