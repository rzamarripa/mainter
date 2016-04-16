angular.module("interCeramic")
.controller("ListasCtrl", ListasCtrl);  
 function ListasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('listas');
	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	

	this.helpers({
	  listas : () => {
		  return Listas.find();
	  },
	   empleados : () => {
		  return Empleados.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevolista = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.lista = {};		
  };
  
  this.guardar = function(lista)
	{
		this.lista.estatus = true;
		console.log(this.lista);
		Listas.insert(this.lista);
		toastr.success('lista guardado.');
		this.lista = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.lista')
	};
	
	this.editar = function(id)
	{
    this.lista = Listas.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(lista)
	{
		var idTemp = lista._id;
		delete lista._id;		
		Listas.update({_id:idTemp},{$set:lista});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var lista = Listas.findOne({_id:id});
		if(lista.estatus == true)
			lista.estatus = false;
		else
			lista.estatus = true;
		
		Listas.update({_id: id},{$set :  {estatus : lista.estatus}});
    };

    this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		return departamento.nombre;
	};

	/*this.resizeheight= function() {
    var height = ((2*screen.height)/20);
	
	return height;
}

    this.resizewidth= function() {
    var width = ((2*screen.width)/20);
	
	return width;
}*/
  
		
};
