console.log("Ready to listen.");

require("http").createServer( (req, res) => {

    // add song list from here
    // name - Name of song, to be displayed
    // src - Directory/location of song, to be applied at src attribute of player,
    //       Please place it at frontend folder, because backend and frontend are separated
    let songsList = [
        {"name": "betterDays", "src": "/music/bensound-betterdays.mp3"},
        {"name": "dubStep", "src": "/music/bensound-dubstep.mp3"}
    ];

    res.setHeader("content-type", "application/json");
    // CORS
    // testing only, "*" is not recommended
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.end(JSON.stringify(songsList));
    return;

}).listen(8080);