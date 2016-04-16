angular
.module("interCeramic")
.controller("RootCtrl", RootCtrl);
 function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	$reactive(this).attach($scope);
    this.action = true;

    this.subscribe('empleados');

     this.subscribe('departamentos');

    this.helpers({
	  empleados : () => {
		  return Empleados.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
  });

    this.isLoggedIn = function(){
	  return Meteor.user();




	 //admin = this.departamento.nombre = Meteor.user().profile.nombre;
  } 
};