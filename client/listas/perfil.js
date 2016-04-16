angular.module("interCeramic")
.controller("PerfilCtrl", PerfilCtrl);  
 function PerfilCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    
    this.fechaActual = new Date();
    
    this.subscribe('empleados', () => {
    return [{
	    _id : $stateParams.id
    }];
  });

	this.subscribe('departamentos');

	this.helpers({
	  empleado : () => {
		  return Empleados.findOne();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });
  	  
 

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

 
	