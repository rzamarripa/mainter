Meteor.publish("categoriasArts", function(){
	return CategoriasArts.find({estatus:true});
});