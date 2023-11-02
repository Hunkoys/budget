import express from "express"
export const app = express();

app.use(express.json())

app.get('/hi', (req, res) => res.json({ greeting: 'Hello' }))

let credits = {
    text: ''
}
let wants = {
    text: ''
}
let earned = {
    text: ''
}

app.get('/api/credits', (req, res) => {
    res.json(credits)
})

app.post('/api/credits', (req, res) => {
    credits = req.body
    res.status(204).send()
})

app.get('/api/wants', (req, res) => {
    res.json(wants)
})

app.post('/api/wants', (req, res) => {
    wants = req.body
    res.status(204).send()
})

app.get('/api/earned', (req, res) => {
    res.json(earned)
})

app.post('/api/earned', (req, res) => {
    earned = req.body
    res.status(204).send()
})

if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}
