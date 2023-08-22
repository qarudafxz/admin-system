import React, { useState } from "react"
import { Navbar } from "../components/Navbar"
import Dropdown from "react-dropdown"
import { useGetCreds } from "../hooks/useGetCreds"

type HitsProps = {
  agent_name: string
  amount_hits: number
  bet: number
  combination: number
}

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io"

import { gameOptions, gameTime } from "../helpers/options"

const itemsPerPage = 5 // Number of items per page

export const Hits: React.FC = () => {
  const token = useGetCreds()
  const [gameType, setGameType] = useState<string>("")
  const [drawTime, setDrawTime] = useState<string>("")
  const [drawDate, setDrawDate] = useState<string>("")
  const [results, setResults] = useState<HitsProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleHits = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      const res = await fetch(import.meta.env.VITE_ADMIN_VIEW_HITS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          draw_date: drawDate,
          draw_time: drawTime,
          game_type: gameType,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setResults(data)
        setCurrentPage(1) // Reset to first page after fetching new results
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(results.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-bold small:text-xl">Hits</h1>
          <p className="text-xs">Select...</p>
          <input
            type="date"
            onChange={(e) => setDrawDate(e.target.value)}
            className="w-full border border-zinc-500 mt-2 text-xs"
          />
          <div className="flex gap-2 items-center">
            <Dropdown
              options={gameOptions}
              placeholder="Game Type"
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
              className="text-xs w-full border-zinc-400 focus:outline-none mt-4"
            />
            <Dropdown
              options={gameTime}
              placeholder="Game Time"
              onChange={(gameTime) => setDrawTime(gameTime?.value)}
              className="text-xs w-full border-zinc-400 focus:outline-none mt-4"
            />
          </div>
          <button
            onClick={(e) => handleHits(e)}
            className="bg-primary mt-4 w-full rounded-md py-2 font-bold text-white"
          >
            Check Hits
          </button>

          <table className="w-full border border-collapse mt-4">
            <thead className="text-[10px] rounded-t-md">
              <tr>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Agent Name
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Amount Hits
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Bet
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Combination
                </th>
              </tr>
            </thead>
            <tbody className="text-[10px]">
              {currentItems.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  className={`border-t ${idx % 2 === 1 ? "bg-zinc-300" : ""}`}
                >
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.agent_name}
                  </td>
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.amount_hits}
                  </td>
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.bet}
                  </td>
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.combination}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination implementation */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevPage}
              className={`mx-1 py-1 px-2 rounded-md ${
                currentPage > 1 ? " text-black" : "text-primary"
              }`}
            >
              <IoIosArrowDropleft size={30} />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`py-1 px-4 rounded-md ${
                  currentPage === idx + 1
                    ? "bg-zinc-300 text-primary"
                    : " text-gray-700"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className={`mx-1 py-1 px-2 rounded-md ${
                currentPage < totalPages ? "text-black" : "text-primary"
              }`}
            >
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
