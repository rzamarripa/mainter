Meteor.publish("categorias", function(){
	return Categorias.find({estatus:true});
});