
var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
	},
	
	onEdit: {
		custom: function() {
			
			$('#limiteAprGtePromo').arqnum({
				decimals: 2,
				dec_point: '.',
				thousands_sep: '',
			});
			
			$('#grupoGteDistrito').arqzoom({
				datasetId: 'group',
				resultFields: ['groupDescription','groupPK.groupId'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "groupDescription",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        },
					        {
					        	"_field" : "groupPK.groupId",
					        	"_initialValue": '%RAF08-GTE-DIST%',
					        	"_finalValue" : '%RAF08-GTE-DIST%',
					        	"_type": 1, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'groupDescription', header:"Descripción"}],
					width: "800px",
				},
				displayKey: function(res){
					return res['groupDescription'];
				},
		        callback: function(res){
		        	$('#codGrupoGteDistrito').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoGteDistrito').val('');
		        }
			});
			
			$('#grupoAsistDistrito').arqzoom({
				datasetId: 'group',
				resultFields: ['groupDescription','groupPK.groupId'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "groupDescription",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        },
					        {
					        	"_field" : "groupPK.groupId",
					        	"_initialValue": '%RAF08-ASIST-DIST%',
					        	"_finalValue" : '%RAF08-ASIST-DIST%',
					        	"_type": 1, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'groupDescription', header:"Descripción"}],
					width: "800px",
				},
				displayKey: function(res){
					return res['groupDescription'];
				},
		        callback: function(res){
		        	$('#codGrupoAsistDistrito').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoAsistDistrito').val('');
		        }
			});

			$('#area').arqzoom({
				datasetId: 'RAF08-Area',
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
		        	$('#areaCodigo').val(res['codigo']);
		        },
		        clean: function(res){
		        	$('#areaCodigo').val('');
		        }
			});
	
		},
		
		bpm: {			
		},
		
		ged: function() {
		}
	}
};