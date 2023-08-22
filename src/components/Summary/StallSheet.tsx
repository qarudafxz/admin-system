import React, { useState } from "react"
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

export const StallSheet: React.FC = () => {
  const token = useGetCreds()
  const [agent, setAgent] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [gameType, setGameType] = useState<string>("")
  const [drawTime, setDrawTime] = useState<string>("")

  const { data } = useFetch<{ agents: User[] }>(
    import.meta.env.VITE_ADMIN_VIEW_USER
  )

  const agents: Agent[] | undefined = data?.agents.map((agent) => {
    return { label: agent.username, value: agent.username.toString() }
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
        agent_name: agent,
        draw_time: drawTime,
        draw_date: date,
        game_type: gameType,
      }),
    }).then(async (res) => {
      const data = await res.json()
      if (res.ok || res.status === 200) {
        console.log(data)
      }
    })
  }

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
          <div className=""></div>
        </div>
      </div>
    </div>
  )
}
