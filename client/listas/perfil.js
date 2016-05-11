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
      this.subscribe('jefeAreas', () => {
    return [{
	    _id : $stateParams.id
    }];
  });
        this.subscribe('gerentes', () => {
    return [{
	    _id : $stateParams.id
    }];
  });


	this.subscribe('departamentos');

	this.helpers({
	  empleado : () => {
		  return Empleados.findOne();
	  },
	
	  jefeArea : () => {
		  return JefeAreas.findOne();
	  },
	 
	  gerente : () => {
		  return Gerentes.findOne();
	  },

	  departamentos : () => {
		  return Departamentos.find();
	  },
  });


	this.insertar= function(gerente)
	{
		
		var idTemp = gerente._id;
		delete gerente._id;		
		Listas.update({_id:idTemp},{$set:gerente});
		$('.collapse').collapse('hide');
		document.getElementById("mi").style.visibility = "hidden";



	}

  	  


  	  

	this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};

	/*rc.getOcupacion = function(id){
		var ocupacion = Ocupaciones.findOne(rc.alumno.ocupacion_id);
		return ocupacion.descripcion;
	};*/
	
		
};

 
	