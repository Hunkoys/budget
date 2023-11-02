import express from "express"
export const app = express();

app.use(express.json())

app.get('/hi', (req, res) => res.json({ greeting: 'Hello' }))

let credits = {
    text: 'Amazon 5485'
}

app.get('/api/credits', (req, res) => {
    res.json(credits)
})

app.post('/api/credits', (req, res) => {
    credits = req.body
})

if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}
