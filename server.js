const express = require('express');
const app = express();
const port = 3000;
const csv = require('csvtojson')

app.get('/', (req, res) => {
    const date = req.query.date;
    const fileName = `${date}.csv`;

    csv()
    .fromFile(fileName)
    .then((jsonObj)=>{
        console.log(jsonObj);
        res.json(jsonObj);
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})