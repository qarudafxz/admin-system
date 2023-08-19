import React from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai"

export const StickyFooterNavbar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <footer className="w-full bg-primary rounded-t-xl shadow-xl fixed bottom-0">
      <div className="flex justify-center">
        <button
          onClick={() => {
            navigate("/dashboard")
          }}
          className="bg-primary rounded-full p-4 border-4 border-white relative bottom-6"
        >
          <AiOutlineHome className="text-white" />
        </button>
      </div>
    </footer>
  )
}
