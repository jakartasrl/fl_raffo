var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
	},
	
	onEdit: {
		custom: function() {
			var that = this;
			
			$('#legajo').arqzoom({
				datasetId: 'raf-empleados-ordered',
				resultFields: ['legajo','apellidoynombre'],
				filterValues:  function(searchValue){
					return [
					    {
					    	"_field" : "legajo",
					    	"_initialValue": searchValue,
					    	"_finalValue" : searchValue,
					    	"_type": 1
					    },
					    {
					    	"_field" : "apellidoynombre",
					    	"_initialValue": searchValue,
					    	"_finalValue" : searchValue,
					    	"_type": 1
					    }
					];
				},
				template: {
					row: [
					      { field: 'legajo', header: "Legajo", width: '30%'},
				          { field: 'apellidoynombre', header: "Nombre", width: '70%'}
					],
				},
		        displayKey: function(res){
		        	return res['legajo'];
		        },
		        callback: function(res){
		        	$('#nombre').val(res['apellidoynombre']).change();
		        	$('#cargo').val(res['puesto']).change();
		        	$('#interno').val(res['interno']).change();
		        	$('#mail').val(res['mail']).change();
		        },
		        clean: function(res){
		        	$('#nombre').val('').change();
		        	$('#cargo').val('').change();
		        	$('#interno').val('').change();
		        	$('#mail').val('').change();
		        },
			});
			
			$('#nivelJerarquico').arqzoom({
				datasetId: 'PORTAL-NivelesJerarquicos',
				resultFields: ['descripcion','color'],
				filterValues:  function(searchValue){
					return [
				        {
				        	"_field" : "descripcion",
				        	"_initialValue": searchValue,
				        	"_finalValue" : searchValue,
				        	"_type": 1,
				        	"_likeSearch": true
				        },
			        ];
				},
				template: {
					row: [
					      { field: 'descripcion'},
			        ],
				},
				displayKey: function(res){
					return res['descripcion'];
				},
				callback: function(res){
				},
				clean: function(res){
				},
			});
			
			$('#supJerarquico').arqzoom({
				datasetId: 'PORTAL-Organigrama',
				resultFields: ['documentid','legajo','nombre'],
				filterValues:  function(searchValue){
					var cons = [
					    {
					    	"_field" : "legajo",
					    	"_initialValue": searchValue,
					    	"_finalValue" : searchValue,
					    	"_type": 2,
					    	"_likeSearch": true
					    },
					    {
					    	"_field" : "nombre",
					    	"_initialValue": searchValue,
					    	"_finalValue" : searchValue,
					    	"_type": 2,
					    	"_likeSearch": true
					    }
					];
					
					var documentId = arqFormOpts.getUrlParameter('WDNrDocto');
					if(typeof documentId == 'string' && documentId!='0'){
						cons.push({
							"_field" : "documentid",
							"_initialValue": documentId,
							"_finalValue" : documentId,
							"_type": 3,
						});
					}
					return cons;
				},
				template: {
					row: [
					      { field: 'legajo', header: "Legajo", width: '30%'},
				          { field: 'nombre', header: "Nombre", width: '70%'}
					],
				},
		        displayKey: function(res){
		        	return res['nombre'];
		        },
		        callback: function(res){
		        	$('#supJerarquicoCod').val(res['documentid']).change();
		        },
		        clean: function(res){
		        	$('#supJerarquicoCod').val('').change();
		        },
			});

			$('#supFuncional').arqzoom({
				datasetId: 'PORTAL-Organigrama',
				resultFields: ['documentid','legajo','nombre'],
				filterValues:  function(searchValue){
					var cons = [
					    {
					    	"_field" : "legajo",
					    	"_initialValue": searchValue,
					    	"_finalValue" : searchValue,
					    	"_type": 2,
					    	"_likeSearch": true
					    },
					    {
					    	"_field" : "nombre",
					    	"_initialValue": searchValue,
					    	"_finalValue" : searchValue,
					    	"_type": 2,
					    	"_likeSearch": true
					    }
					];
					
					var documentId = arqFormOpts.getUrlParameter('WDNrDocto');
					if(typeof documentId == 'string' && documentId!='0'){
						cons.push({
							"_field" : "documentid",
							"_initialValue": documentId,
							"_finalValue" : documentId,
							"_type": 3,
						});
					}
					return cons;
				},
				template: {
					row: [
					      { field: 'legajo', header: "Legajo", width: '30%'},
				          { field: 'nombre', header: "Nombre", width: '70%'}
					],
				},
		        displayKey: function(res){
		        	return res['nombre'];
		        },
		        callback: function(res){
		        	$('#supFuncionalCod').val(res['documentid']).change();
		        },
		        clean: function(res){
		        	$('#supFuncionalCod').val('').change();
		        },
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
	},
	
	getUrlParameter: function(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	    return false;
	}
	
};
