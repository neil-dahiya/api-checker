const express = require('express')
const app = express()
const fs = require("fs");
app.use(express.json())

app.get("/", (req, res)=>{
    const data = fs.readFileSync('count.txt', {encoding:'utf8', flag:'r'})
    console.log(data);
    res.json({calls: data})
})

app.post('/incCount', (req, res)=>{
    const data = fs.readFileSync('count.txt', {encoding:'utf8', flag:'r'})
    console.log(parseInt(data)+1);
    const ans = parseInt(data)+1
    fs.writeFileSync("count.txt", ans);
    res.json({calls: ans})
})

app.put('reset', (req, res)=>{
    fs.writeFileSync("count.txt", 0);
    res.json({calls: 0})
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Started server");
})