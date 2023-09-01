import { FC } from "react"
import { useFetch } from "../hooks/useFetch"

type User = {
  first_name: string
  middle_name: string
  last_name: string
  username: string
  area_name: string
  location: string
  phone_number: string
  password: string
}

export const UserSettings: FC = () => {
  return (
    <div className="bg-primary w-full h-screen">
      <div className="grid place-content-center py-10">
        <h1 className="font-bold text-white text-2xl">Settings</h1>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center">
            <div className="flex flex-col">
              <label className="text-white">COMPLETE NAME</label>
              <input
                type="text"
                className="border border-zinc-400 py-2 pl-1 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
