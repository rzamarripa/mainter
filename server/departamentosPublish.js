Meteor.publish("departamentos", function(){
	return Departamentos.find({estatus:true});
});