import { useCallback, useEffect, useState } from "react"
import { useGetCreds as getCreds } from "./useGetCreds"

const getAuthToken = (): string | null => {
  const token = getCreds() || localStorage.getItem("token") || null

  if (!token) {
    return null
  }

  return token
}

export const useFetch = async <T>(
  url: RequestInfo | URL,
  options?: RequestInit & { token?: string }
) => {
  if (!options?.token) {
    options!.token = getAuthToken() || ""
  }

  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [data, setData] = useState<T | null>(null)
  const [loading, setIsLoading] = useState<boolean>(true)

  const fetchResponse = useCallback(async () => {
    return await fetch(url, {
      ...(options as Omit<typeof options, "token">),
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
    })
  }, [url, options])

  useEffect(() => {
    setIsLoading(true)
    fetchResponse()
      .then((res) => {
        setStatus(res.statusText)
        return res.json()
      })
      .then((data) => setData(data as T))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [fetchResponse])

  return { data, error, loading, status }
}
