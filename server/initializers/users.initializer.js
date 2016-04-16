Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var usuario_id= Accounts.createUser({
      username: 'admin',
      password: 'inter123',
      nombre: {
      	nombre: 'administrador'
      }
    });
    console.log(usuario_id);
	Roles.addUsersToRoles(usuario_id, "admin");
  }
});