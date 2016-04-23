Felicitaciones 						= new Mongo.Collection("felicitaciones");
Felicitaciones.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});