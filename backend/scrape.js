import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');


export async function scrapeChapterList(series) {
    if (series !== 'martial-peak') { throw new Error("Invalid series name") }; // TODO: Un-ghetto this

    let bookId; // Needed for scraping chapter list
    switch (series) {
        case 'martial-peak':
            bookId = 439;
            break;
    }

    if (!bookId) { throw new Error("Could not get series ID.") }; // TODO: Maybe figure out a better way for this

    // Scrape
    let chapters = [];
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--headless'))
        .build();
    try {
        // Getting div element with links to all pages
        await driver.get(`https://sj.uukanshu.com/book.aspx?id=${bookId}`);
        let ul = await driver.findElement(By.id('chapterList'));
        for (let li of await ul.findElements(By.css('li'))) {
            let html = await li.getAttribute('innerHTML');

            console.log(html)
            if (html.substring(0,1) === '<') { // Skipping "Volume:" at the top
                let id = await li.getAttribute("id")
                console.log(id)
                console.log(await li.getAttribute("href"))
                let a = await li.findElement(By.css('a'));
                let url = await a.getAttribute('href');
                let title = await a.getAttribute("innerHTML");
                chapters.push({
                    title: title,
                    url: url // TODO: Index?
                })
            }
        }
    } catch (e) {
        console.log("Error occured\n", e.stack);
    }
    finally {
        await driver.quit();
    }

    return chapters;
}