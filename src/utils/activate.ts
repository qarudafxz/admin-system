export const deact = (id: number): string => {
  return `https://adminstl.up.railway.app/api/Admin/User/${id}/soft`
}

export const react = (id: number): string => {
  return `https://adminstl.up.railway.app/api/Admin/User/${id}/restore`
}

export const deleteLim = (id: number): string => {
  return `https://adminstl.up.railway.app/api/Admin/Limits/${id}`
}

export const deleteHotNum = (id: number): string => {
  return `http://admin-theme.test/api/Admin/HotNumbers/${id}`
}
