window.onload = function() {
	jogoArea.iniciar();
	nave = new Nave();
	nave.gerarNave(jogoArea.width/2, jogoArea.height/8*6.75, "sprites/nave.png");
	jogoAliens = criarArrayAlien("sprites/alienA_1.png", "sprites/alienB_1.png",
	"sprites/alienC_1.png", "sprites/alienD_1.png",
	"sprites/alienE_1.png", "sprites/alienF_1.png",
	"sprites/alienA_2.png", "sprites/alienB_2.png",
	"sprites/alienC_2.png", "sprites/alienD_2.png",
	"sprites/alienE_2.png", "sprites/alienF_2.png",
	80, 30);
}

function atualizarJogoArea() { // intervalo de atualizar a área
	jogoArea.atualizar();
	nave.setSpeedX(0);
	if(jogoArea.teclas && jogoArea.teclas[37])
		nave.setSpeedX(-4);
	if(jogoArea.teclas && jogoArea.teclas[39])
		nave.setSpeedX(4);
	nave.mover();
	nave.desenhar();
	for(var i=0; i<6; i++) {
		for(var j=0; j<6; j++) {
			jogoAliens[i][j].desenhar();
		}
	}
}

function criarArrayAlien(srcA, srcB, srcC, srcD, srcE, srcF, srcA2, srcB2, srcC2, srcD2, srcE2, srcF2, xInicial, yInicial) {
	var aliens = [[],[],[],[],[],[]];
	var tipos = [srcA, srcB, srcC, srcD, srcE, srcF, srcA2, srcB2, srcC2, srcD2, srcE2, srcF2];
	var x = xInicial;
	var y = yInicial;
	var i;
	var j;
	
	for(i=0; i<6; i++) {
		for(j=0; j<6; j++) {
			aliens[i][j] = new Alien();
			aliens[i][j].setX(x);
			aliens[i][j].setY(y);
			aliens[i][j].setImg(tipos[i]);
			aliens[i][j].setFrame2(tipos[i+6]);
			aliens[i][j].iniciarRitmo();
			
			x += 80;
		}
		x = xInicial;
		y += 50;
	}
		
	return aliens;
}

var jogoArea = {
	canvas : document.createElement("canvas"),
	iniciar : function() {
		this.canvas.width = 830;
		this.canvas.height = 610;
		this.width = jogoArea.canvas.width;
		this.height = jogoArea.canvas.height;
		this.contexto = jogoArea.canvas.getContext("2d");
		document.body.appendChild(jogoArea.canvas);
		this.intervalo = setInterval(atualizarJogoArea, 20);
		window.addEventListener('keydown', function(e) {
			jogoArea.teclas = (jogoArea.teclas || []);
			jogoArea.teclas[e.keyCode] = true;
		}),
		window.addEventListener('keyup', function(e) {
			jogoArea.teclas[e.keyCode] = false;
		})
	},
	atualizar : function() {
		this.contexto.fillStyle = "#000";
		this.contexto.fillRect(0,0, jogoArea.width, jogoArea.height);
		this.contexto.fillStyle = "#556B2F";
		this.contexto.fillRect(0, (jogoArea.height/8*6.75)+30, jogoArea.width, 200);
	}
}

/******Classes******/
function Sprite(src, x, y) {
	var x;
	var y;
	var img = new Image();
	var speedX = 0;
	var speedY = 0;
	
	this.getX = function() {
		return x;
	}
	this.setX = function(value) {
		x = value;
	}
	
	this.getY = function() {
		return y;
	}
	this.setY = function(value) {
		y = value;
	}
	
	this.getImg = function() {
		return img;
	}
	this.getImgSrc = function() {
		return img.src;
	}
	this.setImg = function(value) {
		img.src = value;
	}
	
	this.getSpeedX = function() {
		return speedX;
	}
	this.setSpeedX = function(value) {
		speedX = value;
	}
	
	this.getSpeedY = function() {
		return speedY;
	}
	this.setSpeedY = function(value) {
		speedY = value;
	}
	
	this.desenhar = function() {
		jogoArea.contexto.drawImage(img, x, y);
	}
	var sprite = this;
	img.onload = function() {
		sprite.desenhar();
	}
	this.mover = function() {
		x += speedX;
	}
	
}

function Nave() { // Sprite
	Sprite.call(this);
	var vidas;
	
	this.getVidas = function() {
		return vidas;
	}
	this.setVidas = function(value) {
		vidas = value;
	}
	
	this.gerarNave = function(x, y, imgSrc) {
		
		this.setX(x);
		this.setY(y);
		this.setImg(imgSrc);
		
	}
}
Nave.prototype = Object.create(Sprite.prototype); // herança
Nave.prototype.constructor = Nave; // corrige o ponteiro do construtor

function Alien() { // Sprite
	Sprite.call(this);
	var frame2 = new Image();
	
	this.getFrame2 = function() {
		return frame2;
	}
	this.getFrame2Src = function() {
		return frame2.src;
	}
	this.setFrame2 = function(value) {
		frame2.src = value;
	}
	
	this.iniciarRitmo = function() {
		var frame1 = this.getImgSrc();
		var frame2 = this.getFrame2Src();
		var that = this;
		this.intervalo = setInterval(function() {
			var temp = that.getImgSrc();
			that.setImg(that.getFrame2Src());
			that.setFrame2(temp);
		}, 1500);
	}
	
}
Alien.prototype = Object.create(Sprite.prototype);
Alien.prototype.constructor = Alien;
