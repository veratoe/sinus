var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var lx, ly; 

function drawLine(x,y) {

	ctx.beginPath();
	ctx.strokeStyle="#000000";
	ctx.lineWidth = 1;
	ctx.moveTo(lx, ly);
	ctx.lineTo(x, y);
	ctx.stroke();

	lx = x; ly = y;


}

function drawPixel(x, y, r, g, b) {

	var index = (y * canvas.width + x) * 4;
	imageData.data[index + 0] = r;
	imageData.data[index + 1] = g;
	imageData.data[index + 2] = b;
	imageData.data[index + 3] = 255;

}

function fade() {

	var i = ctx.getImageData(0, 0, canvas.width, canvas.height)

	for (x = 0; x < canvas.width; x++) {
		for (y = 0; y< canvas.height; y++) {
			i.data[ (y * canvas.width + x) * 4 + 3] *= 0.985;
		}
	}

	ctx.putImageData(i, 0, 0);
}

function drawAxes() {

	ctx.beginPath();
	ctx.strokeStyle="#f8cccc";
	ctx.lineWidth = 1;
	ctx.moveTo(300, 50);
	ctx.lineTo(300, 550);
	ctx.stroke();

	ctx.moveTo(50, 300)
	ctx.lineTo(550, 300)
	ctx.stroke();

	ctx.fillText('x', 550, 310)
	ctx.fillText('y', 310, 50)

}

var a = 0;
var step = 5;

var drawInterval = setInterval(function () {

	drawAxes();
	fade();

	for ( b = 0; b < step; b++) {
		var x = 300 + ( 0.789 + Math.sin(a / 1000) * Math.sin(( 6* a / 1250  *  Math.PI) - 0.5) * 250);
		var y = 300 + (Math.cos((a - 1000) / 1000 * Math.PI) * Math.cos(7 * a / 1000 * Math.PI) * 250);
		//drawPixel(x | 0 , y | 0, 0, 0, 0);
		//ctx.putImageData(imageData, 0, 0)
		a++;
	}

	drawLine(x, y);

}, 10);

setTimeout(function () { 
	window.onkeyup = function () { clearInterval(drawInterval) }
}, 1000);
