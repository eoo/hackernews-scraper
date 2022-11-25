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

        const times = [];
        $("span.age").each((i, element) => {
            const time = $(element).attr("title");
            times.push(time);
        })
    
        // write to csv file
        let headerRow = "Id, Title, Score, User, Time\n";
        const fileName = moment().format("DD-MM-YYYY") + ".csv";
        //
        if (!fs.existsSync(fileName))
            fs.writeFileSync(fileName, headerRow);

        const fileData = fs.readFileSync(fileName);
        let data = "";
        for (let i  = 0; i < titles.length; i++) {
            if (fileData.toString().includes(ids[i])) continue;
            data += ` ${ids[i]}, ${titles[i]}, ${scores[i]}, ${users[i]}, ${times[i]}\n`;
        }

        fs.appendFile(fileName, data, function(err) {
            console.log("The file was saved!");
        });
    })

