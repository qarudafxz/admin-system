import { FC, useState } from "react"
import { Link } from "react-router-dom"

import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { gameTime, gameOptions } from "../helpers/options"
import { useGetCreds } from "../hooks/useGetCreds"

import { Navbar } from "../components/Navbar"
export const Limit: FC = () => {
  const token = useGetCreds()
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [gameType, setGameType] = useState<string>("")
  const [limit, setLimit] = useState<number>(0)

  const handleAddLimit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (isNaN(limit)) {
      return
    }

    await fetch(import.meta.env.VITE_ADMIN_ADD_LIMIT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        game_type: gameType,
        limit: limit,
        draw_time: time,
        draw_date: date,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok || res.status === 400) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
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

        toast.success("Limit added successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        })
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        })
      })
  }

  return (
    <div>
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-4">
          <h1 className="font-bold small:text-xl">Limits</h1>
          <p></p>
          <div className="flex flex-col mt-2">
            <p className="text-xs">Select Date</p>
            <input
              type="date"
              className="w-full border border-zinc-400 p-2"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Dropdown
              options={gameTime}
              onChange={(gameTime) => setTime(gameTime?.value)}
              placeholder="Select Time"
              className="text-xs"
            />
            <Dropdown
              options={gameOptions}
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
              placeholder="Select Game"
              className="text-xs"
            />
          </div>
          <div className="flex gap-2 items-center mt-4">
            <p>Limit: </p>
            <input
              type="text"
              className="py-2 pl-1 border border-zinc-400 w-full"
              onChange={(e) => setLimit(parseInt(e.target.value))}
            />
          </div>
          <button
            type="button"
            className="bg-primary w-full text-white mt-4 rounded-md py-4"
            onClick={(e) => handleAddLimit(e)}
          >
            Add Limit
          </button>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold small:text-lg mt-4">Check Limit</h1>
            <p className="text-xs">View the limits you added for monitoring</p>
            <Link
              to="/check-limit"
              className="border border-primary w-full text-primary font-bold mt-4 rounded-md py-4 text-center"
            >
              Check Limit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
