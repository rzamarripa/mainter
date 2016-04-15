AsesorVentas 						= new Mongo.Collection("asesorVentas");
AsesorVentas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
