var canvas = document.createElement("canvas");
canvas.setAttribute("width","300");
canvas.setAttribute("height", "200");
document.body.appendChild(canvas);
var img_counter = 0;

HTMLCanvasElement.prototype.renderImage = function(blob,x,y,w,h){
	
	var ctx = this.getContext('2d');
	var img = new Image();

	img.onload = function(){
	ctx.drawImage(img,x,y,w,h);
	img_counter++;
	}

	img.src = URL.createObjectURL(blob);
};

async function pic(x,y,w,h)
{
	let ret = fetch('https://source.unsplash.com/collection/207682/300x200?r=1',{
		//cache: "no-store"
	})
	.then((resp) => resp.blob())
	.then(function (blob){
		canvas.renderImage(blob,x,y,w,h);
	});
	return ret
}

async function wait_for_pics()
{
	canvas.hidden = true;
	while (img_counter!=4);
	canvas.hidden = false;
}
wait_for_pics();
pic(-150,-100,225,150).then(
pic(75,-100,225,150).then(
pic(-150,50,225,150).then(
pic(75,50,225,150))));