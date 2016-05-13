angular.module("interCeramic")
.controller("JefeAreasCtrl", JefeAreasCtrl);  
 function JefeAreasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    $rootScope.home = false;
    this.subscribe('jefeAreas', () => {
    	return [{estatus: true}];
    });

    this.subscribe('departamentos',()=>{
		return [{estatus:true}]
	});

	this.helpers({
	  jefeAreas : () => {
		  return JefeAreas.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });
  	  
  this.nuevo = true;	  
  this.nuevoJefeArea = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    rc.jefeArea = {};		
  };
  
  
	this.guardar = function(jefeArea)
	{
	
		console.log(rc.jefeArea);			
		rc.jefeArea.estatus = true;
		rc.jefeArea.nombreCompleto = rc.jefeArea.nombre + " " + rc.jefeArea.apPaterno + " " + rc.jefeArea.apMaterno;
		JefeAreas.insert(rc.jefeArea, function(err, doc){
			   this.nuevo = true;
			rc.jefeArea.empleado_id = doc;
		    Meteor.call('createUsuario', rc.jefeArea, 'jefeArea');

		    toastr.success('Usuario guardado.');
		this.jefeArea = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.jefeAreas');
		  this.nuevo = true;
		
	    });
    };


	
	this.editar = function(id)
	{
    this.jefeArea = JefeAreas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
	this.actualizar = function(jefeArea)
	{
		var idTemp = jefeArea._id;
		delete jefeArea._id;
		console.log(jefeArea);		
		Meteor.call('cambiaContra', jefeArea.usuario, jefeArea.contrasena);

		JefeAreas.update({_id:idTemp},{$set:jefeArea});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var jefeArea = JefeAreas.findOne({_id:id});
		if(jefeArea.estatus == true)
			jefeArea.estatus = false;
		else
			jefeArea.estatus = true;
		
		JefeAreas.update({_id: id},{$set :  {estatus : jefeArea.estatus}});
    };

   
	this.tomarFoto = function(){
    $meteor.getPicture().then(function(data){
      rc.jefeArea.fotografia = data;
    });
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

 
	