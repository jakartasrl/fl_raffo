var rafCumpleaniosFactory = SuperWidget.extend({
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
		var $dataTableContainer = $('.raf-cumpleanios-table',this.DOM);
		
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-cumpleanios-widgetTitle', that.DOM).html()=='') $('.raf-cumpleanios-widgetTitle', that.DOM).hide();
		
		this.getDataset("raf-empleados-ordered", 
			{
				constraints: that.getConstraints(),
				order: ['apellidoynombre']
			},
	        function(dataset){
				that.dataTable = FLUIGC.datatable('#'+$dataTableContainer.attr('id'), {
				    dataRequest: dataset.values,
				    renderContent: '.'+that.id+'-template-datatable',
				    header: [
				        {
				        	'size': 'col-md-12',
				        }
				    ],
				    multiSelect: false,
				    classSelected: 'active',
				    search: {
				        enabled: false
				    },
				    scroll: {
				        enabled: false
				    },
				    actions: {
				        enabled: false
				    },
				    navButtons: {
				        enabled: false
				    },
				    emptyMessage: '<div class="text-center">Nadie cumple años hoy.</div>',
				    tableStyle: 'table-hover',
				    draggable: {
				    	enabled: false
				    }
				}, function(err, data) {
				    // DO SOMETHING (error or success)
				});
				
			}
		);
		
    },
    
    getConstraints: function(){
    	var d = new Date();
    	
    	var strDate = [d.getDate(), d.getMonth()+1].join('/')+'/%';

    	var pad = function(s) { return (s < 10) ? '0' + s : s; };
    	var strDatePadding = [pad(d.getDate()), pad(d.getMonth()+1)].join('/')+'/%';
    	
    	return  this.constraints.concat([
            {
            	"_field" : "fechaNacimiento",
            	"_initialValue": strDate+";"+strDatePadding,
            	"_finalValue" : strDate+";"+strDatePadding,
            	"_type": 2
            }
		]);
    },
	
    onEdit: function(){
    	if (!$('.raf-cumpleanios-widgetId',this.DOM).val()){
    		$('.raf-cumpleanios-widgetId',this.DOM).val('rafCumpleanios1');
    	}
    	if (!$('.raf-cumpleanios-customCss',this.DOM).val()){
    		$('.raf-cumpleanios-customCss',this.DOM).val(
				'{{container}} .raf-cumpleanios-table {\n' +
				'    width: 100%;\n' +
				'}\n' +
				'{{container}} .raf-cumpleanios-table .foto {\n' +
				'    height: 50px;\n' +
				'    width: 50px;\n' +
				'    float: left;\n' +
				'}\n' +
				'{{container}} .raf-cumpleanios-table .divData {\n' +
				'    padding-left: 60px;\n' +
				'}\n' +
				'{{container}} .raf-cumpleanios-table .table-datatable th {\n' +
				'    font-family: \'Flama\',sans-serif; font-weight: 700;\n' +
				'    font-size: 1.4em;\n' +
				'    padding: 8px;\n' +
				'}'
    		);
    	}
    	if (!$('.raf-cumpleanios-rowTemplate',this.DOM).val()){
    		$('.raf-cumpleanios-rowTemplate',this.DOM).val(
			    '<tr>\n'+
    		    '    <td>\n'+
    		    '  		<img width="50" class="foto" height="50" src="https://raffo.rhpro.com/rhprox2/fotos/{{legajo}}.jpg" onerror="if (!this.src.includes(\'/raf-cumpleanios/resources/images/error-user.png\')) this.src = \'/raf-cumpleanios/resources/images/error-user.png\';">\n'+
    		    '    	{{#apellidoynombre}}\n'+
    		    '			<div class="apellidoynombre"><b>Nombre:</b> {{apellidoynombre}}</div>\n'+
    			'		{{/apellidoynombre}}\n'+
    		    '    	{{#puesto}}\n'+
    			'			<div class="puesto"><b>Puesto:</b> {{puesto}}</div>\n'+
    			'		{{/puesto}}\n'+
    		    '    	{{#sede}}\n'+
    		    '			<div class="sede"><b>Sede:</b> {{sede}}</div>\n'+
    			'		{{/sede}}\n'+
    			'	</td>\n'+
    		    '</tr>'
    		);
    	}
    },
	
	onHashParamsChange: function() {
	},
    
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-cumpleanios-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-cumpleanios-widgetTitle',this.DOM).val(),
			customCss: $('.raf-cumpleanios-customCss',this.DOM).val(),
			rowTemplate: $('.raf-cumpleanios-rowTemplate',this.DOM).val(),
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-cumpleanios-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-cumpleanios-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
	    } else if(!$('.raf-cumpleanios-rowTemplate',this.DOM).val()){
	    	return 'El campo Row Template no puede ser vacío.'
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
    
    getDataset : function(datasetName,params,action){
    	var that = this;
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : datasetName,
    			constraints: (params ? params.constraints : params),
    			order: (params ? params.order : params)
    		})
    	})
    	.done(function(dataset) {	
    		action(dataset);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		that.showErrorMessage('ERROR:','Error al cargar cumpleanios.');
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
