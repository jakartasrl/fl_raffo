
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
				dec_point: ',',
				thousands_sep: '',
			});
			
			$('#grupoGteArea').arqzoom({
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
					        	"_initialValue": '%RAF08-GTE-AREA%',
					        	"_finalValue" : '%RAF08-GTE-AREA%',
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
		        	$('#codGrupoGteArea').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoGteArea').val('');
		        }
			});
			
			$('#grupoGtePromocion').arqzoom({
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
					        	"_initialValue": '%RAF08-GTE-PROMO%',
					        	"_finalValue" : '%RAF08-GTE-PROMO%',
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
		        	$('#codGrupoGtePromocion').val(res['groupPK.groupId']);
		        },
		        clean: function(res){
		        	$('#codGrupoGtePromocion').val('');
		        }
			});
			
	
		},
		
		bpm: {			
		},
		
		ged: function() {
		}
	}
};