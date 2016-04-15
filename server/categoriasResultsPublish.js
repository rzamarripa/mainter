Meteor.publish("categoriasResults", function(){
	return CategoriasResults.find({estatus:true});
});