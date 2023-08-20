export const deact = (id: number): string => {
  return `https://adminstl.up.railway.app/api/Admin/User/${id}/soft`
}

export const react = (id: number): string => {
  return `https://adminstl.up.railway.app/api/Admin/User/${id}/restore`
}
