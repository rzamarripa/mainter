angular.module("interCeramic")
.controller("EmpleadosCtrl", EmpleadosCtrl);  
 function EmpleadosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});

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
    rc.empleado = {};		
  };
  
  
	this.guardar = function(empleado)
	{
		
		rc.empleado.estatus = true;
		console.log(rc.empleado);
		
		rc.empleado.nombreCompleto = rc.empleado.nombre + " " + rc.empleado.apPaterno + " " + rc.empleado.apMaterno;
		Empleados.insert(rc.empleado, function(err, doc){
		    Meteor.call('createUsuario', rc.empleado, 'empleado');
		    toastr.success('Empleado guardado.');
		this.empleado = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.empleados');
		
	    });
    };

    
   

	/*rc.guardar = function (alumno) {
	  console.log(alumno);
		rc.alumno.estatus = true;
		rc.alumno.nombreCompleto = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		Alumnos.insert(rc.alumno, function(err, doc){
			Meteor.call('createUsuario', rc.alumno, 'alumno');
			toastr.success('Alumno guardado.');
			$state.go('root.alumnoDetalle',{'id':doc});			
			rc.nuevo = true;
		});
	};*/








	
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

   
	/*this.tomarFoto = function(){
    $meteor.getPicture().then(function(data){
      rc.empleado.fotografia = data;
    });
   };*/

	this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		return departamento.nombre;
	};

	/*rc.getOcupacion = function(id){
		var ocupacion = Ocupaciones.findOne(rc.alumno.ocupacion_id);
		return ocupacion.descripcion;
	};*/
	
		
};

 
	