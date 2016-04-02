angular.module("interCeramic")
.controller("ArticulosCtrl", ArticulosCtrl);  
 function ArticulosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('articulos');

	this.helpers({
	  articulos : () => {
		  return Articulos.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoArticulos = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.articulo = {};		
  };
  
  this.guardar = function(articulo)
	{
		this.articulo.estatus = true;
		console.log(this.articulo);
		Articulos.insert(this.articulo);
		toastr.success('articulo guardado.');
		this.articulo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.articulos')
	};
	
	this.editar = function(id)
	{
    this.articulo = Articulos.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(articulo)
	{
		var idTemp = articulo._id;
		delete articulo._id;		
		Articulos.update({_id:idTemp},{$set:articulo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var articulo = Articulos.findOne({_id:id});
		if(articulo.estatus == true)
			articulo.estatus = false;
		else
			articulo.estatus = true;
		
		Articulos.update({_id: id},{$set :  {estatus : articulo.estatus}});
    };
		
};
