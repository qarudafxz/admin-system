import React from "react"
import { Link } from "react-router-dom"
import Bg from "../assets/bg.png"

export const Home: React.FC = () => {
  return (
    <div
      className="small:block disable:hidden"
      style={{
        overflow: "hidden",
      }}
    >
      <form className="my-10">
        <h1 className="font-extrabold text-center">
          SMALL <span className="text-primary">TOWN</span>
        </h1>
        <img
          src={Bg}
          alt="Bg"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        />
        <div className="grid grid-cols place-items-center small:mx-small medium:mx-medium large:mx-large">
          <h1 className="text-xs font-semibold text-zinc-500">
            Start managing admins/agents
          </h1>
          <h1 className="font-bold text-center tracking-tight small:text-3xl">
            Access the dashboard now.
          </h1>
          <Link
            to="/login"
            className="my-6 bg-primary py-4 text-center text-xs rounded-full text-white w-full"
          >
            Get Started
          </Link>
        </div>
      </form>
    </div>
  )
}
