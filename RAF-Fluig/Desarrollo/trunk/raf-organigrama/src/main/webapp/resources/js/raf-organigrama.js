var rafOrganigramaFactory = SuperWidget.extend({
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
		var that = this;
		
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-organigrama-widgetTitle', this.DOM).html()=='') $('.raf-organigrama-widgetTitle', this.DOM).hide();
		
		this.getNodes(function(data){
			$('.raf-organigrama-chart', this.DOM).orgchart({
				'data' : data,
				'nodeTitle': 'nombre',
				'nodeID': 'id',
				'depth': 2,
				'exportButton': true,
				'exportFilename': 'Organigrama',
				'pan': true,
				'zoom': true,
				'createNode': function($node, data) {
					$node.append(that.applyTemplate(data,that.nodeTemplate));
					$('.title',$node).css('background-color',data.color);
					$('.content',$node).css('border-color',data.color);
				}
			});
		});
		
		
    },
    
    getNodes: function(callback){
    	var that = this;
    	$.ajax({
			type: "POST",
			url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
			contentType: "application/json; charset=utf-8",
			dataType: "json",				
			data: JSON.stringify({
				name : 'raf-customSecurity',
				constraints: [
	                {
						_field: "datasetName",
						_initialValue: 'raf-organigrama-json',
						_finalValue: 'raf-organigrama-json',
						_type: 1
					},
	                {
	                	_field: "rootNode",
	                	_initialValue: that.rootNode,
	                	_finalValue: that.rootNode,
	                	_type: 1
	                },
	            ]
			})
		})
		.done(function(dataset) {	
			var data = JSON.parse(dataset.values[0].JSON);
			console.log(data);
			callback(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			that.showErrorMessage('ERROR:','No se pudo cargar el organigrama.');
		});	
    },
    
    applyTemplate: function(data, template){
		for(key in data){
			if (data[key]) {
				template = template
							.replace(new RegExp('{{#'+key+'}}', "g"),'')
							.replace(new RegExp('{{/'+key+'}}', "g"),'')
							.replace(new RegExp('{{'+key+'}}', "g"),data[key]);				
			} else {
				template = template.replace(new RegExp('{{#'+key+'}}.*{{/'+key+'}}', "g"),'');	
			}
		}
		return template;
	},
    
    onEdit: function(){
    	if (!$('.raf-organigrama-widgetId',this.DOM).val()){
    		$('.raf-organigrama-widgetId',this.DOM).val('rafOrganigrama1');
    	}
    	if (!$('.raf-organigrama-customCss',this.DOM).val()){
    		$('.raf-organigrama-customCss',this.DOM).val(
				'{{container}} .nodeBody {\n' +
				'	color: black;\n' +
				'}\n'
    		);
    	}
    	if (!$('.raf-organigrama-nodeTemplate',this.DOM).val()){
    		$('.raf-organigrama-nodeTemplate',this.DOM).val(
				'<div class="content">\n' + 
				'	<div class="puesto">Puesto: {{puesto}}</div>\n' +
				'	<div class="planta">Planta: {{planta}}</div>\n' +
				'</div>'
    		);
    	}
    },
	
    setDefaultSrc: function(img){
    	if(!img.src.includes('/raf-organigrama/resources/images/error-user.png')) {
    		img.src = '/raf-organigrama/resources/images/error-user.png';
    	}
    },
    
	onHashParamsChange: function() {
	},
    
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-organigrama-widgetId',this.DOM).val(),
			rootNode: $('.raf-organigrama-rootNode',this.DOM).val(),
			widgetTitle: $('.raf-organigrama-widgetTitle',this.DOM).val(),
			customCss: $('.raf-organigrama-customCss',this.DOM).val(),
			nodeTemplate: $('.raf-organigrama-nodeTemplate',this.DOM).val(),
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-organigrama-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-organigrama-widgetId',this.DOM).val()){
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
