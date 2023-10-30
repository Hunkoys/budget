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

  const [credits, setCredits]: [Items, Function] = useState({})
  const [wants, setWants]: [Items, Function] = useState({})
  const [earned, setEarned] = useState(0)

  const [creditsText, setCreditsText] = useState()
  const [wantsText, setWantsText] = useState()
  const creditsOnChange = useCallback((e: any) => {
    setCreditsText(e.target.value)
    setCredits(parseData(e.target.value))
  }, [])
  const wantsOnChange = useCallback((e: any) => {
    setWantsText(e.target.value)
    setWants(parseData(e.target.value))
  }, [])

  const onChange = useCallback((e: any) => setEarned(e.target.value), [])

  const total = sum(credits) + sum(wants)
  console.log(total);


  return (
    <div className="app">
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
      <div className="data">
        <textarea className="credits" value={creditsText} onChange={creditsOnChange} ></textarea>
        <textarea className="wants" value={wantsText} onChange={wantsOnChange} ></textarea>
      </div>
    </div>
  )
}

export default App

interface Items {
  [index: string]: number;
}

function parseData(data: string): Items {
  const list: any = data.split('\n').map(item => item.split(' '));
  const items: Items = {}
  list.forEach((([key, value]: [string, number]) => {
    items[key] = Number(value)
  }))
  console.log(items);

  return items
}


function sum(list: Items): number {
  const array = Object.values(list)
  console.log(array.length)
  if (array.length)
    return array.reduce((p: number, c: number) => {
      return p + c
    })
  else return Number(0)
}

function percent(n: number, cent: number): string {
  return n / cent * 100 + "%"
}