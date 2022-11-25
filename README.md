# NodeJS Task Specification: Hackernews website scrapping

Scraping is the process of retrieving HTML information from web and parsing the webpage DOM to
extract some information. Hackernews website provides a list of tech related news articles. We need
to scrape data from hackernews website and store the data into CSV files, and create a simple
express server to access this info using REST API. 

## Following requirements should be kept in mind:
- Program should keep checking for any latest news every 15 minutes. So if the program
started and completed first iteration on 7/8/2022 10:30PM, it should check for more latest news
articles at 7/8/2022 10:45PM, 11:00PM, and so on.

  This is achieved using CRON jobs, crontable file is added to the repo

IMPORTANT NOTE: Program should not resave data scraped in a previous iteration in next
iteration, only the new entries not scraped previously. 

  Each article is given a ID, using that the program makes sure to not save that article if it has already been saved

- Information like article title, author, date uploaded, number of comments and number of
points (upvotes) should be extracted from the page.

This works as expected, all the details are saved to CSV file

- Information is to be saved in a CSV file according to date. Eg: "7-8-2022.csv" should contain
all news articles scraped on that date. Next date articles must be stored in "8-8-2022.csv" and so on.

Works as Expected

- Make a express server that exposes a single GET API "/news/<date>" to return a JSON array
of news articles details for that given date. The JSON fields should be same as CSV headers used
inside csv files.

startup the server using node server.js

GET localhost:3000/news/25-11-2022

This will return an array data scraped for given date
