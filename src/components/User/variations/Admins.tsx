import React from "react"
import { User } from "../../../../types"

import { useFetch } from "../../../hooks/useFetch"
import { deactivateAcc } from "../../../helpers/deactivateAcc"

import { Skeleton } from "@mui/material"

import { BiSolidUserPin } from "react-icons/bi"

type Colors = string[]

const getRandomColor = (colors: Colors) => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

export const Admins: React.FC = () => {
  const { data, loading } = useFetch<{ admins: User[] }>(
    import.meta.env.VITE_ADMIN_VIEW_USER
  )

  const colors: Colors = ["#FF6729", "#94FF29", "#29FFA1", "#29CBFF", "#B129FF"]

  return (
    <div className="mt-4 mb-24">
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <div className="flex flex-col gap-2  max-h-[500px] overflow-y-auto">
          {data?.admins?.map((admin, idx) => {
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
                        <h1 className="text-xs">{admin?.username}</h1>
                        <div className="flex flex-row gap-1 items-center">
                          <h1 className="text-[8px] bg-primary text-white p-[3px] rounded-md">
                            {admin?.id}
                          </h1>
                          <h1 className="text-[8px]">{admin?.area_name}</h1>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deactivateAcc(admin?.id)}
                      className={`text-xs p-2 rounded-full text-white ${
                        admin?.status === 1 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {admin?.status === 1 ? "Deactivate" : "Reactivate"}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
