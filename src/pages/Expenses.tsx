import React, { useState } from "react"
import { Link } from "react-router-dom"

import { Navbar } from "../components/Navbar"

import { VscGitPullRequestGoToChanges } from "react-icons/vsc"
import { useGetCreds } from "../hooks/useGetCreds"
import { ToastContainer, toast } from "react-toastify"
import TopLoadingBar from "react-top-loading-bar"

export const Expenses: React.FC = () => {
  const token = useGetCreds()
  const [requestExpense, setRequestExpense] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setProgress(30)
    await fetch(import.meta.env.VITE_ADMIN_CREATE_EXPENSES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: requestExpense,
      }),
    }).then(async (res) => {
      const data = await res.json()
      setProgress(60)
      if (res.ok || res.status === 200) {
        toast.success("Request sent", {
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
        setProgress(100)
      }

      if (res.status === 403 || !res.status) {
        toast.error(data.message, {
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
        setProgress(100)
      }
    })
  }

  return (
    <div>
      <TopLoadingBar
        color="#3910C7"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={8}
      />
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-5 flex flex-col gap-2">
          <h1 className="font-bold small:text-xl">Expenses</h1>
          <div className="bg-primary w-full py-2 px-4 rounded-md flex items-center">
            <div className="flex flex-col">
              <Link
                to="/view-requests"
                className="text-md font-bold text-white leading-tight"
              >
                View Expenses Requests
              </Link>
              <span className="text-xs leading-tigther w-9/12 text-white mt-1">
                Click to view other admin's request
              </span>
            </div>
            <VscGitPullRequestGoToChanges
              size={60}
              className="bg-white p-2 rounded-md text-primary"
            />
          </div>
          <p className="text-xs leading-tighter ">
            Add your expenses to be recorded on the databases
          </p>
          <textarea
            onChange={(e) => setRequestExpense(e.target.value)}
            placeholder="Write Expenses"
            className="p-2 text-xs border border-zinc-300 rounded-md focus:outline-none h-40 resize-none"
          />
          <button
            onClick={(e) => handleRequest(e)}
            className="bg-black py-2 text-white rounded-full mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
