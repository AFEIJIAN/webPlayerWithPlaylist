let playlistSource = "http://127.0.0.1:8080";
let interval;

// check and play next song if song is ended playing
// this is the solution
function dryRun() {

	interval = setInterval( () => {

		// get the player and playlist (element)
		let player = document.getElementById("player");
		let playlist = document.getElementById("playlist");

		// first we check if player has ended playing song,
		// check interval should based on shortest length of songs
		// mostly 10ms or 100ms should be fine
		// if not ended playing, do not continue
		if ( !player.ended ) { return; }

		let upcoming;

		// find out div element of upcoming song from playlist
		// or simply the upcoming song, because my playlist itself is a div
		for (let i = 0; i < playlist.childNodes.length; i++) {

			song = playlist.childNodes[i];

			if ( song instanceof HTMLDivElement ) {
				// I stored currently playing songs at dataset element already, so it's easier to check
				// however this method is not recommended, as user can modify it
				// src of the song also stored in playlist element ald
				if ( player.dataset["currentSongs"] === song.dataset["src"] && song instanceof HTMLDivElement ) {

					upcoming = playlist.childNodes[i+1];
					break;
				}
			}
		}

		// if no more songs, exit and clear the interval to prevent window.alert keep calling
		if ( !upcoming || !(upcoming instanceof HTMLDivElement) ) { window.alert("No more songs!"); try { clearInterval(interval) } catch(err) {} return; }

		// change the src attribute of player using src of upcoming song
		player.src = upcoming.dataset["src"];

		// set the currently playing song
		player.dataset["currentSongs"] = upcoming.dataset["src"];

		// play the song
		player.play();

	}, 100)
}

function playSong(e) {

	let src = e.target.dataset["src"];

	if (!src) { console.error("Not audio source found in select element"); return; }

	let player = document.getElementById("player");

	if ( !(player instanceof HTMLAudioElement) ) { console.error("Target with ID 'player' is not an HTMLAudioElement"); }

	player.src = src;

	// simplest way to mark song is playing, not recommended
	player.dataset["currentSongs"] = src;

	player.play();

	dryRun();
}

function loadPlaylist() {

	fetch(playlistSource, {"method": "get"}).then( (res) => {

		if (res.status === 200) {

			res.json().then( (r) => {

				if ( !(r instanceof Object) ) { r = JSON.parse(r); }
				
				if ( !Array.isArray(r) ) { console.error("Response is not an Array: \n\n", r); return; }

				for (let s of r) {

					let e = document.createElement("div");
					e.classList.add("playlistSongs");
					e.onclick = playSong;

					// setting source url at HTMl src attribute is the most easy one,
					// but will be very dangerous
					e.dataset["src"] = s["src"];

					let txt = document.createTextNode(s["name"]);

					e.appendChild(txt);

					document.getElementById("playlist").appendChild(e);
				}
			});

		} else { console.error("Unable to fetch playlist: \n\n", res.status); }
	});
}