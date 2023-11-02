import { useCallback, useEffect, useState } from 'react'
import './App.scss'


function App() {

  const [credits, setCredits]: [Items, Function] = useState({})
  const [wants, setWants]: [Items, Function] = useState({})
  const [earned, setEarned] = useState(0)

  useEffect(() => {
    retrieve('credits').then(({ text }) => {
      setCreditsText(text)
      setCredits(parseData(text))
    })
  }, [])

  const [creditsText, setCreditsText] = useState()
  const [wantsText, setWantsText] = useState()
  const creditsOnChange = useCallback((e: any) => {
    const val = e.target.value;
    setCreditsText(val)
    setCredits(parseData(val))
    send('credits', { text: val })
  }, [])
  const wantsOnChange = useCallback((e: any) => {
    setWantsText(e.target.value)
    setWants(parseData(e.target.value))
  }, [])

  const onChange = useCallback((e: any) => setEarned(e.target.value), [])

  const total = sum(credits) + sum(wants)

  return (
    <div className="app">
      <div className='chart'>
        <div className="progress">
          <div className="bar" style={{ height: percent(earned, total) }}></div>
        </div>
        <div className="milestones">{
          Object.entries({ ...credits, ...wants }).reverse().map(([name, c]: [string, number]) => {
            return <div className='stone' style={{ height: percent(c, total) }}>{name + " " + c}</div>
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
    if (key)
      items[key] = Number(value)
  }))

  return items
}


function sum(list: Items): number {
  const array = Object.values(list)

  if (array.length)
    return array.reduce((p: number, c: number) => {
      return p + c
    })
  else return Number(0)
}

function percent(n: number, cent: number): string {
  return n / cent * 100 + "%"
}



async function retrieve(url: string) {
  const res = await fetch('/api/' + url);
  return await res.json();
}

async function send(url: string, data: any) {
  const res = await fetch('/api/' + url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return res.json()
}
