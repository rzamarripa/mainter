angular.module("interCeramic")
.controller("EmpleadosCtrl", EmpleadosCtrl);  
 function EmpleadosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    this.departamento_id = Meteor.user().profile.departamento_id;
    this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});

	 this.subscribe('departamentos',()=>{
		return [{estatus:true}]
	});

	  this.subscribe('sucursales',()=>{
		return [{estatus:true}]
	});

	this.helpers({
	  empleados : () => {
		  return Empleados.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
	  sucursales : () => {
		  return Sucursales.find();
	  },
	  empleado : () => {
	  	return Empleados.findOne();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoEmpleado = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    rc.empleado = {};		
  };
  
  
	this.guardar = function(empleado)
	{
		
		rc.empleado.estatus = true;
		console.log(rc.empleado);
		this.empleado.fecha = new Date();
		rc.empleado.nombreCompleto = rc.empleado.nombre + " " + rc.empleado.apPaterno + " " + rc.empleado.apMaterno;
		Empleados.insert(rc.empleado, function(err, doc){
			rc.empleado.empleado_id = doc;
			rc.empleado.departamento_id = doc;
		    Meteor.call('createUsuario', rc.empleado, 'empleado');
		    this.nuevo = true;
		    toastr.success('Empleado guardado.');
		this.empleado = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.empleados');
		
	    });
    };
	
	this.editar = function(id)
	{
    this.empleado = Empleados.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
		this.actualizar = function(empleado)
	{
		var idTemp = empleado._id;
		delete empleado._id;
		console.log(empleado);		
		Meteor.call('cambiaContra', empleado.usuario, empleado.contrasena);

		Empleados.update({_id:idTemp},{$set:empleado});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var empleado = Empleados.findOne({_id:id});
		if(empleado.estatus == true)
			empleado.estatus = false;
		else
			empleado.estatus = true;
		
		Empleados.update({_id: id},{$set :  {estatus : empleado.estatus}});
    };


	this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};


	this.getSucursal= function(sucursale_id)
	{
		var sucursale = Sucursales.findOne(sucursale_id);
		if(sucursale)
		return sucursale.nombre;
	};
     

    this.desSelect= function()
    {
   	 document.getElementById("depa").disabled = false;
    }
      this.desSelect= function()
    {
   	 document.getElementById("sucu").disabled = false;
    }

      this.SelectSucu= function()
    {
   	 document.getElementById("depa").disabled = false;
    }
    this.SelectDepa= function()
    {
   	 document.getElementById("sucu").disabled = false;
    }
	
		
};

 
	