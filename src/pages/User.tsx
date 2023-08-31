import React, { useState } from "react"
import { Link } from "react-router-dom"

import { useFetch } from "../hooks/useFetch.ts"
import { StickyFooterNavbar } from "../components/StickyFooterNavbar"
import { Navbar } from "../components/Navbar.tsx"
import { Skeleton } from "@mui/material"

import { CgOptions } from "react-icons/cg"

export const User: React.FC = () => {
  const [dark, setDark] = useState<boolean>(false)

  const { data, loading } = useFetch<{
    users: number | undefined
    month: string | undefined
  }>(import.meta.env.VITE_ADMIN_DASHBOARD)

  const menu: Array<object> = [
    {
      title: "Create User",
      link: "/create-user",
    },
    {
      title: "Display Users",
      link: "/display-user/admins",
    },
  ]
  return (
    <div>
      {/* Content here */}
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-extrabold small:text-xl">Users</h1>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={118} />
          ) : (
            <div
              className={`p-4 border border-zinc-200 rounded-md mt-4 flex gap-4 items-center ${
                dark ? "bg-dark" : "bg-light"
              }`}
            >
              <h1
                className={`font-bold small:text-6xl ${
                  dark ? "text-white" : "text-primary"
                }`}
              >
                {data?.users}
              </h1>
              <div className="flex flex-col">
                <h1
                  className={`text-xs mb-2 ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  Total Active Users
                </h1>
                <h1
                  className={`font-bold text-xs bg-primary p-2 rounded-md text-white`}
                >
                  as of{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h1>
              </div>
              <CgOptions
                size={30}
                onClick={() => setDark(!dark)}
                className={`text-xl border border-primary rounded-full p-2 ${
                  dark ? "text-white" : "text-dark"
                }`}
              />
            </div>
          )}
          <h1 className="mt-3 font-semibold small:text-lg">Create</h1>
          <p className="text-xs text-zinc-500">
            Register admin/agent or view all agents
          </p>
          {/* Menus */}
          <div className="flex flex-col gap-4 mt-4">
            {menu?.map((item: any, idx: number) => {
              return (
                <Link
                  to={item?.link}
                  key={idx}
                  className="text-center bg-primary text-white font-bold rounded-md py-5 hover:bg-[#2e1a78] duration-150"
                >
                  {item?.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <StickyFooterNavbar />
    </div>
  )
}
