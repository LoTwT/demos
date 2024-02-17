import styles from "./index.module.scss"

const CalendarHeader = () => {
  return (
    <div className={styles["calendar-header"]}>
      <div className={styles["calendar-header-left"]}>
        <div className={styles["calendar-header-icon"]}>&lt;</div>
        <div className={styles["calendar-header-value"]}>2023 年 11 月</div>
        <div className={styles["calendar-header-icon"]}>&gt;</div>
        <button className={styles["calendar-header-btn"]}>今天</button>
      </div>
    </div>
  )
}

export default CalendarHeader
