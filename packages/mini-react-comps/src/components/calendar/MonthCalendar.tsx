import styles from "./index.module.scss"
import type { Dayjs } from "dayjs"
import type { FC } from "react"
import type { CalendarProps } from "."

const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

interface MonthCalendarProps extends CalendarProps {}

interface DaysInfo {
  date: Dayjs
  currentMonth: boolean
}

const getAllDays = (date: Dayjs) => {
  const startDate = date.startOf("month")
  const day = startDate.day()

  const daysInfo = Array.from<DaysInfo>({
    length: 6 * 7,
  })

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    }
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day")

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    }
  }

  return daysInfo
}

const renderDays = (days: DaysInfo[]) => {
  const rows = []

  for (let i = 0; i < 6; i++) {
    const row = []

    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j]
      row[j] = (
        <div
          key={item.date.format("YYYY-MM-DD")}
          className={`${styles["calendar-month-body-cell"]}${item.currentMonth ? ` ${styles["calendar-month-body-cell-current"]}` : ""}`}
        >
          {item.date.date()}
        </div>
      )
    }

    rows.push(
      <div key={`row-${i}`} className={styles["calendar-month-body-row"]}>
        {row}
      </div>,
    )
  }

  return rows
}

const MonthCalendar: FC<MonthCalendarProps> = (props) => {
  const { value } = props

  const allDays = getAllDays(value)

  return (
    <div className={styles["calendar-month"]}>
      <div className={styles["calendar-month-week-list"]}>
        {weekList.map((week) => (
          <div key={week} className={styles["calendar-month-week-list-item"]}>
            {week}
          </div>
        ))}
      </div>
      <div className={styles["calendar-month-body"]}>{renderDays(allDays)}</div>
    </div>
  )
}

export default MonthCalendar
