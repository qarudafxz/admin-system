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
        console.log(data)
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
          <table className="w-full border border-collapse mt-4 max-h-96 mb-24 overflow-y-auto">
            <thead className="text-[10px] rounded-t-md">
              <tr>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Agent
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Gross
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Hits
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Expenses
                </th>
                <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                  Net
                </th>
              </tr>
            </thead>
            <tbody className="text-[6px]">
              {data.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  className={`border-t ${idx % 2 === 1 ? "bg-zinc-300" : ""}`}
                >
                  <td className="flex flex-col px-2 py-2 border border-zinc-400">
                    <span className="font-semibold">{item?.agent_name}</span>
                    <span>{item?.location}</span>
                  </td>
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.gross}
                  </td>
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.hits}
                  </td>
                  <td className="px-2 py-2 border border-zinc-400"></td>
                  <td className="px-2 py-2 border border-zinc-400">
                    {item?.net}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
