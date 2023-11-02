import { useCallback, useEffect, useState } from 'react'
import './App.scss'
import cl from './utils/cl'


function App() {

  const [dbCreditsText, setDbCreditsText] = useState("")
  const [dbWantsText, setDbWantsText] = useState("")
  const [dbEarned, setDbEarned] = useState(0)

  const [credits, setCredits]: [Items, Function] = useState({})
  const [wants, setWants]: [Items, Function] = useState({})
  const [earned, setEarned] = useState(0)

  const [creditsText, setCreditsText] = useState("")
  const [wantsText, setWantsText] = useState("")

  useEffect(() => {
    retrieve('credits').then(({ text }) => {
      setDbCreditsText(text)
    })
    retrieve('wants').then(({ text }) => {
      setDbWantsText(text)
    })
    retrieve('earned').then(({ text }) => {
      setDbEarned(Number(text))
    })
  }, [])


  const creditsOnChange = useCallback((e: any) => {
    const val = e.target.value;
    setCreditsText(val)
    setCredits(parseData(val))
  }, [])
  const wantsOnChange = useCallback((e: any) => {
    const val = e.target.value;
    setWantsText(val)
    setWants(parseData(val))
  }, [])
  const onChange = useCallback((e: any) => setEarned(Number(e.target.value)), [])

  useEffect(() => {
    creditsOnChange({ target: { value: dbCreditsText } })
  }, [dbCreditsText])
  useEffect(() => {
    wantsOnChange({ target: { value: dbWantsText } })
  }, [dbWantsText])
  useEffect(() => {
    setEarned(Number(dbEarned))
  }, [dbEarned])

  const onSave = useCallback(() => {
    send('credits', { text: creditsText }).then(({ ok }) => ok && setDbCreditsText(creditsText))
    send('wants', { text: wantsText }).then(({ ok }) => ok && setDbWantsText(wantsText))
    send('earned', { text: earned }).then(({ ok }) => ok && setDbEarned(earned))
  }, [creditsText, wantsText, earned])

  const total = sum(credits) + sum(wants)

  return (
    <div className="app">
      <div className='chart'>
        <div className="progress">
          <div className="bar" style={{ height: percent(earned, total) }}></div>
        </div>
        <div className="milestones">{
          Object.entries({ ...credits, ...wants }).reverse().map(([name, c]: [string, number]) => {
            return <div className='stone' key={name + c} style={{ height: percent(c, total) }}>{name + " " + c}</div>
          })
        }
        </div>
      </div>
      <div className="data">
        <textarea className={cl("textarea", dbCreditsText != creditsText ? "outdated" : "")} value={creditsText} onChange={creditsOnChange} ></textarea>
        <textarea className={cl("textarea", dbWantsText != wantsText ? "outdated" : "")} value={wantsText} onChange={wantsOnChange} ></textarea>
        <input type="number" className={cl("textarea", dbEarned != earned ? "outdated" : "")} onChange={onChange} value={earned} />
        <button onClick={onSave}>Save</button>
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

  return res
}
