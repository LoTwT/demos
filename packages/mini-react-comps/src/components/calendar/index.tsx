import MonthCalendar from "./MonthCalendar"
import styles from "./index.module.scss"
import CalendarHeader from "./CalendarHeader"
import type { FC } from "react"
import type { Dayjs } from "dayjs"

export interface CalendarProps {
  value: Dayjs
}

const Calendar: FC<CalendarProps> = (props) => {
  return (
    <div className={styles.calendar}>
      <CalendarHeader />
      <MonthCalendar {...props} />
    </div>
  )
}

export default Calendar
