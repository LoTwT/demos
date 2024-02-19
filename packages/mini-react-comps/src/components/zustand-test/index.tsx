import { useZustandStore } from "../../App"

const ZustandTest = () => {
  const a = useZustandStore((state: any) => state.a)

  return <div>ZustandTest-a: {a}</div>
}

export default ZustandTest
