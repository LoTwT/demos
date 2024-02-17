import { useEffect, useRef } from "react"
import dayjs from "dayjs"
import MiniCalendar, { type MiniCalendarRef } from "./components/mini-calendar"
import Calendar from "./components/calendar"

const App = () => {
  const miniCalendarRef = useRef<MiniCalendarRef>(null)

  useEffect(() => {
    // console.log(miniCalendarRef.current?.getDate())
    // setTimeout(() => {
    //   miniCalendarRef.current?.setDate(new Date(2024, 1, 18))
    // }, 3000)
  }, [])

  return (
    <>
      <MiniCalendar ref={miniCalendarRef} />
      <Calendar value={dayjs("2024-02-17")} />
    </>
  )
}

export default App
