export const getUsername = (): string | null => {
  const admin = JSON.parse(localStorage.getItem("admin") || "{}")

  return admin.username
}
