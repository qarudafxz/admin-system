import React, { useState } from "react"
import { Link } from "react-router-dom"

import { Navbar } from "../components/Navbar"

import { useGetCreds } from "../hooks/useGetCreds"
import "react-dropdown/style.css"
import Dropdown from "react-dropdown"

import { GiCash } from "react-icons/gi"

type Options = {
  value: string
  label: string
}

type Results = {
  id: number
  game_type: string
  winning_combination: string
  prize: number
  draw_date: string
  draw_time: string
}

export const Result: React.FC = () => {
  const token = useGetCreds()
  const [gameType, setGameType] = useState<string>("")
  const [drawDate, setDrawDate] = useState<string>("")
  const [results, setResults] = useState<Results[]>([])

  const handleFilter = async (): Promise<any> => {
    await fetch(import.meta.env.VITE_ADMIN_VIEW_RESULT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        game_type: gameType,
        draw_date: drawDate,
      }),
    }).then(async (res) => {
      if (res.status === 200 || res.ok) {
        const data = await res.json()

        setResults(data)
      }
    })
  }

  const gameOptions: Array<Options> = [
    {
      label: "2D",
      value: "2d",
    },
    {
      label: "3D",
      value: "3d",
    },
    {
      label: "4D",
      value: "4d",
    },
  ]

  const sortByOptions: Array<Options> = [
    {
      label: "Prize",
      value: "prize",
    },
    {
      label: "Time",
      value: "time",
    },
  ]

  const sortResults = (sortBy: string): void => {
    if (sortBy === "prize") {
      results.sort((a: Results, b: Results) => {
        return a.prize - b.prize
      })
    }

    if (sortBy === "time") {
      results.sort((a: Results, b: Results) => {
        return a.draw_time.localeCompare(b.draw_time)
      })
    }

    setResults([...results])
  }

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5 flex flex-col gap2">
          <h1 className="font-bold small:text-xl">Results</h1>
          <p className="text-xs text-zinc-500">
            You can add latest results from the PCSO for the agents to view and
            base.
          </p>
          <Link
            to="/add-result"
            className="text-white font-bold text-center bg-primary rounded-md mt-2 py-3"
          >
            Add Result
          </Link>
          <div className="flex justify-between items-center">
            <Dropdown
              options={gameOptions}
              placeholder="Game"
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
              className="text-xs border-zinc-400 focus:outline-none mt-4"
            />
            <input
              type="date"
              placeholder="Select Date"
              className="border relative top-2 p-1"
              onChange={(e) => setDrawDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleFilter}
            className="border border-zinc-400 font-semibold text-center py-2 rounded-md mt-2"
          >
            Check Result
          </button>
          <div className="flex flex-col gap-2 mt-2">
            {results.length && results ? (
              //map out results

              <div className="flex flex-col gap-2 max-h-96 overflow-y-auto mb-24">
                <div className="flex justify-between items-center w-full">
                  <h1 className="font-bold text-xs">
                    {drawDate &&
                      new Date(drawDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                    Results
                  </h1>
                  <Dropdown
                    options={sortByOptions}
                    placeholder="Sort by:"
                    onChange={(sortByOptions) =>
                      sortResults(sortByOptions?.value)
                    }
                    className="text-xs border-zinc-400 focus:outline-none "
                  />
                </div>
                {results.map((item: Results, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="border border-zinc-400 p-2 rounded-md flex gap-4 items-center shadow-lg"
                    >
                      <h1 className="bg-primary text-white font-bold  p-2 rounded-md">
                        {item?.game_type}
                      </h1>
                      <div className="flex flex-col">
                        <h1 className="text-xs">
                          Winning Combinations:{" "}
                          <span className="font-semibold">
                            {item?.winning_combination}
                          </span>
                        </h1>
                        <h1 className="text-xs flex items-center gap-1">
                          <GiCash size={25} /> Prize :{" "}
                          <span className="font-semibold">{item?.prize}</span>
                        </h1>
                        <h1 className="text-xs flex items-center gap-1">
                          Draw Time :{" "}
                          <span className="font-semibold">
                            {item?.draw_time.slice(0, 5)}
                          </span>
                        </h1>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <h1>Select Game Type and Draw Date to check result</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
