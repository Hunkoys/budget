import { useCallback, useState } from 'react'
import './App.scss'

const creditItems = {
  Car: 1301,
  Personal1: 300
}

const wantItems = {
  Macbook: 2500,
  Xreal: 400
}

function App() {

  const [credits, setCredits]: [Items, Function] = useState(creditItems)
  const [wants, setWants]: [Items, Function] = useState(wantItems)
  const [earned, setEarned] = useState(0)

  const onChange = useCallback((e: any) => setEarned(e.target.value), [])

  const total = sum(credits) + sum(wants)

  return (
    <div className='chart'>
      <div className="progress">
        <div className="bar" style={{ height: percent(earned, total) }}></div>
      </div>
      <div className="milestones">{
        Object.entries({ ...credits, ...wants }).reverse().map(([name, c]: [string, number]) => {
          return <div className='stone' style={{ height: percent(c, total) }}>{c + " " + name}</div>
        })
      }
      </div>
      <input type="text" onChange={onChange} value={earned} />
    </div>
  )
}

export default App

interface Items {
  [index: string]: number;
}

function sum(list: Items): number {
  return Object.values(list).reduce((p: number, c: number) => {
    return p + c
  })
}

function percent(n: number, cent: number): string {
  return n / cent * 100 + "%"
}