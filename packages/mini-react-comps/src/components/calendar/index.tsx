import cx from "classnames"
import { type CSSProperties, type FC, type ReactNode, useState } from "react"
import dayjs from "dayjs"
import MonthCalendar from "./MonthCalendar"
import styles from "./index.module.scss"
import CalendarHeader from "./CalendarHeader"
import LocaleContext from "./LocaleContext"
import type { Dayjs } from "dayjs"

export interface CalendarProps {
  value?: Dayjs
  style?: CSSProperties
  className?: string | string[]
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  // 国际化
  locale?: string
  onChange?: (date: Dayjs) => void
}

const Calendar: FC<CalendarProps> = (props) => {
  const {
    value = dayjs(Date.now()),
    style,
    className,
    locale,
    onChange,
  } = props

  const [curValue, setCurValue] = useState(value)
  const [curMonth, setCurMonth] = useState(value)

  const changeDate = (date: Dayjs) => {
    setCurValue(date)
    setCurMonth(date)
    onChange?.(date)
  }

  const selectHandler = (date: Dayjs) => changeDate(date)

  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, "month"))
  }

  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, "month"))
  }

  const todayHandler = () => changeDate(dayjs(Date.now()))

  return (
    <LocaleContext.Provider
      value={{
        locale: (locale || navigator.language).toLowerCase(),
      }}
    >
      <div className={cx(styles.calendar, className)} style={style}>
        <CalendarHeader
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          selectHandler={selectHandler}
          curMonth={curMonth}
        />
      </div>
    </LocaleContext.Provider>
  )
}

export default Calendar
