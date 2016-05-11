angular
.module("interCeramic")
.controller("RootCtrl", RootCtrl);
 function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	$reactive(this).attach($scope);
    this.action = true;
    users = []; 

    this.subscribe('gerente', () => {
      return [{id : this.getReactively('empleado_id')}];
    });
          this.subscribe('jefeArea', () => {
      return [{id : this.getReactively('empleado_id')}];
    });
     this.subscribe('empleado', () => {
      return [{id : this.getReactively('empleado_id')}];
    });
    this.subscribe('departamentos',()=>{
      return [{estatus:true}]
    });

    this.helpers({
	  empleado : () => {
		  return Empleados.findOne();
	  },
     gerente : () => {
      return Gerentes.findOne();
    },
     jefeArea : () => {
      return JefeAreas.findOne();
    },
	  departamentos : () => {
		  return Departamentos.find();
	  },
    empleado_id : () =>{
      if(Meteor.user() != undefined){
        return Meteor.user().profile.empleado_id
      }else{
        return "";
      }
    },
    user: () =>{
      if(Meteor.user() != undefined){
        return Meteor.user().username;
      }else{
        return "";
      }
    }
  });

  this.isLoggedIn = function(){
	  return Meteor.user();
  }


  this.logeado=function()
  {
    if (this.isLoggedIn) {
      return Meteor.user().profile.nombre
    }
  }



  console.log($state.current.name);
    if($state.current.name == "root.home"){
    this.home = true;
    }else{
    this.home = false;
    }
  


  this.linkers = function(id)
        {
          
    if(Meteor.user().roles[0] == "jefeArea"){
      $state.go('root.perfilJefe', {'id': 'id'}); 
    }
     if(Meteor.user().roles[0] == "gerente"){
      $state.go('root.perfilGerente', {'id': 'id'}); 
    }
     if(Meteor.user().roles[0] == "empleado"){
      $state.go('root.perfil', {'id': 'id'}); 
    }

  };
 


this.fecha = function(fechaNac)
{
  if(new Date(fechaNac).getDate() == new Date().getDate() && new Date(fechaNac).getMonth() == new Date().getMonth()){
    return true; 
  }else{
    return false;
    }     
}




};