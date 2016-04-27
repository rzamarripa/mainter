angular.module("interCeramic")
.controller("HomeCtrl", HomeCtrl);  
 function HomeCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  	this.action = true;
  	this.felicitacion = {};
  	this.departamento_id = Meteor.user().profile.departamento_id;
	this.subscribe('home');
	this.subscribe('noticias');

	this.subscribe('empleados');
	
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
	   felicitaciones : () => {
	  	return Felicitaciones.find();
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


   this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
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
    document.getElementById("mes").innerHTML = n;
}
 
 this.dia = function() {
    var d = new Date();
    var n = d.getDate();
    document.getElementById("dia").innerHTML = n;
}
   this.year = function()
  {

   var d = new Date();
    var n = d.getFullYear();
    document.getElementById("year").innerHTML = n;
}

 
		
 };
