angular
.module("interCeramic")
.controller("RootCtrl", RootCtrl);
 function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	$reactive(this).attach($scope);
    this.action = true;
    this.fechaNac = this

    this.subscribe('empleado', () => {
    	return [{id : Meteor.user().profile.empleado_id}];
    });

     this.subscribe('departamentos');

    this.helpers({
	  empleado : () => {
		  return Empleados.findOne();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });

    this.isLoggedIn = function(){
	  return Meteor.user();




	 //admin = this.departamento.nombre = Meteor.user().profile.nombre;
  }




/*this.fecha= function(fechaNac)
{

  a = new Date(1995,11,17);
  b = new Date(1995,11,17);

  a.getTime() === b.getTime()

}*/






/*this.fecha = function(fechaNac) 
{

var first = '2016-14-23';
var second = '2015-14-23';
if( (new Date(first).getTime() > new Date(second).getTime()))

	{
    return true;
     
	}else {
     return false;

  }
}*/

this.fecha = function(fechaNac)
{
  if(new Date(fechaNac).getDate() == new Date().getDate() && new Date(fechaNac).getMonth() == new Date().getMonth()){
    return true; 
  }else{
    return false;
    }     
}




};