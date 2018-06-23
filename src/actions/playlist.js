export const FETCH_PLAYLIST = "Fetch playlist";

const dummyPlaylist = [
  {
    name: "C4E Javasripts",
    _id: "145bcdfaat3",
    videos: [
      {
        name: "Introduction",
        duration: "1:32"
      },
      {
        name: "Variables",
        duration: "2:04"
      },
      {
        name: "Functions",
        duration: "5:20"
      },
      {
        name: "DOM",
        duration: "10:30"
      },
      {
        name: "JQuery (1)",
        duration: "11:10"
      },
    ]
  },
  {
    name: "Web full stack",
    _id: "145bcdfaat4",
    videos: [
      {
        name: "NodeJS",
        duration: "2:32"
      },
      {
        name: "React JS Introduction",
        duration: "21:04"
      },
      {
        name: "ReactJS Components",
        duration: "5:20"
      },
      {
        name: "ReactJS props and state",
        duration: "10:30"
      },
      {
        name: "Redux",
        duration: "1:05"
      },
    ]
  },
  {
    name: "Code Intesive",
    _id: "145bcdfaat6",
    videos: [
      {
        name: "Java",
        duration: "22:32"
      },
      {
        name: "OOP introduction",
        duration: "12:2"
      },
      {
        name: "Class & Objects",
        duration: "5:20"
      }
    ]
  }
]

export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLIST,
    payload: dummyPlaylist
  }
}