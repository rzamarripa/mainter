angular.module("interCeramic")
.controller("ListasCtrl", ListasCtrl);  
 function ListasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);
  this.action = true;



	this.subscribe('listas');

	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	this.subscribe('asesorVentas',()=>{
		return [{estatus:true}]
	});
	this.subscribe('gerentes',()=>{
		return [{estatus:true}]
	});
	this.subscribe('empleados',()=>{
		return [{estatus:true}]
	});
	this.subscribe('jefeAreas',()=>{
		return [{estatus:true}]
	});
		this.subscribe('sucursales',()=>{
		return [{estatus:true}]
	});
		this.subscribe('quienes',()=>{
		return [{estatus:true}]
	});

		this.subscribe('mision',()=>{
		return [{estatus:true}]
	});
		this.subscribe('vision',()=>{
		return [{estatus:true}]
	});


		this.subscribe('valores',()=>{
		return [{estatus:true}]
	});
	
	

	this.helpers({
	  listas : () => {
		  return Listas.find();
	  },
	   empleados : () => {
		  return Empleados.find({}, { sort: {score: -1, name: 1} });
	  },
	  asesorVentas : () => {
		  return AsesorVentas.find();
	  },
	  gerentes : () => {
		  return Gerentes.find();
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
	  jefeAreas : () => {
		  return JefeAreas.find();
	  },
	   sucursales : () => {
		  return Sucursales.find();
	  },
	  quienes : () => {
		  return Quienes.find();
	  },
	   misiones : () => {
		  return Mision.find();
	  },
	   visiones : () => {
		  return Vision.find();
	  },
	   valores : () => {
		  return Valores.find();
	  },


  });
  	  
  this.nuevo = true;	  
  this.nuevolista = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.lista = {};		
  };


  this.listaEmpleados = function()
  {
  	this.empleados.push("jefeAreas");
  	this.empleados.push("asesorVentas");
  	this.empleados.push("gerentes");

  }
  
  this.guardar = function(lista)
	{
		this.lista.estatus = true;
		console.log(this.lista);
		Listas.insert(this.lista);
		toastr.success('lista guardado.');
		this.lista = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.lista')
	};
	
	this.editar = function(id)
	{
    this.lista = Listas.findOne({_id:id});
    this.action = false;
      $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(lista)
	{
		var idTemp = lista._id;
		delete lista._id;		
		Listas.update({_id:idTemp},{$set:lista});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	

	this.cambiarEstatus = function(id)
	{
		var lista = Listas.findOne({_id:id});
		if(lista.estatus == true)
			lista.estatus = false;
		else
			lista.estatus = true;
		
		Listas.update({_id: id},{$set :  {estatus : lista.estatus}});
  };
    
  this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};
	
	this.esCumpleanero = function(fechaNac){
		var fechaNacimiento = new Date(fechaNac);
		var diaNac = fechaNacimiento.getDate();		
		var mesNac = fechaNacimiento.getMonth() + 1;
		
		var fechaActual = new Date();
		var diaActual = fechaActual.getDate();
		var mesActual = fechaActual.getMonth() + 1;
		
		if(mesNac == mesActual){
			if(diaNac == diaActual){
				return true;				
			}
		}
		
		return false;
		console.log("fecha", fechaNacimiento);
		console.log("dia", diaNac);
		console.log("mes", mesNac);
		console.log("fechaA", fechaActual);
		console.log("diaA", diaActual);
		console.log("mesA", mesActual);
		console.log("--------")
		
//		return days;
	}

/////////////////////////////QUIENES SOMOS//////////////////////////////////////////////////////////////////////////////////////
this.accionQuienes = true;
 this.mostrarQuienes = true;

 this.nuevoQuienes = function()
  {
    this.accionQuienes = true;
    this.mostrarQuienes = !this.mostrarQuienes;
    this.quien = {};		
  };

	this.guardarQuienes = function(quien)
	{	
		this.quien.estatus = true;
		Quienes.insert(this.quien);
		console.log(this.quien);
		this.quien = {}; 
		$('.collapse').collapse("hide");
		this.mostrarEvento = true;
	 };

	 this.editarQuienes = function(id)
	{
    this.quien = Quienes.findOne({_id:id});
    this.accionQuienes = false;
    $('.collapse').collapse("show");
    this.mostrarQuienes = false;
	};

	
	this.actualizarQuienes = function(quien)
	{
		var idTemp = quien._id;
		delete quien._id;		
		Quienes.update({_id:idTemp},{$set:quien});
		$('.collapse').collapse('hide');
		console.log(quien);
		this.mostrarQuienes = true;
	};
	
	this.cambiarEstatusQuienes = function(id)
	{
		var quien = Quienes.findOne({_id:id});
		if(quien.estatus == true)
			quien.estatus = false;
		else
			quien.estatus = true;
		
		Quienes.update({_id: id},{$set :  {estatus : quien.estatus}});
    };  


////////////////////////////////////MISION///////////////////////////////////////////////////////////////////////

 this.accionMision = true;
 this.mostrarMision = true;

 this.nuevoMision = function()
  {
    this.accionMision = true;
    this.mostrarMision = !this.mostrarMision;
    this.mision = {};		
  };

	this.guardarMision = function(mision)
	{	
		this.mision.estatus = true;
		Mision.insert(this.mision);
		console.log(this.mision);
		this.mision = {}; 
		$('#collapseExampleMision').collapse("hide");
		this.mostrarMision = true;
	 };

	 this.editarMision = function(id)
	{
    this.mision = Mision.findOne({_id:id});
    this.accionMision = false;
    $('#collapseExampleMision').collapse("show");
    this.mostrarMision = false;
	};

	
	this.actualizarMision = function(mision)
	{
		var idTemp = mision._id;
		delete mision._id;		
		Mision.update({_id:idTemp},{$set:mision});
		$('#collapseExampleMision').collapse('hide');
		console.log(mision);
		this.mostrarMision = true;
	};
	
	this.cambiarEstatusMision = function(id)
	{
		var mision = Mision.findOne({_id:id});
		if(mision.estatus == true)
			mision.estatus = false;
		else
			mision.estatus = true;
		
		Mision.update({_id: id},{$set :  {estatus : mision.estatus}});
    };  
    //////////////////////////////////////////////////////////////////////

  this.accionVision = true;
 this.mostrarVision = true;

 this.nuevoMision = function()
  {
    this.accionVision = true;
    this.mostrarVision = !this.mostrarVision;
    this.vision = {};		
  };

	this.guardarVision = function(vision)
	{	
		this.vision.estatus = true;
		Vision.insert(this.vision);
		console.log(this.vision);
		this.vision = {}; 
		$('#collapseExampleVision').collapse("hide");
		this.mostrarVision = true;
	 };

	 this.editarVision = function(id)
	{
    this.vision = Vision.findOne({_id:id});
    this.accionVision = false;
    $('#collapseExampleVision').collapse("show");
    this.mostrarVision = false;
	};

	
	this.actualizarVision = function(vision)
	{
		var idTemp = vision._id;
		delete vision._id;		
		Vision.update({_id:idTemp},{$set:vision});
		$('#collapseExampleVision').collapse('hide');
		console.log(vision);
		this.mostrarVision = true;
	};
	
	this.cambiarEstatusVision = function(id)
	{
		var vision = Vision.findOne({_id:id});
		if(vision.estatus == true)
			vision.estatus = false;
		else
			vision.estatus = true;
		
		Vision.update({_id: id},{$set :  {estatus : vision.estatus}});
    };  

    /////////////////////////////////////////////////////////////////////////////////
    this.accionValores = true;
 this.mostrarValores = true;

 this.nuevoValores = function()
  {
    this.accionValores = true;
    this.mostrarValores = !this.mostrarValores;
    this.valor = {};		
  };

	this.guardarValores = function(valor)
	{	
		this.valor.estatus = true;
		Valores.insert(this.valor);
		console.log(this.valor);
		this.valor = {}; 
		$('#collapseExampleValores').collapse("hide");
		this.mostrarValores = true;
	 };

	 this.editarValores = function(id)
	{
    this.valor = Valores.findOne({_id:id});
    this.accionValores = false;
    $('#collapseExampleValores').collapse("show");
    this.mostrarValores = false;
	};

	
	this.actualizarValores = function(valor)
	{
		var idTemp = valor._id;
		delete valor._id;		
		Valores.update({_id:idTemp},{$set:valor});
		$('#collapseExampleValores').collapse('hide');
		console.log(valor);
		this.mostrarValores = true;
	};
	
	this.cambiarEstatusValores = function(id)
	{
		var valor = Valores.findOne({_id:id});
		if(valor.estatus == true)
			valor.estatus = false;
		else
			valor.estatus = true;
		
		Valores.update({_id: id},{$set :  {estatus : valor.estatus}});
    };  
		

		this.tienePermiso = function()
	{
	    if(Meteor.user() != undefined){
		if(Meteor.user().roles[0] == "jefeArea" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "asesorVenta" )
		{
			return false;
		}
		if(Meteor.user().roles[0] == "gerente" )
		{
			return false;
		}
		else{
			return true;
		}
	  }
		
	}
};
