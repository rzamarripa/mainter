angular.module("interCeramic")
.controller("CategoriasResultsCtrl", CategoriasResultsCtrl);  
 function CategoriasResultsCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('categoriasResults');

	this.helpers({
	  categoriasResults : () => {
		  return CategoriasResults.find();
	  }
  });




  this.nuevo = true;	  
  this.nuevoCategoriasResult = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.categoriasResult = {};		
  };
  
  this.guardar = function(categoriasResult)
	{   
		console.log(categoriasResult);
		this.categoriasResult.estatus = true;
		this.categoriasResult.fecha = new Date();
		CategoriasResults.insert(this.categoriasResult);
		toastr.success('Artículo guardado.');
		this.categoriasResult = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.categoriasResults')
	};
	
	this.editar = function(id)
	{
    this.categoriasResult = CategoriasResults.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(categoriasResult)
	{
		var idTemp = categoriasResult._id;
		delete categoriasResult._id;		
		CategoriasResults.update({_id:idTemp},{$set:categoriasResult});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var categoriasResult = CategoriasResults.findOne({_id:id});
		if(categoriasResult.estatus == true)
			categoriasResult.estatus = false;
		else
			categoriasResult.estatus = true;
		
		CategoriasResults.update({_id: id},{$set :  {estatus : categoriasResult.estatus}});
    };

      this.mandar = function(categoriasResult)
  {
	$state.go('root.categoriasArts');
  };
  	  
		
};
