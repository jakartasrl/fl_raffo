/*!
 * Arquimeda Marvin MultiSearch
 * Plugin para facilitar la busqueda de múltiples datos aplicando filtros dentro del formulario Fluig.
 */

$.widget("arquimeda.congresosearch", {
	// Default options.
	options: {
		datasetId: '',
		rowIdField: '',
		filterTemplate: '',
		resultFields: [],
		filterValues: function(){},
		template: {
			row: '',		// '.fooRowTemplate' ó [{ field: 'idCampo1', header: 'Campo 1', width: '50%' }, { value: '<b>{{idCampo1}}</b>', header: '<a href="google.com">Campo 1</a>', width: '50%'}] 
			width: '',
			height: '',
			title: 'Seleccione los items'
		},
		emptyMessage: '<div class="text-center">No hay datos para mostrar.</div>',
		onLoad: function(){},
		callback: function(res){}
	},
	
	_state: {
		elementId: '',
		rowTemplateClass: '',
		headerData: [],
		modalBodyStr: '',
		modalObj: null,
		modalId: '',
		datatableObj: null,
		data: [],
		orderedBy: '',
		orderDirection: 'ASC',
		selectedItems: [] 
	},
	
	_create: function() {		
		var $element = this.element,
			$this = this;

		this._state.elementId = $element.attr('id');
		this._state.modalId = this._state.elementId + '___modal';
		
		this._appendModalSizeStyle();
		
		// Creo el RowTemplate y HeaderData si se usa el helper
		if(typeof this.options.template.row == 'object'){
			this._state.rowTemplateClass = this._state.elementId + '___rowTemplate';
			this._state.headerData = this._getHeaderData();
			this._appendDefaultRowTemplate();
		} else {
			this._state.rowTemplateClass = this.options.template.row;
		}
		
		this._state.modalBodyStr = this._getModalBody();
		
		$element.click(function() {
			$this._state.data = [];
			$this._state.orderedBy = '';
			$this._state.orderDirection = 'ASC';
			$this._state.selectedItems = [];
			$this._state.modalObj = FLUIGC.modal({
			    title: $this.options.template.title,
			    content: $this._state.modalBodyStr,
			    id: $this._state.modalId,
			    actions: []
			}, function(err, data) {
			    if(err) {
			        console.log(err); //TODO
			    } else {
			    	$this._state.datatableObj  = FLUIGC.datatable('#' + $this._state.modalId + ' .searchTbl', {
						    dataRequest: [],
						    renderContent: '.' + $this._state.rowTemplateClass,
						    header: $this._state.headerData,
						    multiSelect: false,
						    classSelected: 'default',
						    search: { enabled: false },
						 	actions: { enabled: false },
						    navButtons: { enabled: false },
						    emptyMessage: '<div class="text-center">No hay datos para mostrar.</div>',
						    tableStyle: 'table-hover',
						    draggable: { enabled: false }
						}, function(err, data) {
							if(err) {
						        console.log(err); //TODO
						    } else {
						    	for (var i = 0; i < $this._state.headerData.length; i++) {
						    		var colWidth = $this._state.headerData[i].width;
						    		if ( colWidth ) {
						    			$('#' + $this._state.modalId + ' .searchTbl thead th:nth(' + i + ')').attr('width',colWidth);
						    		}
								}
						    	$this.options.onLoad();
						    }
						}); 
			    	
			    	$('#' + $this._state.modalId + ' .btnApplyFilters').click(function() {
			    		$this._reloadDatatable();
					});

					$('#' + $this._state.modalId + ' .searchTbl thead th').click(function() {
			    		var orderBy = $(this).attr('data-order-by');
	
						if(orderBy == 'fechaInicio') {
							orderBy = 'FECHA_INICIO';
						}else if(orderBy == 'fechaFin') {
							orderBy = 'FECHA_FIN';
						}
	
			    		if( orderBy ) {
			    			if ( orderBy == $this._state.orderedBy ) {
			    				$this._state.orderDirection = $this._state.orderDirection == 'ASC' ? 'DESC' : 'ASC';
			    			} else {
			    				$this._state.orderedBy = orderBy;
			    				$this._state.orderDirection = 'ASC';
			    			}
			    			$this._reloadDatatable();
			    		}
					});
			    	  	
			    }
			});
			
			$this._reloadDatatable();
			
		});
				
	},
	
	_getModalBody: function() {
		return '<form class="form-horizontal modalForm">' + 
					$(this.options.filterTemplate).remove().html() +
					'<div class="col-sm-12">' +
						'<button type="button" class="btn btn-primary btnApplyFilters" >Buscar</button>' +
					'</div>' +
					'<div class="col-sm-12 searchTbl"></div>' +
				'</form>';
	},
	
	_getHeaderData: function(){
		var headerData = [];
		for (var i = 0; i < this.options.template.row.length; i++) {
			var fieldHeader = this.options.template.row[i].header;
			if ( fieldHeader ) {
				headerData.push({
			            'title': fieldHeader,
			            'dataorder': this.options.template.row[i].field,
			            'width': this.options.template.row[i].width
			    });
			}
		}
		return headerData;
	},
	
	_appendDefaultRowTemplate: function() {
		var rowTemplate = 
			'<script type="text/template" class="' + this._state.rowTemplateClass + '">' +
	        '	<tr class="dataRow">';
		
		for (var i = 0; i < this.options.template.row.length; i++) {
			const col = (this.options.template.row[i].value ? this.options.template.row[i].value : '{{'+this.options.template.row[i].field+'}}');
			const widthAttr = this.options.template.row[i].width ? 'width:' + this.options.template.row[i].width +';"' : '';
			rowTemplate += ( '<td '+widthAttr+'>'+ col +'</td>' );
		}

		rowTemplate +=  
		    '	</tr>'
			'</script>';
		
		$('body').append(rowTemplate);
	},
					
	_appendModalSizeStyle: function(){
		var modalSizeStyle = 
			'<style>' +
			'	#' + this._state.modalId + ' .modal-dialog {' +
			'		width: ' + this.options.template.width + ';' +
			'	}' +
			'	#' + this._state.modalId + ' .modal-dialog .modal-body {' +
			'		height: ' + this.options.template.height + ';' +
			'	}' +
			'</style>';
		$('head').append(modalSizeStyle);
	},
	
	_reloadDatatable: function() {
		var $this = this;
		
		this._getDataset({
    		datasetName: $this.options.datasetId,
    		fields: $this.options.resultFields,
    		constraints: $this._getConstraints(),
    		sortingFields: [$this._state.orderedBy],
    		action: function(dataset){
    			var data = dataset.values;
    			$this._state.data = data;
    			
				$this._state.datatableObj.reload(data);
				
				var newSelectedItems = [];
				for (var i = 0; i < data.length; i++) {
					if ( $this._state.selectedItems.includes(data[i][$this.options.rowIdField]) ) {
						newSelectedItems.push(data[i][$this.options.rowIdField]);
						$('#' + $this._state.modalId + ' .searchTbl tbody tr:nth(' + i + ') .multiSearchCheck').prop('checked', true);
					}
				}
				$this._state.selectedItems = newSelectedItems;
				
				$('#' + $this._state.modalId + ' .searchTbl tbody tr').click(function(e) {
					
					var rowIndex = $('tbody tr.datarow').index($(this));

					var data = $this._state.datatableObj.getRow(rowIndex);

					console.log("query:", $('tbody tr.datarow'));
					console.log("e:", e);
					console.log("this:", this);
					console.log("rowIndex:", rowIndex);
					console.log("data:", data);
										
					$this.options.callback(data);
			    	$this._state.modalObj.remove();								

				});
			}
		});
	},
	
	_showErrorMessage: function (titleMsg, msg) {
        FLUIGC.toast({
            title: titleMsg,
            message: msg,
            type: 'danger'
        });
    },

	_getConstraints: function() {
		var constr = this.options.filterValues();
					
		if ( this._state.orderedBy ) {
			constr.push({
		    	"_field" : 'orderBy',
		    	"_initialValue": this._state.orderedBy,
		    	"_finalValue" : this._state.orderDirection,
		    	"_type": 1,
		    	"_likeSearch": true
		    });
		}
		$('#' + this._state.modalId + ' [data-filter-field]').each(function() {
			
			var value = $(this).val();
			var field = $(this).attr('data-filter-field');
			
			if (value) {
				constr.push({
			    	"_field" : field,
			    	"_initialValue": '%'+value+'%',
			    	"_finalValue" : '%'+value+'%',
			    	"_type": 1,
			    	"_likeSearch": true
			    });
			}
		});
		return constr;
	},
	
	_getDataset: function(params){
    	var $this = this;
		
    	var options = {
    		datasetName: '',
    		fields: [],
    		constraints: [],
    		sortingFields: [],
    		action: function(dataset){},
    		errorAction: null
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
    		if(options.errorAction) {
    			options.errorAction();
    		} else {
    			$this._showErrorMessage('ERROR:', 'Error al cargar datos.');
    		}
    	});		
    }
    
});
