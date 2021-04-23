const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Working Connection')
})

app.get('/chapter-list', (req, res) => {
    let series = req.query.series;

    res.send(series);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})