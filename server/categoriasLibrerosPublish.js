Meteor.publish("categoriasLibreros", function(){
	return CategoriasLibreros.find({estatus:true});
});