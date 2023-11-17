var	arqForms = {
	initForm: function(formType) {
		var $this = this;
		$(function () {	
			if (formType == "ADD" || formType == "MOD") { 
				$this.onEdit();
			} else {
				$this.onView();
			}
		});
	},

	onView: function() {
	
		$('.btn').hide();
		$('.divBtnEliminarConsulta').hide();
		
		$('span').each(function( index, value ) {
			if( $(value).text().trim() == ""){
				$(value).text('-');
			}
		});
		
	},
	
	onEdit: function() {
	
		if($('#fecha').val() == ''){
			$('#fecha').val(moment().format("DD/MM/YYYY"));
		}
		
		if($('#hora').val() == ''){
			$('#hora').val(moment().format("HH:mm:ss"));
		}
				
		if($('#origen').val() == ''){
			$('#origen').val('Teléfono');
		}
		
		$('#origen').ecmzoom({
			datasetId: 'raf-origenes-sorted',
			dataFields: [
				{id: 'descripcion', value: 'Descripci%F3n'}
			],  
			filterValues: [{ id: 'active', value: true}], 
			resultFields: ['descripcion'],
			callback: function(res){
				$('#origen').val(res['descripcion']).change();
			}
		});

		$('.datoModificable').change(function () {					
			$('#modificacionDatos').val('1');					
		});		
		
		if($('#cantidadConsultas').val() == "" ){
			$('#cantidadConsultas').val(parseInt(0));
		}

		$('#tablaConsulta').ecmmasterdetail({
			buttonNewRow: '#btnNuevaConsulta',
			buttonsDeleteRow: '.btnEliminarConsulta',			
			onDeleteRow: function($tr) {
				var ret;
				ret = confirm('Confirma eliminación?');
				return ret;
			},
			afterDeleteRow: function() {
				
				$('#cantidadConsultas').val(parseInt($('#cantidadConsultas').val()) - parseInt(1));
				$('#btnNuevaConsulta').attr('disabled', false);
				
				this.concatenarSubindicesHijos();

			},
			onCustomizeRow: function($tr, index) {	
				
				$('#cantidadConsultas').val(parseInt($('#cantidadConsultas').val()) + parseInt(1));
				
				$('.cons_vencimiento', $tr).ecmdatetimepicker({
					pickTime: false, 
					language: 'es', 
					format:'dd/mm/yyyy',
					autoclose: true, 
					todayHighlight: true
				});	
				
				$('.cons_producto', $tr).ecmzoom({
					datasetId: 'raf-productos-principio-activo',
					dataFields: [
						{id: 'codigoProducto', value: 'C%F3digo'},
						{id: 'descripcionProducto', value: 'Descripci%F3n'}
					],  
					filterValues: [{ id: 'active', value: true}], 
					resultFields: ['codigoProducto','descripcionProducto','principioActivo'],
					callback: function(res){
						$('.cons_producto', $tr).val(res['codigoProducto'] + ' - ' + res['descripcionProducto']).change();
						$('.cons_activo', $tr).val(res['principioActivo']);
					}
				});
				$('.cons_producto', $tr).blur(function() {
					$('.cons_producto', $tr).ecmzoom('option', 'filterValues', [{id: 'textoBusqueda', value: $('.cons_producto', $tr).val()}]); 
				});
				
				$('.cons_tipo', $tr).ecmzoom({
					datasetId: 'raf-tipos-consulta-sorted',
					dataFields: [
						{id: 'descripcion', value: 'Descripci%F3n'}
					],  
					filterValues: [{ id: 'active', value: true}], 
					resultFields: ['descripcion'],
					callback: function(res){
						$('.cons_tipo', $tr).val(res['descripcion']).change();
					}
				});
				
				$('.cons_derivacion', $tr).ecmzoom({
					datasetId: 'raf-derivaciones-sorted',
					dataFields: [
						{id: 'descripcion', value: 'Descripci%F3n'}
					],  
					filterValues: [{ id: 'active', value: true}], 
					resultFields: ['descripcion','codigoGrupo'],
					callback: function(res){
						$('.cons_derivacion', $tr).val(res['descripcion']).change();
						$('.cons_derivacion_grupo', $tr).val('Pool:Group:' + res['codigoGrupo']).change();
					}
				});
				
				$('.cons_modificable', $tr).change(function () {					
					$('#rellamado___' + index).val('1');					
				});			

				if(parseInt($('#cantidadConsultas').val()) >= parseInt(5) ){
					$('#btnNuevaConsulta').attr('disabled', 'disabled');
				} 
				
				this.concatenarSubindicesHijos();
			
			},
			concatenarSubindicesHijos: function() {
				
				var aux = '';
				
				$('.cons_nroSolicitud:visible', $('#tablaConsulta')).each(function (i, elem) {
					var split = ($(this).attr('id')).split('cons_nroSolicitud___');
					var subindice = split[1];
					aux = aux + ',' + subindice;
				});
				
				if(aux != ''){
					aux = aux.substr(1);
				}
				$('#subindicesHijos').val(aux);
			
			}
		});
		
		// inicializo framework
		$('#form').ecmlib({
			custom: {
				init: function() {
					// inicializa siempre el formulario (sea workflow o ficha) NO USAR ESTE LUGAR!!!
				}, 
				workflow: {
					'Iniciar Consulta': {
						task: [0,1],  
						custom: function() {

							$('.divcons_rellamada').css('display','none');
						
						},
						"otherwise": function() { 

						}
					},'Modificar Consulta': {
						task: [2],  
						custom: function() {
							
							$.each($('form').serializeArray(), function(index, value){
								$('[name="' + value.name + '"]').attr('disabled', 'disabled');
							});
						
							$('#origen').attr('disabled',false);
							$('#nombre').attr('disabled',false);
							$('#telefono').attr('disabled',false);
							$('#mail').attr('disabled',false);
							$('#direccion').attr('disabled',false);
							$('#otro').attr('disabled',false);
							$('#observaciones').attr('disabled',false);
							
							$('.divcons_rellamada').css('display','block');
							
							var subindicesHijos = $('#subindicesHijos').val().split(',');

							for(i = 0; i < subindicesHijos.length; i++){
								
								var tarea = $('#cons_tarea___' + subindicesHijos[i]).val();
								
								if (tarea == "CONSULTA CERRADA" ||  tarea == "CONSULTA CANCELADA"){
									$('#cons_rellamada___' + subindicesHijos[i]).attr('disabled','disabled');
									
								}else{
									$('#cons_rellamada___' + subindicesHijos[i]).attr('disabled',false);									
									$('#cons_producto___' + subindicesHijos[i]).attr('disabled',false);									
									$('#cons_nroLote___' + subindicesHijos[i]).attr('disabled',false);									
									$('#cons_vencimiento___' + subindicesHijos[i]).attr('disabled',false);									
									$('#cons_tipo___' + subindicesHijos[i]).attr('disabled',false);									
									$('#cons_observacion___' + subindicesHijos[i]).attr('disabled',false);										
								}
							}
							
							$('#btnNuevaConsulta').hide();
							$('.divBtnEliminarConsulta').hide();
							
							$(window).unload(function() {
							
								if (window.parent.opener && 
									window.parent.opener.arqForms && 
									window.parent.opener.arqForms.afterWKRC_ModificarDatos) {

									var datos = {
											'padre': {	
												'padre_origen': $('#origen').val(),
												'padre_nombre': $('#nombre').val(),
												'padre_telefono': $('#telefono').val(),
												'padre_mail': $('#mail').val(),
												'padre_direccion': $('#direccion').val(),
												'padre_otro': $('#otro').val(),
												'padre_observaciones': $('#observaciones').val()
												},
											'hijos': {}
										};	
										
										var subindicesHijos = $('#subindicesHijos').val().split(',');

										for(i = 0; i < subindicesHijos.length; i++){
											
											var nroSolicitudHija = $('#cons_nroSolicitud___' + subindicesHijos[i]).val();
											datos.hijos[nroSolicitudHija] = {											
												'aten_producto': $('#cons_producto___' + subindicesHijos[i]).val(),
												'aten_derivacion': $('#cons_derivacion___' + subindicesHijos[i]).val(),
												'aten_nroConsulta': $('#cons_nroConsulta___' + subindicesHijos[i]).val(),
												'aten_nroSolicitud': $('#cons_nroSolicitud___' + subindicesHijos[i]).val(),													
												'aten_activo': $('#cons_activo___' + subindicesHijos[i]).val(),
												'aten_nroLote': $('#cons_nroLote___' + subindicesHijos[i]).val(),
												'aten_vencimiento': $('#cons_vencimiento___' + subindicesHijos[i]).val(),
												'aten_tipo': $('#cons_tipo___' + subindicesHijos[i]).val(),
												'aten_observacion': $('#cons_observacion___' + subindicesHijos[i]).val(),
												'aten_rellamada': $('#cons_rellamada___' + subindicesHijos[i]).val()
											};														
											
										}
									
									window.parent.opener.arqForms.afterWKRC_ModificarDatos(datos);
									
								}								
							});
						
						},
						"otherwise": function() { 

						}
					},
					'otherwise': { 
						custom: function() {
							// Si no aplica ninguna de las tareas. Debe ir ultimo.
						}
					}				
				}
			},
			parsley: {
				// Parametros configuracion enviados a parseley
			}			
		});	
		
	} //Fin del Edit
};