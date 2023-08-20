import React from "react"
import { NavLink } from "react-router-dom"
import { Navbar } from "./Navbar"

export const UserNav: React.FC = () => {
  const menu = [
    { name: "Admins", link: "/display-user/admins" },
    { name: "Agents", link: "/display-user/agents" },
  ]
  return (
    <div className="mt-5">
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="flex justify-between items-center mt-4">
          {menu?.map((item, idx) => {
            return (
              <NavLink
                key={idx}
                to={item.link}
                className={({ isActive }) =>
                  "text-xl px-6 pb-2 " +
                  (isActive
                    ? "border-b-4 border-primary font-semibold bg-zinc-100 pt-2"
                    : "")
                }
              >
                {item.name}
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
