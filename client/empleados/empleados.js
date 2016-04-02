angular.module("interCeramic")
.controller("EmpleadosCtrl", EmpleadosCtrl);  
 function EmpleadosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('empleados');
	this.subscribe('departamentos');

	this.helpers({
	  empleados : () => {
		  return Empleados.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });
  	  
  this.nuevo = true;	  
  this.nuevoEmpleado = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.empleado = {};		
  };
  
  
	this.guardar = function(empleado)
	{
		Accounts.createUser({
			username: this.empleado.nombreUsuario,
			password: this.empleado.contrasena,
			profile: {
				 nombre: this.empleado.nombre,
				 apellidos: this.empleado.apPaterno + " " + this.empleado.apMaterno,
				 tipoUsuario: "empleado"
			},function(err) {
				if (err)
				   console.log(err);
				  else
				    console.log('success!');
				}
		});
		this.empleado.estatus = true;
		console.log(this.empleado);
		Empleados.insert(this.empleado);
		toastr.success('empleado guardado.');
		this.empleado = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.empleados');
		
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

    this.tomarFoto = function(){
		$meteor.getPicture().then(function(data){
			this.empleado.fotografia = data;
		})
	};

	this.getDepartamento= function(departamento_id)
	{
		var departamento = $meteor.object(Departamentos, departamento_id, false);
		return departamento.nombre;
	};	
	
		
};

 
	