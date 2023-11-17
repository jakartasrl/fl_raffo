var rafCarouselFactory = SuperWidget.extend({
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
		if($('.raf-carousel-widgetTitle', that.DOM).html()=='') $('.raf-carousel-widgetTitle', that.DOM).hide();
		
		var $gallery = $('.raf-carousel-gallery',this.DOM);
		this.getDataset("raf-customSecurity", function(dataset){
			for(var i=0; i<dataset.length; i++) {
				var url = '/webdesk/streamcontrol/image.jpg?WDCompanyId='+dataset[i]['companyid']+'&WDNrDocto='+dataset[i]['documentid']+'&WDNrVersao='+dataset[i]['version'];
				$gallery.append(
					'<img alt="'+dataset[i]['title']+'" ' +
					'src="'+url+'" ' +
					'data-image="'+url+'" ' +
					'data-description="'+dataset[i]['description']+'" '+
					'data-custom="'+dataset[i]['imageLink']+';'+dataset[i]['target']+'">'
				);  						
			}
			
			var galleryParams = $.extend(
				{
					slider_arrows_skin: 'alexis',	
					
					gallery_autoplay: true,
	    			gallery_play_interval: 5000,				
	    			gallery_pause_on_mouseover: true,
	    			
	    			slider_enable_text_panel: true,
	    			slider_enable_zoom_panel: false,	
	    			slider_enable_fullscreen_button: false,
	    			slider_enable_play_button: false,
	    			slider_enable_progress_indicator: false,
	    			
	    			slider_control_zoom: false,
	    			slider_control_swipe: false,
	
	    			slider_textpanel_always_on: true,	
	    			slider_textpanel_enable_title: true,
	    			slider_textpanel_enable_description: true,
	    			slider_textpanel_enable_bg: true,
	    			slider_textpanel_height: 80,
	    			slider_textpanel_title_text_align: 'center',
	    			slider_textpanel_desc_text_align: 'center',
	    			
	    			strippanel_enable_buttons: true,
	    			strippanel_enable_handle: false,
	    			strippanel_background_color: "rgb(35,35,35)"
				},
				(that.unitegalleryParams ? eval('('+that.unitegalleryParams+')') : {})
			);
					
			var uAPI = $gallery.unitegallery(galleryParams),
				$textPanel = $('.ug-textpanel',$gallery);
			
			if(i>0){
				$('#imageLink').val(dataset[0]['imageLink']);
				$('#target').val(dataset[0]['target']);
				if (!dataset[0]['title'] && !dataset[0]['description']){
					$textPanel.hide();
				}
			}
			
			uAPI.on('item_change',function(num, data){	
				if (data.title || data.description){
					$textPanel.fadeIn(500);
	    		} else {
	    			$textPanel.fadeOut(500);
	    		}
	    		var onClickOpts = data.custom.split(';');
	    		$('#imageLink').val(onClickOpts[0]);
	    		$('#target').val(onClickOpts[1]);
	    	});
			
			$('.ug-item-wrapper',$gallery)
				.css('cursor','pointer')
				.click(function() {
					var link = $('#imageLink').val()
	    				target = $('#target').val();
					if(target=='newTab'){
						window.open(link,'_blank');
					} else if (target=='sameTab') {
						window.open(link,'_self');
					}
				});
				
		}, [{
          	  _field: "datasetName",
          	  _initialValue: this.datasetName,
          	  _finalValue: this.datasetName,
          	  _type: 1
		}] , ['docName']);
		
    },
	
    onEdit: function(){
    	if (!$('.raf-carousel-widgetId',this.DOM).val()){
    		$('.raf-carousel-widgetId',this.DOM).val('rafCarousel1');
    	}
    	if (!$('.raf-carousel-customCss',this.DOM).val()){
    		$('.raf-carousel-customCss',this.DOM).val(
				'{{container}} .raf-carousel-gallery {\n' +
				'    max-width: 100% !important;\n' +
				'    margin: auto;\n' +
				'}'
    		);
    	}

    	if (!$('.raf-carousel-unitegalleryParams',this.DOM).val()){
    		$('.raf-carousel-unitegalleryParams',this.DOM).val(
    			'{\n' +
				'	gallery_play_interval: 5000,\n' +
				'	gallery_height: 500\n' +
    			'}'
        	);
    	}
    },
	
    getDataset: function(datasetName,action,constraints,orderBy){
    	var that = this;
    	$.ajax({
    		type: "POST",
    		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",				
    		data: JSON.stringify({
    			name : datasetName,
    			constraints: constraints,
    			order: orderBy
    		})
    	})
    	.done(function(dataset) {	
    		action(dataset.values);
    	})
    	.fail(function(jqXHR, textStatus, errorThrown) {
    		that.showErrorMessage('Error', 'No se pudo cargar los datos.');
    	});		
    },
    
    getPreferences: function () {
    	var preferences = {
    			widgetId: $('.raf-carousel-widgetId',this.DOM).val(),
    			widgetTitle: $('.raf-carousel-widgetTitle',this.DOM).val(),
    			datasetName: $('.raf-carousel-datasetName',this.DOM).val(),
    			customCss: $('.raf-carousel-customCss',this.DOM).val(),
    			unitegalleryParams: $('.raf-carousel-unitegalleryParams',this.DOM).val(),
    			resize: $('.raf-carousel-resize',this.DOM).val()
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-carousel-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-carousel-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
	    } else if(!$('.raf-carousel-datasetName',this.DOM).val()){
	    	return 'El campo Dataset del Fichero Carusel no puede ser vacío.'
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
        	this.showErrorMessage('Configuración no válida:',message);
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
    		this.onView();
    	}
    },
    
});
