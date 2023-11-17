var rafTablerosFactory = SuperWidget.extend({
	hashParams: {
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
	onView: function(){
		var that = this;
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-tableros-widgetTitle', that.DOM).html()=='') $('.raf-tableros-widgetTitle', that.DOM).hide();
		
		var $grid = $('.raf-tableros-grid',this.DOM);
		this.getDataset('raf-customSecurity', function(dataset){
			if(dataset.length > 0) {
				for(var i=0; i<dataset.length; i++) {
					var imgUrl = '/webdesk/streamcontrol/image.jpg?WDCompanyId='+dataset[i]['companyid']+'&WDNrDocto='+dataset[i]['documentid']+'&WDNrVersao='+dataset[i]['version'];
					var target = (dataset[i]['targetMode']=='newTab') ? '_blank' : '_self';
					var link = dataset[i]['targetLink'];
					if (dataset[i]['targetMode']=='embedded') {
						link = that.linkInclude+'#'+that.idIncludeWidget+'-url='+link;
					}
					
					$grid.append(
						'<div class="col-xs-6 col-md-3">' +
					    '    <a target="'+ target +'" href="'+ link +'" class="thumbnail">' +
					    '    	<img class="gridImage" alt="'+ dataset[i]['title'] +'" src="'+ imgUrl +'">' +
					    '    	<div class="caption gridCaption">' +
					    '           <h3>'+dataset[i]['title']+'</h3>' +
					    '           <p title="'+ dataset[i]['description'] +'">'+dataset[i]['description']+'</p>' +
					    '       </div>' + 
				        '    </a>' +
					    '</div>' 
					); 	
					
				}
				$('.gridCaption',$grid).dotdotdot();
				$('a',$grid).hover(
					function(){
						$(this).addClass('active');
					},
					function(){
						$(this).removeClass('active');
					}
				);
			} else {
				$grid.append('<p style="text-align: center;">No hay items disponibles.</p>');
			}
			
		}, [{
          	  _field: "datasetName",
          	  _initialValue: this.datasetName,
          	  _finalValue: this.datasetName,
          	  _type: 1
		}] , ['docName']);
    },
	
    onEdit: function(){
    	if (!$('.raf-tableros-widgetId',this.DOM).val()){
    		$('.raf-tableros-widgetId',this.DOM).val('rafTableros1');
    	}
    	if (!$('.raf-tableros-customCss',this.DOM).val()){
    		$('.raf-tableros-customCss',this.DOM).val(
				'{{container}} .raf-tableros-widgetTitle {\n' +
				'    font-family: \'Flama\',  sans-serif; \n' +
				'    font-weight: 700;\n' +
				'    font-size: 1.5em; \n' +
				'    margin-top: 10px;\n' +
				'    margin-bottom: 10px;\n' +
				'}\n' +
				'{{container}} .gridImage{\n' +
				'    height: 160px;\n' +
				'}\n' +
				'{{container}} .gridCaption{\n' +
				'    height: 120px;\n' +
				'    border-top: 1px solid #ddd;\n' +
				'    margin-bottom: 5px;\n' +
				'}\n' +
				'{{container}} .raf-tableros-grid a{\n' +
				'    text-decoration: none;\n' +
				'}\n' +
				'{{container}} .gridCaption h3{\n' +
				'    margin-top: 10px;\n' +
				'}\n' +
				'{{container}} .gridCaption p{\n' +
				'    text-aling: justify;\n' +
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
    			widgetId: $('.raf-tableros-widgetId',this.DOM).val(),
    			widgetTitle: $('.raf-tableros-widgetTitle',this.DOM).val(),
    			datasetName: $('.raf-tableros-datasetName',this.DOM).val(),
    			linkInclude: $('.raf-tableros-linkInclude',this.DOM).val(),
    			idIncludeWidget: $('.raf-tableros-idIncludeWidget',this.DOM).val(),
    			customCss: $('.raf-tableros-customCss',this.DOM).val()
    	};
    	return preferences;
    },
    
    validateForm: function() {
		if($('.raf-tableros-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-tableros-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
	    } else if(!$('.raf-tableros-datasetName',this.DOM).val()){
	    	return 'El campo Dataset del Fichero Carusel no puede ser vacío.'
	    } else if(!$('.raf-tableros-linkInclude',this.DOM).val()){
	    	return 'El campo URL de la página de Include no puede ser vacío.'
	    } else if(!$('.raf-tableros-idIncludeWidget',this.DOM).val()){
	    	return 'El campo Id del widget Include no puede ser vacío.'
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
