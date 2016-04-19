CategoriasResults						= new Mongo.Collection("categoriasResults");
CategoriasResults.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});