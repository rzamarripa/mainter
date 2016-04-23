angular.module("interCeramic")
.controller("SucursalesCtrl", SucursalesCtrl);  
 function SucursalesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('sucursales');
	

	this.helpers({
	  sucursales : () => {
		  return Sucursales.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoSucursal = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.sucursal = {};		
  };
  
  this.guardar = function(sucursal)
	{
		this.sucursal.nota = $('#summernote').summernote('code');
		this.sucursal.nombre = Meteor.user().profile.nombre;
		this.sucursal.estatus = true;
		this.sucursal.fecha = new Date();
		console.log(this.sucursal);
		Sucursales.insert(this.sucursal);
		toastr.success('sucursal guardada.');
		this.sucursal = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.sucursales')
	};
	
	this.editar = function(id)
	{
    this.sucursal = Sucursales.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(sucursal)
	{
		this.sucursal.nota = $('#summernote').summernote('code');
		var idTemp = sucursal._id;
		delete sucursal._id;		
		Sucursales.update({_id:idTemp},{$set:sucursal});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var sucursal = Sucursales.findOne({_id:id});
		if(sucursal.estatus == true)
			sucursal.estatus = false;
		else
			sucursal.estatus = true;
		
		Sucursales.update({_id: id},{$set :  {estatus : sucursal.estatus}});
    };

      
    $(document).ready(function() {
    $('#summernote').summernote();
    }); 
		
};
