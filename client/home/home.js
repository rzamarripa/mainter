angular.module("interCeramic")
.controller("HomeCtrl", HomeCtrl);  
 function HomeCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('home');
	this.subscribe('noticias');
	

	this.helpers({
	  home : () => {
		  return Home.find();
	  },
	   noticias : () => {
		  return Noticias.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoHome = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.home = {};		
  };
  
  this.guardar = function(home)
	{
		this.home.estatus = true;
		console.log(this.home);
		Home.insert(this.home);
		toastr.success('home guardado.');
		this.home = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.home')
	};
	
	this.editar = function(id)
	{
    this.home = Home.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(home)
	{
		var idTemp = home._id;
		delete home._id;		
		Home.update({_id:idTemp},{$set:home});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var home = Home.findOne({_id:id});
		if(home.estatus == true)
			home.estatus = false;
		else
			home.estatus = true;
		
		Home.update({_id: id},{$set :  {estatus : home.estatus}});
    };
  
		
};
