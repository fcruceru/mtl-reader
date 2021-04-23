// We need require to properly import some of these
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Selenium dependencies
const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

// Caching
const NodeCache = require("node-cache");
const cache = new NodeCache({
    stdTTL: 600, // 10 mins
    checkperiod: 610 // TODO: Investigate changing this
});

async function getPageCount(series, driver, url) { // TODO: Replace with better permanent solution
    let maxPages = 0;
    try {
        await driver.get(url);
        let div = await driver.findElement(By.className('pages clear'));
        for (let li of await div.findElements(By.css('a'))) {
            maxPages++; // Ghetto?
        }
    } catch (error) {
        console.log("Error occured\n", error.stack);
    }

    // Adding to cache
    console.log("Got page count of " + maxPages + " for series " + series);
    cache.mset([{ key: `${series}-pagecount`, val: maxPages }])
    return maxPages;
}


export async function scrapeChapterList(series, page) {
    if (series !== 'martial-peak') { throw new Error("Invalid series name.") }; // TODO: Un-ghetto this
    if (page === undefined) { throw new Error("Must give a page number.") };

    let pageUrl;
    switch (series) {
        case 'martial-peak':
            pageUrl = 'https://sj.uukanshu.com/book.aspx?id=439';
            break;
    }

    let chapters = [];
    let maxPages;
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--headless'))
        .build();

    // Checking for page count in cache
    if (cache.get(`${series}-pagecount`) !== undefined) {
        maxPages = cache.get(`${series}-pagecount`);
    }
    else { // Getting page count
        maxPages = await getPageCount(series, driver, pageUrl);
    }

    // Get chapter list from cache
    if (cache.get(`${series}-chapters-${page}`) !== undefined) {
        chapters = cache.get(`${series}-chapters-${page}`);
    }

    // Scrape
    else {
        // Return first page + maxPages? still like 40s lol
        // when loading one page, send request to cache next page (ghetto but hey)
        // Getting chapter list from page
        try {
            // Getting div element with links to all pages
            console.log("Scraping chapter list for page " + page);
            await driver.get(pageUrl + `&page=${page}`);
            let ul = await driver.findElement(By.id('chapterList'));
            for (let li of await ul.findElements(By.css('li'))) {
                let html = await li.getAttribute('innerHTML');

                if (html.substring(0, 1) === '<') { // Skipping "Volume:" at the top
                    let a = await li.findElement(By.css('a'));
                    let url = await a.getAttribute('href');
                    let title = await a.getAttribute("innerHTML");
                    chapters.push({
                        title: title,
                        url: url // TODO: Index?
                    })
                }
                // Add to cache
                cache.mset([{ key: `${series}-chapters-${page}`, val: chapters }])
            }
        } catch (e) {
            console.log("Error occured\n", e.stack);
        }
        finally {
            await driver.quit();
        }
    }

    return {
        chapters,
        maxPages
    };
}