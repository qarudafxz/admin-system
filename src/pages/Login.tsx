import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import TopLoadingBar from "react-top-loading-bar"

type Credential = {
  username: string
  location: string
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setProgress(30)
    const response = await fetch(import.meta.env.VITE_ADMIN_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (!data) {
      alert("Invalid credentials")
      return
    }
    const credentials: Credential = {
      username: data.success.username,
      location: data.success.location,
    }
    setTimeout(() => {
      setProgress(100)
    }, 1000)

    sessionStorage.setItem("admin", JSON.stringify(credentials))
    sessionStorage.setItem("token", data.token)

    setTimeout(() => {
      navigate("/dashboard")
    }, 1500)
  }

  const passwordInputType = showPassword ? "text" : "password"
  const passwordIcon = showPassword ? (
    <AiOutlineEyeInvisible
      size={25}
      className="text-zinc-500 cursor-pointer absolute right-10 top-[380px]"
      onClick={togglePasswordVisibility}
    />
  ) : (
    <AiOutlineEye
      size={25}
      className="text-zinc-500 cursor-pointer absolute right-10 top-[380px]"
      onClick={togglePasswordVisibility}
    />
  )

  return (
    <div className="small:mx-small medium:mx-medium large:mx-large">
      <TopLoadingBar
        color="#3910C7"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={8}
      />
      <form className="grid grid-cols place-items-center my-20">
        <img src={Logo} alt="Logo" className="small:w-20 h-20" />
        <h1 className="font-extrabold text-center mt-4">
          SMALL <span className="text-primary">TOWN</span> LOGIN
        </h1>
        <div className="flex flex-col gap-2 justify-self-start mt-10 w-full">
          <label htmlFor="username" className="small:text-xs">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border border-zinc-400 rounded-full pl-4 py-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 justify-self-start mt-10 w-full">
          <label htmlFor="password" className="small:text-xs">
            Password
          </label>
          {passwordIcon}
          <div className="flex">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={passwordInputType}
              className="border border-zinc-400 rounded-full pl-4 py-2 focus:outline-none"
              style={{ width: "120%" }}
            />
          </div>
        </div>
        {/* change this later into a button */}
        <button
          type="button"
          onClick={(e) => handleLogin(e)}
          className="bg-primary py-4 text-center text-xs rounded-full text-white w-full mt-10"
        >
          Login
        </button>
      </form>
    </div>
  )
}
