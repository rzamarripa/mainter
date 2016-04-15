Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var usuario_id= Accounts.createUser({
      username: 'admin',
      password: 'inter123',
    });
		Roles.addUsersToRoles(usuario_id, "admin");
  }
});