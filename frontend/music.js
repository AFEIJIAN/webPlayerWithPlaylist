let playlistSource = "http://127.0.0.1:8080";
let interval;

// check and play next song if song is ended playing
function dryRun() {

	interval = setInterval( () => {

		let player = document.getElementById("player");
		let playlist = document.getElementById("playlist");

		if ( !player.ended ) { return; }

		let upcoming;

		// find out div element of upcoming song from playlist
		for (let i = 0; i < playlist.childNodes.length; i++) {

			song = playlist.childNodes[i];

			if ( song instanceof HTMLDivElement ) {
				if ( player.dataset["currentSongs"] === song.dataset["src"] && song instanceof HTMLDivElement ) {

					upcoming = playlist.childNodes[i+1];
					break;
				}
			}
		}

		if ( !upcoming || !(upcoming instanceof HTMLDivElement) ) { window.alert("No more songs!"); try { clearInterval(interval) } catch(err) {} return; }

		player.src = upcoming.dataset["src"];

		player.dataset["currentSongs"] = upcoming.dataset["src"];

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