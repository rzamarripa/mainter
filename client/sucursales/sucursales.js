angular.module("interCeramic")
.controller("SucursalesCtrl", SucursalesCtrl);  
 function SucursalesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    this.subscribe('sucursales');


    

 	this.subscribe('sucursale', () => {
    return [{
	    _id : $stateParams.id
    }];
 	 });


	this.helpers({
	  sucursales : () => {
		  return Sucursales.find();
	  },

	  sucursale : () => {
		  return Sucursales.findOne();
	  },
  });


	this.nuevo = true;	  
  this.nuevoSucursale = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.sucursale = {};		
  };


  




  this.guardar = function(sucursale)

	{
		delete sucursale.$$hashKey;
		this.sucursale.fecha = new Date();

		Sucursales.insert(sucursale);
		toastr.success('sucursal guardada.');
		this.sucursale = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	    console.log(sucursale);
		$state.go('root.sucursales')
		
	};
	
	this.editar = function(id)
	{
    this.sucursale = Sucursales.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse("show");
    this.nuevo = false;
	};
	
	this.actualizar = function(sucursale)
	{

		var idTemp = sucursale._id;
		delete sucursale.$$hashKey;
		delete sucursale._id;		
		Sucursales.update({_id:idTemp},{$set:sucursale});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var sucursale = sucursale.findOne({_id:id});
		if(sucursale.estatus == true)
			sucursale.estatus = false;
		else
			sucursale.estatus = true;
		
		Sucursales.update({_id: id},{$set :  {estatus : sucursale.estatus}});
    };
		
};