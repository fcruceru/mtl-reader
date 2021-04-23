// We need require to properly import some of these
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Selenium dependencies
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

// Caching
const NodeCache = require( "node-cache" );
const cache = new NodeCache({
    stdTTL: 600, // 10 mins
    checkperiod: 610 // TODO: Investigate changing this
});


export async function scrapeChapterList(series) {
    if (series !== 'martial-peak') { throw new Error("Invalid series name") }; // TODO: Un-ghetto this

    let bookId; // Needed for scraping chapter list
    switch (series) {
        case 'martial-peak':
            bookId = 439;
            break;
    }

    if (!bookId) { throw new Error("Could not get series ID.") }; // TODO: Maybe figure out a better way for this


    let chapters = [];
    // Checking for cache contents
    if (cache.get('chapters') !== undefined) {
        chapters = cache.get('chapters');
    }
    
    // Scrape
    else {
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

                if (html.substring(0,1) === '<') { // Skipping "Volume:" at the top
                    let a = await li.findElement(By.css('a'));
                    let url = await a.getAttribute('href');
                    let title = await a.getAttribute("innerHTML");
                    chapters.push({
                        title: title,
                        url: url // TODO: Index?
                    })
                }
                // Add to cache
                cache.mset([{key: "chapters", val: chapters}])
            }
        } catch (e) {
            console.log("Error occured\n", e.stack);
        }
        finally {
            await driver.quit();
        }
    }

    return chapters;
}