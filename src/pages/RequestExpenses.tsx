import React from "react"

import { Navbar } from "../components/Navbar"
import { useFetch } from "../hooks/useFetch"

import { Skeleton } from "@mui/material"

import { BiSolidUserCircle } from "react-icons/bi"

type RequestExpensesProps = {
  id: number
  user_id: number
  name: string
  message: string
  created_at: Date
  updated_at: Date
}

export const RequestExpenses: React.FC = () => {
  const { data, loading } = useFetch<RequestExpensesProps[]>(
    import.meta.env.VITE_ADMIN_CREATE_EXPENSES
  )

  return (
    <div>
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-4">
          <h1 className="font-bold mb-4 small:text-xl">
            Requests from other admin
          </h1>
          <div className="flex flex-col gap-2 max-h-[425px] mb-20 overflow-y-auto">
            {data?.map((req: RequestExpensesProps, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                {loading ? (
                  <Skeleton variant="text" width={"100%"} height={90} />
                ) : (
                  <>
                    <BiSolidUserCircle className="text-primary" size={50} />
                    <h1 className="text-xs p-4 rounded-md w-full bg-zinc-200 flex flex-col gap-1">
                      <span className="bg-primary text-white px-2 rounded-md py-1">
                        {req?.name}
                      </span>
                      {req?.message}
                      <span className="bg-zinc-400 text-center text-white mt-2">
                        {new Date(req?.created_at).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </h1>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
