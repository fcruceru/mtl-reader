// Express
import express from 'express';
const app = express();
const port = 3000;

// Utils
import { scrapeChapterList } from "./scrape.js";

app.get('/', (req, res) => {
    res.send('Working Connection')
})

app.get('/chapter-list', (req, res) => {
    let series = req.query.series;
    let chapterList = scrapeChapterList(series);
    
    res.send(chapterList);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})