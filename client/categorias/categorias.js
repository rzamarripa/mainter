angular.module("interCeramic")
.controller("CategoriasCtrl", ArticulosCtrl);  
 function ArticulosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('categorias');

	this.helpers({
	  categorias : () => {
		  return Categorias.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoCategoria = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.categoria = {};		
  };
  
  this.guardar = function(categoria)
	{
		this.categoria.estatus = true;
		this.categoria.fecha = new Date();
		Categorias.insert(this.categoria);
		toastr.success('Artículo guardado.');
		this.categoria = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.categorias')
	};
	
	this.editar = function(id)
	{
    this.categoria = Categorias.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(categoria)
	{
		var idTemp = categoria._id;
		delete categoria._id;		
		Categorias.update({_id:idTemp},{$set:categoria});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var categoria = Categorias.findOne({_id:id});
		if(categoria.estatus == true)
			categoria.estatus = false;
		else
			categoria.estatus = true;
		
		Categorias.update({_id: id},{$set :  {estatus : categoria.estatus}});
    };
		
};
