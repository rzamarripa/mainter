angular.module("interCeramic")
.controller("ResultadosCtrl", ResultadosCtrl);  
 function ResultadosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('resultados');

  this.subscribe('categoriasResults');



	this.helpers({
	  resultados : () => {
		  return Resultados.find();
	  },
	   categoriasResults : () => {
		  return CategoriasResults.find();
	  }
  });
  
  this.nuevo = true;	  
  this.nuevoResultado = function()
  {

    this.action = true;
    this.nuevo = !this.nuevo;
    this.resultado = {};	
   // this.ticket.nota = "http"	
  };


  this.guardar = function(resultado)
	{
		this.resultado.nombre = Meteor.user().profile.nombre;
		this.resultado.estatus = true;
		console.log(this.resultado);
		Resultados.insert(this.resultado);
		toastr.success('resultado guardado.');
		this.resultado = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.resultados')
	};
	
	this.editar = function(id)
	{
    this.resultado = Resultados.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(resultado)
	{
		var idTemp = resultado._id;
		delete resultado._id;		
		Resultados.update({_id:idTemp},{$set:resultado});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var resultado = Resultados.findOne({_id:id});
		if(resultado.estatus == true)
			resultado.estatus = false;
		else
			resultado.estatus = true;
		
		Resultados.update({_id: id},{$set :  {estatus : resultado.estatus}});
    };

    

    this.getCategoria= function(id)
	{
		var categoriaLibrero = CategoriasLibreros.findOne(id);
		return categoriaLibrero.nombre;
	};	
		
};