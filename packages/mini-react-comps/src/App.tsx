import { useEffect, useRef } from "react"
import { create } from "zustand"
import MiniCalendar, { type MiniCalendarRef } from "./components/mini-calendar"
import Calendar from "./components/calendar"
import ZustandTest from "./components/zustand-test"

export const useZustandStore = create((set) => ({
  a: "",
  b: "",
  updateA: (v: string) => set(() => ({ a: v })),
  updateB: (v: string) => set(() => ({ b: v })),
}))

useZustandStore.subscribe(console.log)

const App = () => {
  const miniCalendarRef = useRef<MiniCalendarRef>(null)

  useEffect(() => {
    // console.log(miniCalendarRef.current?.getDate())
    // setTimeout(() => {
    //   miniCalendarRef.current?.setDate(new Date(2024, 1, 18))
    // }, 3000)
  }, [])

  const a = useZustandStore((state: any) => state.a)
  const updateA = useZustandStore((state: any) => state.updateA)

  return (
    <>
      <MiniCalendar ref={miniCalendarRef} />
      <Calendar />
      <input
        type="text"
        value={a}
        onChange={(e) => updateA(e.currentTarget.value)}
      />
      <ZustandTestWrapper />
    </>
  )
}

export default App

function ZustandTestWrapper() {
  return (
    <div>
      <ZustandTest />
    </div>
  )
}
