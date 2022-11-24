const cheerio = require("cheerio");
const fetch = require('node-fetch');
const fs = require("fs");
const moment = require("moment");

fetch("https://news.ycombinator.com/newest")
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);

        //gather data
        const ids = [];
        $("tr.athing").each((i, element) => {
            const id = $(element).attr("id");
            ids.push(id);
        })
        
        const titles = [];
        $("span.titleline").each((i, element) => {
            const text = $(element).text();
            titles.push(text);
        })

        const scores = [];
        $("span.score").each((i, element) => {
            const score = $(element).text();
            scores.push(score);
        })

        const users = [];
        $("a.hnuser").each((i, element) => {
            const user = $(element).text();
            users.push(user);
        })

    
        // write to csv file
        let data = "Id, Title, Score, User\n";

        for (let i  = 0; i < titles.length; i++) {
            data += ` ${ids[i]}, ${titles[i]}, ${scores[i]}, ${users[i]}\n`;
        }

        const date = moment().format("DD-MM-YYYY");
        fs.appendFile(`./${date}.csv`, data, function(err) {
            console.log("The file was saved!");
        });
        fs.appendFile('./scrapedIds.csv', ids.join("\n"), function(err) {
            console.log("The file was saved!");
        });
    })

