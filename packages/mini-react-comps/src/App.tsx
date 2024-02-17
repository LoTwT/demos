import { useEffect, useRef } from "react"
import MiniCalendar, { type MiniCalendarRef } from "./components/mini-calendar"

const App = () => {
  const miniCalendarRef = useRef<MiniCalendarRef>(null)

  useEffect(() => {
    console.log(miniCalendarRef.current?.getDate())

    setTimeout(() => {
      miniCalendarRef.current?.setDate(new Date(2024, 1, 18))
    }, 3000)
  }, [])

  return (
    <>
      <MiniCalendar ref={miniCalendarRef} />
    </>
  )
}

export default App
