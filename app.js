$(function(){
	juego.init();
});

var juego = {

	factRad : Math.PI/180,
	objetos : {},
	cont : 0,

	init : function(){
		var self = this;

		var ancho = $(window).width();
		var alto  = $(window).height();

		self.renderer 	= new THREE.WebGLRenderer({antialias: true, alpha: true});
		self.escena 	= new THREE.Scene;
		self.camara 	= new THREE.PerspectiveCamera(45, ancho/alto, 0.1, 10000);

		self.renderer.setSize(ancho, alto);
		self.camara.position.set(0, 160, 400);

		$('body').append(self.renderer.domElement);

		self.addCubo();
		self.addLuces();
		//self.addPlano();

		self.camara.lookAt(self.objetos.cubo.position);

		self.render();
	},

	addCubo : function(){
		var self = this;

		var geometria = new THREE.CubeGeometry(100, 100, 100);
		//var matCubo = new THREE.MeshLambertMaterial({color: 0x999999});
		var textura = new THREE.ImageUtils.loadTexture("texturas/metal2.jpg");
		var material = new THREE.MeshBasicMaterial({map: textura, side: THREE.DoubleSide});

		//self.objetos.cubo = new THREE.Mesh(geometria, matCubo);
		self.objetos.cubo = new THREE.Mesh(geometria, material);

		self.escena.add(self.objetos.cubo);
	},

	addLuces : function(options){
		var self = this;

		self.objetos.luces = [
			new THREE.PointLight(0xFFFFFF),
			new THREE.PointLight(0xFFFFFF)
		];

		self.objetos.luces[0].position.set(0,200,200);
		self.objetos.luces[1].position.set(-100,100,200);

		self.escena.add(self.objetos.luces[0]);
		self.escena.add(self.objetos.luces[1]);
	},

	addPlano : function(){
		var self = this;

		var geo = new THREE.PlaneGeometry(400, 400, 10, 10);
		var mat = new THREE.MeshLambertMaterial({color: 0xCBF539});
		
		self.objetos.plano = new THREE.Mesh(geo, mat);
		self.escena.add(self.objetos.plano);
	},

	animarCubo : function(){
		var self = this;
		var cubo = self.objetos.cubo;

		cubo.rotation.y += 0.5 * self.factRad;
		cubo.position.x += Math.cos(self.cont++/100)*2;
	},

	render : function(){
		var self = this;

		self.renderer.render(self.escena, self.camara);

		self.animarCubo();

		requestAnimationFrame(function(){
			self.render();
		});
	},

};