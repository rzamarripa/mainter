Meteor.publish("mercas", function(){
	return Mercas.find({estatus:true});
});