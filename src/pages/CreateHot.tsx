import { FC, useState, useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { gameOptions, gameTime } from "../helpers/options"
import { useGetCreds } from "../hooks/useGetCreds"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const CreateHot: FC = () => {
  const TOKEN = useGetCreds()
  const [hotNums, setHotNums] = useState<number[]>([])
  const [gameType, setGameType] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [hot, setHot] = useState<number>(0)

  const addHot = (e: React.FormEvent) => {
    e.preventDefault()
    setHotNums([...hotNums, hot])
  }

  const handleDelete = (e: React.FormEvent, idx: number) => {
    e.preventDefault()
    const numbers = [...hotNums]
    numbers.splice(idx, 1)
    setHotNums(numbers)
  }

  const handleAddHot = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const nums: Array<number> = [...hotNums]
    nums.shift()
    nums.push(hot)

    try {
      await fetch(import.meta.env.VITE_ADMIN_CREATE_HOTNUMBER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          game_type: gameType,
          draw_time: time,
          hot_numbers: JSON.stringify([...nums]),
        }),
      }).then(async (res) => {
        if (!res.ok || res.status === 400) {
          toast.error("Something went wrong. Please try again later", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          })
          throw new Error("Something went wrong")
        }

        const data = await res.json()
        toast.success(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        })
        setTimeout(() => {
          window.location.href = "/hot"
        }, 1800)
      })
    } catch (err) {
      throw new Error("Something went wrong")
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-4 mb-20 w-full">
          <h1 className="font-bold small:text-xl">Add hot number</h1>
          <div className="flex gap-2 mt-2">
            <Dropdown
              options={gameOptions}
              placeholder="Select Game Type"
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
              className="text-xs  w-full"
            />
            <Dropdown
              options={gameTime}
              placeholder="Select Time"
              onChange={(gameTime) => setTime(gameTime?.value)}
              className="text-xs w-full"
            />
          </div>
          <button
            onClick={(e) => addHot(e)}
            className="border border-primary font-bold text-primary py-2 w-full mt-4"
          >
            New Hot Number
          </button>
          <div className="flex flex-col gap-2 mt-4 max-h-[320px] overflow-y-auto w-full">
            {hotNums.map((_, idx) => {
              return (
                <div className="flex items-center w-full gap-2" key={idx}>
                  <input
                    className="border border-zinc-400 w-9/12 py-2 pl-1 focus:outline-none"
                    onChange={(e) => setHot(parseInt(e.target.value))}
                    type="number"
                    key={idx}
                  />
                  <button
                    onClick={(e) => handleDelete(e, idx)}
                    className="bg-red-500 text-white font-semibold py-2 px-[5px]"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          </div>
          <button
            onClick={(e) => handleAddHot(e)}
            className="bg-primary font-bold text-white py-2 w-72 fixed bottom-20 "
          >
            Add Hot Numbers
          </button>
        </div>
      </div>
    </div>
  )
}
