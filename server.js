const express = require("express");
const fs = require("fs");
const cron = require("node-cron");

const app = express();

app.use(express.static("public"));

function loadBossData(){

    return JSON.parse(
        fs.readFileSync("./data/bossData.json")
    );

}

app.get("/api/bosses",(req,res)=>{

    const data = loadBossData();

    res.json(data);

});

cron.schedule("0 */6 * * *",()=>{

    console.log("Auto updating boss data");

    require("./scraper");

});

app.listen(3000,()=>{

    console.log("Server running on port 3000");

});
