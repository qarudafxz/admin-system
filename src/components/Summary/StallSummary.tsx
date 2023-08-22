import React, { useState } from "react"

import { Navbar } from "../Navbar"
import { useGetCreds } from "../../hooks/useGetCreds"

type StallSummaryProps = {
  anent_id: number
  agent_name: string
  area_name: string
  gross: number
  hits: number
  location: string
  net: number
}

export const StallSummary: React.FC = () => {
  const token = useGetCreds()
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [data, setData] = useState<StallSummaryProps[]>([])

  const handleStartDate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    await fetch(import.meta.env.VITE_ADMIN_VIEW_STALL_SUMMARY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ start_date: startDate, end_date: endDate }),
    }).then(async (res) => {
      if (res.ok || res.status === 200) {
        const data = await res.json()
        setData(data)
      }
    })
  }

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5">
          <h1 className="font-bold small:text-xl">Stall Sheet</h1>
          <div className="flex flex-row gap-2 text-xs justify-between w-full">
            <div className="flex flex-col gap-2 bg-zinc-300 text-center pt-2">
              <h1>Start Date</h1>
              <input
                type="date"
                className="border border-zinc-300 p-2"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 bg-zinc-200 text-center pt-2">
              <h1>End Date</h1>
              <input
                type="date"
                className="border border-zinc-300 p-2"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            className="mt-4 bg-primary w-full py-2 font-semibold text-white rounded-md"
            onClick={(e) => handleStartDate(e)}
          >
            Check Summary
          </button>
          <div className="grid grid-cols-2">
            {data.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{item?.agent_name}</h1>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
