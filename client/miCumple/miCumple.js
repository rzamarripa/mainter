angular.module("interCeramic")
.controller("MiCumpleCtrl", MiCumpleCtrl);  
 function MiCumpleCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('listas');
	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	this.subscribe('asesorVentas',()=>{
		return [{estatus:true}]
	});
	this.subscribe('felicitaciones',()=>{
		return [{estatus:true}]
	});
	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	this.subscribe('jefeAreas',()=>{
		return [{estatus:true}]

	});
	this.subscribe('departamentos');
	

	this.helpers({
	  felicitaciones : () => {
		  return Felicitaciones.find();
	  },
	   empleados : () => {
		  return Empleados.find();
	  },
	  asesorVentas : () => {
		  return AsesorVentas.find();
	  },
	  gerentes : () => {
		  return Gerentes.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
	  jefeAreas : () => {
		  return JefeAreas.find();
	  },

  });
  	  
  this.nuevo = true;	  
  this.nuevolista = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.lista = {};		
  };
  
  this.guardar = function(lista)
	{
		this.lista.estatus = true;
		console.log(this.lista);
		Listas.insert(this.lista);
		toastr.success('lista guardado.');
		this.lista = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.lista')
	};
	
	this.editar = function(id)
	{
    this.lista = Listas.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(lista)
	{
		var idTemp = lista._id;
		delete lista._id;		
		Listas.update({_id:idTemp},{$set:lista});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var lista = Listas.findOne({_id:id});
		if(lista.estatus == true)
			lista.estatus = false;
		else
			lista.estatus = true;
		
		Listas.update({_id: id},{$set :  {estatus : lista.estatus}});
  };

  this.getEmisor= function(emisor_id)
	{
		var emisor = Meteor.users.findOne(emisor_id);
		if(emisor)
		return emisor.profile.nombre;
	};
	this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		//console.log(departamento);
		return departamento.nombre;
	};	

  
		
};
