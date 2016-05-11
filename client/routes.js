angular.module("interCeramic").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
/*
    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }
*/
  });
});

angular.module('interCeramic').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.success("Vuelva pronto.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl as root',
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',  
       controller: 'HomeCtrl as hom', 
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.perfil', {
      url: '/perfil/:id',
      params: {'id':':id'},
      templateUrl: 'client/listas/perfil.ng.html',  
       controller: 'PerfilCtrl as perfil', 
      
    })
    .state('root.perfilGerente', {
      url: '/perfilGerente/:id',
      params: {'id':':id'},
      templateUrl: 'client/listas/perfilGerente.ng.html',  
       controller: 'PerfilCtrl as perfil', 
      
    })
    .state('root.perfilJefe', {
      url: '/perfilJefe/:id',
      params: {'id':':id'},
      templateUrl: 'client/listas/perfilJefe.ng.html',  
       controller: 'PerfilCtrl as perfil', 
      
    })


      .state('root.panel', {
      url: '/panel/:id',
      templateUrl: 'client/layouts/left-nav.ng.html',  
       controller: 'RootCtrl as root', 
      
    })
    .state('root.miCumple', {
      url: '/miCumple/:id',
      templateUrl: 'client/miCumple/miCumple.ng.html',  
       controller: 'MiCumpleCtrl as cumple',  
    })

      .state('root.recuperar', {
      url: '/recuperar/',
      templateUrl: 'client/login/recuperar.ng.html',  
       controller: 'RecuperarCtrl as forgot',  
    })
       .state('root.sucursales', {
      url: '/sucursales/:id',
      templateUrl: 'client/sucursales/sucursales.ng.html',  
       controller: 'SucursalesCtrl as sucu', 
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      } 
    })
       .state('root.sucursalVista', {
      url: '/sucursalVista/:id',
      templateUrl: 'client/sucursales/sucursalVista.ng.html',  
       controller: 'SucursalesCtrl as sucu',  
    })
      
    

    ///////////////////////ARTICULOS///////////////////////////////////////////////
    .state('root.articulos', {
      url: '/articulos',
      templateUrl: 'client/articulos/articulos.ng.html',
      controller: 'ArticulosCtrl as art',
    })
    .state('root.articulosUser', {
      url: '/articulosUser',
      templateUrl: 'client/articulos/articulosUser.ng.html',
      controller: 'ArticulosUserCtrl as artU',
    })
    ///////////////////////CATEGORIAS/////////////////////////////////////////////////

    .state('root.categorias', {
      url: '/categorias',
      templateUrl: 'client/categorias/categorias.ng.html',
      controller: 'CategoriasCtrl as catego',
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
    .state('root.categoriasArts', {
      url: '/categoriasArts',
      templateUrl: 'client/categorias/categoriasArts.ng.html',
      controller: 'CategoriasArtCtrl as cate',
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
    .state('root.categoriasLibreros', {
      url: '/categoriasLibreros',
      templateUrl: 'client/categorias/categoriasLibreros.ng.html',
      controller: 'CategoriasLibrerosCtrl as catelib',
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
        .state('root.categoriasResults', {
      url: '/categoriasResults',
      templateUrl: 'client/categorias/categoriasResults.ng.html',
      controller: 'CategoriasResultsCtrl as cateres',
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
             if(user.roles[0] == "jefeArea" || user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    .state('root.archivos', {
      url: '/archivos',
      templateUrl: 'client/archivos/archivos.ng.html',
      controller: 'ArchivosCtrl as archi',
    })
      .state('root.resultados', {
      url: '/resultados',
      templateUrl: 'client/resultados/resultados.ng.html',
      controller: 'ResultadosCtrl as resu',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
    .state('root.eventos', {
      url: '/eventos',
      templateUrl: 'client/eventos/eventos.ng.html',
      controller: 'EventosCtrl as e',
    })
    .state('root.noticias', {
      url: '/noticias',
      templateUrl: 'client/noticias/noticias.ng.html',
      controller: 'NoticiasCtrl as not',
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
             if(user.roles[0] == "jefeArea" || user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
   /*.state('root.departamentos', {
      url: '/departamentos',
      templateUrl: 'client/departamentos/departamentos.ng.html',
      controller: 'DepartamentosCtrl as depa',
    }) */
     .state('root.empleados', {
      url: '/empleados',
      templateUrl: 'client/empleados/empleados.ng.html',
      controller: 'EmpleadosCtrl as emp',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })

    .state('root.departamentos', {
      url: '/departamentos/:id',
      templateUrl: 'client/departamentos/departamentos.ng.html',
      controller: 'DepartamentosCtrl as depa',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
  }) 
    .state('root.jefeAreas', {
      url: '/jefeAreas/:id',
      templateUrl: 'client/empleados/jefeAreas.ng.html',
      controller: 'JefeAreasCtrl as jefe',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] /*== "jefeArea" || user.roles[0]*/ == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
  }) 
     .state('root.gerentes', {
      url: '/gerentes/:id',
      templateUrl: 'client/empleados/gerentes.ng.html',
      controller: 'GerentesCtrl as ger',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
  }) 
      
 

     .state('root.asesorVentas', {
      url: '/asesorVentas/:id',
      templateUrl: 'client/empleados/asesorVentas.ng.html',
      controller: 'AsesorVentasCtrl as asesor',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
  }) 
      


    .state('root.tickets', {
      url: '/tickets',
      templateUrl: 'client/tickets/tickets.ng.html',
      controller: 'TicketsCtrl as tick',
       resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
             if(user.roles[0] == "jefeArea" || user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })

    .state('root.usuarios', {
      url: '/usuarios',
      templateUrl: 'client/usuarios/usuarios.ng.html',
      controller: 'UsuariosCtrl as user',
    })
    .state('root.mercas', {
      url: '/mercas',
      templateUrl: 'client/mercas/mercas.ng.html',
      controller: 'MercasCtrl as merc',
    })
    .state('root.listas', {
      url: '/listas',
      templateUrl: 'client/listas/listas.ng.html',
      controller: 'ListasCtrl as lis',
    })
    .state('root.listaTickets', {
      url: '/listaTickets',
      templateUrl: 'client/tickets/listaTickets.ng.html',
      controller: 'ListaTicketsCtrl as list',
         resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
             if(user.roles[0] == "jefeArea" || user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })
    .state('root.asistenciaGrupo', {
      url: '/asistenciaGrupo/:id',
      templateUrl: 'client/maestro/asistencias/asistencias.ng.html',
      controller: 'MaestroAsistenciasCtrl',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "maestro"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })       
    .state('root.alumnoCalificaciones', {
      url: '/alumnoCalificaciones',
      templateUrl: 'client/alumno/calificaciones/calificaciones.ng.html',
      controller: 'AlumnoCalificacionesCtrl',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "alumno"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}					 	
         });
       }]
    	}
    }); 
}]);
 