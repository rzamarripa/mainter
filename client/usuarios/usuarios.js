angular.module("interCeramic")
.controller("UsuariosCtrl", UsuariosCtrl);  
 function UsuariosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    this.usuario = {};
	this.subscribe('usuarios');
	this.subscribe('departamentos');

	this.helpers({
	  usuarios : () => {
		  return Usuarios.find();
	  },
	   departamentos : () => {
		  return Departamentos.find();
	  }
	 
  });

	this.nuevo = true;	  
  this.nuevoUsuario = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.usuario = {};		
  };



  this.guardar = function(usuario)
	{ 

	    //this.usuario.userId = Meteor.userId();
		this.usuario.estatus = true;
		console.log(this.usuario);
		Usuarios.insert(this.usuario);
		toastr.success('usuario guardado.');
		this.usuario = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.usuarios')
	};
	
	this.editar = function(id)
	{
    this.usuario = Usuarios.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(usuario)
	{
		var idTemp = usuario._id;
		delete usuario._id;		
		Usuarios.update({_id:idTemp},{$set:usuario});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var usuario = Usuarios.findOne({_id:id});
		if(usuario.estatus == true)
			usuario.estatus = false;
		else
			usuario.estatus = true;
		
		Usuarios.update({_id: id},{$set :  {estatus : usuario.estatus}});
    };
		
};