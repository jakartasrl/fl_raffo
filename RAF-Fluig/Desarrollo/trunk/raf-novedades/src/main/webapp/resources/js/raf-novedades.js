var rafNovedadesFactory = SuperWidget.extend({
	hashParams: {
		type: '',
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
	onView: function(){
		var that = this;
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if(!this.hashParams.type){
			this.loadNews();
			if($('.raf-novedades-widgetTitle', that.DOM).html()=='') $('.raf-novedades-widgetTitle', that.DOM).hide();
		}
    },
	
    onEdit: function(){
    	if (!$('.raf-novedades-widgetId',this.DOM).val()){
    		$('.raf-novedades-widgetId',this.DOM).val('rafNovedades1');
    	}
    	if (!$('.raf-novedades-customCss',this.DOM).val()){
    		$('.raf-novedades-customCss',this.DOM).val(
				'{{container}} {width: 100%;}\n' +
				'	{{container}} .novedadItem {border-top:1px solid #720023; background-color:white;}\n' +
				'		{{container}} .novedadItem:last-child {border-bottom:1px solid #720023;}\n' +
				'	{{container}} .novedadItem .imgDiv {float:left; height:110px; width:110px;}\n' +
				'		{{container}} .novedadItem .imgDiv img {height:100%; width:100%;}\n' +
				'	{{container}} .novedadItem .textDiv {height:110px; padding:10px; line-height:inherit; text-align:justify; overflow:hidden;}\n' +
				'		{{container}} .novedadItem .textDiv h3 {margin-top:0; margin-bottom:5px;}\n' +
				'	{{container}} .novedadItem .novedadLink {color:#720023; text-decoration:underline; cursor:pointer;}\n' +
				'		{{container}} .novedadItem .novedadLink:hover {color:#b30155;}' +
				'	{{container}} .raf-novedades-widgetTitle {font-family: \'Flama\',sans-serif; font-weight: 700; font-size: 1.5em; padding: 10px 0; margin:0;}\n'
    		);
    	}
    	if (!$('.raf-novedades-template',this.DOM).val()){
    		$('.raf-novedades-template',this.DOM).val(
				'<li class="novedadItem">\n' +
    			'	<div class="imgDiv">\n' + 
    			'		<a class="novedadLink" href="{{link}}"><img src="{{imageUrl}}"/></a>\n' +
    			'	</div>\n' +
    			'	<div class="textDiv">\n' +
    			'		<h3>\n' +
    			'			<a class="novedadLink" href="{{link}}">{{title}}</a>\n' +
    			'		</h3>\n' +
    			'		{{description}}\n' +
    			'	</div>\n' +
    			'</li>'
    		);
    	}
    	if (!$('.raf-novedades-maxCant',this.DOM).val()){
    		$('.raf-novedades-maxCant',this.DOM).val('0');
    	}
    },
	
	onHashParamsChange: function() {
		var that = this;
		var constraints = [];
		if(this.hashParams.type){
			constraints.push({
				  _field: "documentTypeId",
				  _initialValue: this.hashParams.type,
				  _finalValue: this.hashParams.type,
				  _type: 1
			});
			$.ajax({
				type: "POST",
				url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
				contentType: "application/json; charset=utf-8",
				dataType: "json",				
				data: JSON.stringify({
					name : 'documentType',
					constraints: [
		                {
		                	_field: "companyId",
			            	_initialValue: window.WCMAPI.tenantCode,
			            	_finalValue: window.WCMAPI.tenantCode,
			            	_type: 1
		                },
		                {
		                	_field: "documentTypeCode",
		                	_initialValue: that.hashParams.type,
		                	_finalValue: that.hashParams.type,
		                	_type: 1
		                }
		            ]
				})
			})
			.done(function(dataset) {	
				if(dataset.values.length > 0){
					$('.raf-novedades-widgetTitle',that.DOM).html(dataset.values[0]['documentTypeDesc']);
				} else {
					that.showErrorMessage('ERROR:','No se encontró el tipo de documento.');
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				that.showErrorMessage('ERROR:','No se encontró el tipo de documento.');
			});	
		} else {
			$('.raf-novedades-widgetTitle',that.DOM).html(that.widgetTitle);
		}
		this.loadNews(constraints);
	},
	
	loadNews: function(constraints) {
		var that = this;
		var cts = (constraints ? constraints : []);
		var template = $('.raf-novedades-template',this.DOM).html();
		this.forEachDocumentInto(this.folderId, function(datasetValues){
			$('.raf-novedades-list ul',that.DOM).html('');
			var ammount;
			if (that.maxCant > 0){
				ammount = (that.maxCant < datasetValues.length ? that.maxCant : datasetValues.length);
			} else {
				ammount = datasetValues.length;
			}
			if(ammount > 0) {
				for(var i=0; i<ammount; i++){
					var row = template
						.replace(/\{{imageUrl}}/g,'/webdesk/streamcontrol/image.jpg?WDCompanyId='+datasetValues[i]['documentPK.companyId']+'&WDNrDocto='+datasetValues[i]['documentPK.documentId']+'&WDNrVersao='+datasetValues[i]['documentPK.version'])
						.replace(/\{{title}}/g,datasetValues[i].documentDescription)
						.replace(/\{{description}}/g,datasetValues[i].additionalComments)
						.replace(/\{{link}}/g,that.linkInclude+'#'+that.idIncludeWidget+'-doc='+datasetValues[i]['documentPK.companyId']+'_'+datasetValues[i]['documentPK.documentId']+'_'+datasetValues[i]['documentPK.version']);
					$('.raf-novedades-list ul',that.DOM).append(row);
				}
				$(".raf-novedades-list .novedadItem .textDiv",that.DOM).dotdotdot();
				
			} else {
				$('.raf-novedades-list ul',that.DOM).append('<p style="text-align: center;">No hay novedades disponibles.</p>');
			}
		}, cts);
	},
	
	
    forEachDocumentInto : function(parentDocumentId, action, cts){
    	var that = this;
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : 'raf-novedades',
    			constraints: [
		              {
		            	  _field: "folderId",
		            	  _initialValue: parentDocumentId,
		            	  _finalValue: parentDocumentId,
		            	  _type: 1
		              },
		              {
		      			_field: "documentPK.companyId",
		      			_initialValue: window.WCMAPI.tenantCode,
		      			_finalValue: window.WCMAPI.tenantCode,
		      			_type: 1
		      		  }
                ].concat(cts),
                order: (that.hashParams.type=='Beneficios' ? ["documentDescription"] : ["lastModifiedDate"]) //XXX
    		})
    	})
    	.done(function(dataset) {
    		var data = dataset.values;
    		if(that.hashParams.type!='Beneficios') { //XXX
    			data = data.reverse()
    		}
    		action(data);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		that.showErrorMessage('ERROR:','No se pudo cargar las novedades.');
    	});		
    },
	
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-novedades-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-novedades-widgetTitle',this.DOM).val(),
			folderId: $('.raf-novedades-folderId',this.DOM).val(),
			linkInclude: $('.raf-novedades-linkInclude',this.DOM).val(),
			idIncludeWidget: $('.raf-novedades-idIncludeWidget',this.DOM).val(),
			template: $('.raf-novedades-template',this.DOM).val(),
			customCss: $('.raf-novedades-customCss',this.DOM).val(),
			maxCant: $('.raf-novedades-maxCant',this.DOM).val(),
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-novedades-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-novedades-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
		} else if(!$('.raf-novedades-folderId',this.DOM).val()){
			return 'El campo Carpeta de Artículos no puede ser vacío.'
	    } else if(!$('.raf-novedades-linkInclude',this.DOM).val()){
	    	return 'El campo URL de la página de Include no puede ser vacío.'
	    } else if(!$('.raf-novedades-idIncludeWidget',this.DOM).val()){
	    	return 'El campo Id del widget Include no puede ser vacío.'
	    } else if($('.raf-novedades-maxCant',this.DOM).val() < 0){
	    	return 'El campo Máxima cantidad de novedades no puede ser negativo.'
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
