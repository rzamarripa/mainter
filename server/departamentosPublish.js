Meteor.publish("departamentos", function(){
	return Departamentos.find();
});