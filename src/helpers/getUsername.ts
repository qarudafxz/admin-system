export const getUsername = (): string | null => {
  const admin = JSON.parse(sessionStorage.getItem("admin") || "{}")

  return admin.username
}
