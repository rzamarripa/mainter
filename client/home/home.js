angular.module("interCeramic")
.controller("HomeCtrl", HomeCtrl);  
 function HomeCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);

 	$rootScope.home = true;

  	this.action = true;
  	this.felicitacion = {};
  	 this.seccion = {};	
  	this.departamento_id = Meteor.user().profile.departamento_id;
	this.subscribe('home');
	this.subscribe('noticiasHome');

	this.subscribe('empleados');

	this.subscribe('articulos');

		this.subscribe('secciones',()=>{
		return [{estatus:true}]
	});
		this.subscribe('seccionesLibrero',()=>{
		return [{estatus:true}]
	});
		this.subscribe('seccionesResultado',()=>{
		return [{estatus:true}]
	});
	

	
	this.subscribe('felicitaciones');
	
	this.subscribe('asesorVentas',()=>{
		return [{estatus:true}]
	});
	this.subscribe('gerentes',()=>{
		return [{estatus:true}]
	});
	
	this.subscribe('jefeAreas',()=>{
		return [{estatus:true}]
	});
	

	this.helpers({
	  home : () => {
		  return Home.find();
	  },
	   noticias : () => {
		  return Noticias.find();
	  },
	   empleados: ()=>{
	   	return Empleados.find();
	  },
	  gerentes: ()=>{
	   	return Gerentes.find();
	  },
	  jefeAreas: ()=>{
	   	return JefeAreas.find();
	  },
	   felicitaciones : () => {
	  	return Felicitaciones.find();
	  },
	  articulos : () => {
		  return Articulos.find();
	  },
	   secciones : () => {
		  return Secciones.find();
	  },
	  seccionesLibrero : () => {
		  return SeccionesLibrero.find();
	  },
	  seccionesResultados : () => {
		  return SeccionesResultado.find();
	  },
	  cumpleaneros : () => {
	  	var _cumpleaneros = [];
  		var empleados = this.getReactively('empleados');
  		var felicitaciones = this.getReactively('felicitaciones');
  		if(empleados != undefined && felicitaciones != undefined){
		  	_.each(empleados, function(empleado){
		  		var fechaNacimiento = new Date(empleado.fechaNac);
				var diaNac = fechaNacimiento.getDate();		
				var mesNac = fechaNacimiento.getMonth() + 1;
				var fechaActual = new Date();
				var diaActual = fechaActual.getDate();
				var mesActual = fechaActual.getMonth() + 1;
				if(mesNac === mesActual){
					if(diaNac === diaActual){
						console.log(felicitaciones);
						var felicitado = _.where(felicitaciones,{receptor_id:empleado._id,emisor_id:Meteor.userId()});
						console.log(felicitado);
						if(felicitado.length == 0){
							_cumpleaneros.push(empleado);
						}				
					}
				}
		  	})
		}
		var empleados = this.getReactively('jefeAreas');
  		if(empleados != undefined && felicitaciones != undefined){
		  	_.each(empleados, function(empleado){
		  		var fechaNacimiento = new Date(empleado.fechaNac);
				var diaNac = fechaNacimiento.getDate();		
				var mesNac = fechaNacimiento.getMonth() + 1;
				var fechaActual = new Date();
				var diaActual = fechaActual.getDate();
				var mesActual = fechaActual.getMonth() + 1;
				if(mesNac === mesActual){
					if(diaNac === diaActual){
						console.log(felicitaciones);
						var felicitado = _.where(felicitaciones,{receptor_id:empleado._id,emisor_id:Meteor.userId()});
						console.log(felicitado);
						if(felicitado.length == 0){
							_cumpleaneros.push(empleado);
						}				
					}
				}
		  	})
		}
		var empleados = this.getReactively('gerentes');
  		if(empleados != undefined && felicitaciones != undefined){
		  	_.each(empleados, function(empleado){
		  		var fechaNacimiento = new Date(empleado.fechaNac);
				var diaNac = fechaNacimiento.getDate();		
				var mesNac = fechaNacimiento.getMonth() + 1;
				var fechaActual = new Date();
				var diaActual = fechaActual.getDate();
				var mesActual = fechaActual.getMonth() + 1;
				if(mesNac === mesActual){
					if(diaNac === diaActual){
						console.log(felicitaciones);
						var felicitado = _.where(felicitaciones,{receptor_id:empleado._id,emisor_id:Meteor.userId()});
						console.log(felicitado);
						if(felicitado.length == 0){
							_cumpleaneros.push(empleado);
						}				
					}
				}
		  	})
		}
		if(_cumpleaneros.length > 0){
			 $('#myModal').modal('show');
		}
		 return _cumpleaneros;
	  }
  	});
  	  
  this.nuevo = true;	  
  this.nuevoHome = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.home = {};		

  };

 
  
  this.enviar = function(cumpleanero)
	{
		 this.emisor_id = Meteor.userId();
		console.log(cumpleanero.correo);
		Meteor.call('sendEmail',
            cumpleanero.correo,
            'interceramic123@gmail.com',
            'Sistemas de recursos humanos interceramic',
            'Felicitaciones hoy en tu dia que la pases muy bien');
		     toastr.success('Felicitacion enviada.');

			 cumpleanero.estatus= false;


	    //this.ticket.userId = Meteor.userId();

	};

	 this.guardarFeli = function(feli,receptor_id)
	{
		this.felicitacion.receptor_id = receptor_id;
		this.felicitacion.felicitacion = feli;
         this.felicitacion.emisor_id = Meteor.userId();
         this.felicitacion.departamentoReceptor_id = Meteor.user().profile.departamento_id;
       // this.feli = true;
		this.felicitacion.fecha = new Date();
		Felicitaciones.insert(this.felicitacion);
		toastr.success('Felicitacion guardada.');
		console.log(this.felicitacion);
		//this.feli = false;
		

	};
	
	this.editar = function(id)
	{
    this.home = Home.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(home)
	{
		var idTemp = home._id;
		delete home._id;		
		Home.update({_id:idTemp},{$set:home});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var home = Home.findOne({_id:id});
		if(home.estatus == true)
			home.estatus = false;
		else
			home.estatus = true;
		
		Home.update({_id: id},{$set :  {estatus : home.estatus}});
    };

///////////////////////////////SECCION///////////////////////////////////////////////////////////

     this.guardarSeccion = function(seccion)
	{

		this.seccion.estatus = true;
		
		Secciones.insert(this.seccion);
		document.getElementById("guardar").style.visibility = "hidden";
		document.getElementById("btnGuardar").style.visibility = "hidden";
		document.getElementById("btneditar").style.visibility = "show";
		
		console.log(this.seccion);
		//this.feli = false;
		

	};
	
	this.editarSeccion = function(id)
	{
    this.seccion = Secciones.findOne({_id:id});
    document.getElementById("guardar").style.visibility = "show";
    document.getElementById("btnGuardar").style.visibility = "show";
		document.getElementById("btneditar").style.visibility = "hidden";
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizarSeccion = function(seccion)
	{
		var idTemp = seccion._id;
		delete seccion._id;		
		seccion.update({_id:idTemp},{$set:seccion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
//////////////////////////////////EVENTO/////////////////////////////////////////////////////


 this.accionEvento = true;
 this.mostrarEvento = true;
  this.accionLibrero = true;
 this.mostrarLibrero = true;
  this.accionResultado = true;
 this.mostrarResultado = true;

 this.nuevoSeccion = function()
  {
    this.accionEvento = true;
    this.mostrarEvento = !this.mostrarEvento;
    this.seccion = {};		
  };

  this.nuevoSeccionLibrero = function()
  {
    this.accionLibrero = true;
    this.mostrarLibrero = !this.mostrarLibrero;
    this.seccionLibrero = {};		
  };
  this.nuevoSeccionResultado = function()
  {
    this.accionResultado = true;
    this.mostrarResultado = !this.mostrarResultado;
    this.seccionResultado = {};		
  };


	this.guardarSeccionEvento = function(seccion)
	{	
		this.seccion.estatus = true;
		Secciones.insert(this.seccion);
		console.log(this.seccion);
		this.seccion = {}; 
		$('.collapse').collapse("hide");
		this.mostrarEvento = true;
	 };
	 this.guardarSeccionLibrero = function(seccionLibrero)
	{	
		this.seccionLibrero.estatus = true;
		SeccionesLibrero.insert(this.seccionLibrero);
		console.log(this.seccionLibrero);
		this.seccionLibrero = {}; 
		$('.collapse').collapse("hide");
		this.mostrarLibrero = true;
	 };
	 this.guardarSeccionResultado = function(seccionResultado)
	{	
		this.seccionResultado.estatus = true;
		SeccionesResultado.insert(this.seccionResultado);
		console.log(this.seccionResultado);
		this.seccionResultado = {}; 
		$('.collapse').collapse("hide");
		this.mostrarResultado = true;
	 };
	this.editarSeccionEvento = function(id)
	{
    this.seccion = Secciones.findOne({_id:id});
    this.accionEvento = false;
    $('.collapse').collapse("show");
    this.mostrarEvento = false;
	};
	this.editarSeccionLibrero = function(id)
	{
    this.seccionLibrero = SeccionesLibrero.findOne({_id:id});
    this.accionLibrero = false;
    $('.collapseLibrero').collapse("show");
    this.mostrarLibrero = false;
	};
	this.editarSeccionResultado = function(id)
	{
    this.seccionResultado = SeccionesResultado.findOne({_id:id});
    this.accionResultado = false;
    $('.collapseResultado').collapse("show");
    this.mostrarResultado = false;
	};
	this.actualizarSeccionEvento = function(seccion)
	{
		var idTemp = seccion._id;
		delete seccion._id;		
		Secciones.update({_id:idTemp},{$set:seccion});
		$('.collapse').collapse('hide');
		console.log(seccion);
		this.mostrarEvento = true;
	};
	this.actualizarSeccionLibrero = function(seccionLibrero)
	{
		var idTemp = seccionLibrero._id;
		delete seccionLibrero._id;		
		SeccionesLibrero.update({_id:idTemp},{$set:seccionLibrero});
		$('.collapse').collapse('hide');
		console.log(seccionLibrero);
		this.mostrarLibrero = true;
	};
	this.actualizarSeccionResultado = function(seccionResultado)
	{
		var idTemp = seccionResultado._id;
		delete seccionResultado._id;		
		SeccionesResultado.update({_id:idTemp},{$set:seccionResultado});
		$('.collapse').collapse('hide');
		console.log(seccionResultado);
		this.mostrarResultado = true;
	};
	this.cambiarEstatusSeccionEvento = function(id)
	{
		var seccion = Secciones.findOne({_id:id});
		if(seccion.estatus == true)
			seccion.estatus = false;
		else
			seccion.estatus = true;
		
		Secciones.update({_id: id},{$set :  {estatus : seccion.estatus}});
    };
    this.cambiarEstatusSeccionLibrero = function(id)
	{
		var seccionLibrero = SeccionesLibrero.findOne({_id:id});
		if(seccionLibrero.estatus == true)
			seccionLibrero.estatus = false;
		else
			seccionLibrero.estatus = true;
		
		SeccionesLibrero.update({_id: id},{$set :  {estatus : seccionLibrero.estatus}});
    };
    this.cambiarEstatusSeccionResultado = function(id)
	{
		var seccionResultado = SeccionesResultado.findOne({_id:id});
		if(seccionResultado.estatus == true)
			seccionResultado.estatus = false;
		else
			seccionResultado.estatus = true;
		
		SeccionesResultado.update({_id: id},{$set :  {estatus : seccionResultado.estatus}});
    };


   this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};


	
	this.esCumpleanero = function(fechaNac){
		var fechaNacimiento = new Date(fechaNac);
		var diaNac = fechaNacimiento.getDate();		
		var mesNac = fechaNacimiento.getMonth() + 1;
		
		var fechaActual = new Date();
		var diaActual = fechaActual.getDate();
		var mesActual = fechaActual.getMonth() + 1;
		
		if(mesNac == mesActual){
			if(diaNac == diaActual){
				return true;				
			}
		}
		
		return false;
		/*console.log("fecha", fechaNacimiento);
		console.log("dia", diaNac);
		console.log("mes", mesNac);
		console.log("fechaA", fechaActual);
		console.log("diaA", diaActual);
		console.log("mesA", mesActual);
		console.log("--------")*/
		
//		return days;
	}

this.tienePermiso = function()
	{
		if(Meteor.user().roles[0] == "empleado" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "jefeArea" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "asesorVenta" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "gerente" )
		{
			return false;
		}
		else{
			return true;
		}
		
	}



/////////////////////////////////////ENCABEZADO/////////////////////////////////////////////////////////////////

this.clock = function()
{   
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miercoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sabado";




    var n = weekday[d.getDay()];
    document.getElementById("demo").innerHTML = n;
}
this.mes = function()
{   
    var d = new Date();
    var weekday = new Array(12);
    weekday[0] = "Enero";
    weekday[1] = "Febrero";
    weekday[2] = "Marzo";
    weekday[3] = "Abril";
    weekday[4] = "Mayo";
    weekday[5] = "Junio";
    weekday[6] = "Julio";
    weekday[7] = "Agosto";
    weekday[8] = "Septiembre";
    weekday[9] = "Octubre";
    weekday[10] = "Noviembre";
    weekday[11] = "Diciembre";

 


    var n = weekday[d.getMonth()];
    return n;
}
 
 this.dia = function() {
    var d = new Date();
    var n = d.getDate();
    return n;
}
 this.year = function()
{

   var d = new Date();
    var n = d.getFullYear();
    return n;
}

 
		
 };
