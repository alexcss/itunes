function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
		seconds = parseInt((duration / 1000) % 60),
		minutes = parseInt((duration / (1000 * 60)) % 60),
		hours = parseInt((duration / (1000 * 60 * 60)) % 24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return minutes + ":" + seconds;
}

;(function () {
	"use strict";

	var request = new XMLHttpRequest(),
		url,
		data;

	var searchForm = document.querySelector('.ba-search-form'),
		query = '';

	var tuneTmpl = document.getElementById('tune-tmpl').innerHTML,
		tunesContainer = document.querySelector('.ba-tunes-list'),
		tunesHTML,
		loader = document.querySelector('.ba-loader');

	searchForm.addEventListener('submit', function (event) {
		event.preventDefault();

		query = searchForm.search.value;

		url = 'https://itunes.apple.com/search?term=' + query + '&limit=20';

		tunesContainer.innerHTML = '';

		loader.classList.add('active');

		request.open('GET', url, true);
		request.send();
	});

	request.onload = function () {
		data = JSON.parse(this.response);
		console.log(data.results);

		tunesHTML = '';

		data.results.forEach(function (tune) {
			var duration = msToTime(tune.trackTimeMillis);

			tunesHTML += tuneTmpl
				.replace(/{{artworkUrl100}}/ig, tune.artworkUrl100)
				.replace(/100x100/ig, '300x300')
				.replace(/{{trackName}}/ig, tune.trackName)
				.replace(/{{previewUrl}}/ig, tune.previewUrl)
				.replace(/{{artistName}}/ig, tune.artistName)
				.replace(/{{collectionName}}/ig, tune.collectionName)
				.replace(/{{primaryGenreName}}/ig, tune.primaryGenreName)
				.replace(/{{collectionPrice}}/ig, tune.collectionPrice)
				.replace(/{{duration}}/ig, duration)
				.replace(/{{collectionViewUrl}}/ig, tune.collectionViewUrl)
				.replace(/{{song}}/ig, tune.song);

		});
		setTimeout(function () {
			loader.classList.remove('active');
			tunesContainer.innerHTML = tunesHTML;
		}, 1300);

	};

	// button actions
	document.addEventListener('click', function (event) {
		var actionButton = event.target;
		
		if (actionButton.dataset.action === 'play') {
			var tuneAudio = actionButton.parentNode.querySelector('audio');

			document.querySelectorAll('.ba-tune-play').forEach((btn)=>{
				actionButton != btn ? btn.classList.remove('pulse') : '';
			});
			document.querySelectorAll('audio').forEach((audio)=>{
				audio != tuneAudio ? audio.pause() : '';
			});

			actionButton.classList.toggle('pulse');
			
			console.log(tuneAudio);			
			tuneAudio.paused ? tuneAudio.play() : tuneAudio.pause();
		}
	}); 

})();