import React, { useState, useEffect } from "react"
import { Navbar } from "../Navbar"
import { User } from "../../../types"
import { useFetch } from "../../hooks/useFetch"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import { gameOptions, gameTime } from "../../helpers/options"
import { useGetCreds } from "../../hooks/useGetCreds"

type Agent = {
  label: string
  value: string
}

type StallSheet = {
  agent_id: number
  bet: string
  combination: string
  complete_name: string
  draw_date: string
  draw_time: string
  game_type: string
}

export const StallSheet: React.FC = () => {
  const token = useGetCreds()
  const [agent, setAgent] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [gameType, setGameType] = useState<string>("")
  const [drawTime, setDrawTime] = useState<string>("")
  const [sheet, setSheet] = useState<StallSheet[]>([])

  const { data } = useFetch<{ agents: User[] }>(
    import.meta.env.VITE_ADMIN_VIEW_USER
  )

  const agents: Agent[] | undefined = data?.agents.map((agent) => {
    return { label: agent.username, value: agent.id.toString() }
  })

  const handleStallSheet = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch(import.meta.env.VITE_ADMIN_VIEW_STALL_SHEET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        agent_id: agent,
        draw_time: drawTime,
        draw_date: date,
        game_type: gameType,
      }),
    }).then(async (res) => {
      const data = await res.json()
      if (res.ok || res.status === 200) {
        setSheet(data.combinations)
      }
    })
  }

  useEffect(() => {
    if (!token) {
      window.location.href = "/login"
    }
  }, [])

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-bold small:text-xl">Stall Sheet</h1>
          <Dropdown
            options={agents || []}
            placeholder="Select agent"
            className="mt-2 text-xs"
            onChange={(agents) => setAgent(agents?.value)}
          />
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[10px]">Select Date:</p>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="text-xs rounded-md p-2 w-full border border-zinc-2"
            />
          </div>
          <div className="flex gap-2 w-full">
            <Dropdown
              options={gameOptions}
              placeholder="Game"
              className="text-xs border-zinc-400 w-full focus:outline-none mt-4"
              onChange={(gameOptions) => setGameType(gameOptions?.value)}
            />
            <Dropdown
              options={gameTime}
              placeholder="Time"
              className="text-xs border-zinc-400 w-full focus:outline-none mt-4"
              onChange={(gameTime) => setDrawTime(gameTime?.value)}
            />
          </div>
          <button
            onClick={(e) => handleStallSheet(e)}
            className="bg-primary w-full text-white font-bold rounded-md py-2 mt-4"
          >
            View Stall Sheet
          </button>
          <div className="mt-10 max-h-64 overflow-y-auto">
            <table className="w-full border border-collapse mt-4 max-h-96 mb-24 overflow-y-auto">
              <thead className="text-[10px] rounded-t-md">
                <tr>
                  <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                    Game Type
                  </th>
                  <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                    Agent Name
                  </th>
                  <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                    Combination
                  </th>
                  <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                    Bet
                  </th>
                </tr>
              </thead>
              <tbody className="text-[6px]">
                {sheet.map((item: any, idx: number) => (
                  <tr
                    key={idx}
                    className={`border-t ${idx % 2 === 1 ? "bg-zinc-300" : ""}`}
                  >
                    <td className="flex flex-col px-2 py-2 border border-zinc-400">
                      {item?.game_type}
                    </td>
                    <td className="px-2 py-2 border border-zinc-400">
                      {item?.complete_name}
                    </td>
                    <td className="px-2 py-2 border border-zinc-400">
                      {item?.combination}
                    </td>

                    <td className="px-2 py-2 border border-zinc-400">
                      {item?.bet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
