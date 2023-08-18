import React, { useState } from "react"
import Logo from "../assets/logo.png"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
              type={passwordInputType}
              className="border border-zinc-400 rounded-full pl-4 py-2 focus:outline-none"
              style={{ width: "120%" }}
            />
          </div>
        </div>
        {/* change this later into a button */}
        <button
          type="button"
          className="bg-primary py-4 text-center text-xs rounded-full text-white w-full mt-10"
        >
          Login
        </button>
      </form>
    </div>
  )
}
