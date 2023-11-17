var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
	},
	
	onEdit: {
		custom: function() {
			
			
			$('#grupoDerivacion').arqzoom({
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
					        	"_initialValue": '%RAF10-DER%',
					        	"_finalValue" : '%RAF10-DER%',
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
		        	$('#codGrupoDerivacion').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoDerivacion').val('');
		        }
			});
			
			
	
		},
		
		bpm: {			
		},
		
		ged: function() {
		}
	}
};