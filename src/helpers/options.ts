type Options = {
  value: string
  label: string
}

export const gameOptions: Array<Options> = [
  {
    label: "2D",
    value: "2d",
  },
  {
    label: "3D",
    value: "3d",
  },
  {
    label: "4D",
    value: "4d",
  },
]

export const sortByOptions: Array<Options> = [
  {
    label: "Prize",
    value: "prize",
  },
  {
    label: "Time",
    value: "time",
  },
]

export const gameTime: Array<Options> = [
  {
    label: "2PM",
    value: "14:00:00",
  },
  {
    label: "5PM",
    value: "17:00:00",
  },
  {
    label: "9PM",
    value: "21:00:00",
  },
]
