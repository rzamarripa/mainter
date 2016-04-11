angular.module("interCeramic")
.controller("LoginCtrl", LoginCtrl);  
 function LoginCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);

  this.credentials = {
    username: '',
    password: ''
  };

  this.login = function () {
	  console.log(this.credentials);
    $meteor.loginWithPassword(this.credentials.username, this.credentials.password).then(
      function () {
	      toastr.success("Bienvenido al Sistema");
        $state.go('root.home');        
      },
      function (error) {
        toastr.error(error.reason);
      }
    )
  }
};