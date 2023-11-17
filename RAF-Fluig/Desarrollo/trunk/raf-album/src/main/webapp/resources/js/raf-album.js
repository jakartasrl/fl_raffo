var rafAlbumFactory = SuperWidget.extend({
	galleryAPI: null,
	
	hashParams: {
		galleryId: ''
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
	onView: function(){
		var that = this;
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-album-widgetTitle', that.DOM).html()=='') $('.raf-album-widgetTitle', that.DOM).hide();
		
		that.forEachGalleryInto(this.folderId,function(galleries){
			for(var i=0; i<galleries.length; i++){
				var $btn = $('<button type="button" class="btn btn-default btn-album-'+galleries[i].documentId+'" galleryId="'+galleries[i].documentId+'">'+galleries[i].description+'</button>')
					.click(function() {
						that.changeHashParams({
							galleryId: $(this).attr('galleryId'),
						});
					})
					.appendTo($('.raf-album-nav',that.DOM));
			}
			if (!that.hashParams.galleryId) {
				$('.raf-album-nav button:first-child',that.DOM).click();
			} else {
				$('.raf-album-nav .btn-album-'+that.hashParams.galleryId).addClass('active');
			}
			
		});
    },
	
    onEdit: function(){
    	if (!$('.raf-album-widgetId',this.DOM).val()){
    		$('.raf-album-widgetId',this.DOM).val('rafAlbum1');
    	}
    	if (!$('.raf-album-customCss',this.DOM).val()){
    		$('.raf-album-customCss',this.DOM).val(
				'{{container}} .raf-album-nav {\n' +
				'    width: 65%;\n' +
				'    margin: auto;\n' +
				'}\n' +
                '\n' +
				'{{container}} .raf-album-nav button {\n' +
				'    margin: 0px 5px 10px 0px;\n' +
				'}\n' +
                '\n' +
				'{{container}} .raf-album-gallery {\n' +
				'    max-width: 65% !important;\n' +
				'    margin: auto;\n' +
				'}'
    		);
    	}
    	if (!$('.raf-album-unitegalleryParams',this.DOM).val()){
    		$('.raf-album-unitegalleryParams',this.DOM).val(
    			'{\n' +
    			'    theme_text_type: "title"    /* (title|description) Indica si el texto se muestara como título o como descripción. */ \n' +
    			'}'
        	);
    	}
    },
	
	onHashParamsChange: function() {
		var that = this;
		var gallery = $('.raf-album-gallery',this.DOM);
		gallery.html('');
		if(this.hashParams.galleryId){
			this.forEachDocumentInto(this.hashParams.galleryId, function(documents){
				
				if(that.galleryAPI){
					that.galleryAPI.destroy();
				}
				
				for(var i=0; i<documents.length; i++) {
					if (documents[i].type=='img') {
						var url = '/webdesk/streamcontrol/?WDCompanyId='+documents[i].companyId+'&WDNrDocto='+documents[i].documentId+'&WDNrVersao='+documents[i].version;
						gallery.append(
								'<img alt="'+documents[i].description+'" ' +
								'src="'+url+'" ' +
								'data-image="'+url+'" ' +
								'data-description="'+documents[i].description+'" ' +
								'">'
						);	    						
					} else if (documents[i].type=='vid'){
						var url = '/webdesk/streamcontrol/?WDCompanyId='+documents[i].companyId+'&WDNrDocto='+documents[i].documentId+'&WDNrVersao='+documents[i].version;
						gallery.append(
								'<img alt="'+documents[i].description+'" ' +
								'src="'+url.replace('?','image.jpg?')+'" ' +
								'data-type="html5video" ' +
								'data-image="'+url.replace('?','image.jpg?')+'"' +
								'data-videomp4="'+url+'" ' +
								'data-description="'+documents[i].description+'" ' +
								'">'
						);
					}
				} 

				var galleryParams = $.extend(
					{
						slider_arrows_skin: 'alexis',	
						
						theme_enable_hidepanel_button: false,
						theme_text_align: "left",
						
						gallery_autoplay: true,
						gallery_play_interval: 5000,				
						gallery_pause_on_mouseover: true,
						
						slider_enable_text_panel: true,
						slider_enable_zoom_panel: true,	
						slider_enable_fullscreen_button: true,
						slider_enable_play_button: true,
						slider_enable_progress_indicator: false,
						
						slider_textpanel_always_on: false,	
						slider_textpanel_enable_bg: true,
						slider_textpanel_height: 80,
						slider_textpanel_title_text_align: 'center',
						slider_textpanel_desc_text_align: 'center',
						
						strippanel_enable_buttons: true,
						strippanel_background_color: "rgb(35,35,35)"
					},
					(that.unitegalleryParams ? eval('('+that.unitegalleryParams+')') : {})
				);
				
				that.galleryAPI = gallery.unitegallery(galleryParams);
				
			});
			$('.raf-album-nav button',this.DOM).removeClass('active');
			$('.raf-album-nav .btn-album-'+this.hashParams.galleryId).addClass('active');
		}
	},
    
    forEachGalleryInto : function(folderId,action){
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : 'raf-foldersNotEmpty',
    			constraints: [
		              {
		            	  _field: "folderId",
		            	  _initialValue: folderId,
		            	  _finalValue: folderId,
		            	  _type: 1
		              },{
		            	  _field: "deleted",
		            	  _initialValue: "false",
		            	  _finalValue: "false",
		            	  _type: 1
		              }
    			],
    			order: ['createDate']
    		})
    	})
    	.done(function(dataset) {	
    		var galleries = []; 
    		for (var i = 0; i < dataset.values.length; i++) {
    			galleries.push({
    				documentId: dataset.values[i]["documentPK.documentId"],
    				description: dataset.values[i]["documentDescription"]
    			});
    		}
    		action(galleries);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		alert('No se pudo cargar los albumes.');
    	});		
    },

    forEachDocumentInto : function(parentDocumentId,action){
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : 'document',
    			constraints: [
    			              {
    			            	  _field: "parentDocumentId",
    			            	  _initialValue: parentDocumentId,
    			            	  _finalValue: parentDocumentId,
    			            	  _type: 1
    			              },{
    			            	  _field: "deleted",
    			            	  _initialValue: "false",
    			            	  _finalValue: "false",
    			            	  _type: 1
    			              },{
    			            	  _field: "documentType",
    			            	  _initialValue: 2,
    			            	  _finalValue: 2,
    			            	  _type: 1
    			              },{
    			            	  _field: "approved",
    			            	  _initialValue: 'true',
    			            	  _finalValue: 'true',
    			            	  _type: 1
							  },{
								  _field: "activeVersion",
								  _initialValue: 'true',
								  _finalValue: 'true',
								  _type: 1
							  }
                ],
                order: ["documentDescription"]
    		})
    	})
    	.done(function(dataset) {	
    		var documents = []; 
    		for (var i = 0; i < dataset.values.length; i++) {
    			var type;
    			if(dataset.values[i]["mimetype"].indexOf("image")!=-1){
    				type = 'img'
    			} else if (dataset.values[i]["mimetype"].indexOf("video")!=-1){
    				type = 'vid'
    			}
    			
    			documents.push({
    					documentId: dataset.values[i]["documentPK.documentId"],
    					companyId: dataset.values[i]["documentPK.companyId"],
    					description: dataset.values[i]["additionalComments"],
    					version: dataset.values[i]["documentPK.version"],
    					type: type
    			})
    		}
    		action(documents);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		alert('No se pudo cargar la galería.');
    	});		
    },
    
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-album-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-album-widgetTitle',this.DOM).val(),
			folderId: $('.raf-album-folderId',this.DOM).val(),
			customCss: $('.raf-album-customCss',this.DOM).val(),
			unitegalleryParams: $('.raf-album-unitegalleryParams',this.DOM).val()
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-album-widgetId',this.DOM).val().indexOf('-')!=-1){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-album-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
	    } else if(!$('.raf-album-folderId',this.DOM).val()){
	    	return 'El campo Carpeta de Galerías no puede ser vacío.'
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
