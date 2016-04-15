angular.module("interCeramic")
.controller("DepartamentosCtrl", DepartamentosCtrl);  
 function DepartamentosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    this.departamento = {};
	this.subscribe('departamentos');

	this.helpers({
	  departamentos : () => {
		  return Departamentos.find();
	  }
	 
  });

	this.nuevo = true;	  
  this.nuevoDepartamento = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.departamento = {};		
  };

  this.guardar = function(departamento)
	{
		this.departamento.estatus = true;
		console.log(this.departamento);
		Departamentos.insert(this.departamento);
		toastr.success('departamento guardado.');
		this.departamento = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.departamentos')
	};
	
	this.editar = function(id)
	{
    this.departamento = Departamentos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse("show");
    this.nuevo = false;
	};
	
	this.actualizar = function(departamento)
	{
		var idTemp = departamento._id;
		delete departamento._id;		
		Departamentos.update({_id:idTemp},{$set:departamento});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var departamento = Departamentos.findOne({_id:id});
		if(departamento.estatus == true)
			departamento.estatus = false;
		else
			departamento.estatus = true;
		
		Departamentos.update({_id: id},{$set :  {estatus : departamento.estatus}});
    };
		
};