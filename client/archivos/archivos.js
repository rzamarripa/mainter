angular.module("interCeramic")
.controller("ArchivosCtrl", ArchivosCtrl);  
 function ArchivosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	rc = $reactive(this).attach($scope);
 	this.nada = undefined;
 	this.categoriasLibrero_id = '';
  	this.action = true;
	this.subscribe('archivos',()=>{
		return [{categoriasLibrero_id:this.getReactively('categoriasLibrero_id'), estatus:true}]
	});

  	this.subscribe('categoriasLibreros');

	this.helpers({
	  archivos : () => {
		  return Archivos.find();
	  },
	   categoriasLibreros : () => {
		  return CategoriasLibreros.find();
	  }
  });
  
  this.nuevo = true;	  
  this.nuevoArchivo = function()
  {

    this.action = true;
    this.nuevo = !this.nuevo;
    this.archivo = {};	
   // this.ticket.nota = "http"	
  };


  this.guardar = function(archivo)
	{
		this.archivo.nombre = Meteor.user().profile.nombre;
		this.archivo.estatus = true;
		this.archivo.categoriasLibrero_id = this.categoriasLibrero_id;
		console.log(this.archivo);
		Archivos.insert(this.archivo);
		toastr.success('archivo guardado.');
		this.archivo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.archivos')
	};
	
	this.editar = function(id)
	{
    this.archivo = Archivos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(archivo)
	{
		var idTemp = archivo._id;
		delete archivo._id;		
		Archivos.update({_id:idTemp},{$set:archivo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var archivo = Archivos.findOne({_id:id});
		if(archivo.estatus == true)
			archivo.estatus = false;
		else
			archivo.estatus = true;
		Archivos.update({_id: id},{$set :  {estatus : archivo.estatus}});
    };

    this.mostrarArchivos= function(id,nombre)
	{
		console.log(id, nombre);
		rc.nada = nombre;
		this.categoriasLibrero_id = id;
	};	
		this.tienePermiso = function()
	{
		if(Meteor.user().roles[0] == "empleado" )
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

		
};