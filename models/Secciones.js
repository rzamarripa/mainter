Secciones 						= new Mongo.Collection("secciones");
Secciones.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


SeccionesLibrero 						= new Mongo.Collection("seccionesLibrero");
SeccionesLibrero.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


SeccionesResultado 						= new Mongo.Collection("seccionesResultado");
SeccionesResultado.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});