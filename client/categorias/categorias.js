angular.module("interCeramic")
.controller("CategoriasCtrl", CategoriasCtrl);  
 function CategoriasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('categoriasArts');

	this.helpers({
	  categoriasArts : () => {
		  return CategoriasArts.find();
	  }
  });




  this.nuevo = true;	  
  this.nuevoCategoriaArt = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.categoriasArt = {};		
  };
  
  this.guardar = function(categoriasArt)
	{   
		console.log(categoriasArt);
		this.categoriasArt.estatus = true;
		this.categoriasArt.fecha = new Date();
		CategoriasArts.insert(this.categoriasArt);
		toastr.success('Artículo guardado.');
		this.categoriasArt = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.categoriasArts')
	};
	
	this.editar = function(id)
	{
    this.categoriasArt = CategoriasArts.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(categoriasArt)
	{
		var idTemp = categoriasArt._id;
		delete categoriasArt._id;		
		CategoriasArts.update({_id:idTemp},{$set:categoriasArt});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var categoriasArt = CategoriasArts.findOne({_id:id});
		if(categoriasArt.estatus == true)
			categoriasArt.estatus = false;
		else
			categoriasArt.estatus = true;
		
		CategoriasArts.update({_id: id},{$set :  {estatus : categoriasArt.estatus}});
    };

      this.mandar = function(categoriasArt)
  {
	$state.go('root.categoriasArts');
  };
  	  
		
};
