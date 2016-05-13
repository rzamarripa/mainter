angular.module("interCeramic")
.controller("DepartamentosCtrl", DepartamentosCtrl);  
 function DepartamentosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	rc = $reactive(this).attach($scope);
    this.action = true;
    this.departamento = {};
    $rootScope.home = false;
	this.subscribe('departamentos',()=>{
		return [{estatus:true}]
	});

	this.helpers({
	  departamentos : () => {
		  return Departamentos.find();
	  },

	  empleado : () => {
	  	return Empleados.findOne();
	  }
  });


	$(function() {
        $('#cp7').colorpicker({
            color: '#ffaa00',
            container: true,
            inline: true
        });

        $('#cp1').colorpicker();


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
		rc.departamento.className = $("#cp1").val();
		rc.departamento.estatus = true;
		console.log(rc.departamento);
		Departamentos.insert(rc.departamento);
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