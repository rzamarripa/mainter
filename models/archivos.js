Archivos = new FS.Collection("archivos", {
  stores: [
    new FS.Store.GridFS("original")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});
Archivos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; },
  download: function () {return true; }
});