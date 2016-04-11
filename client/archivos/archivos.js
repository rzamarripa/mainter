angular.module("interCeramic")
.controller("ArchivosCtrl", ArchivosCtrl);  
 function ArchivosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('archivos');



	this.helpers({
	  archivos : () => {
		  return Archivos.find();
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
		this.archivo.estatus = true;
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
    $('.collapse').coll
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
		
};