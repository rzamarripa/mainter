angular.module("interCeramic")
.controller("AsesorVentasCtrl", AsesorVentasCtrl);  
 function AsesorVentasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    this.subscribe('asesorVentas');

	this.subscribe('departamentos');

	this.helpers({
	  asesorVentas : () => {
		  return AsesorVentas.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });
  	  
  this.nuevo = true;	  
  this.nuevoAsesorVenta = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    rc.asesorVenta = {};		
  };
  
  
	this.guardar = function(asesorVenta)
	{
	
		console.log(rc.asesorVenta);			
		rc.asesorVenta.estatus = true;
		rc.asesorVenta.nombreCompleto = rc.asesorVenta.nombre + " " + rc.asesorVenta.apPaterno + " " + rc.asesorVenta.apMaterno;
		AsesorVentas.insert(rc.asesorVenta, function(err, doc){
		    Meteor.call('createUsuario', rc.asesorVenta, 'asesorVenta');
		    toastr.success('Usuario guardado.');
	//	this.asesorVenta = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.asesorVentas');
		
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
    this.asesorVenta = AsesorVentas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
	this.actualizar = function(asesorVenta)
	{
		var idTemp = asesorVenta._id;
		delete asesorVenta._id;		
		AsesorVentas.update({_id:idTemp},{$set:asesorVenta});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var asesorVenta = AsesorVentas.findOne({_id:id});
		if(asesorVenta.estatus == true)
			asesorVenta.estatus = false;
		else
			asesorVenta.estatus = true;
		
		AsesorVentas.update({_id: id},{$set :  {estatus : asesorVenta.estatus}});
    };

   
	this.tomarFoto = function(){
    $meteor.getPicture().then(function(data){
      rc.asesorVenta.fotografia = data;
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

 
	