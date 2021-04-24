// Express
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// Utils
import { scrapeChapterList } from "./scrape.js";
import { translateUsingDeepl } from "./utils.js";

// We need require to properly import some of these
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Setting CORS on all requests
app.use(cors());


app.get('/', (req, res) => {
    res.send('Working Connection')
})

app.get('/chapter-list', async (req, res) => {
    let series = req.query.series;
    let page = req.query.page;
    let chapterList = await scrapeChapterList(series, page);
    chapterList.chapters = chapterList.chapters.slice(0, 5);
    let textToTranslate = chapterList.chapters.map(x => x.title).join(' | ');
    let translatedText = await translateUsingDeepl(textToTranslate);
    let translatedChapters = translatedText.split(' | ');
    for (let i = 0; i < chapterList.chapters.length; i++) {
        chapterList.chapters[i].title = translatedChapters[i];
        chapterList.chapters[i].index = i + 1; // Setting chapter number
    }

    res.send(chapterList);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})