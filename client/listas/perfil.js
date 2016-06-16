angular.module("interCeramic")
.controller("PerfilCtrl", PerfilCtrl);  
 function PerfilCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);
    this.action = true;
    $rootScope.home = false;
    
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


	this.insertar= function(empleado)
	{
		
		var idTemp = empleado._id;
		delete empleado._id;		
		Empleados.update({_id:idTemp},{$set:empleado});
		console.log(empleado);
		document.getElementById("acerca").style.visibility = "hidden";
		document.getElementById("botonGuardar").style.visibility = "hidden";
		document.getElementById("editar").style.visibility = "visible";
	}

	this.editar = function(empleado)
	{
		document.getElementById("acerca").style.visibility = "visible";
		document.getElementById("botonGuardar").style.visibility = "visible";
		document.getElementById("editar").style.visibility = "hidden";

	}

	this.insertarJefe= function(jefeArea)
	{
		
		var idTemp = jefeArea._id;
		delete jefeArea._id;		
		JefeAreas.update({_id:idTemp},{$set:jefeArea});
		console.log(jefeArea);
		document.getElementById("acerca").style.visibility = "hidden";
		document.getElementById("botonGuardar").style.visibility = "hidden";
		document.getElementById("editar").style.visibility = "visible";
	}

	this.editarJefe = function(jefeArea)
	{
		document.getElementById("acerca").style.visibility = "visible";
		document.getElementById("botonGuardar").style.visibility = "visible";
		document.getElementById("editar").style.visibility = "hidden";

	}


	this.insertarGerente= function(gerente)
	{
		
		var idTemp = gerente._id;
		delete gerente._id;		
		Gerentes.update({_id:idTemp},{$set:gerente});
		console.log(gerente);
		document.getElementById("acerca").style.visibility = "hidden";
		document.getElementById("botonGuardar").style.visibility = "hidden";
		document.getElementById("editar").style.visibility = "visible";
	}

	this.editarGerente = function(gerente)
	{
		document.getElementById("acerca").style.visibility = "visible";
		document.getElementById("botonGuardar").style.visibility = "visible";
		document.getElementById("editar").style.visibility = "hidden";

	}

  	  

	this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};


	this.editarFondo = function(jefeArea)
	{

		var idTemp = jefeArea._id;
		delete jefeArea._id;		
		JefeAreas.update({_id:idTemp},{$set:jefeArea});
		console.log(jefeArea);
		document.getElementById("guardar").style.visibility = "hidden";
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("botonMostrar").style.visibility = "visible";

	}
	this.editarFondoGerente = function(gerente)
	{

		var idTemp = gerente._id;
		delete gerente._id;		
		Gerentes.update({_id:idTemp},{$set:gerente});
		console.log(gerente);
		document.getElementById("guardar").style.visibility = "hidden";
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("botonMostrar").style.visibility = "visible";

	}
	this.editarFondoEmpleado = function(empleado)
	{

		var idTemp = empleado._id;
		delete empleado._id;		
		Empleados.update({_id:idTemp},{$set:empleado});
		console.log(empleado);
		document.getElementById("guardar").style.visibility = "hidden";
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("botonMostrar").style.visibility = "visible";

	}
	this.mostrarBtnFondo = function(jefeArea,gerente,empleado)
	{
		document.getElementById("guardar").style.visibility = "visible";
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("botonMostrar").style.visibility = "hidden";
	}

	this.tienePermiso = function()
	{
		if(Meteor.user() != undefined){
		if(Meteor.user().roles[0] == "empleado" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "jefeArea" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "asesorVenta" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "gerente" )
		{
			return false;
		}
		else{
			return true;
		}

	   }
		
	}

	/*rc.getOcupacion = function(id){
		var ocupacion = Ocupaciones.findOne(rc.alumno.ocupacion_id);
		return ocupacion.descripcion;
	};*/
	
		
};

 
	