import { useState } from 'react'
import './App.scss'

const items = {
  Car: 1301,
  Personal1: 300
}

function App() {

  const [credits, setCredits]: [Items, Function] = useState(items)

  const total = sum(credits)

  return (
    <div className='bar'>
      <div className="progress"></div>
      <div className="milestones">{
        Object.entries(credits).map(([name, c]: [string, number]) => {
          return <div className='stone' style={{ height: percent(c, total) }}>{c + " " + name}</div>
        })
      }
      </div>
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