import { type FC, useContext } from "react"
import styles from "./index.module.scss"
import LocaleContext from "./LocaleContext"
import allLocales from "./locale"
import type { Dayjs } from "dayjs"

interface CalendarHeaderProps {
  curMonth: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}

const CalendarHeader: FC<CalendarHeaderProps> = (props) => {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props

  const localeContext = useContext(LocaleContext)
  const CalendarContext = allLocales[localeContext.locale]

  return (
    <div className={styles["calendar-header"]}>
      <div className={styles["calendar-header-left"]}>
        <div
          className={styles["calendar-header-icon"]}
          onClick={prevMonthHandler}
        >
          &lt;
        </div>
        <div className={styles["calendar-header-value"]}>
          {curMonth.format(CalendarContext.formatMonth)}
        </div>
        <div
          className={styles["calendar-header-icon"]}
          onClick={nextMonthHandler}
        >
          &gt;
        </div>
        <button
          className={styles["calendar-header-btn"]}
          onClick={todayHandler}
        >
          {CalendarContext.today}
        </button>
      </div>
    </div>
  )
}

export default CalendarHeader
