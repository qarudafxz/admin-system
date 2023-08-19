export const useGetCreds = (): string | null => {
  const token = localStorage.getItem("token")

  return token
}
