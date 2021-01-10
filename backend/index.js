console.log("Ready to listen.");

require("http").createServer( (req, res) => {

    // Music from:
    // https://www.bensound.com/royalty-free-music/2
    // just for testing, no intention to redistribute
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