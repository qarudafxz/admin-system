import { deact } from "../utils/deact"
import { toast } from "react-toastify"

export const deactivateAcc = async (id: string) => {
  const token = localStorage.getItem("token")
  const response = await fetch(deact(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok || response.status === 200) {
    toast.success("Agent deactivated successfully!", {
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

    setTimeout(() => {
      window.location.reload()
    }, 5200)
  }
}
