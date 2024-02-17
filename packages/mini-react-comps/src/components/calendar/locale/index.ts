import zhCN from "./zh-cn"
import enUS from "./en-us"
import type { CalendarType } from "./interface"

const allLocales: Record<string, CalendarType> = {
  "zh-cn": zhCN,
  "en-us": enUS,
}

export default allLocales
