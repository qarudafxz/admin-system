import React, { useState, useEffect } from "react"
import { User } from "../../../../types"

import { useFetch } from "../../../hooks/useFetch"
import { accActivation } from "../../../helpers/accActivation"

import { Skeleton } from "@mui/material"

import { BiSolidUserPin } from "react-icons/bi"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Colors = string[]

const getRandomColor = (colors: Colors) => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

export const Agents: React.FC = () => {
  const [searchAgent, setSearchAgent] = useState<User[] | undefined>([])
  const [search, setSearch] = useState<string>("")
  const { data, loading } = useFetch<{ agents: User[] }>(
    import.meta.env.VITE_ADMIN_VIEW_USER
  )

  const colors: Colors = ["#FF6729", "#94FF29", "#29FFA1", "#29CBFF", "#B129FF"]

  const agents = data?.agents

  useEffect(() => {
    const filteredData = agents?.filter((agent) => {
      return agent.username.toLowerCase().includes(search.toLowerCase())
    })
    setSearchAgent(filteredData)
  }, [agents, search])

  return (
    <div className="mt-4 mb-24">
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large overflow-y-hidden">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border border-gray-300 w-full mb-2 rounded-md p-2 focus:outline-none"
        />
        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
          {search ? (
            searchAgent?.length ? (
              searchAgent?.map((agent, idx) => {
                const randomColor = getRandomColor(colors)
                return (
                  <div key={idx} className="flex items-center gap-2">
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30}
                      />
                    ) : (
                      <div className="flex justify-between shadow-md p-3 w-full">
                        <div className="flex gap-4 items-center">
                          <BiSolidUserPin
                            style={{ color: randomColor }}
                            size={30}
                          />
                          <div className="flex flex-col">
                            <h1 className="text-xs">{agent?.username}</h1>
                            <div className="flex flex-row gap-1 items-center">
                              <h1 className="text-[8px] bg-primary text-white p-[3px] rounded-md">
                                {agent?.id}
                              </h1>
                              <h1 className="text-[8px]">{agent?.area_name}</h1>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            accActivation(agent?.id, agent?.status)
                          }
                          className={`text-xs p-2 rounded-full text-white ${
                            agent?.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {agent?.status === 1 ? "Deactivate" : "Reactivate"}
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <h1 className="text-center">No agent found</h1>
            )
          ) : (
            agents?.map((agent, idx) => {
              const randomColor = getRandomColor(colors)

              return (
                <div key={idx} className="flex items-center gap-2">
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={30} />
                  ) : (
                    <div className="flex justify-between shadow-md p-3 w-full">
                      <div className="flex gap-4 items-center">
                        <BiSolidUserPin
                          style={{ color: randomColor }}
                          size={30}
                        />
                        <div className="flex flex-col">
                          <h1 className="text-xs">{agent?.username}</h1>
                          <div className="flex flex-row gap-1 items-center">
                            <h1 className="text-[8px] bg-primary text-white p-[3px] rounded-md">
                              {agent?.id}
                            </h1>
                            <h1 className="text-[8px]">{agent?.area_name}</h1>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => accActivation(agent?.id, agent?.status)}
                        className={`text-xs p-2 rounded-full text-white ${
                          agent?.status === 1 ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {agent?.status === 1 ? "Deactivate" : "Reactivate"}
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
