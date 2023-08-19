declare global {
  type Admin = object
}

type UserType = {
  id: number
  complete_name: string
  username: string
  role: string
  area_name: string
  phone_number: string
  status: number
}

export type User = {
  username: ReactNode
  id: ReactNode
  area_name: ReactNode
  status: number
  admins: UserType[]
  agents: UserType[]
}
