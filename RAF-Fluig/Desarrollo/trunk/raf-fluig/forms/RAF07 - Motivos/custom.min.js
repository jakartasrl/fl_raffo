
var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
	},
	
	onEdit: {
		custom: function() {
			
			$('#reasonGroup').arqzoom({
				datasetId: 'RAF07-GruposDeMotivos',
				resultFields: ['groupName'],
				filterValues: function(searchValue){
					return [
					    {
					    	"_field" : "groupName",
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 1, //MUST
					    	"_likeSearch": true
					    }
				    ];
				},
				template: {
					row: [
					      { field: 'groupName'}
					]
				},
		        displayKey: function(res){
		        	return res['groupName'];
		        },
		        callback: function(res){
		        },
		        clean: function(res){
		        },
			});
			
			$('#tblUserGroups').arqmasterdetail({
				buttonNewRow: "#newUserGroup",
				buttonsDeleteRow: ".deleteRow",
				confirmDeleteRow: true,
				onCustomizeRow: function($tr, index){
					$('.userGroup', $tr).arqzoom({
						datasetId: 'group',
						resultFields: ['groupDescription','groupPK.groupId'],
						filterValues: function(searchValue){
							return [
						        {
						        	"_field" : "groupPK.groupId",
						        	"_initialValue": 'RAF07-INI%',
						        	"_finalValue" : 'RAF07-INI%',
						        	"_type": 1, //MUST
						        	"_likeSearch": true
						        }, 
							    {
							    	"_field" : "groupDescription",
							    	"_initialValue": '%'+searchValue+'%',
							    	"_finalValue" : '%'+searchValue+'%',
							    	"_type": 1, //MUST
							    	"_likeSearch": true
							    } 
						    ];
						},
						template: {
							row: [
							      { field: 'groupDescription'}
							]
						},
				        displayKey: function(res){
				        	return res['groupDescription'];
				        },
				        callback: function(res){
				        	$('.userGroupId', $tr).val(res['groupPK.groupId']);
				        },
				        clean: function(res){
				        	$('.userGroupId', $tr).val('');
				        },
					});
					
				}
				
			});
			
		},
		
		bpm: {
			"Inicio Solicitud": {
				task: [0],  
				custom: function() {
				},
				'otherwise': function() {
				}
			},
			"otherwise": { 
				custom: function() {
				}
			}
		},
		
		ged: function() {
		}
	}
};