angular.module("interCeramic")
.controller("MercasCtrl", MercasCtrl);  
 function MercasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);
    this.action = true;
    $rootScope.home = false;
    this.merca = {};
	this.subscribe('mercas');
	this.subscribe('departamentos');

	this.helpers({
	  mercas : () => {
		  return Mercas.find();
	  },
	   departamentos : () => {
		  return Departamentos.find();
	  }
	 
  });

	this.nuevo = true;	  
  this.nuevoMerca = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.merca = {};		
    $('#summernote').summernote('reset');
  };



  this.guardar = function(merca)
	{ 
		this.merca.nombre = Meteor.user().profile.nombre;
		this.merca.nota = $('#summernote').summernote('code');
		this.merca.estatus = true;
		console.log(this.merca);
		Mercas.insert(this.merca);
		toastr.success('merca guardado.');
		this.merca = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.mercas')
	};
	
	this.editar = function(id)
	{
    this.merca = Mercas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(merca)
	{
		this.merca.nota = $('#summernote').summernote('code');
		var idTemp = merca._id;
		delete merca._id;		
		Mercas.update({_id:idTemp},{$set:merca});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var merca = Mercas.findOne({_id:id});
		if(merca.estatus == true)
			merca.estatus = false;
		else
			merca.estatus = true;
		
		Mercas.update({_id: id},{$set :  {estatus : merca.estatus}});
    };



    $(document).ready(function() {
  $('#summernote').summernote();
});  
		
};