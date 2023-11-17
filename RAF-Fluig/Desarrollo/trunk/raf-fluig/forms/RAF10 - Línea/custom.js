var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
	},
	
	onEdit: {
		custom: function() {
			
			
			$('#grupoSolicitante').arqzoom({
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
					        	"_initialValue": '%RAF10-SOL-LINEA%',
					        	"_finalValue" : '%RAF10-SOL-LINEA%',
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
		        	$('#codGrupoSolicitante').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoSolicitante').val('');
		        }
			});
			
			$('#grupoGteMKT').arqzoom({
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
					        	"_initialValue": '%RAF10-GTE-MARKETING%',
					        	"_finalValue" : '%RAF10-GTE-MARKETING%',
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
		        	$('#codGrupoGteMKT').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoGteMKT').val('');
		        }
			});
			
	
		},
		
		bpm: {			
		},
		
		ged: function() {
		}
	}
};