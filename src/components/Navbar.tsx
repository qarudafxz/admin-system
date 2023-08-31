import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { getUsername } from "../helpers/getUsername.ts"

import { BiSolidUserCircle } from "react-icons/bi"
import { VscSettings } from "react-icons/vsc"
import { CiLogout } from "react-icons/ci"

import { useGetCreds } from "../hooks/useGetCreds.ts"
import TopLoadingBar from "react-top-loading-bar"

export const Navbar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const token = useGetCreds()
  const [isOpenNav, setOpenNav] = useState<boolean>(false)
  const username = getUsername()

  const handleLogout = async () => {
    setProgress(30)
    await fetch(import.meta.env.VITE_ADMIN_LOGOUT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok || res.status === 200) {
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("admin")
          setProgress(100)
          setTimeout(() => (window.location.href = "/"), 1000)
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  return (
    <div className="flex justify-between items-center mt-4 ">
      <TopLoadingBar
        color="#3910C7"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={8}
      />
      <div className="flex gap-4">
        <button type="button" onClick={() => setOpenNav(!isOpenNav)}>
          <BiSolidUserCircle
            className={`text-2xl top-5 absolute z-20 ${
              !isOpenNav ? "text-primary" : "text-white"
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpenNav && (
            <motion.div
              initial={{ opacity: 0, x: -1000 }}
              animate={{
                opacity: 1,
                x: -160,
              }}
              exit={{ opacity: 0, x: -1000 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 z-10 right-0 bg-primary shadow-2xl py-4 h-full w-9/12 small:pl-32 medium:pl-28 large:pl-24"
            >
              <div className="mt-20">
                <button
                  onClick={handleLogout}
                  className="text-white flex w-full items-center gap-2 font-semibold"
                >
                  <CiLogout size={20} />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <h1 className="ml-4">
          Hello <span className="font-semibold">{username},</span>
        </h1>
      </div>
      <Link to="/settings">
        {" "}
        <VscSettings className="text-3xl bg-dark text-white p-2 rounded-md" />
      </Link>
    </div>
  )
}
