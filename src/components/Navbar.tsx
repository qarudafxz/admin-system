import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { getUsername } from "../helpers/getUsername.ts"

import { BiSolidUserCircle } from "react-icons/bi"
import { VscSettings } from "react-icons/vsc"

import { useGetCreds } from "../hooks/useGetCreds.ts"

export const Navbar: React.FC = () => {
  const token = useGetCreds()
  const [isOpenNav, setOpenNav] = useState<boolean>(false)
  const username = getUsername()

  const handleLogout = async () => {
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

          setTimeout(() => (window.location.href = "/"), 1000)
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  return (
    <div className="flex justify-between items-center mt-4 ">
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
                  className="text-white font-semibold"
                >
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
      <VscSettings className="text-3xl bg-dark text-white p-2 rounded-md" />
    </div>
  )
}
