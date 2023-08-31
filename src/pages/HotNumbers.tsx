import { FC } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useFetch } from "../hooks/useFetch"
import { deleteHotNum } from "../utils/activate"
import { useGetCreds } from "../hooks/useGetCreds"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type HotNumbers = {
  draw_date: string
  draw_time: string
  game_type: string
  hot_numbers: number
  limit_id: number
  map: any
  length: number | undefined
}

export const HotNumbers: FC = () => {
  const TOKEN = useGetCreds()
  const { data } = useFetch<HotNumbers>(
    import.meta.env.VITE_ADMIN_VIEW_HOTNUMBERS
  )

  const handleDelete = async (id: number): Promise<void> => {
    await fetch(deleteHotNum(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        if (res.ok || res.status === 200) {
          toast.success("Limit deleted successfully", {
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
            window.location.reload()
          }, 2100)
          return
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
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
        throw new Error(err)
      })
  }

  return (
    <div>
      <ToastContainer />
      <div className="small:mx-small medium:mx-medium large:mx-large">
        <Navbar />
        <div className="mt-4 mb-20 w-full">
          <h1 className="font-bold small:text-xl">Hot Numbers</h1>
          {data?.length != 0 && data ? (
            <div className="flex flex-col gap-2">
              <table className="w-full border border-collapse mt-4">
                <thead className="text-[10px] rounded-t-md">
                  <tr>
                    <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                      Game Type
                    </th>
                    <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                      Draw Date
                    </th>
                    <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                      Draw Time
                    </th>
                    <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                      Limit
                    </th>
                    <th className="px-2 py-2 border border-zinc-400 bg-primary text-white">
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[10px]">
                  {data?.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      className={`border-t ${
                        idx % 2 === 1 ? "bg-zinc-300" : ""
                      }`}
                    >
                      <td className="px-2 py-2 border border-zinc-400">
                        {item?.game_type}
                      </td>
                      <td className="px-2 py-2 border border-zinc-400">
                        {new Date(item?.draw_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-2 py-2 border border-zinc-400">
                        {item?.draw_time}
                      </td>
                      <td className="px-2 py-2 border border-zinc-400">
                        {item?.limit}
                      </td>
                      <td className="px-2 py-2 border border-zinc-400">
                        <button
                          onClick={() => handleDelete(item?.id)}
                          className="bg-red-600 px-2 py-1 rounded-full text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link
                to="/create-hot"
                className="w-full bg-primary py-2 rounded-md text-center text-white font-bold"
              >
                Add Hot Number
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-1 m-auto mt-40">
              <h1 className="text-center font-medium text-xl">
                No 🔥 numbers yet
              </h1>
              <Link
                to="/create-hot"
                className="w-full bg-primary py-2 rounded-md text-center text-white font-bold"
              >
                Add Hot Number
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
