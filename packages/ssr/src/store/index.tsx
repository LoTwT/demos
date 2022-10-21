import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { demoReducer } from "@/pages/Demo/store"

export const clientStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export const serverStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
