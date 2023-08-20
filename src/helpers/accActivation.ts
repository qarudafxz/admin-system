import { deact, react } from "../utils/activate"
import { toast } from "react-toastify"

export const accActivation = async (id: number, status: number) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${status === 1 ? deact(id) : react(id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok || response.status === 200) {
    toast.success(
      `User ${status === 1 ? "deactivated" : "reactivated"} successfully!`,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      }
    )

    setTimeout(() => {
      window.location.reload()
    }, 3200)
  }
}
