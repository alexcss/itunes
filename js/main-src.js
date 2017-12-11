function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

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

	url = 'https://itunes.apple.com/search?term=sysytem&limit=5';

	request.open('GET', url, true);

	request.onload = function () {
		data = JSON.parse(this.response);
		console.log(data.results);

		data.results.forEach(function (tune) {
			// console.log(tune);
			var audio = '<p>' + tune.artistName + " - " + tune.trackCensoredName + "</p>";
			// audio += "<audio preload='auto' controls src='" + tune.previewUrl + "'>";

			// document.querySelector('.ba-tunes-list').innerHTML += audio;
		});
	};
	request.send();

})();