Meteor.methods({
  createUsuario: function (usuario) {
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
		
	
		
	},

});