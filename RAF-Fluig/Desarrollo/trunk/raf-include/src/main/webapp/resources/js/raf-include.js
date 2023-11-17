var rafIncludeFactory = SuperWidget.extend({
	hashParams: {
		doc: '',
		url: '',
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
	onView: function(){
		var that = this;
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
    },
	
    onEdit: function(){
    	if (!$('.raf-include-widgetId',this.DOM).val()){
    		$('.raf-include-widgetId',this.DOM).val('rafInclude1');
    	}
    	if (!$('.raf-include-customCss',this.DOM).val()){
    		$('.raf-include-customCss',this.DOM).val(
				'{{container}} .raf-include-iframe {\n' +
				'    width: 100%;\n' +
				'    margin: auto;\n' +
				'} \n' +
				'{{container}} .includeTitle {\n' +
				'    margin-left: 8px;\n' +
				'    font-family: \'Flama\',sans-serif;\n' +
				'    font-weight: 700;\n' +
				'    font-size: 2em;\n' +
				'}'
    		);
    	}
    },
	
    onHashParamsChange: function() {
		var that = this;
		var iframe = $('.raf-include-iframe',this.DOM);
		if(this.hashParams.doc){
			var arrDoc = this.hashParams.doc.split('_');
			iframe.attr('src','/webdesk/streamcontrol/WKEditableDocument.html?WDCompanyId='+arrDoc[0]+'&WDNrDocto='+arrDoc[1]+'&WDNrVersao='+arrDoc[2]);
			$.ajax({
	    		type: "POST",
	    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
	    		contentType: "application/json; charset=utf-8",
	    		dataType: "json",				
	    		data: JSON.stringify({
	    			name : 'document',
	    			constraints: [
		              {
		            	  _field: "documentPK.companyId",
		            	  _initialValue: arrDoc[0],
		            	  _finalValue: arrDoc[0],
		            	  _type: 1
		              },
		              {
		            	  _field: "documentPK.documentId",
		            	  _initialValue: arrDoc[1],
		            	  _finalValue: arrDoc[1],
		            	  _type: 1
		              },
		              {
		            	  _field: "documentPK.version",
		            	  _initialValue: arrDoc[2],
		            	  _finalValue: arrDoc[2],
		            	  _type: 1
		              }
	                ]
	    		})
	    	})
	    	.done(function(dataset) {	
	    		$('.includeTitle',that.DOM).html(dataset.values[0]['documentDescription']);
	    	})
	    	.fail(function(jqXHR, textStatus, errorThrown) {
	    		that.showErrorMessage('Error','No se pudo cargar el título.');
	    	});		
		} else if(this.hashParams.url){
			iframe.attr('src',this.hashParams.url);
			$('.includeTitle',this.DOM).hide();
		}
	},
	
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-include-widgetId',this.DOM).val(),
			customCss: $('.raf-include-customCss',this.DOM).val(),
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-include-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-include-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
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
    	if (!window.location.hash) {
    		// Para posibilitar URLs que no se pierdan luego del login
    		// No puede usarse hash (fragments) -> se usan parametros url ("?")
    		var search = location.search.substring(1);
    		if(search){
    			window.location.hash = '#' + search;
    		}
    	}    	
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
