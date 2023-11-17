var rafEncuestasFactory = SuperWidget.extend({
	hashParams: {
		documentId: null
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
    dataTable: {},

    onView: function(){
    	var that = this;
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-encuestas-widgetTitle', this.DOM).html()=='') $('.raf-encuestas-widgetTitle', this.DOM).hide();
		this.loadSurveys();
		
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		var observer = new MutationObserver(function(mutations) {
		    if($('.modal-footer [data-open-modal]:visible').text()=='Save'){
		    	$('.modal-footer [data-open-modal]:visible').text('Responder');
		    	$('.modal-footer [data-dismiss]:visible').text('Cancelar');
		    	$('.modal-footer [data-dismiss]:visible, .modal-footer [data-open-modal]:visible, .modal-header .close:visible').click(function() {
		    		that.changeHashParams({
						documentId: '',
					});
		    		location.reload(); 	
				});
		    }
		});

		observer.observe($('body')[0], {
			childList: true
		});
    },
	
    onEdit: function(){
    	if (!$('.raf-encuestas-widgetId',this.DOM).val()){
    		$('.raf-encuestas-widgetId',this.DOM).val('rafEncuestas1');
    	}
    	if (!$('.raf-encuestas-widgetTitle',this.DOM).val()){
    		$('.raf-encuestas-widgetTitle',this.DOM).val('Encuestas');
    	}
    	if (!$('.raf-encuestas-customCss',this.DOM).val()){
    		$('.raf-encuestas-customCss',this.DOM).val(
				'{{container}} .raf-encuestas-widgetTitle { font-family: \'Flama\',sans-serif; font-weight: 700; font-size: 1.5em; margin-top: 10px; }\n' +
				'{{container}} .raf-encuestas-list { width: 100% }\n' +
				'    {{container}} .raf-encuestas-list .encuestaRow {  }\n' +
				'        {{container}} .raf-encuestas-list .encuestaRow a { padding: 10px; }\n' +
				'        {{container}} .raf-encuestas-list .encuestaRow a:hover { text-decoration:none; border-color:#720023; }\n' +
				'        {{container}} .raf-encuestas-list .encuestaRow .encuestaTitle { font-size:1.5em; }\n' +
				'        {{container}} .raf-encuestas-list .encuestaRow .encuestaValidation { font-style:italic; color: #9a9b9c; }\n' +
				'            {{container}} .raf-encuestas-list .encuestaRow .encuestaValidation .fluigicon-calendar { margin-right:2px; }\n' +
				'        {{container}} .raf-encuestas-list .encuestaRow .encuestaDescription {  height:100px; margin-top:5px; }'
    		);
    	}
    	if (!$('.raf-encuestas-template',this.DOM).val()){
    		$('.raf-encuestas-template',this.DOM).val(
				'<li class="col-xs-12 col-md-4 encuestaRow">\n' +
    			'    <a class="thumbnail">\n' +
    			'        <div class="encuestaBody">\n' +
    			'            <div class="encuestaTitle">{{title}}</div>\n' +
    			'            <div class="encuestaValidation"><span class="fluigicon fluigicon-calendar"></span> Desde: {{validationStartDate}} - Hasta: {{expirationDate}}</div>\n' +
    			'            <div class="encuestaDescription">{{description}}</div>\n' +
    			'        </div>\n' +
    			'        <div class="encuestaFooter">\n' +
    			'            {{btnAnswer}} <div class="clearfix"></div>\n' +
    			'        </div>\n' +
    			'    </a>\n' +
    			'</li>'
    		);
    	}
    },
	
	onHashParamsChange: function() {
		if(this.hashParams.documentId){
			SOCIALBC.openAnswerForm(this.hashParams.documentId);
		}
	},
	
	loadSurveys: function() {
		var that = this;
		var template = $('.raf-encuestas-template',this.DOM).html();
		
		this.getEncuestasFrom(this.rootFolderId,function(encuestas){
			for(var i=0; i<encuestas.length; i++){
				var row = template
					.replace(/\{{title}}/g, encuestas[i].documentDescription)
					.replace(/\{{description}}/g, '<p class="pDescription" style="height:100%;margin:0;">'+encuestas[i].additionalComments+'</p>')
					.replace(/\{{validationStartDate}}/g, (encuestas[i].validationStartDate ? encuestas[i].validationStartDate : '-'))
					.replace(/\{{expirationDate}}/g, (encuestas[i].expirationDate ? encuestas[i].expirationDate : '-'))
					.replace(/\{{btnAnswer}}/g, '<button class="btn btn-primary btnAnswer" style="float:right;" data-documentid="'+encuestas[i].documentId+'">Responder</button>');
				$('.raf-encuestas-list ul',that.DOM).append(row);
				if(encuestas[i].expires==false){
					console.log($('.raf-encuestas-list ul .encuestaRow:last-child'));
					$('.encuestaValidation',$('.raf-encuestas-list ul .encuestaRow:last-child')).hide();
				}
			}
			
			$('.raf-encuestas-list ul .pDescription').dotdotdot();
			
			$('.raf-encuestas-list ul .btnAnswer').click(function() {
				that.changeHashParams({
					documentId: $(this).data('documentid'),
				});
			});
		});
	},
	
	getEncuestasFrom : function(folderId, action, cts){
    	var that = this;
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : 'raf-encuestas',
    			constraints: [
		              {
		            	  _field: "folderId",
		            	  _initialValue: folderId,
		            	  _finalValue: folderId,
		            	  _type: 1
		              },
		              {
		      			_field: "documentPK.companyId",
		      			_initialValue: window.WCMAPI.tenantCode,
		      			_finalValue: window.WCMAPI.tenantCode,
		      			_type: 1
		      		  }
                ].concat(cts ? cts : []),
                order: ["expires","validationStartDate"]
    		})
    	})
    	.done(function(dataset) {	
    		action(dataset.values.reverse());
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		that.showErrorMessage('ERROR:','No se pudo cargar las encuestas.');
    	});		
    },
	
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-encuestas-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-encuestas-widgetTitle',this.DOM).val(),
			rootFolderId: $('.raf-encuestas-rootFolderId',this.DOM).val(),
			template: $('.raf-encuestas-template',this.DOM).val(),
			customCss: $('.raf-encuestas-customCss',this.DOM).val()
    	};
    	return preferences;
    },

    validateForm: function() {
		if($('.raf-encuestas-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".';
		} else if(!$('.raf-encuestas-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.';
		} else if(!$('.raf-encuestas-rootFolderId',this.DOM).val()){
	    	return 'El campo Carpeta  de Comunidades no puede ser vacío.';
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

