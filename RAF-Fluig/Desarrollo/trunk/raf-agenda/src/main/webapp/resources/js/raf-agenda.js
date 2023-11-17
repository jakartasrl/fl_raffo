var rafAgendaFactory = SuperWidget.extend({
	hashParams: {
	},
	
    bindings: {
        local: {
            'save-preferences': ['click_savePreferences']
        }
    },
	
    dataTable: {},
    constraints:  [],
    page: 0,
    noMoreResults: false,
    
    // TODO esto debería ser param del edit
    rowsPerPage: 30,
    
	onView: function(){
		var that = this;
		var $dataTableContainer = $('.raf-agenda-table',this.DOM);
		
		this.DOM.before('<style>'+this.customCss.replace(/\{{container}}/g,'div#'+this.DOM.attr('id'))+'</style>');
		if($('.raf-agenda-widgetTitle', that.DOM).html()=='') $('.raf-agenda-widgetTitle', that.DOM).hide();
		
		this.getDataset("raf-empleados-paged", 
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
				        	'title': 'Foto'
				        },
				        {
				        	'title': 'Nombre y Apellido'
				        },
				        {
				        	'title': 'Sede'
				        },
				        {
				        	'title': 'Departamento'
				        },
				        {
				        	'title': 'Cargo'
				        },
				        {
				        	'title': 'Interno'
				        },
				        {
				        	'title': 'Celular'
						},
				        {
				        	'title': 'Mail'
				        }
				    ],
				    multiSelect: false,
				    classSelected: 'active',
				    search: {
				        enabled: true,
				        onSearch: function(filter) {
				            if(filter) {
					        	that.constraints = [
	        	                    {
	        	                    	"_field" : "legajo",
	        	                    	"_initialValue": "%"+filter+"%",
	        	                    	"_finalValue" : "%"+filter+"%",
	        	                    	"_type": 2,
	        	                    	"_likeSearch": true
	        	                    },
									{
										"_field" : "apellidoynombre",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "sede",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "departamento",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "gerencia",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "puesto",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "interno",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "celular",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "fechaNacimiento",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "fechaingreso",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "dni",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									},
									{
										"_field" : "mail",
										"_initialValue": "%"+filter+"%",
										"_finalValue" : "%"+filter+"%",
										"_type": 2,
										"_likeSearch": true
									}
		                        ];
				            } else {
				            	that.constraints = [];
				            }
				            
				            
				        	that.page = 0;
				        	that.noMoreResults = false;
				        	
				        	that.dataTable.showLoading();
				        	that.getDataset("raf-empleados-paged", 
				            	{
					        		constraints: that.getConstraints(),
									order: ['apellidoynombre']
					            },
					            function(dataset){
					            	that.dataTable.reload(dataset.values);
					            	if(window.innerHeight>=$(document).height()){
										that.insertNextPage();
									};
					            }
					        );
				        },
				        onlyEnterkey: false,
				        searchAreaStyle: 'col-md-3'
				    },
				    scroll: {
				        target: window,
				        enabled: true,
				        onScroll: function() {
				        	if(that.noMoreResults){
				        		that.dataTable.hideLoading();
				        	} else {
				        		that.insertNextPage();
				        	}
				        }
				    },
				    actions: {
				        enabled: false
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
				
				$('#datatable-area .row',that.DOM).prepend('<button class="export btn btn-primary">Exportar</button>');
				$('.export',that.DOM).click(function() {
					that.getDataset("raf-empleados", 
		            	{
							constraints: that.constraints,
							order: ['apellidoynombre']
			            },
			            function(dataset){
			            	var content = 'Nombre y Apellido; Sede; Departamento; Puesto; Interno; Celular; Mail;\n';
			            	for(var i=0; i<dataset.values.length; i++){
	            				content += (dataset.values[i]['apellidoynombre']+';');
	            				content += (dataset.values[i]['sede']+';');
	            				content += (dataset.values[i]['departamento']+';');
	            				content += (dataset.values[i]['puesto']+';');
	            				content += (dataset.values[i]['interno']+';');
	            				content += (dataset.values[i]['celular']+';');
	            				content += (dataset.values[i]['mail']+';');
			            		content += '\n';
			            	}
			            	that.saveFile('telefonos.csv',content);
			            }
			        );
				});
				
				if(window.innerHeight>=$(document).height()){
					that.insertNextPage();
				};
				
				
			}
		);
		
    },
    
    setDefaultSrc: function(img,legajo, usuarioGenerico){
    	if(usuarioGenerico && !img.src.indexOf('/webdesk/streamcontrol/image.jpg')!=-1) {
    		this.getDataset("PORTAL-UsuariosGenericos", 
		    	{
					constraints: [
			  		    {
					    	"_field" : "legajo",
					    	"_initialValue": legajo,
					    	"_finalValue" : legajo,
					    	"_type": 1,
					    }
					]
				},
		        function(dataset){
					img.src = '/webdesk/streamcontrol/image.jpg?WDCompanyId='+dataset.values[0]['companyid']+'&WDNrDocto='+dataset.values[0]['documentid']+'&WDNrVersao='+dataset.values[0]['version'];
		        },
		        function(){
		        	//Error
		        }
		    );
    	}
    	else if (!img.src.indexOf('/raf-agenda/resources/images/error-user.png')!=-1) {
    		img.src = '/raf-agenda/resources/images/error-user.png';
    	}
    },
    
    getConstraints: function(){
    	return  this.constraints.concat([
		    {
		    	"_field" : "countFrom",
		    	"_initialValue": this.rowsPerPage*this.page,
		    	"_finalValue" : this.rowsPerPage*this.page,
		    	"_type": 1,
		    },
		    {
		    	"_field" : "countTo",
		    	"_initialValue": this.rowsPerPage*(this.page+1),
		    	"_finalValue" : this.rowsPerPage*(this.page+1),
		    	"_type": 1,
		    },
		    {
				"_field" : "mail",
				"_initialValue": "%@raffo.com.ar-%",
				"_finalValue" : "%@raffo.com.ar-%",
				"_type": 3,
				"_likeSearch": true
			},
		    {
		    	"_field" : "legajo",
		    	"_initialValue": "%EXT%",
		    	"_finalValue" : "%EXT%",
		    	"_type": 3,
		    	"_likeSearch": true
		    },
		    {
		    	"_field" : "filtroCuentasAdministrativas",
		    	"_initialValue": "true",
		    	"_finalValue" : "true",
		    	"_type": 3
		    }
		]);
    },
	
    insertNextPage: function(){
	    var that = this;

	    this.page++;
		this.getDataset("raf-empleados-paged", 
	    	{
				constraints: that.getConstraints(),
				order: ['apellidoynombre']
	        },
	        function(dataset){
	        	if(dataset.values.length > 0){
	        		that.dataTable.addPage(dataset.values,null,true);
	        		if(dataset.values.length < that.rowsPerPage) {
	        			that.noMoreResults = true;
	        		}
	        	}
	        	that.dataTable.hideLoading();
	        }
	    );
    },
    
    saveFile: function(fileName, content){
		/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
		var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})}
		var blob = new Blob([content], {type: 'text/javascript;charset=utf-8'});
		saveAs(blob, fileName);
	},
    
    onEdit: function(){
    	if (!$('.raf-agenda-widgetId',this.DOM).val()){
    		$('.raf-agenda-widgetId',this.DOM).val('rafAgenda1');
    	}
    	if (!$('.raf-agenda-customCss',this.DOM).val()){
    		$('.raf-agenda-customCss',this.DOM).val(
				'{{container}} .raf-agenda-table {\n' +
				'    width: 100%;\n' +
				'}'
    		);
    	}
    	if (!$('.raf-agenda-rowTemplate',this.DOM).val()){
    		$('.raf-agenda-rowTemplate',this.DOM).val(
				'<tr>\n'+
    		    '    <td>\n'+
    		    '  		<img width="50" height="50" src="https://raffo.rhpro.com/rhprox2/fotos/{{legajo}}.jpg" onerror="rafAgendaFactory.setDefaultSrc(this,\'{{legajo}}\',\'{{usuarioGenerico}})\'">\n'+
    		    '    </td>\n'+
    		    '    <td>\n'+
    		    '    	{{#apellidoynombre}}\n'+
    			'			{{apellidoynombre}}\n'+
    			'		{{/apellidoynombre}}\n'+
    			'		{{^apellidoynombre}}\n'+
    			'			-\n'+
    			'		{{/apellidoynombre}}\n'+
    			'	</td>\n'+
    		    '    <td>\n'+
    		    '    	{{#sede}}\n'+
    			'			{{sede}}\n'+
    			'		{{/sede}}\n'+
    			'		{{^sede}}\n'+
    			'			-\n'+
    			'		{{/sede}}\n'+
    			'	</td>\n'+
    		    '    <td>\n'+
    		    '    	{{#departamento}}\n'+
    			'			{{departamento}}\n'+
    			'		{{/departamento}}\n'+
    			'		{{^departamento}}\n'+
    			'			-\n'+
    			'		{{/departamento}}\n'+
    			'	</td>\n'+
    		    '    <td>\n'+
    		    '    	{{#puesto}}\n'+
    			'			{{puesto}}\n'+
    			'		{{/puesto}}\n'+
    			'		{{^puesto}}\n'+
    			'			-\n'+
    			'		{{/puesto}}\n'+
    			'	</td>\n'+
    		    '    <td>\n'+
    		    '    	{{#interno}}\n'+
    			'			{{interno}}\n'+
    			'		{{/interno}}\n'+
    			'		{{^interno}}\n'+
    			'			-\n'+
    			'		{{/interno}}\n'+
    			'	</td>\n'+
    		    '    <td>\n'+
    		    '    	{{#celular}}\n'+
    			'			{{celular}}\n'+
    			'		{{/celular}}\n'+
    			'		{{^celular}}\n'+
    			'			-\n'+
    			'		{{/celular}}\n'+
    			'	</td>\n'+
    		    '    <td>\n'+
    		    '    	{{#mail}}\n'+
    			'			{{mail}}\n'+
    			'		{{/mail}}\n'+
    			'		{{^mail}}\n'+
    			'			-\n'+
    			'		{{/mail}}\n'+
    			'	</td>\n'+
    		    '</tr>'
    		);
    	}
    },
	
	onHashParamsChange: function() {
	},
    
    getPreferences: function () {
    	var preferences = {
			widgetId: $('.raf-agenda-widgetId',this.DOM).val(),
			widgetTitle: $('.raf-agenda-widgetTitle',this.DOM).val(),
			customCss: $('.raf-agenda-customCss',this.DOM).val(),
			rowTemplate: $('.raf-agenda-rowTemplate',this.DOM).val(),
    	};
    	return preferences;
    },

    validateForm: function() {
		if($('.raf-agenda-widgetId',this.DOM).val().includes('-')){
			return 'El campo Widget Id no puede contener "-".'
		} else if(!$('.raf-agenda-widgetId',this.DOM).val()){
			return 'El campo Widget Id no puede ser vacío.'
		} else if(!$('.raf-agenda-rowTemplate',this.DOM).val()){
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
    
    getDataset : function(datasetName,params,action,errorAction){
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
    		if(errorAction) {
    			errorAction();
    		} else {
    			that.showErrorMessage('ERROR:', 'Error al cargar agenda.');
    		}
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
