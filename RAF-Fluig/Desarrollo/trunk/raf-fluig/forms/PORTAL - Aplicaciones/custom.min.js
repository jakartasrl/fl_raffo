var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
	},
	
	onEdit: {
		custom: function() {
			$('#targetMode').prop('disabled',true);
			$('#targetLink').change(function() {
				if($(this).val()){
					$('#targetMode').prop('disabled',false);
				} else {
					$('#targetMode').prop('disabled',true);
				}
			});
			
			$('#tablaSeguridad').arqmasterdetail({
				buttonNewRow: '#btnNuevoGrupo',
				buttonsDeleteRow: '.deleteRow',		
				buttonsDuplicateRow: '.duplicateRow',	
				onDeleteRow: function($tr) {
					return confirm('Confirma eliminación?');		
				},
				onCustomizeRow: function($tr, index){
					$('.grupoDesc',$tr).arqzoom({
						datasetId: 'group',
						resultFields: ['groupPK.groupId','groupDescription'],
						filterValues:  function(searchValue){
							return [
							    {
							    	"_field" : 'groupPK.companyId',
							    	"_initialValue": arqFormOpts.WKCompany,
							    	"_finalValue" : arqFormOpts.WKCompany,
							    	"_type": 1
							    },
							    {
							    	"_field" : "groupDescription",
							    	"_initialValue": "%"+searchValue+"%",
							    	"_finalValue" : "%"+searchValue+"%",
							    	"_type": 1,
							    	"_likeSearch": true
							    }
							];
						},
						template: {
							row: [
							    { field: 'groupDescription'},
							],
						},
						displayKey: function(res){
				        	return res['groupDescription'];
				        },
				        callback: function(res){
				        	$('.grupoCod',$tr).val(res['groupPK.groupId']).change();
				        },
				        clean: function(res){
				        	$('.grupoCod',$tr).val('').change();
				        }
					});
				}
			});
		},
		
		bpm: {
		},
		
		ged: function() {
		}
	}
};
