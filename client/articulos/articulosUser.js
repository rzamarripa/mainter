angular.module("interCeramic")
.controller("ArticulosUserCtrl", ArticulosUserCtrl);  
 function ArticulosUserCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('articulos');
	this.subscribe('categorias');

	this.helpers({
	  articulos : () => {
		  return Articulos.find();
	  },
	   categorias : () => {
		  return Categorias.find();
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
		this.articulo.nombre = Meteor.user().profile.nombre;
		this.articulo.estatus = true;
		console.log(this.articulo);
		this.articulo.fecha = new Date();
		Articulos.insert(this.articulo);
		toastr.success('Artículo guardado.');
		this.articulo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.articulosUser')
	};
	
	this.editar = function(id)
	{
    this.articulo = Articulos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
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

    this.getCategoria= function(id)
	{
		var categoria = Categorias.findOne(id);
		return categoria.nombre;
	};	

		
};
