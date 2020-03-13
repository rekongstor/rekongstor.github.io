var canvas = document.createElement("canvas");
canvas.setAttribute("width","600");
canvas.setAttribute("height", "400");
document.body.appendChild(canvas);
var img_counter = 0;




HTMLCanvasElement.prototype.renderImage = function (blob, x, y, w, h) {

	var ctx = this.getContext('2d');
	var img = new Image();

	img.onload = function () {
		ctx.drawImage(img, x, y, w, h);
		img_counter++;
		if (img_counter == 4) {
			var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
				targetUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=text'
			fetch(proxyUrl + targetUrl)
				.then(blob => blob.text())
				.then(data => {
					setCanvasText(data);
				});
		}
	}

	img.src = URL.createObjectURL(blob);
}

async function pic(x, y, w, h) {
	let ret = fetch('https://picsum.photos/300/200')
		.then((resp) => resp.blob())
		.then(function (blob) {
			canvas.renderImage(blob, x, y, w, h);
		});
	return ret
}

function setCanvasText(text) {
	var ctx = canvas.getContext("2d");
	ctx.textAlign = "center";
	ctx.strokeStyle = "black";
	ctx.textBaseline = "top";
	ctx.fillStyle = "rgba(255,255,255,0.3)";
	ctx.fillRect(0, 0, 600, 400);
	ctx.fillStyle = "white";
	var spl = (text+"").split(" ");



	var size = 50; // начальный размер текста
	var cur_t = 0; // указатель на слово
	var ln = 0; // кол-во строк
	do { // считаем строки
		ctx.font = "bold " + size + "px Courier";
		// построить строку
		var line = " ";
		while (true) {
			var new_text = line + spl[cur_t++] + " ";
			var tm = ctx.measureText(new_text);
			if (tm.width > 600) // если перескочили за границы, то прекратить
			{
				--cur_t;
				break;
			}
			else {
				line = new_text;
			}
			if (cur_t >= spl.length) // если кончились слова, то прекратить строить линию
				break;
		} // на выходе строчка
		if (cur_t >= spl.length) // если кончились слова, то проверяем
		{
			if (ln+1 >= 400 / size) // если строк больше чем нужно, то уменьшаем шрифт и продолжаем
			{
				size--;
				cur_t = 0;
				ln = 0;
				continue;
			}
			else
				break; // если строк нормально и закончились слова, то мы нашли наш размер
		}
		if (line == " ") { // если строка в принципе не помещается, то уменьшить шрифт
			size--;
			cur_t = 0;
			ln = 0;
			continue;
		}
		ln++;
	} while (size > 0);
	ln++;
	if (size < 0)
		return;

	cur_t = 0;
	var inner_padding = (400 - (ln * size)) / 2;
	ln = 0;
	ctx.font = "bold " + size + "px Courier";
	ctx.lineWidth = 1.5 * size / 50;
	while (true) {
		// заново строим строки
		var line = " ";
		while (true) {
			var new_text = line + spl[cur_t++] + " ";
			var tm = ctx.measureText(new_text);
			if (tm.width > 600) // если перескочили за границы, то прекратить
			{
				--cur_t;
				break;
			}
			else {
				line = new_text;
			}
			if (cur_t >= spl.length) // если кончились слова, то прекратить строить линию
				break;
		} // на выходе строчка
		ctx.fillText(line, 300, inner_padding + size * ln);
		ctx.strokeText(line, 300, inner_padding + size * ln);
		if (cur_t >= spl.length)
			break; // если закончились слова, то заканчиваем
		ln++;
	}
	canvas.hidden = false;
}

canvas.hidden = true;
pic(-200, -200, 450, 300).then(
	pic(250, -200, 450, 300).then(
		pic(-200, 100, 450, 300).then(
			pic(250, 100, 450, 300))));