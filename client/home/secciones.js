angular.module("interCeramic")
.controller("SeccionesCtrl", SeccionesCtrl);  
 function SeccionesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);

 	$rootScope.home = true;



	this.subscribe('secciones');


	

	this.helpers({
	  secciones : () => {
		  return Secciones.find();
	  },
	

  	});
  	  
  this.nuevo = true;	  
  this.nuevoSeccion = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.seccion = {};		
  };
  
 

	 this.guardar = function(seccion)
	{

		this.seccion.estatus = true;
		
		Seccion.insert(this.seccion);
		
		console.log(this.seccion);
		//this.feli = false;
		

	};
	
	this.editar = function(id)
	{
    this.seccion = Seccion.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(seccion)
	{
		var idTemp = seccion._id;
		delete seccion._id;		
		seccion.update({_id:idTemp},{$set:seccion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var seccion = Seccion.findOne({_id:id});
		if(seccion.estatus == true)
			seccion.estatus = false;
		else
			seccion.estatus = true;
		
		Seccion.update({_id: id},{$set :  {estatus : seccion.estatus}});
    };





	

 
		
 };
