angular.module("interCeramic")
.controller("HomeCtrl", HomeCtrl);  
 function HomeCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  	this.action = true;
	this.subscribe('home');
	this.subscribe('noticias');

	this.subscribe('empleados');
	
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
	  cumpleaneros : () => {
	  	var cumpleaneros = [];
	  		var empleados = this.getReactively('empleados');
	  		if(empleados){
			  	_.each(empleados, function(empleado){
			  		console.log(empleado);
			  		var fechaNacimiento = new Date(empleado.fechaNac);
					var diaNac = fechaNacimiento.getDate();		
					var mesNac = fechaNacimiento.getMonth() + 1;
					console.log(empleado.fechaNac);
					var fechaActual = new Date();
					var diaActual = fechaActual.getDate();
					var mesActual = fechaActual.getMonth() + 1;
					
					if(mesNac == mesActual){
						if(diaNac == diaActual){
							cumpleaneros.push(empleado);				
						}

					}

					if(cumpleaneros.length > 0){
						 $('#myModal').modal('show');
					}

					
			  	})
			 }
		 return cumpleaneros;
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



  this.modal= function()
  {
  	

  }
	
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
		console.log("fecha", fechaNacimiento);
		console.log("dia", diaNac);
		console.log("mes", mesNac);
		console.log("fechaA", fechaActual);
		console.log("diaA", diaActual);
		console.log("mesA", mesActual);
		console.log("--------")
		
//		return days;
	}

		
};
