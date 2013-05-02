var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
	backgroundReady = true;
};
backgroundImage.src = "images/background.png";

var render = function() {
	if (backgroundReady) {
		context.drawImage(backgroundImage, 0, 0);
	}
};

var main = function() {
	render();
};

setInterval(main, 1);
