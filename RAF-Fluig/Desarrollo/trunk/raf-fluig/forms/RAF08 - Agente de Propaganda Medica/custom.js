
var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
	},
	
	onEdit: {
		custom: function() {
			
			$('#nombre').arqzoom({
				datasetId: 'RAF08-APM',
				resultFields: ['matricula','nombre','email'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "nombre",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }];
				},
				template: {
					row: [{ field: 'nombre', header:"Nombre y Apellido"}],
					width: "800px",
				},
				displayKey: function(res){
					return res['nombre'];
				},
		        callback: function(res){
		        	$('#matricula').val(res['matricula']);
		        	$('#email').val(res['email']);
		        },
		        clean: function(res){
		        	$('#matricula').val('');
		        	$('#email').val('');
		        }
			});
			
			$('#distrito').arqzoom({
				datasetId: 'RAF08-Distrito',
				resultFields: ['codigo','descripcion'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "codigo",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }];
				},
				template: {
					row: [{ field: 'descripcion', header:"Descripción"}],
					width: "800px",
				},
				displayKey: function(res){
					return res['descripcion'];
				},
		        callback: function(res){
		        	$('#distritoCodigo').val(res['codigo']);
		        },
		        clean: function(res){
		        	$('#distritoCodigo').val('');
		        }
			});
	

		},
		
		bpm: {			
		},
		
		ged: function() {
		}
	}
};