export const FETCH_PLAYLISTS = "Fetch playlists";

export const dummyPlaylist = [
  {
    name: "C4E Javasripts",
    _id: "145bcdfaat3",
    videos: [
      {
        _id: "1",
        youtubeId: "iME8kc0UTRQ",
        name: "Introduction",
        duration: "1:32"
      },
      {
        _id: "2",
        name: "Variables",
        youtubeId: "756eY9uMcGQ",
        duration: "2:04"
      },
      {
        _id: "3",
        name: "Functions",
        youtubeId: "1piQIeaSfF4",
        duration: "5:20"
      },
      {
        _id: "4",
        name: "DOM",
        youtubeId: "qV1ymkkJRb4",
        duration: "10:30"
      },
      {
        _id: "5",
        youtubeId: "AHwU--htjEQ",
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
        _id: "6",
        name: "NodeJS",
        youtubeId: "_Nm1RMGac28",
        duration: "2:32"
      },
      {
        _id: "7",
        name: "React JS Introduction",
        youtubeId: "_Nm1RMGac28",
        duration: "21:04"
      },
      {
        _id: "8",
        name: "ReactJS Components",
        youtubeId: "_Nm1RMGac28",
        duration: "5:20"
      },
      {
        _id: "9",
        name: "ReactJS props and state",
        youtubeId: "_Nm1RMGac28",
        duration: "10:30"
      },
      {
        _id: "10",
        name: "Redux",
        youtubeId: "_Nm1RMGac28",
        duration: "1:05"
      },
    ]
  },
  {
    name: "Code Intesive",
    _id: "145bcdfaat6",
    videos: [
      {
        _id: "11",
        name: "Java",
        youtubeId: "_Nm1RMGac28",
        duration: "22:32"
      },
      {
        _id: "12",
        name: "OOP introduction",
        youtubeId: "_Nm1RMGac28",
        duration: "12:2"
      },
      {
        _id: "13",
        name: "Class & Objects",
        youtubeId: "_Nm1RMGac28",
        duration: "5:20"
      }
    ]
  }
]

export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLISTS,
    payload: dummyPlaylist
  }
}