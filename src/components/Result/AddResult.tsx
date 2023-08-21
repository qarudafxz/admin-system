import React, { useState } from "react"
import { useGetCreds } from "../../hooks/useGetCreds"

import { Navbar } from "../Navbar"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

import { motion, AnimatePresence } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import TopLoadingBar from "react-top-loading-bar"

import { gameOptions, gameTime } from "../../helpers/options"

export const AddResult: React.FC = () => {
  const token = useGetCreds()
  const [date, selectDate] = useState<string>("")
  const [gameType, setGameType] = useState<string>("")
  const [time, selectTime] = useState<string>("")
  const [combination, setCombination] = useState<string>("")
  const [prize, setPrize] = useState<number>(0)
  const [isAdd, setIsAdd] = useState<boolean>(false)

  const [progress, setProgress] = useState<number>(0)

  const addResult = async (e: React.FormEvent) => {
    e.preventDefault()
    setProgress(30)
    await fetch(import.meta.env.VITE_ADMIN_CREATE_RESULT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        game_type: gameType,
        winning_combination: combination,
        prize: prize,
        draw_date: date,
        draw_time: time,
      }),
    }).then(async (res) => {
      if (res.status === 200 || res.ok) {
        setProgress(100)
        toast.success("Result added successfully", {
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

        setIsAdd(false)
      }
    })
  }

  const confirmationModal = () => (
    <>
      <AnimatePresence>
        {isAdd && (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 
              backdrop-blur-lg
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="flex flex-col gap-4 p-10 w-11/12 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl rounded-md"
            >
              <h1 className="text-center font-bold">Confirm Submission</h1>
              <p>
                Date:{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Game Type: {gameType}</p>
              <p>Draw Time: {time}</p>
              <p>Prize: {prize}</p>
              <p className="text-center mt-4">Result: {combination}</p>
              <div className="flex gap-4 place-contenct-center m-auto">
                <button
                  onClick={(e) => addResult(e)}
                  className="shadow-md px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Yes
                </button>
                <button
                  className="shadow-md px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setIsAdd(false)}
                >
                  No
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <div>
      <ToastContainer />
      <TopLoadingBar
        color="#3910C7"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={8}
      />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="flex flex-col gap-4 mt-5">
          <h1 className="font-bold small:text-xl">Add Result</h1>
          <p className="text-xs text-zinc-500">
            Add result by selecting the game type, date, and time
          </p>
          <div className="grid grid-cols-3 gap-1">
            <input
              onChange={(e) => selectDate(e.target.value)}
              type="date"
              placeholder="Select Date"
              className="border relative top-2 p-1 col-span-3"
            />
            <Dropdown
              options={gameOptions}
              placeholder="Game"
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
              className="col-span-2 text-xs border-zinc-400 focus:outline-none mt-4"
            />
            <Dropdown
              options={gameTime}
              placeholder="Time"
              onChange={(gameTime) => selectTime(gameTime?.value)}
              className="text-xs border-zinc-400 focus:outline-none mt-4"
            />
          </div>
          <input
            onChange={(e) => setCombination(e.target.value)}
            type="text"
            placeholder="Enter winning combination"
            className="border border-zinc-400 w-full text-sm py-2 pl-2"
          />
          <input
            onChange={(e) => setPrize(parseInt(e.target.value))}
            type="text"
            placeholder="Enter prize money"
            className="border border-zinc-400 w-full text-sm py-2 pl-2"
          />
          <button
            onClick={() => setIsAdd(!isAdd)}
            className="bg-primary text-white font-bold rounded-md py-4"
          >
            Add Result
          </button>
        </div>
        {confirmationModal()}
      </div>
    </div>
  )
}
