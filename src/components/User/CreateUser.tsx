import { FC, useState } from "react"
import { Navbar } from "../Navbar"
import { useNavigate } from "react-router-dom"

import { useGetCreds } from "../../hooks/useGetCreds.ts"

import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Options = {
  value: string
  label: string
}

type Locations = {
  value: string
  label: string
}

export const CreateUser: FC = () => {
  const navigate = useNavigate()
  const token = useGetCreds()
  const [firstName, setFirstName] = useState<string>("")
  const [middleName, setMiddleName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [role, setRole] = useState<string>()
  const [area, setArea] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const roles: Array<Options> = [
    {
      value: "true",
      label: "Admin",
    },
    {
      value: "false",
      label: "Agent",
    },
  ]

  const locations: Array<Locations> = [
    {
      value: "Butuan City",
      label: "Butuan City",
    },
  ]

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password doesn't match!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      })

      return
    }

    await fetch(import.meta.env.VITE_ADMIN_CREATE_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        complete_name: middleName
          ? firstName.concat(" ", middleName, " ", lastName)
          : firstName.concat(" ", lastName),
        username: username,
        password: password,
        phone_number: phoneNumber,
        area_name: area,
        location: location,
        isAdmin: role === "true" ? true : false,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (data.error || res.status >= 400) {
          toast.error(data.error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: "light",
          })
          return
        }

        toast.success("Successfully Added ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        })
        setTimeout(() => {
          navigate(`/display-user/${role ? "admins" : "agents"}`)
        }, 2000)
      })
      .catch(async (err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <form className="mt-5 mb-28">
          <h1 className="font-bold small:text-xl">Create User</h1>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">First Name</label>
            <input
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">Middle Name</label>
            <input
              type="text"
              required
              onChange={(e) => setMiddleName(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">Last Name</label>
            <input
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label className="small:text-xs">USERNAME</label>
            <input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">PASSWORD</label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Must be 8 characters long"
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">CONFIRM PASSWORD</label>
            <input
              type="password"
              required
              placeholder="Must be 8 characters long"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">PHONE NUMBER</label>
            <input
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="small:text-xs">AREA NAME</label>
            <input
              required
              onChange={(e) => setArea(e.target.value)}
              type="text"
              className="border text-xs border-zinc-400 p-2 focus:outline-none"
            />
          </div>
          <Dropdown
            options={locations}
            placeholder="Select Location"
            onChange={(locations) => setLocation(locations?.value)}
            className="text-xs border-zinc-400 focus:outline-none mt-4"
          />
          <Dropdown
            options={roles}
            placeholder="Select Role"
            onChange={(roles) => setRole(roles?.value)}
            className="text-xs border-zinc-400 focus:outline-none mt-4"
          />
          <button
            type="button"
            onClick={(e) => handleCreateUser(e)}
            placeholder="Choose Role"
            className="bg-primary text-center text-white font-bold rounded-md w-full p-4 mt-6"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  )
}
