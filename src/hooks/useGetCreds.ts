export const useGetCreds = (): string | null => {
  const token = sessionStorage.getItem("token")
  return token
}
