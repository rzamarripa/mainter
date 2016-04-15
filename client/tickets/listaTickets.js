angular.module("interCeramic")
.controller("ListaTicketsCtrl", ListaTicketsCtrl);  
 function ListaTicketsCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    

    //departamento={};
   // departamento.nombre="";

	this.subscribe('tickets', () => {
		//select * from tickets where departamento_id = user.departamento_id and estatus = true
		return [{departamento_id : Meteor.user().profile.departamento_id, estatus : true}]
	});
	this.subscribe('departamentos');
	this.ticket={};

	this.helpers({
	  listaTickets : () => {
		  return Tickets.find();
	  },
	   departamentos : () => {
		  return Departamentos.find();
	  }	 
  	});





	/*this.editar = function(id)
	{
		
	    this.listaTicket = Tickets.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
*/

	
	this.actualizar = function(_ticket)
	{
		console.log(_ticket);
		var idTemp = _ticket._id;
		delete _ticket._id;	
		delete _ticket.$$hashKey;		
		Tickets.update({_id:idTemp},{$set:_ticket});
		document.getElementById("input").style.visibility = "hidden";
        document.getElementById("boton").style.visibility = "hidden";
	
	};

	this.cambiarEstatus = function(id)
	{
		var ticket = Tickets.findOne({_id:id});
		if(ticket.estatus == true)
			ticket.estatus = false;
		else
			ticket.estatus = true;
		
		Tickets.update({_id: id},{$set :  {estatus : ticket.estatus}});
    };

    this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		//console.log(departamento);
		return departamento.nombre;
	};	

	$(document).ready(function() {
	  $('#summernote').summernote();
	});  



this.agregar= function(_ticket) {

    document.getElementById("input").style.visibility = "visible";
    document.getElementById("boton").style.visibility = "visible";
    this.ticket = _ticket;
}

		
};