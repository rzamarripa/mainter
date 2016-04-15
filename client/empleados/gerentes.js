angular.module("interCeramic")
.controller("GerentesCtrl", GerentesCtrl);  
 function GerentesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    this.subscribe('gerentes');

	this.subscribe('departamentos');

	this.helpers({
	  gerentes : () => {
		  return Gerentes.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });
  	  
  this.nuevo = true;	  
  this.nuevoGerente = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    rc.gerente = {};		
  };
  
  
	this.guardar = function(gerente)
	{
	
		console.log(rc.gerente);			
		rc.gerente.estatus = true;
		rc.gerente.nombreCompleto = rc.gerente.nombre + " " + rc.gerente.apPaterno + " " + rc.gerente.apMaterno;
		Gerentes.insert(rc.gerente, function(err, doc){
		    Meteor.call('createUsuario', rc.gerente, 'gerente');
		    toastr.success('Usuario guardado.');
	//	this.gerente = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.gerentes');
		
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
    this.gerente = Gerentes.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
	this.actualizar = function(gerente)
	{
		var idTemp = gerente._id;
		delete gerente._id;		
		Gerentes.update({_id:idTemp},{$set:gerente});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var gerente = Gerentes.findOne({_id:id});
		if(gerente.estatus == true)
			gerente.estatus = false;
		else
			gerente.estatus = true;
		
		gerentes.update({_id: id},{$set :  {estatus : gerente.estatus}});
    };

   
	this.tomarFoto = function(){
    $meteor.getPicture().then(function(data){
      rc.gerente.fotografia = data;
    });
   };

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

 
	