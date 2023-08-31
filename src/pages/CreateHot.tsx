import { FC, useState } from "react"
import { Navbar } from "../components/Navbar"
import { gameOptions, gameTime } from "../helpers/options"
import { useGetCreds } from "../hooks/useGetCreds"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

export const CreateHot: FC = () => {
  const TOKEN = useGetCreds()
  const [hotNums, setHotNums] = useState<number[]>([])
  const [gameType, setGameType] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [hot, setHot] = useState<number>(0)

  const addHot = (e: React.FormEvent) => {
    e.preventDefault()
    setHotNums([...hotNums, hot])
    console.log(hotNums)
  }

  const handleDelete = (e: React.FormEvent, idx: number) => {
    e.preventDefault()
    const numbers = [...hotNums]
    numbers.splice(idx, 1)
    setHotNums(numbers)
  }

  const handleAddHot = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

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
          hot_numbers: hotNums,
        }),
      }).then(async (res) => {
        if (!res.ok || res.status === 400) {
          throw new Error("Something went wrong")
        }

        const data = await res.json()
        console.log(data)
      })
    } catch (err) {
      throw new Error("Something went wrong")
    }
  }

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-4 mb-20 w-full">
          <h1 className="font-bold small:text-xl">Add hot number</h1>
          <div className="flex gap-2 mt-2">
            <Dropdown
              options={gameOptions}
              placeholder="Select Game Type"
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
              className="text-xs"
            />
            <Dropdown
              options={gameTime}
              placeholder="Select Time"
              onChange={(gameTime) => setTime(gameTime?.value)}
              className="text-xs"
            />
          </div>
          <button
            onClick={(e) => addHot(e)}
            className="bg-primary font-bold text-white py-2 w-full"
          >
            New Hot Number
          </button>
          <div className="flex flex-col gap-2 mt-4">
            {hotNums.map((_, idx) => {
              return (
                <div className="flex items-center" key={idx}>
                  <input
                    className="border border-zinc-400 py-2 pl-1 focus:outline-none"
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
            className="bg-primary font-bold text-white py-2 w-full"
          >
            Add Hot Numbers
          </button>
        </div>
      </div>
    </div>
  )
}
