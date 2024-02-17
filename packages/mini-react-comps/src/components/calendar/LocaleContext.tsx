import { createContext } from "react"

export interface LocaleContextType {
  locale: string
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "zh-cn",
})

export default LocaleContext
