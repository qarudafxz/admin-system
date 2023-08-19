/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export const useFetch = <T>(
  url: RequestInfo | URL,
  options?: RequestInit & { token?: string }
) => {
  if (!options?.token) {
    options = { ...options, token: localStorage.getItem("token") || undefined }
  }

  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [data, setData] = useState<T | null>(null)
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    async function fetchData() {
      try {
        const response = await fetch(url, {
          ...(options as Omit<typeof options, "token">),
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
            ...(options?.token
              ? { Authorization: `Bearer ${options.token}` }
              : {}),
          },
        })

        setStatus(response.statusText)
        const responseData = await response.json()
        setData(responseData as T)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, error, loading, status }
}
