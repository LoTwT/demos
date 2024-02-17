import {
  type ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react"
import "./index.css"

const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
]

const daysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

interface MiniCalendarProps {
  value?: Date
  onChange?: (date: Date) => void
}

export interface MiniCalendarRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const MiniCalendar: ForwardRefRenderFunction<
  MiniCalendarRef,
  MiniCalendarProps
> = (props, ref) => {
  const { value = new Date(), onChange } = props

  const [date, setDate] = useState(value)

  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (date) => setDate(date),
  }))

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  const renderDays = () => {
    const days = []

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>)
    }

    for (let i = 1; i <= daysCount; i++) {
      const isSelected = i === date.getDate()

      const clickHandler = onChange?.bind(
        null,
        new Date(date.getFullYear(), date.getMonth(), i),
      )

      days.push(
        <div
          key={i}
          className={`day${isSelected ? " selected" : ""}`}
          onClick={clickHandler}
        >
          {i}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  )
}

export default forwardRef(MiniCalendar)
