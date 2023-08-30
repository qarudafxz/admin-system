import { FC } from "react"
import { useFetch } from "../hooks/useFetch"
import { Navbar } from "../components/Navbar"
import { deleteLim } from "../utils/activate"
import { useGetCreds } from "../hooks/useGetCreds"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Limit = {
  draw_date: string
  draw_time: string
  game_type: string
  limit: number
  limit_id: number
  map: any
}

export const CheckLimit: FC = () => {
  const TOKEN = useGetCreds()
  const { data } = useFetch<Limit>(import.meta.env.VITE_ADMIN_VIEW_LIMIT)

  const handleDelete = async (id: number): Promise<void> => {
    await fetch(deleteLim(id), {
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
        <div className="mt-4 mb-20 max-h-[560px] overflow-y-auto">
          <h1 className="font-bold small:text-xl">View Limits</h1>
          <p className="text-xs text-zinc-500">
            You can also deactivate a limit
          </p>
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
                  className={`border-t ${idx % 2 === 1 ? "bg-zinc-300" : ""}`}
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
                      onClick={() => handleDelete(item?.limit_id)}
                      className="bg-red-600 px-2 py-1 rounded-full text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
