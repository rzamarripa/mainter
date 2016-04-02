angular.module("interCeramic")
.controller("VentasCtrl", VentasCtrl);  
 function VentasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    this.venta = {};
	this.subscribe('ventas');

	this.helpers({
	  ventas : () => {
		  return Ventas.find();
	  }
	 
  });
  

 var myfile="";

$('#resume_link').click(function( e ) {
    e.preventDefault();
    $('#resume').trigger('click');
});

$('#resume').on( 'change', function() {
   myfile= $( this ).val();
   var ext = myfile.split('.').pop();
   if(ext=="pdf" || ext=="docx" || ext=="doc"){
       alert(ext);
   } else{
       alert(ext);
   }
});



  this.guardar = function(venta)
	{
		this.venta.estatus = true;
		console.log(this.venta);
		Ventas.insert(this.venta);
		toastr.success('venta guardado.');
		this.venta = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.ventas')
	};
	
	this.editar = function(id)
	{
    this.venta = Ventas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(venta)
	{
		var idTemp = venta._id;
		delete venta._id;		
		Ventas.update({_id:idTemp},{$set:venta});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	/*this.cambiarEstatus = function(id)
	{
		var venta = Ventas.findOne({_id:id});
		if(venta.estatus == true)
			venta.estatus = false;
		else
			venta.estatus = true;
		
		Ventas.update({_id: id},{$set :  {estatus : venta.estatus}});
    };*/
		
};
