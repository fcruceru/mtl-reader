// Express
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// Utils
import { scrapeChapterList } from "./scrape.js";

// Setting CORS on all requests
app.use(cors());


app.get('/', (req, res) => {
    res.send('Working Connection')
})

app.get('/chapter-list', async (req, res) => {
    let series = req.query.series;
    let chapterList = await scrapeChapterList(series);

    res.send(chapterList);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})