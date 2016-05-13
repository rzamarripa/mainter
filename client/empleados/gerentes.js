angular.module("interCeramic")
.controller("GerentesCtrl", GerentesCtrl);  
 function GerentesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    $rootScope.home = false;
        this.subscribe('gerentes', () => {
    	return [{estatus: true}];
    });

this.subscribe('departamentos',()=>{
		return [{estatus:true}]
	});

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
		    this.nuevo = true;
		    toastr.success('Usuario guardado.');
	 	this.gerente = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.gerentes');
		
	    });
    };

    
  
	
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
		 Meteor.call('cambiaContra', rc.gerente, 'gerente');
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
		
		Gerentes.update({_id: id},{$set :  {estatus : gerente.estatus}});
    };

  

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

 
	