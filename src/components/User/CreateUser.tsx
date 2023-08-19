import React, { useState } from "react"
import { Navbar } from "../Navbar"

import { useGetCreds } from "../../hooks/useGetCreds.ts"

import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Options = {
  value: string
  label: string
}

export const CreateUser: React.FC = () => {
  const token = useGetCreds()
  const [name, setName] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [area, setArea] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const options: Array<Options> = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "agent",
      label: "Agent",
    },
  ]

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password doesn't match!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      })

      return
    }

    await fetch(import.meta.env.VITE_ADMIN_CREATE_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        complete_name: name,
        username: username,
        password: password,
        phone_number: phoneNumber,
        area_name: area,
        location: area,
        role: role,
      }),
    })

    toast.success(
      `${
        role.charAt(0).toUpperCase() + role.slice(1, role.length)
      } successfully added`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      }
    )
  }

  return (
    <div>
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <form className="mt-5 mb-28">
          <h1 className="font-bold small:text-xl">Create User</h1>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">COMPLETE NAME</label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label className="small:text-xs">USERNAME</label>
            <input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">PASSWORD</label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Must be 8 characters long"
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">CONFIRM PASSWORD</label>
            <input
              type="password"
              required
              placeholder="Must be 8 characters long"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">PHONE NUMBER</label>
            <input
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">AREA NAME</label>
            <input
              required
              onChange={(e) => setArea(e.target.value)}
              type="text"
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <Dropdown
            options={options}
            placeholder="Select Role"
            onChange={(options) => setRole(options?.value)}
            className="text-xs border-zinc-400 focus:outline-none mt-4"
          />
          <button
            type="button"
            onClick={(e) => handleCreateUser(e)}
            placeholder="Choose Role"
            className="bg-primary text-center text-white font-bold rounded-md w-full p-4 mt-6"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  )
}
