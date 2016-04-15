CategoriasResults						= new Mongo.Collection("CategoriasResults");
CategoriasResults.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});