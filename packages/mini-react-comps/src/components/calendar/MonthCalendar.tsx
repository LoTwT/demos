import cx from "classnames"
import { type FC, useContext } from "react"
import styles from "./index.module.scss"
import LocaleContext from "./LocaleContext"
import allLocales from "./locale"
import type { Dayjs } from "dayjs"
import type { CalendarProps } from "."

const weekList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void
  curMonth: Dayjs
}

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

const renderDays = (
  value: Dayjs,
  dateRender: MonthCalendarProps["dateRender"],
  dateInnerContent: MonthCalendarProps["dateInnerContent"],
  selectHandler: MonthCalendarProps["selectHandler"],
  curMonth: Dayjs,
) => {
  const days = getAllDays(curMonth)

  const rows = []

  for (let i = 0; i < 6; i++) {
    const row = []

    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j]
      row[j] = (
        <div
          key={item.date.format("YYYY-MM-DD")}
          className={cx(styles["calendar-month-body-cell"], {
            [styles["calendar-month-body-cell-current"]]: item.currentMonth,
          })}
          onClick={() => selectHandler?.(item.date)}
        >
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className={styles["calendar-month-body-cell-date"]}>
              <div
                className={cx(styles["calendar-month-cell-body-date-value"], {
                  [styles["calendar-month-body-cell-date-selected"]]:
                    value.format("YYYY-MM-DD") ===
                    item.date.format("YYYY-MM-DD"),
                })}
              >
                {item.date.date()}
              </div>
              <div className={styles["calendar-month-cell-body-date-content"]}>
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
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
  const { value, dateRender, dateInnerContent, selectHandler, curMonth } = props

  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]

  return (
    <div className={styles["calendar-month"]}>
      <div className={styles["calendar-month-week-list"]}>
        {weekList.map((week) => (
          <div key={week} className={styles["calendar-month-week-list-item"]}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className={styles["calendar-month-body"]}>
        {renderDays(
          value!,
          dateRender,
          dateInnerContent,
          selectHandler,
          curMonth,
        )}
      </div>
    </div>
  )
}

export default MonthCalendar
