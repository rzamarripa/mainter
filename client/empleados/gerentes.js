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

  this.subscribe('sucursales',()=>{
		return [{estatus:true}]
	});

	this.helpers({
	  gerentes : () => {
		  return Gerentes.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
	   sucursales : () => {
		  return Sucursales.find();
	  },
  });
  	  
  this.new = true;	  
  this.newGerente = function()
  {
    this.action = true;
    this.new = !this.new;
    rc.gerente = {};		
  };
  
  
	this.guardar = function(gerente)
	{
	
		console.log(rc.gerente);			
		rc.gerente.estatus = true;
		rc.gerente.nombreCompleto = rc.gerente.nombre + " " + rc.gerente.apPaterno + " " + rc.gerente.apMaterno;
		Gerentes.insert(rc.gerente, function(err, doc){
			rc.gerente.empleado_id = doc;
		    Meteor.call('createUsuario', rc.gerente, 'gerente');
		    this.new = true;
		    toastr.success('Usuario guardado.');
	 	this.gerente = {};
		$('.collapse').collapse('hide');
		this.new = true;
		$state.go('root.gerentes');
		
	    });
    };



    
  
	
	this.editar = function(id)
	{
    this.gerente = Gerentes.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.new = false;
	};
	
	
	this.actualizar = function(gerente)
	{
		var idTemp = gerente._id;
		delete gerente._id;		
		 Meteor.call('cambiaContra', gerente.usuario, gerente.contrasena);
		Gerentes.update({_id:idTemp},{$set:gerente});
		$('.collapse').collapse('hide');
		this.new = true;
	};
	

	


	this.cambiarEstatus = function(id)
	{
		var gerente = Gerentes.findOne({_id:id});
		if(gerente.estatus == true)
			gerente.estatus = false;
		else
			gerente.estatus = true;
		
		Gerentes.update({_id: id},{$set :  {estatus : gerente.estatus}});
		Meteor.call('actualizarUsuario', id );
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




	/*rc.getOcupacion = function(id){
		var ocupacion = Ocupaciones.findOne(rc.alumno.ocupacion_id);
		return ocupacion.descripcion;
	};*/
	
		
};

 
	