angular.module("interCeramic")
.controller("ListasCtrl", ListasCtrl);  
 function ListasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;



	this.subscribe('listas');
	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	this.subscribe('asesorVentas',()=>{
		return [{estatus:true}]
	});
	this.subscribe('gerentes',()=>{
		return [{estatus:true}]
	});
	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	this.subscribe('jefeAreas',()=>{
		return [{estatus:true}]
	});
	this.subscribe('sucursales');
	

	this.helpers({
	  listas : () => {
		  return Listas.find();
	  },
	   empleados : () => {
		  return Empleados.find({}, { sort: {score: -1, name: 1} });
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
	   sucursales : () => {
		  return Sucursales.find();
	  },

	   listaEmpleados : () =>
		{
		 var listaEmpleados = [];
		 listaEmpleados.push(this.getReactively('jefeAreas'));
		 listaEmpleados.push(this.getReactively('empleados'));
		 listaEmpleados.push(this.getReactively('gerentes'));
		 console.log(listaEmpleados);
		  	return listaEmpleados;
	   },

  });
  	  
  this.nuevo = true;	  
  this.nuevolista = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.lista = {};		
  };


  this.listaEmpleados = function()
  {
  	this.empleados.push("jefeAreas");
  	this.empleados.push("asesorVentas");
  	this.empleados.push("gerentes");

  }
  
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
    
  this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};
	
	this.esCumpleanero = function(fechaNac){
		var fechaNacimiento = new Date(fechaNac);
		var diaNac = fechaNacimiento.getDate();		
		var mesNac = fechaNacimiento.getMonth() + 1;
		
		var fechaActual = new Date();
		var diaActual = fechaActual.getDate();
		var mesActual = fechaActual.getMonth() + 1;
		
		if(mesNac == mesActual){
			if(diaNac == diaActual){
				return true;				
			}
		}
		
		return false;
		console.log("fecha", fechaNacimiento);
		console.log("dia", diaNac);
		console.log("mes", mesNac);
		console.log("fechaA", fechaActual);
		console.log("diaA", diaActual);
		console.log("mesA", mesActual);
		console.log("--------")
		
//		return days;
	}



		this.show = function(id){
		 $state.go("roots.perfil", {id:id});	
	}

  
		
};
