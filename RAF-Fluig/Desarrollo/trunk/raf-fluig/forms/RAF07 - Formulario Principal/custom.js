
var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
		
		if ($('#changeGroupReasonType').val() == 'nuevoDisenio') {
			$('.onlyDesignChange').hide();
			$('.onlyNewDesign').show();
		} else {
			$('.onlyNewDesign').hide();
			$('.onlyDesignChange').show();
		}
	},
	
	onEdit: {
		custom: function() {
			
			$('.datetimepicker').arqdatetimepicker({
				pickTime: false, 
				language:'es', 
				format:'dd/mm/yyyy', 
				autoclose: false, 
				todayHighlight: true,
				multidate: false
			});
			
			$('#changeReason').arqzoom({
				datasetId: 'raf-motivosDeCambio',
				resultFields: ['reasonGroup','reasonName','avisoAceptacion','avisoGeneracion',
				               'avisoRevision','visualizaReporte','groupType','breakDateRequired'],
				filterValues: function(searchValue){
					return [
					    {
					    	"_field" : "userGroup",
					    	"_initialValue": $('#userGroupCode').val(),
					    	"_finalValue" : $('#userGroupCode').val(),
					    	"_type": 1 //SHOULD
					    },
					    {
					    	"_field" : "reasonGroup",
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 2, //SHOULD
					    	"_likeSearch": true
					    },
					    {
					    	"_field" : "reasonName",
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 2, //SHOULD
					    	"_likeSearch": true
					    }
				    ];
				},
				template: {
					row: [
					      { field: 'reasonGroup', header:'Grupo'},
					      { field: 'reasonName', header:'Motivo'}
					],
					width: '30vw'
				},
		        displayKey: function(res){
		        	return res['reasonGroup'] + ' - ' + res['reasonName'];
		        },
		        callback: function(res){
		        	$('#changeReasonId').val(res['reasonName']);
		        	$('#avisoAceptacion').val(res['avisoAceptacion']);
		        	$('#avisoGeneracion').val(res['avisoGeneracion']);
		        	$('#avisoRevision').val(res['avisoRevision']);
		        	$('#visualizaReporte').val(res['visualizaReporte']);
		        	
    				arqFormOpts.updateChangeReason({
    					groupType: res['groupType'],
    					breakDateRequired: res['breakDateRequired']
    				});
		        },
		        clean: function(res){
		        	$('#changeReasonId').val('');
		        	$('#avisoAceptacion').val('');
		        	$('#avisoGeneracion').val('');
		        	$('#avisoRevision').val('');
		        	$('#visualizaReporte').val('');
		        	
		        	arqFormOpts.updateChangeReason({
    					groupType: '',
    					breakDateRequired: ''
    				});
		        },
			});
			
			$('#tblProdTypes').arqmasterdetail({
				buttonNewRow: "#newProdType",
				buttonsDeleteRow: ".deleteRow",		
				confirmDeleteRow: true,
				onCustomizeRow: function($tr, index){
					
					if($('.estadoQADNewProd', $tr).val() == "" ){
						$('.estadoQADNewProd', $tr).val('PENDIENTE');
					}
					
					$('.tipoNewProd', $tr).arqzoom({
						datasetId: 'raf-tiposProducto',
						resultFields: ['cod','descr'],
						filterValues: function(searchValue){
							return [
							    {
							    	"_field" : "descr",
							    	"_initialValue": '%'+searchValue+'%',
							    	"_finalValue" : '%'+searchValue+'%',
							    	"_type": 2, //SHOULD
							    	"_likeSearch": true
							    }
						    ];
						},
						template: {
							row: [{ field: 'descr'}],
						},
				        displayKey: function(res){
				        	return res['descr'];
				        }
					});
				}
			});
			
			$('#marcaNewProd').arqzoom({
				datasetId: 'raf-marcas',
				resultFields: ['cod','descr'],
				filterValues: function(searchValue){
					$('#marcaNewProd').val(searchValue);
					return [
					        {
					        	"_field" : "descr",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'descr'}],
				},
				displayKey: function(res){
					return res['descr'];
				}
			});
			
			$('#formaFarmaceuticaNewProd').arqzoom({
				datasetId: 'raf-formasFarmaceuticas',
				resultFields: ['cod','descr'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "cod",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'cod'}],
				},
				displayKey: function(res){
					return res['cod'];
				}
			});
			
			$('#prActivo1NewProd, #prActivo2NewProd, #prActivo3NewProd, #prActivo4NewProd').arqzoom({
				datasetId: 'raf-principiosActivos',
				resultFields: ['cod','descr'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "cod",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'cod'}],
				},
				displayKey: function(res){
					return res['cod'];
				}
			});
			$('#unidadMedida1NewProd, #unidadMedida2NewProd, #unidadMedida3NewProd, #unidadMedida4NewProd').arqzoom({
				datasetId: 'raf-unidades',
				resultFields: ['codigo','descripcion'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "descripcion",
					        	"_initialValue": searchValue,
					        	"_finalValue" : searchValue,
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [
					      { field: 'codigo', header: "CODIGO"},
					      { field: 'descripcion', header: "DESCRIPCION"}
					],
					width: '300%'
				},
				displayKey: function(res){
					return res['descripcion'];
				}
			});
			$('#presentacionNewProd').arqzoom({
				datasetId: 'raf-presentaciones',
				resultFields: ['cod','descr'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "descr",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'descr'}],
				},
				displayKey: function(res){
					return res['descr'];
				}
			});
			$('#paisNewProd').arqzoom({
				datasetId: 'RAF07-Paises',
				resultFields: ['codigo','descripcion'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "descripcion",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        }
					        ];
				},
				template: {
					row: [{ field: 'descripcion'}],
				},
				displayKey: function(res){
					return res['descripcion'];
				}
			});
			
			$('#tblProds').arqmasterdetail({
				buttonNewRow: "#newProd",
				buttonsDeleteRow: ".deleteRow",		
				confirmDeleteRow: true,
				onCustomizeRow: function($tr, index){
					
					$(':input', $tr).prop('disabled', true);
					
					if($('.estadoQAD', $tr).val() == "" ){
						$('.estadoQAD', $tr).val('PENDIENTE');
					}
				}
			});
			
			$('#btnMultiSearchProd').arqmultisearch({
				datasetId: 'raf07-productos',
				rowIdField: 'cod',
				filterTemplate: '#multisearchProdsFilters',
				filterValues: function(){
					var cts = [];
					
					$('#tblProds tbody tr:visible').each(function() {
						var prodCode = $('.codigoProd', $(this)).val();
						cts.push({
							"_field" : "cod",
							"_initialValue": prodCode,
							"_finalValue" : prodCode,
							"_type": 3 //MUST_NOT
					    });
					});
					
					return cts;
				},
				template: {
					row: [
					      { field: 'cod', header: "Código", width: '10%'},
					      { field: 'descr', header: "Descripción", width: '20%'},
					      { field: 'marca', header: "Marca", width: '10%'},
					      { field: 'prActivos', header: "Principios Activos", width: '15%'},
					      { field: 'tipoProd', header: "Tipo de Producto", width: '15%'},
				          { field: 'grupoProd', header: "Grupo de Producto", width: '15%'},
				          { field: 'pais', header: "País", width: '10%'}
					],
					width: '90vw',
					height: '60vh'
				},
				onLoad: function(){
					$('#filterTipoProd').arqzoom({
						datasetId: 'raf-tiposProducto',
						resultFields: ['cod','descr'],
						filterValues: function(searchValue){
							$('#filterTipoProd').val(searchValue);
							return [
							    {
							    	"_field" : "descr",
							    	"_initialValue": '%'+searchValue+'%',
							    	"_finalValue" : '%'+searchValue+'%',
							    	"_type": 2, //SHOULD
							    	"_likeSearch": true
							    }
						    ];
						},
						template: {
							row: [{ field: 'descr'}],
						},
				        displayKey: function(res){
				        	return res['descr'];
				        }
					});
									
					$('#filterPrActivo').arqzoom({
						datasetId: 'raf-principiosActivos',
						resultFields: ['cod','descr'],
						filterValues: function(searchValue){
							$('#filterPrActivo').val(searchValue);
							return [
							    {
							    	"_field" : "cod",
							    	"_initialValue": '%'+searchValue+'%',
							    	"_finalValue" : '%'+searchValue+'%',
							    	"_type": 2, //SHOULD
							    	"_likeSearch": true
							    }
						    ];
						},
						template: {
							row: [{ field: 'cod'}],
						},
				        displayKey: function(res){
				        	return res['cod'];
				        }
					});
					
					$('#filterMarca').arqzoom({
						datasetId: 'raf-marcas',
						resultFields: ['cod','descr'],
						filterValues: function(searchValue){
							$('#filterMarca').val(searchValue);
							return [
							    {
							    	"_field" : "descr",
							    	"_initialValue": '%'+searchValue+'%',
							    	"_finalValue" : '%'+searchValue+'%',
							    	"_type": 2, //SHOULD
							    	"_likeSearch": true
							    }
						    ];
						},
						template: {
							row: [{ field: 'descr'}],
						},
				        displayKey: function(res){
				        	return res['descr'];
				        }
					});
					$('#filterPais').arqzoom({
						datasetId: 'raf-paises',
						resultFields: ['cod','descr'],
						filterValues: function(searchValue){
							$('#filterPais').val(searchValue);
							return [
							        {
							        	"_field" : "descr",
							        	"_initialValue": '%'+searchValue+'%',
							        	"_finalValue" : '%'+searchValue+'%',
							        	"_type": 2, //SHOULD
							        	"_likeSearch": true
							        }
							        ];
						},
						template: {
							row: [{ field: 'descr'}],
						},
						displayKey: function(res){
							return res['descr'];
						}
					});
				},
		        callback: function(data) {
			    	for (var i=0; i<data.length; i++) {
			    		var $row = $('#tblProds').arqmasterdetail('addNewRow');
			    		var rowData = data[i];
			    		for( field in rowData ) {
			    			$('[data-field="'+field+'"]', $row).val(rowData[field]);
			    		}
					}
				}
			});
			
			$('#btnCleanAllProd').click(function() {
				if(confirm('Confirma eliminación?')) {
					$('#tblProds tbody tr:gt(0)').remove();
				}
			});
			
			arqFormOpts.updateChangeReason({
				groupType: $('#changeGroupReasonType').val(),
				breakDateRequired: $('#breakDateRequired').val()
			});
			
		},
		
		bpm: {
			"Inicio Solicitud": {
				task: [0,5,6,30],  
				custom: function() {
				},
				'otherwise': function() {
				}
			},
			"otherwise": { 
				custom: function() {
					// Si no aplica ninguna de las tareas. 
					arqFormOpts.disableAllFields();
					$('.hidden-print').hide();
				}
			}
		},
		
		ged: function() {
		}
	},
	
	updateChangeReason: function(data) {
		if (data.groupType == 'nuevoDisenio') {
			$('.onlyDesignChange').hide();
			$('.onlyNewDesign').show();
		} else {
			$('.onlyNewDesign').hide();
			$('.onlyDesignChange').show();
		}
		
		if($('#changeGroupReasonType').val() != data.groupType) {
			$('#changeGroupReasonType').val(data.groupType);
			$('#tblProds tbody tr:gt(0)').remove();
			$('#tblProdTypes tbody tr:gt(0)').remove();
			$('.onlyNewDesign :input').val('').change();
		}
		
		if (data.breakDateRequired == 'si') {
			$('#breakDate').attr('data-parsley-required','true');
		} else {
			$('#breakDate').attr('data-parsley-required','false');
		}
		
		if($('#breakDateRequired').val() != data.breakDateRequired) {
			$('#breakDateRequired').val(data.breakDateRequired);
		}
		
	},
	
	getDataset: function(params){
    	var $this = this;
		
    	var options = {
    		datasetName: '',
    		fields: [],
    		constraints: [],
    		sortingFields: [],
    		action: function(dataset){},
    		errorAction: function(){}
    	}
    	$.extend(options, params);
    	
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : options.datasetName,
    			fields: options.fields,
    			constraints: options.constraints,
    			sortingFields: options.sortingFields
    		})
    	})
    	.done(function(dataset) {	
    		options.action(dataset);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
			options.errorAction();
    	});		
    },
    
    disableField: function(selector){
    	if($(selector).arqzoom('instance')){
			$(selector).arqzoom('disabled', true);
		} else {
			$(selector).prop('disabled', true);
		}
    },
    
    disableAllFields: function() {
    	$('#arqForm :input:not(.tt-input, .tt-hint, [id^="__arqzoom__"])').each(function(){
    		arqFormOpts.disableField(this);
    	});
	} 
	
};