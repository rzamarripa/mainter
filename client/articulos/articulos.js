angular.module("interCeramic")
.controller("ArticulosCtrl", ArticulosCtrl);  
 function ArticulosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('articulos');
	this.subscribe('categoriasArts');

	this.helpers({
	  articulos : () => {
		  return Articulos.find();
	  },
	   categoriasArts : () => {
		  return CategoriasArts.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoArticulos = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.articulo = {};		
    $('#summernote').summernote('reset');
  };
  
  this.guardar = function(articulo)
	{
		this.articulo.nota = $('#summernote').summernote('code');
		this.articulo.nombre = Meteor.user().profile.nombre;
		this.articulo.estatus = true;
		console.log(this.articulo);
		this.articulo.fecha = new Date();
		Articulos.insert(this.articulo);
		toastr.success('Artículo guardado.');
		this.articulo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.articulos')
	};
	
	this.editar = function(id)
	{
    this.articulo = Articulos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};





	
	this.actualizar = function(articulo)
	{
		this.articulo.nota = $('#summernote').summernote('code');
		var idTemp = articulo._id;
		delete articulo._id;		
		Articulos.update({_id:idTemp},{$set:articulo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var articulo = Articulos.findOne({_id:id});
		if(articulo.estatus == true)
			articulo.estatus = false;
		else
			articulo.estatus = true;
		
		Articulos.update({_id: id},{$set :  {estatus : articulo.estatus}});
    };

    this.getCategoria= function(id)
	{
		var categorias = CategoriasArts.findOne(id);
		if(categorias)
		return categorias.nombre;
	};	

		
	this.tienePermiso = function()
	{
		if(Meteor.user().roles[0] == "empleado" )
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
	    $(document).ready(function() {
  $('#summernote').summernote();
}); 
};
