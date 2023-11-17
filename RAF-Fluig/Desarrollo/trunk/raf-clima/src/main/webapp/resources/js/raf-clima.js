var rafClimaFactory = SuperWidget.extend({
	hashParams: {
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
    dataTable: {},
    constraints:  [],
    
	onView: function(){
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-clima-widgetTitle', this.DOM).html()=='') $('.raf-clima-widgetTitle', this.DOM).hide();
		
		$('.raf-clima-weather', this.DOM).weather({
			template: $('.raf-clima-template', this.DOM).html(),
			locale: 'es'
		});
    },
    
    onEdit: function(){
    	if (!$('.raf-clima-widgetId',this.DOM).val()){
    		$('.raf-clima-widgetId',this.DOM).val('rafClima1');
    	}
    	if (!$('.raf-clima-customCss',this.DOM).val()){
    		$('.raf-clima-customCss',this.DOM).val(
				'{{container}} .raf-clima-weather {\n' +
				'	width: 100%;\n' +
				'}\n'
    		);
    	}
    	if (!$('.raf-clima-template',this.DOM).val()){
    		$('.raf-clima-template',this.DOM).val(
		    	'<h3>{{location}}</h3>\n' +
				'<div class="block today">\n' +	
				'	<i class="wi {{iconClass}}"></i>\n' +
			    '    <div class="weather type-small">\n' +
			    '      <h1>{{temperature}} &deg;C</h2>\n' +
			    '      <p>\n' +
			    '      	{{status}}.\n' +
			    '        Humedad: {{humidity}}%. <br>\n' +
			    '        Visibilidad: {{visibility}} km. <br>\n' +
			    '        Viento: a {{wind}} km/h.\n' +
			    '      </p>\n' +
			    '    </div>\n' +
			    '</div>'
    		);
    	}
    },
	
	onHashParamsChange: function() {
	},
    
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-clima-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-clima-widgetTitle',this.DOM).val(),
			customCss: $('.raf-clima-customCss',this.DOM).val(),
			template: $('.raf-clima-template',this.DOM).val(),
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-clima-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-clima-widgetId',this.DOM).val()){
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
