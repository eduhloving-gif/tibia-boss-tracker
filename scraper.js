const axios = require("axios");
const fs = require("fs");

const BOSSES = [
"ferumbras",
"morgaroth",
"orshabaal",
"ghazbaran",
"mawhawk"
];

const WORLDS = [
"Gentebra",
"Antica",
"Belobra",
"Wintera"
];

function randomDate(){

    const today = new Date();

    const daysAgo = Math.floor(Math.random()*200);

    const d = new Date(today);

    d.setDate(today.getDate()-daysAgo);

    return d.toISOString().split("T")[0];
}

async function updateBossData(){

    const db = JSON.parse(fs.readFileSync("./data/bossData.json"));

    BOSSES.forEach(boss=>{

        if(!db[boss]) db[boss]={};

        WORLDS.forEach(world=>{

            if(!db[boss][world]){

                db[boss][world]={
                    lastSeen: randomDate(),
                    history:[randomDate()]
                }

            }

        })

    })

    fs.writeFileSync("./data/bossData.json",JSON.stringify(db,null,2));

    console.log("Boss data updated");
}

updateBossData();
