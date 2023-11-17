var rafNavegadorGEDFactory = SuperWidget.extend({
	hashParams: {
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
    dataTable: {},
    currentFolderId: null,
    backFolderId: null,
    
	onView: function(){
		var that = this;
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-navegadorGED-widgetTitle', that.DOM).html()=='') $('.raf-navegadorGED-widgetTitle', that.DOM).hide();
			
		this.openFolder(this.rootFolderId, function(data) {
			
			that.dataTable = FLUIGC.datatable('#raf-navegadorGED-table-'+that.id, {
				dataRequest: data,
				renderContent: '.template-datatable',
				header: that.columns,
				multiSelect: true,
				classSelected: 'active',
				search: {
					enabled: false
				},
				scroll: {
					enabled: false
				},
				actions: {
					enabled: true,
					template: '.template-area-buttons',
					actionAreaStyle: 'col-md-12'
				},
				navButtons: {
					enabled: false
				},
				emptyMessage: '<div class="text-center">No hay datos para mostrar.</div>',
				tableStyle: 'table-hover', 
				draggable: {
					enabled: false
				}
			}, function(err, data) {
				// DO SOMETHING (error or success)
			});
			
			$('.raf-navegadorGED-btnReturn', that.DOM).click(function() {
				that.openFolder(that.backFolderId, function(data) {
					that.dataTable.reload(data);
				});
			});
			
			that.dataTable.on('fluig.datatable.onselectrow', function(evData) {
				var rowData = that.dataTable.getRow(evData.selectedIndex);
				if (rowData.documentType=='1'){
					that.openFolder(rowData.documentId, function(data) {
						that.dataTable.reload(data);
					});
				} else {
					if (rowData.documentType === "2" || rowData.documentType === "3" || rowData.documentType === "8") {
						ECM.navigation.initDocumentView(rowData.documentId, rowData.version);
					}
					if (rowData.documentType === "5") {
						ECM.navigation.initCardView(rowData.documentId, rowData.version);
					}
					if (rowData.documentType === "9") {
						ECM.navigation.initApplication(rowData.documentId, "");
					}
					if (rowData.documentType === "10") {
						ECM.navigation.initReportView(rowData.documentId);
					}
					that.dataTable.reload();
				}
			});
			
		});
		
    },
	
    onEdit: function(){
    	if (!$('.raf-navegadorGED-widgetId',this.DOM).val()){
    		$('.raf-navegadorGED-widgetId',this.DOM).val('rafNavegadorGED1');
    	}
    	if (!$('.raf-navegadorGED-widgetTitle',this.DOM).val()){
    		$('.raf-navegadorGED-widgetTitle',this.DOM).val('Descargas');
    	}
    	if (!$('.raf-navegadorGED-customCss',this.DOM).val()){
    		$('.raf-navegadorGED-customCss',this.DOM).val(
				'{{container}} .raf-navegadorGED-widgetTitle {\n' +
				'    font-family: \'Flama\',sans-serif;\n' +
				'    font-weight: 700;\n' +
				'    font-size: 1.5em;\n' +
				'    margin-top: 10px;\n' +
				'}\n' +
    			'{{container}} .raf-navegadorGED-table {\n' +
				'    width: 100%;\n' +
				'}\n' +
				'{{container}} .raf-navegadorGED-path {\n' +
				'    padding: 6px 12px;\n' +
				'    border: 1px solid #ccc;\n' +
				'    border-radius: 4px;\n' +
				'    display: inline-block;\n' +
				'    width: 94%;\n' +
				'    overflow: hidden;\n' +
				'    text-overflow: ellipsis;\n' +
				'    margin-bottom:-14px;\n' +
				'    background-color: white;\n' +
				'}\n' +
				'{{container}} .raf-navegadorGED-pathLabel {\n' +
				'    font-weight: 700;\n' +
				'    margin-left: 10px;\n' +
				'}\n' +
				'{{container}} .raf-navegadorGED-btnReturn {\n' +
				'    width: 5%;\n' +
				'}\n' +
				'#ecm-documentview-toolbar {\n' +
				'    display: none;\n' +
				'}\n' +
				'{{container}} .pathSeparator {\n' +
				'    font-size: 8px;\n' +
				'    position: relative;\n' +
				'    top: -1px;\n' +
				'}\n' +
				'{{container}} .pathNode{\n' +
				'    cursor: pointer;\n' +
				'    margin: 0 5px;\n' +
				'}\n' +
				'{{container}} .pathNode:hover{\n' +
				'     color: #720023\n' +
				'}\n' +
				'.pccViewerControl *{\n' +
				'    font-family: inherit;\n' +
				'}\n' +
				'#document_viewer_container [data-pcc-print]{\n' +
				'    display:none;\n' +
				'}'
    		);
    	}
    	
    	for(var i=0; i<this.columns.length; i++){
    		$('.raf-navegadorGED-columns input[type="checkbox"][data-column="'+this.columns[i].fieldId+'"]',this.DOM).prop('checked',true);
    	}
    },
	
	onHashParamsChange: function() {
	},
	
	openFolder: function(folderId,callback){
		var that = this;
    	$.ajax({
    		type: "GET",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/navigation/content/"+folderId+"?rows=999999999",//&sidx=documentDescription&sord=asc",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    	})
    	.done(function(data) {	
			if(data.invdata && data.invdata.length){
				$.each(data.invdata, function(key, value){
					value.lastModifiedDate = moment(value.lastModifiedDate).format('DD/MM/YYYY');
				});
			}
    		callback(data.invdata);
    		that.getFolderPath(folderId,function(data){
    			$('.raf-navegadorGED-path',that.DOM).html('<span class="fluigicon fluigicon-folder-close"></span> '+data.map(function(elem){return '<span class="pathNode" data-id="'+elem.id+'">'+elem.description+'</span>';}).join(' <span class="pathSeparator fluigicon fluigicon-pointer-right"></span> '));
    			$('.pathNode',that.DOM).click(function() {
    				that.openFolder($(this).attr('data-id'), function(data) {
    					that.dataTable.reload(data);
    				});
				});
    			that.currentFolderId = data[data.length-1].id;
    			if(data.length>1){
    				that.backFolderId = data[data.length-2].id;
    				$('.raf-navegadorGED-btnReturn', that.DOM).prop('disabled',false);
    			} else {
    				that.backFolderId = null;
    				$('.raf-navegadorGED-btnReturn', that.DOM).prop('disabled',true);
    			}
    		});
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		that.showErrorMessage('ERROR:','Error al cargar contenido de la carpeta.');
    	});
	},
	
	getFolderPath: function(folderId,callback){
		var that = this;
    	$.ajax({
    		type: "GET",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/navigation/getFolderPath/"+that.rootFolderId+"/"+folderId,
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    	})
    	.done(function(data) {	
    		callback(data);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		that.showErrorMessage('ERROR:','Error al cargar path de la carpeta.');
    	});
	},
	
    getPreferences: function () {
    	var rowTemplate = '';
    	var columns = [];
    	
    	$('.raf-navegadorGED-columns input[type="checkbox"]:checked').each(function() {
			columns.push({
				'title': $(this).closest('label').text(),
				'fieldId': $(this).attr('data-column')
			});
			if($(this).attr('data-column')=='documentDescription'){
				rowTemplate += '<td class="col-md-3"><img width="24" src="{{iconPath}}"><span style="margin-left:10px;">{{documentDescription}}</span></td>';
			} else {
				rowTemplate += '<td class="col-md-2">{{'+$(this).attr('data-column')+'}}</td>';
			}
		});
    	
    	var preferences = {
			widgetId: $('.raf-navegadorGED-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-navegadorGED-widgetTitle',this.DOM).val(),
			rootFolderId: $('.raf-navegadorGED-rootFolderId',this.DOM).val(),
			customCss: $('.raf-navegadorGED-customCss',this.DOM).val(),
			columns: JSON.stringify(columns),
			rowTemplate: rowTemplate,
    	};
    	return preferences;
    },

    validateForm: function() {
		if($('.raf-navegadorGED-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".';
		} else if(!$('.raf-navegadorGED-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.';
		} else if(!$('.raf-navegadorGED-rootFolderId',this.DOM).val()){
	    	return 'El campo Carpeta Raiz no puede ser vacío.';
	    }
		return 'OK';
	},
    
    savePreferences: function () {
        var that = this;
        var message = this.validateForm();
        if(message=='OK'){
        	var preferences = this.getPreferences();
        	WCMSpaceAPI.PageService.UPDATEPREFERENCES(
			{
				async: true,
				success: function (data) {
					that.showSuccessMessage(data.message, '')
				},
				fail: function (xhr, message, errorData) {
					that.showErrorMessage(
							'ERROR',
							errorData.message);
				}
			}, this.id, preferences);
        } else {
        	this.showErrorMessage('Formulario no válido:',message);
        }
    },
    
    showSuccessMessage: function (titleMsg, msg) {
        FLUIGC.toast({title: titleMsg, message: msg, type: 'success'});
    },

    showErrorMessage: function (titleMsg, msg) {
        FLUIGC.toast({
            title: titleMsg,
            message: msg,
            type: 'danger'
        });
    },
    
    /**
     * ==================================================================================================================================================
     * =============================================================  SuperMarvin Widget Library  =======================================================
     * ==================================================================================================================================================
     */
    
    init: function () {
    	var that = this;
    	$.extend(this,this.DOM.data('arqParams'));
    	if(this.isEditMode){
    		this.onEdit();
    	} else {
    		that.urlHashChanged();
    		$(window).on('hashchange', function() {
    			that.urlHashChanged();
    		});
    		this.onView();
    	}
    },
    
    changeHashParams: function(newHashParams){
    	var hashParams = this.simpleMerge(this.hashParams, newHashParams);
    	for (param in hashParams){
    		var strParam = this.id + '-' + param  + '=' + hashParams[param];
    		
    		if (window.location.hash) {
    			var allHashParams = window.location.hash.substr(1).split(';'),
    				paramExists = false;
    				
    			for (var i=0; i<allHashParams.length; i++){
    				if (allHashParams[i].split('-')[0] == this.id) {
    					allHashParams[i] = strParam;
    					paramExists = true;
    					break;
    				}
    			}
    			
    			if (paramExists) {
    				window.location.hash = '#' + allHashParams.join(';');
    			} else {
    				window.location.hash += ';' + strParam;
    			}
    		}
    		else {
    			window.location.hash = '#' + strParam;
    		}
    	}
    },
    
//    onHashParamsChange(): function(){
//    	//SOBREESCRIBIR
//    },
    
    urlHashChanged: function() {
    	if (window.location.hash) {
			
    		var allHashParams = window.location.hash.substr(1).split(';'),
				instanceHashParams = {},
				hashParam, hashParamData;
			
			for (var i=0; i<allHashParams.length; i++){
				hashParam = allHashParams[i].split('-');
				if(hashParam[0] == this.id) {
					hashParamData = hashParam[1].split('=');
					instanceHashParams[hashParamData[0]] = hashParamData[1]; 
				}
			}
			
			if (JSON.stringify(this.hashParams) != JSON.stringify(instanceHashParams)) {
				this.hashParams = instanceHashParams;
				this.onHashParamsChange();
			}
			
		} else {
			// nothing here
		}
	},
	
	simpleMerge: function (obj1,obj2) {
		// realizar merge solo del 1er nivel de atributos
		var obj3 = {};    
		for (attrname in obj1) { 
			obj3[attrname] = obj1[attrname]; 
		}
		for (attrname in obj2) { 
			obj3[attrname] = obj2[attrname]; 
		}    
		return obj3;
	}
    
});
