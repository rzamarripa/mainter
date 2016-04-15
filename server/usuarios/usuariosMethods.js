Meteor.methods({
  createUsuario: function (usuario, rol, grupo) {
  	console.log(usuario);
		var usuario_id = Accounts.createUser({
			username: usuario.usuario,
			password: usuario.contrasena,			
			profile: {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + usuario.apMaterno,
				fotografia : usuario.fotografia,
				departamento_id : usuario.departamento_id
			}
		});


		Roles.addUsersToRoles(usuario_id, rol, grupo);
		
	},
	userIsInRole: function(usuario, rol, grupo, vista){
		if (!Roles.userIsInRole(usuario, rol, grupo)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	}
});