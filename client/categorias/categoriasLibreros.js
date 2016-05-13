angular.module("interCeramic")
.controller("CategoriasLibrerosCtrl", CategoriasLibrerosCtrl);  
 function CategoriasLibrerosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);
  this.action = true;
  $rootScope.home = false;
	this.subscribe('categoriasLibreros');

	this.helpers({
	  categoriasLibreros : () => {
		  return CategoriasLibreros.find();
	  }
  });




  this.nuevo = true;	  
  this.nuevoCategoriasLibrero = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.categoriasLibrero = {};		
  };
  
  this.guardar = function(categoriasLibrero)
	{  
	    console.log(categoriasLibrero);
		this.categoriasLibrero.estatus = true;
		this.categoriasLibrero.fecha = new Date();
		CategoriasLibreros.insert(this.categoriasLibrero);
		toastr.success('Artículo guardado.');
		this.categoriasLibrero = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.categoriasLibreros')
	};
	
	this.editar = function(id)
	{
    this.categoriasLibrero = CategoriasLibreros.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(categoriasLibrero)
	{
		var idTemp = categoriasLibrero._id;
		delete categoriasLibrero._id;		
		CategoriasLibreros.update({_id:idTemp},{$set:categoriasLibrero});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var categoriasLibrero = CategoriasLibreros.findOne({_id:id});
		if(categoriasLibrero.estatus == true)
			categoriasLibrero.estatus = false;
		else
			categoriasLibrero.estatus = true;
		
		CategoriasLibreros.update({_id: id},{$set :  {estatus : categoriasLibrero.estatus}});
    };

      this.mandar = function(categoriasLibrero)
  {
	$state.go('root.categoriasArts');
  };
  	  
		
};
