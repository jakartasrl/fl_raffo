
var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		initTables();

		$('.fluigicon-trash, .input-group-addon, .btn-default').hide();
		
		var ingresoPersonal = $('#ingresoPersonal').html();
		
		if(ingresoPersonal == 'PE') {

			$('.pe').show();
			$('.apm, .apf').hide();
			$('.apmapf').hide();
			
		} else if(ingresoPersonal == 'APM') {
			
			$('.apm').show();
			$('.apmapf').show();
			$('.apf, .pe').hide();
			
		} else if(ingresoPersonal == 'APF') {
			
			$('.apf').show();
			$('.apmapf').show();
			$('.apm, .pe').hide();
			
		}
		
		habilitarCampos('onView');
		
	},
	
	onEdit: {
		custom: function() {
			
			//$('#zoom').arqzoom('updateWithDefault');
			
			initTables();
			//convierteAMayusculas();
			

			//Manejo de Fechas		
			$('#fechaRelevamientoPerfil').arqdatetimepicker({
				pickTime: false, 
				language:'es', 
				format:'dd/mm/yyyy', 
				autoclose: false, 
				todayHighlight: true,
				multidate: false
			});

			
			var date = new Date();
			date.setMonth(date.getMonth() + 1);
			date.setDate(1);
			
			$('#fechaIngresoNecesaria').arqdatetimepicker({
				pickTime: false, 
				language:'es', 
				format:'mm/yyyy',
				minViewMode: 1,
				firstDay: 1,
				autoclose: true, 
				todayHighlight: true,
				startDate: date
			});
			
			var onlyTime = FLUIGC.calendar('#horarioDesde', {
			    pickDate: false,
			    pickTime: true
			});
			
			var onlyTime = FLUIGC.calendar('#horarioHasta', {
			    pickDate: false,
			    pickTime: true
			});
			
			$('#fechaRelevamientoPerfil, #fechaIngresoNecesaria, #horarioDesde, #horarioHasta').each(function(){
				$(this).change(function(){
					$(this).parsley().validate();
				})
			});
			
			var lista = ['nroSolicitud','documentid', 'version','ingresoPersonal','fechaRelevamientoPerfil','fechaIngresoNecesaria','codigoBusqueda','nombreBusqueda','puesto',
						 'nombrePuestoNuevo','categoria','gerencia','area','sector','subsector','aperturaPorSector','lineaEspecialidad','zona','centroCosto','reportaa',
						 'categoriaReportaa','puestoReportaa', 'tipoPosicion','nombreReemplazo','motivoReemplazo','observaciones','efectivoTemporario',
						 'cantidadMeses','motivoPuestoNuevo','pea','personalACargo','clientesInternos','proveedoresInternos','contactoConClientes','detalleMaquinas',
						 'manejoInfoConfidencial','esfuerzoFisico','exposicionMaterialesQuimicos','proyeccionPosicion','ciudadZonasVisitar','giras','productosManejar',
						 'visitaMedicos','visitaInstituciones','administraMuestrasMedicas','visitaFarmacias','coordinacionAccionesFidelizar','analisisInformacionAuditoria',
						 'tareasAdministrativasVarias','franjaEdad','genero','origenMatricula','descExperienciaLaboralReq','habilidadesNecesarias',
						 'experienciaPreviaComoAPM','experienciaPreviaEnVentas','experienciaPreviaComoAPF','visitadoEspecialidadesMedicos', 'visitadoInstituciones', 'conocimientoLineasProductos',
						 'provengaDeLaboratorios','conozcaLasAuditorias','otros','nivel','otras','aspectosCriticosPuesto','sede','ubicacionFisica','horarioDesde',
						 'horarioHasta','horasExtras','viajes','remuneracionBruta','convenio','categoriaConvenio','obraSocial','planRemu','comentariosBeneficios',
						 'adicionalEstudioPreocupacional','tipoEstudioPsicotecnico','personasConDiscapacidad','derivacionJobPosting',
						 'observacionesGralesProceso','busquedaConfidencial','puestoNuevo','junior','semiSenior','senior','noCorresponde',
						 'secundarioCompleto','teciarioCurso','terciarioGraduado','universitarioCurso','universitarioGraduado','posgradoCurso','posgradoGraduado',
						 'detalleBuzones', 'observacionesReqInf', 'tipoInterno', 'usuarioExistenteTelef'];
		
			var listaCheckboxs = ['puestoNuevo','junior','semiSenior','senior','noCorresponde','secundarioCompleto','teciarioCurso', 'terciarioGraduado',
			                     'universitarioCurso','universitarioGraduado','posgradoCurso','posgradoGraduado', 'confirmaCierre',
			                     'accesoInternet', 'cuentaCorreoElectronico', 'accesoBuzones', 'accesoAWebmail', 'salidaLLamadasLocales', 
			                     'salidaDDNNacional', 'salidaDDNInteracional', 'salidaCelular'];
			
			var ingresoPersonalOptsString = "";
			
			if(arqFormOpts.ingresoPersonalOpts != null){
				ingresoPersonalOptsString = Object.keys(arqFormOpts.ingresoPersonalOpts).join(',');
			}
			
			//ARQ Zooms
			$('#historialBusquedas').arqzoom({
				datasetId: 'RAF05-FormularioPrincipal-filtered',
				template: {
					row: [
					      { field: 'nroSolicitud', header: 'Nro. Solicitud'},
				          { field: 'codigoBusqueda', header: 'Código de Búsqueda'},
				          { field: 'nombreBusqueda', header: 'Nombre de la Búsqueda'},
					],
				},
				filterValues: {
					'matriculaSolicitante': $('#matriculaSolicitante').val(),
					'ingresoPersonalOpts': ingresoPersonalOptsString
				},
				searchField: 'nroSolicitud',
				resultFields: lista,
				callback: function(res){

					if ((typeof res['nroSolicitud'] !== "undefined") && (res['nroSolicitud'] !== null)) {

						//para ocultar los campos que estaba hide
						//para un determinado ingresoPersonal
//						$('#ingresoPersonal').change();
//						$('#nivel').val(res['nivel']).change();
						
						for(var k = 0; k < listaCheckboxs.length; k++){
							
							
							if(res[listaCheckboxs[k]] == 'true'){
								$(':input[type="checkbox"][name="'+ listaCheckboxs[k] + '"]').prop('checked', true).change(); 
							}
						}
						
						for(var i = 3; i < lista.length; i++){
							var $field = $('#' + lista[i]);
							var value = $field.arqnum('instance') ? res[lista[i]].replace(/\./g,'') : res[lista[i]];
							$field.val(value);
							if (value) {
								$field.change(); 
							}
						}
						
						$("#tablaQuienesEntrevistan tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaQuienesEntre",
									  _finalValue: "tablaQuienesEntre",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
								
								var $row = $("#tablaQuienesEntrevistan").arqmasterdetail("addNewRow");
								$('.quienesEntrevistan', $row).val(dataset.values[i]["quienesEntrevistan"]).change();
			
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar los entrevistadores.');
						});		
						
						$("#tablaSugerencias tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaSugerencias",
									  _finalValue: "tablaSugerencias",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
							  	
								var $row = $("#tablaSugerencias").arqmasterdetail("addNewRow");
								$('.sugerencia', $row).val(dataset.values[i]["sugerencia"]).change();
			
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar las sugerencias.');
						});
						
						$("#tablaTareasOrdenPrioridad tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaTareasOrdenPrio",
									  _finalValue: "tablaTareasOrdenPrio",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
							  
								var $row = $("#tablaTareasOrdenPrioridad").arqmasterdetail("addNewRow");
								$('.detalleAccion', $row).val(dataset.values[i]["detalleAccion"]);
							
								//Se validará que se hayan cargado al menos 4 tareas
								cantidadTareas();
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar las tareas en orden de prioridad.');
						});		
					
						$("#tablaCarreras tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaCarreras",
									  _finalValue: "tablaCarreras",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
							  	
								var $row = $("#tablaCarreras").arqmasterdetail("addNewRow");
								$('.carrera', $row).val(dataset.values[i]["carrera"]).change();
			
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar las carreras.');
						});
						
						$("#tablaIdiomas tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaIdiom",
									  _finalValue: "tablaIdiom",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
						  	
								var $row = $("#tablaIdiomas").arqmasterdetail("addNewRow");
								
								$('.idiomas', $row).val(dataset.values[i]["idiomas"]).change();
								$('.nivelLectura[value=' + dataset.values[i]["nivelLectura"] + ']', $row).prop('checked', true);
								$('.nivelEscrito[value=' + dataset.values[i]["nivelEscrito"] + ']', $row).prop('checked', true);
								$('.nivelOral[value=' + dataset.values[i]["nivelOral"] + ']', $row).prop('checked', true);
							
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar los idiomas.');
						});
						
						$("#tablaProgramasInformatica tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaProgramasInformat",
									  _finalValue: "tablaProgramasInformat",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
							  	
								var $row = $("#tablaProgramasInformatica").arqmasterdetail("addNewRow");
								$('.programasInformatica', $row).val(dataset.values[i]["programasInformatica"]).change();
								$('.programasInformaticaNivel[value=' + dataset.values[i]["programasInformaticaNivel"] + ']', $row).prop('checked', true);
			
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar los programas de informatica.');
						});
						
						$("#tablaDetalleCompetencias tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaDetalleComp",
									  _finalValue: "tablaDetalleComp",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {
							
							for (var i = 0; i < dataset.values.length; i++) {
							  	
								var $row = $("#tablaDetalleCompetencias").arqmasterdetail("addNewRow");
								
								$('.competencia', $row).val(dataset.values[i]["competencia"]);
								$('.nivelCompetencia', $row).val(dataset.values[i]["nivelCompetencia"]);
								$('.descripcionAmpliada', $row).val(dataset.values[i]["descripcionAmpliada"]);

							}
							
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar los detalle de competencias.');
						});
						
						$("#tablaDesgloseRem tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaDesgloseRem",
									  _finalValue: "tablaDesgloseRem",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
							  	
								var $row = $("#tablaDesgloseRem").arqmasterdetail("addNewRow");
								$('.desgloseRem', $row).val(dataset.values[i]["desgloseRem"]).change();
								$('.desgloseRemMonto', $row).val(dataset.values[i]["desgloseRemMonto"].replace(/\./g,'')).change();
								$('.desgloseRem', $row).arqzoom('disabled', true);
								$('.desgloseRem-fluigicon-trash', $row).hide();
								
							}	
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar el desglose de la remuneración.');
						});
						
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaBenef",
									  _finalValue: "tablaBenef",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {
							
							$("#tablaBeneficios tr:gt(1)").each(function(){
								for (var i = 0; i < dataset.values.length; i++) {
									if ($('.beneficios', $(this)).val() == dataset.values[i]["beneficios"]){
										if(dataset.values[i]["beneficiosChck"] == 'true'){
											$('.beneficiosChck', $(this)).prop('checked', true); 
										}
										break;
									}
								}
							});
							
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar los beneficios.');
						});
						
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
									{
										_field: "metadata#active",
										_initialValue: "true",
										_finalValue: "true",
										_type: 1
									},{
										_field: "documentid",
										_initialValue: res[lista[1]],
										_finalValue: res[lista[1]],
										_type: 1
									},{
										_field: "version",
										_initialValue: res[lista[2]],
										_finalValue: res[lista[2]],
										_type: 1
									},{
										_field: "tablename",
										_initialValue: "tablaEquipamientoReq",
										_finalValue: "tablaEquipamientoReq",
										_type: 1
									}
								]
							})
						})
						.done(function(dataset) {
							
							$("#tablaEquipamientoReq tr:gt(1)").each(function(){
								for (var i = 0; i < dataset.values.length; i++) {
									if ($('.dispositivo', $(this)).val() == dataset.values[i]["dispositivo"]){
										if(dataset.values[i]["dispositivoChck"]  == 'true'){
											$('.dispositivoChck', $(this)).prop('checked', true).change();
											$('.existente', $(this)).val(dataset.values[i]["existente"]).change();
											$('.correspondeA', $(this)).val(dataset.values[i]["correspondeA"]).change();											
										}
										break;
									}
								}
							});
							
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar el equipamiento requerido.');
						});
						
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
									{
										_field: "metadata#active",
										_initialValue: "true",
										_finalValue: "true",
										_type: 1
									},{
										_field: "documentid",
										_initialValue: res[lista[1]],
										_finalValue: res[lista[1]],
										_type: 1
									},{
										_field: "version",
										_initialValue: res[lista[2]],
										_finalValue: res[lista[2]],
										_type: 1
									},{
										_field: "tablename",
										_initialValue: "tablaAplicaciones",
										_finalValue: "tablaAplicaciones",
										_type: 1
									}
								]
							})
						})
						.done(function(dataset) {
							
							$("#tablaAplicaciones tr:gt(1)").each(function(){
								for (var i = 0; i < dataset.values.length; i++) {
									if ($('.aplicacion', $(this)).val() == dataset.values[i]["aplicacion"]){
										if(dataset.values[i]["aplicacionChck"]  == 'true'){
											$('.aplicacionChck', $(this)).prop('checked', true).change();
										}
										break;
									}
								}
							});
							
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar las aplicaciones.');
						});
						
						$("#tablaRutasCarpetas tr:gt(1)").remove();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'RAF05-FormularioPrincipal',
								constraints: [
								   {
									  _field: "metadata#active",
									  _initialValue: "true",
									  _finalValue: "true",
									  _type: 1
								   },{
									  _field: "documentid",
									  _initialValue: res[lista[1]],
									  _finalValue: res[lista[1]],
									  _type: 1
								   },{
									  _field: "version",
									  _initialValue: res[lista[2]],
									  _finalValue: res[lista[2]],
									  _type: 1
								   },{
									  _field: "tablename",
									  _initialValue: "tablaRutasCarpetas",
									  _finalValue: "tablaRutasCarpetas",
									  _type: 1
								   }
								]
							})
						})
						.done(function(dataset) {	
							for (var i = 0; i < dataset.values.length; i++) {
							  	
								var $row = $("#tablaRutasCarpetas").arqmasterdetail("addNewRow");
								$('.rutaCarpeta', $row).val(dataset.values[i]["rutaCarpeta"]).change();
								$('.tipoRuta', $row).val(dataset.values[i]["tipoRuta"]).change();
			
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar las rutas a carpetas.');
						});
						
					}
				
					$('#arqForm').parsley().validate();
					
				},
				displayKey: function(res){
					return	res['nroSolicitud'] + ' - ' + res['codigoBusqueda'] + ' - ' + res['nombreBusqueda'];
				},
				clean: function(res) {
		
					$('input[type=text], textarea, select').val('').change();					
					$(':checkbox').prop('checked',false).change();
					$('#personalACargo').val(0).change();
					$('.programasInformaticaNivel').prop('checked', false); 
					$("#tablaQuienesEntrevistan tr:gt(1)").remove();
					$("#tablaSugerencias tr:gt(1)").remove();
					$("#tablaTareasOrdenPrioridad tr:gt(1)").remove();
					$("#tablaCarreras tr:gt(1)").remove();
					$("#tablaIdiomas tr:gt(1)").remove();
					$("#tablaProgramasInformatica tr:gt(1)").remove();
					$("#tablaDetalleCompetencias tr:gt(1)").remove();
					$("#tablaDesgloseRem tr:gt(1)").remove();
					$("#tablaEquipamientoReq tr:gt(1)").remove();
					$("#tablaAplicaciones tr:gt(1)").remove();
					$("#tablaRutasCarpetas tr:gt(1)").remove();
					$("#tablaBeneficios tr:gt(1)").remove();
					cargarTablaEquipamientoReq();
					cargarTablaAplicaciones();
					cargarTablaBeneficios();
					
					$(':input').each(function(){
						$(this).parsley().reset();
					});
				}
			});
			
			$('#puesto').arqzoom({
				datasetId: 'RAF05-puestos',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
					$('#puestoNuevo').prop('checked', false).change();
					$('#nombrePuestoNuevo').val('').change();
				},
			});
			
			$('#categoria').arqzoom({
				datasetId: 'RAF05-categorias',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#gerencia').arqzoom({
				datasetId: 'RAF05-gerencias',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#area').arqzoom({
				datasetId: 'RAF05-areas',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#sector').arqzoom({
				datasetId: 'RAF05-sectores',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#subsector').arqzoom({
				datasetId: 'RAF05-subsectores',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#aperturaPorSector').arqzoom({
				datasetId: 'RAF05-aperturasPorSector',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#lineaEspecialidad').arqzoom({
				datasetId: 'RAF05-lineasEspecialidad',
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				resultFields: ['descripcion'],
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#reportaa').arqzoom({
				datasetId: 'RAF05-empleados',
				resultFields: ['nombre', 'puesto', 'categoria'],
//				searchField: 'nombre',
				filterValues: function(searchValue){
					return [ 
					    {
					    	"_field" : "nombre",
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 1, //MUST
					    	"_likeSearch": true
					    },
				    ];
				},
				template: {
					row: [
					    {field: 'nombre', header: 'Nombre'},
					    {field: 'puesto', header: 'Puesto'},
					],
				},
//				searchField: 'nombre',
				callback: function(res){
					$('#categoriaReportaa').val(res['categoria']).change();
					$('#puestoReportaa').val(res['puesto']).change();
				},
				displayKey: function(res){
					return res['nombre'];
				},
				clean: function(res) {
					$('#categoriaReportaa').val('').change();
					$('#puestoReportaa').val('').change();
				}
			});
			
			$('#nombreReemplazo').arqzoom({
				datasetId: 'RAF05-empleados',
				resultFields: ['nombre', 'puesto'],
				searchField: 'nombre',
				template: {
					row: [
					    {field: 'nombre', header: 'Nombre'},
					    {field: 'puesto', header: 'Puesto'},
					],
				},
				searchField: 'nombre',
				displayKey: function(res){
					return res['nombre'];
				},
				clean: function(res) {
				}
			});
			
			$('#sede').arqzoom({
				datasetId: 'RAF05-Sedes',
				resultFields: ['descripcion'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#obraSocial').arqzoom({
				datasetId: 'RAF05-TiposCobertura',
				resultFields: ['obraSocial', 'planTC'],
				template: {
					row: [
					    {field: 'obraSocial', header: 'Obra Social'},
					    {field: 'planTC', header: 'Plan'},
					],
				},
				searchField: 'obraSocial',
				callback: function(res){
					$('#planRemu').val(res['planTC'] ).change();
				},
				displayKey: function(res){
					return res['obraSocial'];
				},
				clean: function(res) {
					$('#planRemu').val('').change();
				}
			});
			
			$('#nivel').arqzoom({
				datasetId: 'RAF05-CompetenciasPorNivel-sorted',
				resultFields: ['nivel', 'documentid', 'version'],
				template: {
					row: [
					    {field: 'nivel'},
					],
				},
				searchField: 'nivel',
				filterValues: {'metadata#active': 'true'}, 
				callback: function(res){
					
					//$('#nivel').val('').change();
					//remueve la tabla de tablaDetalleCompetencias
					$("#tablaDetalleCompetencias tr:gt(1)").remove();
			
					$.ajax({
						type: "POST",
						url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
						contentType: "application/json; charset=utf-8",
						dataType: "json",				
						data: JSON.stringify({
							name : 'RAF05-CompetenciasPorNivel',
							constraints: [
							   {
								  _field: "metadata#active",
								  _initialValue: "true",
								  _finalValue: "true",
								  _type: 1
							   },{
								  _field: "documentid",
								  _initialValue: res['documentid'],
								  _finalValue: res['documentid'],
								  _type: 1
							   },{
								  _field: "version",
								  _initialValue: res['version'],
								  _finalValue: res['version'],
								  _type: 1
							   },{
								  _field: "tablename",
								  _initialValue: "tablaComp",
								  _finalValue: "tablaComp",
								  _type: 1
							   }
							]
						})
					})
					.done(function(dataset) {	
						
						for (var i = 0; i < dataset.values.length; i++) {
	
						  	var competencia = dataset.values[i]["competencia"];
						  	var nivelPorDefecto = dataset.values[i]["nivelPorDefecto"];
						  	
							wdkAddChild('tablaDetalleComp');
							
							var subindice = $('#tablaDetalleCompetencias tr:last input').attr('id').split("___");
							var row = subindice[1];	
							
							$("#tablaDetalleCompetencias tr:last input[name='competencia___" + row + "']").val(competencia);
							$("#tablaDetalleCompetencias tr:last select[name='nivelCompetencia___" + row + "']").val(nivelPorDefecto);
		
						}
						
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						alert('No se pudo cargar las competencias por nivel.');
					});	
					
				},
				displayKey: function(res){
					return res['nivel'];	
				},
				clean: function(field) {
					//remueve la tabla de tablaDetalleCompetencias
					$("#tablaDetalleCompetencias tr:gt(1)").remove();
				}
			});
			
			$('#convenio').arqzoom({
				datasetId: 'RAF05-convenios',
				resultFields: ['descripcion'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				callback: function(res){
					$('#convenioNumero').val(res['numero'] ).change();
					$('#categoriaConvenio').arqzoom("option", "filterValues")['convenio_numero']= $('#convenioNumero').val();
					
				},
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
					$('#convenioNumero').val('').change();
					$('#categoriaConvenio').val('').change();
				}
			});
			
			$('#categoriaConvenio').arqzoom({
				datasetId: 'RAF05-categoriasConvenio',
				resultFields: ['descripcion'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				filterValues: {
					'convenio_numero': $('#convenioNumero').val()
				},
				searchField: 'descripcion',
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			
			$('#primerAutorizante').arqzoom({
				datasetId: 'RAF05-jefes',
				resultFields: ['matricula','nombre', 'email'],
				template: {
					row: [
					    { field: 'matricula', header: 'Matrícula'},
					    { field: 'nombre', header: 'Nombre'},
					    { field: 'email', header: 'Email'},
					],
				},
				searchField: 'nombre',
				callback: function(res){
					$('#primerAutorizanteMatricula').val(res['matricula'] ).change();
				},
				displayKey: function(res){
					return res['nombre'];
				},
				clean: function(field) {
					$('#primerAutorizanteMatricula').val('').change();
				}
			});
			
			$('#segundoAutorizante').arqzoom({
				datasetId: 'RAF05-gerentesN2',
				resultFields: ['matricula','nombre', 'email'],
				template: {
					row: [
					    { field: 'matricula', header: 'Matrícula'},
					    { field: 'nombre', header: 'Nombre'},
					    { field: 'email', header: 'Email'},
					],
				},
				searchField: 'nombre',
				callback: function(res){
					$('#segundoAutorizanteMatricula').val(res['matricula'] ).change();
				},
				displayKey: function(res){
					return res['nombre'];
				},
				clean: function(field) {
					$('#segundoAutorizanteMatricula').val('').change();
				}
			});
			
			$('#gerenteN1').arqzoom({
				datasetId: 'RAF05-gerentesN1',
				resultFields: ['matricula','nombre', 'email'],
				template: {
					row: [
					    { field: 'matricula', header: 'Matrícula'},
					    { field: 'nombre', header: 'Nombre'},
					    { field: 'email', header: 'Email'},
					],
				},
				searchField: 'nombre',
				callback: function(res){
					$('#gerenteN1Matricula').val(res['matricula'] ).change();
				},
				displayKey: function(res){
					return res['nombre'];
				},
				clean: function(field) {
					$('#gerenteN1Matricula').val('').change();
				}
			});
			
			$('#centroCosto').arqzoom({
				datasetId: 'RAF05-centrosCosto',
				resultFields: ['descripcion'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			$('#zona').arqzoom({
				datasetId: 'RAF05-zonas',
				resultFields: ['descripcion'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
				}
			});
			
			
			$('#puestoNuevo').change(function () {			

				if(this.checked){
					$('#puesto').val('').change();
					$('#puesto').arqzoom('disabled', true);
					$('#nombrePuestoNuevo').prop('disabled', false);
					$('#nombrePuestoNuevo').attr('data-parsley-required', 'true');
				}else{
					$('#puesto').arqzoom('disabled', false);
					$('#nombrePuestoNuevo').attr('data-parsley-required', 'false');
					$('#nombrePuestoNuevo').prop('disabled', true);
					$('#nombrePuestoNuevo').val('').change();
				}
				
				$('#nombrePuestoNuevo').parsley().validate();
			});
			$('#puestoNuevo').change();
			
			
			$('.apm, .apf').hide();
			
			habilitarCampos('onEdit');
			
			$('#ingresoPersonal').change(function(){
				$('#nivel').val('').change();
				//remueve la tabla de tablaDetalleCompetencias
				$("#tablaDetalleCompetencias tr:gt(1)").remove();
			});
			
					
			$('#tipoPosicion').change(function(){
				
				adaptTipoPosicion({clean:true});
				
				$('#perfilPuestoFields :input:not(.tt-input, .tt-hint, [id^="__arqzoom__"])').each(function(){
					$(this).parsley().validate();
				});
				
			});
			adaptTipoPosicion({clean:false});	
			

			
			$('#efectivoTemporario').change(function () { 
				var efectivoTemporario = $(this).val();

				if(efectivoTemporario == 'temporario'){
					$('#cantidadMeses').prop('readonly', false);
				}else{
					$('#cantidadMeses').val('').change();
					$('#cantidadMeses').prop('readonly', true);
				}
				
			});
			$('#efectivoTemporario').change();
			
			$('#accesoBuzones').change(function() {
				var $detalleBuzones = $('#detalleBuzones');
				if($(this).prop('checked')) {
					$detalleBuzones.prop('disabled',false);
					$detalleBuzones.attr('data-parsley-required', 'true');
				} else {
					$detalleBuzones.removeAttr('data-parsley-required').parsley().reset();
					$detalleBuzones.prop('disabled',true);
					$detalleBuzones.val('').change();
				}
			});
			$('#accesoBuzones').change();
			
			$('#usuarioExistenteTelef').arqzoom({
				datasetId: 'RAF05-empleados',
				resultFields: ['nombre', 'puesto'],
				searchField: 'nombre',
				template: {
					row: [
					    { field: 'nombre', header: 'Nombre'},
					    { field: 'puesto', header: 'Puesto'}
					],
					width: '200%'
				},
				searchField: 'nombre',
				displayKey: function(res){
					return res['nombre'];
				},			
			});
			$('#tipoInterno').change(function() {
				var $usuarioExistenteTelef = $('#usuarioExistenteTelef');
				if($(this).val()=='internoExistente') {
					$usuarioExistenteTelef.arqzoom('disabled',false);
					$usuarioExistenteTelef.attr('data-parsley-required', 'true');
				} else {
					$usuarioExistenteTelef.arqzoom('disabled',true);
					$usuarioExistenteTelef.removeAttr('data-parsley-required').parsley().reset();
					$usuarioExistenteTelef.val('').change();
				}
			});
			$('#tipoInterno').change();
			
//			var count = 0;
//			$('.nivelEstudio').change(function () { 
//
//				if($('input.nivelEstudio:checked').val()){
//					count++;
//					$('#nivelEstudioSeleccionados').val(count);
//				}
//				
//			});
//			$('.nivelEstudio').change();
			
			
			//arqmasterdetail
			
			$("#tablaQuienesEntrevistan").arqmasterdetail({
				buttonNewRow: "#btnNuevoQuienesEntrevistan",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;		
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
					
					//convierteAMayusculas();
					
					$('.quienesEntrevistan', $tr).arqzoom({
						datasetId: 'RAF05-empleados',
						resultFields: ['nombre', 'puesto'],
						searchField: 'nombre',
						template: {
							row: [
							    { field: 'nombre', header: 'Nombre'},
							    { field: 'puesto', header: 'Puesto'}
							],
						},
						searchField: 'nombre',
						displayKey: function(res){
							return res['nombre'];
						},			
					});
				}	
			});	
			
			$("#tablaSugerencias").arqmasterdetail({
				buttonNewRow: "#btnNuevaSugerencia",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;	
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
					$('.sugerencia', $tr).arqzoom({
						datasetId: 'RAF05-empleados',
						resultFields: ['nombre', 'puesto'],
						searchField: 'nombre',
						template: {
							row: [
							    {field: 'nombre', header: 'Nombre'},
							    {field: 'puesto', header: 'Puesto'},
							],
						},
						searchField: 'nombre',
						displayKey: function(res){
							return res['nombre'];
						},
						clean: function(res) {
						}
					});
				}	
			});
			
			$("#tablaTareasOrdenPrioridad").arqmasterdetail({
				buttonNewRow: "#btnNuevoTareasOrdenPrioridad",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;		
				},
				afterDeleteRow: function($tr, index){
					
					//decrementa si borro alguna tarea
					if($("#tablaTareasOrdenPrioridad tr:gt(1)").length >= 0){
						
						var count = $("#tablaTareasOrdenPrioridad tr:gt(1)").length;
						$("#cantidadTareasOrdenPrioridad").val(count--);
					}
				
				},
				onCustomizeRow: function($tr, index){
					
					//convierteAMayusculas();
					
					//Se validará que se hayan cargado al menos 4 tareas
					cantidadTareas();
					
				}	
			});		
			 
			$("#tablaCarreras").arqmasterdetail({
				buttonNewRow: "#btnNuevoCarrera",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;	
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
					$('.carrera', $tr).arqzoom({
						datasetId: 'RAF05-carreras',
						template: {
							row: [
							    { field: 'descripcion'},
							],
						},
						searchField: 'descripcion',
						resultFields: ['descripcion'],
						displayKey: function(res){
							return res['descripcion'];
						},
						clean: function(res) {
						}
					});
				}	
			});
			
			$("#tablaIdiomas").arqmasterdetail({
				buttonNewRow: "#btnNuevoIdiomas",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;		
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
					
					//convierteAMayusculas();
					
				}	
			});	
			
			$("#tablaProgramasInformatica").arqmasterdetail({
				buttonNewRow: "#btnNuevoprogramasInformatica",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;		
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
					
					$('.programasInformatica', $tr).arqzoom({
						datasetId: 'RAF05-ProgramasInformatica',
						resultFields: ['nombre'],
						filterValues: {'metadata#active': 'true'}, 
						template: {
							row: [
							    { field: 'nombre'},
							],
						},
						searchField: 'nombre',
						displayKey: function(res){
							return res['nombre'];
						},
						clean: function(res) {
						}
					});
				}	
			});
			
			$("#remuneracionBruta").arqnum({
				decimals: 2,
				prefix: '$'
			});
			$("#tablaDesgloseRem").arqmasterdetail({
				buttonNewRow: "#btnNuevoDesgloseRem",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;	
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
					$('.desgloseRem', $tr).arqzoom({
						datasetId: 'RAF05-DesgloseRemuneraciones',
						template: {
							row: [
							    { field: 'descripcion'},
							],
						},
						searchField: 'descripcion',
						resultFields: ['descripcion'],
						displayKey: function(res){
							return res['descripcion'];
						},
						clean: function(res) {
						}
					});
					$('.desgloseRemMonto', $tr).arqnum({
						decimals: 2,
						prefix: '$'
					});
				}
			});
			
			$("#tablaRutasCarpetas").arqmasterdetail({
				buttonNewRow: "#btnNuevaRutaCarpeta",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					ret = confirm("Confirma eliminación?");
					return ret;	
				},
				afterDeleteRow: function($tr, index){
				},
				onCustomizeRow: function($tr, index){
				}
			});
			
			cargarTablaEquipamientoReq();
			cargarTablaAplicaciones();
			cargarTablaBeneficios();
		},
		
		bpm: {
			"Inicio Solicitud": {
				task: [0, 8],  
				custom: function() {
													
					$('#fechaRelevamientoPerfil, #fechaIngresoNecesaria, #categoria, #gerencia, #area, #sector, #subsector, #reportaa').attr('data-parsley-required','true');
					$('#tipoPosicion, #efectivoTemporario, #personalACargo, #franjaEdad, #genero, #gerenteGeneral, #nombreBusqueda').attr('data-parsley-required','true');
										
					$('#ingresoPersonal').html('');
					for (var opt in arqFormOpts.ingresoPersonalOpts){
						$('#ingresoPersonal').append('<option value="'+opt+'">'+arqFormOpts.ingresoPersonalOpts[opt]+'</option>');
					}
					if (Object.keys(arqFormOpts.ingresoPersonalOpts).length <= 1) $('#ingresoPersonal').closest('.form-group').hide();
					if (arqFormOpts.ingresoPersonalDefault) {
						$('#ingresoPersonal').val(arqFormOpts.ingresoPersonalDefault);
					} else {
						$('#ingresoPersonal').change();
					}
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
					
				},
				'otherwise': function() {
					$('#ingresoPersonal').prop('disabled', true);
					$('input[name=historialBusquedas]').prop('disabled', true);
					$('#historialBusquedas').arqzoom('disabled', true);
				}
		
			},"Revisar y relevar Perfil": {
				task: [9],  
				custom: function() {
					
					$('#codigoBusqueda, #nombreBusqueda').attr('data-parsley-required','true');
					$('#fechaRelevamientoPerfil, #fechaIngresoNecesaria, #categoria, #gerencia, #area, #sector, #subsector, #reportaa').attr('data-parsley-required','true');
					$('#tipoPosicion, #efectivoTemporario, #personalACargo, #franjaEdad, #genero, #gerenteGeneral').attr('data-parsley-required','true');
					
					$('#nombrePuestoNuevo').change();
					$('input[name=historialBusquedas]').prop('disabled', true);
					$('#historialBusquedas').prop('disabled',true);
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', false);
					$('#gerenteGeneral').prop('disabled', false);
					
				}
		
			},
			"Completar Remuneraciones y Beneficios": {
				task: [10],  
				custom: function() {
					
					//todo deshabilitado
					//deshabilitarTodo();
					//$('.fluigicon-trash').hide();
					
					//solo esta seccion habilitada
					$('#remuneracionBruta').attr('data-parsley-required','true');
					$('#remuneracionBruta').prop('disabled', false);
					//$('.seccionBeneficios').prop('disabled', false);
					$('#convenio').arqzoom('disabled', false);
					$('#categoriaConvenio').arqzoom('disabled', false);
					$('#obraSocial').arqzoom('disabled', false);
					$('#obraSocial').change();
					$('.beneficiosChck').prop('disabled', false);					
					$('#primerAutorizante').prop('disabled', false);
					$('#segundoAutorizante').prop('disabled', false);
					$('#gerenteN1').prop('disabled', false);
					$('#gerenteGeneral').prop('disabled', false);
					$('#comentariosBeneficios').prop('disabled', false);
					$('.desgloseRem, .desgloseRemMonto').prop('disabled', false);
					$('#btnNuevoDesgloseRem').prop('disabled', false);
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
										
				},
				'otherwise': function() {
					//esta seccion se deshabilitada para todas las tareas menos la 10
					$('.seccionBeneficios').prop('disabled', true);
					$('#remuneracionBruta').attr('data-parsley-required','false');
					$('.desgloseRem:visible').arqzoom('disabled', true);
					$('#convenio').arqzoom('disabled', true);
					$('#categoriaConvenio').arqzoom('disabled', true);
					$('#obraSocial').arqzoom('disabled', true);
					$('#nombrePuestoNuevo').change();
					$('.beneficiosChck').prop('disabled', true);
				}
			
			},
			"Revisar y confirmar Perfil": {
				task: [11],  
				custom: function() {
					
					$('#codigoBusqueda, #nombreBusqueda').attr('data-parsley-required','true');
					$('#fechaRelevamientoPerfil, #fechaIngresoNecesaria, #categoria, #gerencia, #area, #sector, #subsector, #reportaa').attr('data-parsley-required','true');
					$('#tipoPosicion, #efectivoTemporario, #personalACargo, #franjaEdad, #gerenteGeneral').attr('data-parsley-required','true');

					$('input[name=historialBusquedas]').prop('disabled', true);
					$('#historialBusquedas').prop('disabled', true);
												
					$('#primerAutorizante').prop('disabled', false);
					$('#segundoAutorizante').prop('disabled', false);
					$('#gerenteN1').prop('disabled', false);
					$('input[name=gerenteGeneral]').prop('disabled', false);
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', false);
					$('#gerenteGeneral').prop('disabled', false);
					$('#gerenteGeneral').attr('data-parsley-required','true');

				}
		
			},
			"Circuito Aprobadores": {
				task: [13, 18, 19, 22],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.fluigicon-trash').hide();
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);

				}
		
			},
			"Aprobar Solicitud de Puesto (Gte. Gral.)": {
				task: [23],  
				custom: function() {
					
					//todo oculto
					$('#arqForm .form-group').hide();
					$('.leyenda').hide();
					$('.subsecciones').hide();
					$('.reportaaBuscar').hide();
					$('.seccionBeneficios').hide();
												
					//solo mostrar estos campos deshabilitados
					deshabilitarTodo();
					
					//Mostrar puesto, puesto nuevo, nombrePuestoNuevo,Gerencia, reportaa, tipoPosicion, efectivoTemporario, pea, sede
					$('.aprobacionGteGral').show();
					
					if($('#ingresoPersonal').val() == 'APM' || $('#ingresoPersonal').val() == 'APF'){
						//mostrar lineaEspecialidad, zona
						$('.aprobacionGteGralAPMAPF').show();
					}
		
					if($('#tipoPosicion').val() == 'reemplazo'){
						$('.nombreReemplazo').show();
					}
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
					
					var mostrarDetalleGteGral = function() {
						$('#arqForm .form-group').show();
						var ingresoPersonal = $('#ingresoPersonal').val();
						$('.leyenda').show();
						$('.subsecciones').show();
						$('.reportaaBuscar').show();
						$('.subsecciones').show();	
						$('.seccionBeneficios').show();
						if(ingresoPersonal == 'PE') {

							$('.pe').show();
							$('.apm, .apf').hide();
							$('.apmapf').hide();
							
						} else if(ingresoPersonal == 'APM') {
							
							$('.apm').show();
							$('.apmapf').show();
							$('.apf, .pe').hide();
							
						} else if(ingresoPersonal == 'APF') {
							
							$('.apf').show();
							$('.apmapf').show();
							$('.apm, .pe').hide();
							
						}
					}
					$('#btnVerDetalle').prop('disabled', false);
					$('#btnVerDetalle').css('display', '');
					var verDetalle = false;					
					$('#btnVerDetalle').show().click(function() {
						verDetalle = !verDetalle;
						if(verDetalle) {
							mostrarDetalleGteGral();
							$('#btnVerDetalle').text("Ocultar detalle");
						} else {
							$('#arqForm .form-group').hide();
							$('.leyenda').hide();
							$('.subsecciones').hide();
							$('.reportaaBuscar').hide();
							$('.seccionBeneficios').hide();
							$('#btnVerDetalle').text("Ver detalle");
							//Mostrar puesto, puesto nuevo, nombrePuestoNuevo,Gerencia, reportaa, tipoPosicion, efectivoTemporario, pea, sede
							$('.aprobacionGteGral').show();
							
							if($('#ingresoPersonal').val() == 'APM' || $('#ingresoPersonal').val() == 'APF'){
								//mostrar lineaEspecialidad, zona
								$('.aprobacionGteGralAPMAPF').show();
							}
				
							if($('#tipoPosicion').val() == 'reemplazo'){
								$('.nombreReemplazo').show();
							}
							
							$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
							$('#gerenteGeneral').prop('disabled', true);
						}
					});
					
				}
		
			},
			"Cancelar Solicitud de Puesto": {
				task: [20],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.observacionesGralesProceso').prop('disabled', false);
					
					$('#primerAutorizante').prop('disabled', true);
					$('#segundoAutorizante').prop('disabled', true);
					$('#gerenteN1').prop('disabled', true);
					$('input[name=gerenteGeneral]').prop('disabled', true);
					$('.fluigicon-trash').hide();

					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
				}
		
			},
			"Realizar Proceso de Selección": {
				task: [24],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.observacionesGralesProceso').prop('disabled', false);
					$('.confirmaCierre').prop('disabled', false);
					
					$('#primerAutorizante').prop('disabled', true);
					$('#segundoAutorizante').prop('disabled', true);
					$('#gerenteN1').prop('disabled', true);
					$('input[name=gerenteGeneral]').prop('disabled', 'disabled');
					$('.fluigicon-trash').hide();
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);

				},
				'otherwise': function() {
					$('#divConfirmaCierre').hide();
				}
		
			},
			"Suspender Solicitud de Puesto": {
				task: [58],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.observacionesGralesProceso').prop('disabled', false);
					
					$('#primerAutorizante').prop('disabled', true);
					$('#segundoAutorizante').prop('disabled', true);
					$('#gerenteN1').prop('disabled', true);
					$('input[name=gerenteGeneral]').prop('disabled', true);
					$('.fluigicon-trash').hide();
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);

				}
		
			},
			"otherwise": { 
				custom: function() {
					// Si no aplica ninguna de las tareas. 
					deshabilitarTodo();
					$('.fluigicon-trash').hide();
				}
			}
		},
		
		ged: function() {
		}
	}
};

function initTables(){
	$("#tablaDetalleCompetencias").arqmasterdetail();
	$("#tablaEquipamientoReq").arqmasterdetail();
	$("#tablaEquipamientoReq tr:gt(1)").each(function(){
		customizacionesEquipamientoReq($(this));
	})
	$("#tablaAplicaciones").arqmasterdetail();
	$("#tablaBeneficios").arqmasterdetail();
}

function deshabilitarTodo(){
	$('#arqForm :input:not(.tt-input, .tt-hint, [id^="__arqzoom__"])').each(function(){
		if($(this).arqzoom('instance')){
			$(this).arqzoom('disabled', true);
		} else {
			$(this).prop('disabled', true);
		}
	});
}

function cantidadTareas(){
	
	var count = 0;

	$("#tablaTareasOrdenPrioridad tr:gt(1)").each(function (index, value){
		
		if($("#tablaTareasOrdenPrioridad tr input[name='detalleAccion" + index+ "']").val() != "" ){
			count++;
		}
	
	});
	$("#cantidadTareasOrdenPrioridad").val(count);
	
}

function convierteAMayusculas(){
	
	//Convierte todo a mayusculas
	$(':input:not(select)').blur(function() {
      	this.value = this.value.toUpperCase(); 
	 });
}

function adaptTipoPosicion(opts){
	var tipoPosicion = $('#tipoPosicion').val();
	
	if(tipoPosicion == 'reemplazo'){
		$('#nombreReemplazo').attr('data-parsley-required', 'true');
		$('#nombreReemplazo').arqzoom('disabled', false);
		
		$('#motivoReemplazo').attr('data-parsley-required', 'true');
		$('#motivoReemplazo').prop('disabled', false);
		
		$('#motivoPuestoNuevo').attr('data-parsley-required', 'false');
		$('#motivoPuestoNuevo').prop('disabled',true);
	}else if(tipoPosicion == 'puestoNuevo'){
		$('#nombreReemplazo').attr('data-parsley-required', 'false');
		$('#nombreReemplazo').arqzoom('disabled', true);
		
		$('#motivoReemplazo').attr('data-parsley-required', 'false');
		$('#motivoReemplazo').prop('disabled', true);
	
		$('#motivoPuestoNuevo').attr('data-parsley-required', 'true');
		$('#motivoPuestoNuevo').prop('disabled', false);
	}else{
		$('#nombreReemplazo').attr('data-parsley-required', 'false');
		$('#nombreReemplazo').arqzoom('disabled', true);
		
		$('#motivoReemplazo').attr('data-parsley-required', 'false');
		$('#motivoReemplazo').prop('disabled', true);
		
		$('#motivoPuestoNuevo').attr('data-parsley-required', 'false');
		$('#motivoPuestoNuevo').prop('disabled',true);	
	}
	
	if(opts.clean){
		$('#nombreReemplazo').val('').change();
		$('#motivoReemplazo').val('');
		$('#motivoPuestoNuevo').val('');			
	}
}

function cargarTablaBeneficios(){
	
	if($("#tablaBeneficios tr:gt(1)").length == 0){
		
		$.ajax({
			type: "POST",
			url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
			contentType: "application/json; charset=utf-8",
			dataType: "json",				
			data: JSON.stringify({
				name : 'RAF05-Beneficios',
				constraints: [
				   {
					  _field: "metadata#active",
					  _initialValue: "true",
					  _finalValue: "true",
					  _type: 1
				   }
				]
			})
		})
		.done(function(dataset) {	
			if(dataset.values.length > 0) {
				for(var i = 0; i < dataset.values.length; i++) {
				
					var $row = $("#tablaBeneficios").arqmasterdetail("addNewRow");
					$('.beneficios', $row).val(dataset.values[i]["descripcion"]);
					
				}
				
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert('No se pudo cargar los beneficios.');
		});	
	}
}

function cargarTablaEquipamientoReq(){
	if($("#tablaEquipamientoReq tr:gt(1)").length == 0){
		$.ajax({
			type: "POST",
			url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
			contentType: "application/json; charset=utf-8",
			dataType: "json",				
			data: JSON.stringify({
				name : 'RAF05-DispositivosElectronicos',
				constraints: [
				   {
					  _field: "metadata#active",
					  _initialValue: "true",
					  _finalValue: "true",
					  _type: 1
				   }
				]
			})
		})
		.done(function(dataset) {	
			if(dataset.values.length > 0) {
				for(var i = 0; i < dataset.values.length; i++) {
				
					var $row = $("#tablaEquipamientoReq").arqmasterdetail("addNewRow");
					$('.dispositivo', $row).val(dataset.values[i]["descripcion"]);
					$('.demoraCompra', $row).val(dataset.values[i]["demoraCompra"]);
					customizacionesEquipamientoReq($row);
				}
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert('No se pudo cargar el equipamiento requerido.');
		});	
	}
}

function customizacionesEquipamientoReq($row) {
	$('.existente', $row).prop('disabled', true);
	$('.correspondeA', $row).arqzoom({
		datasetId: 'RAF05-empleados',
		resultFields: ['nombre', 'puesto'],
		searchField: 'nombre',
		template: {
			row: [
			    { field: 'nombre', header: 'Nombre'},
			    { field: 'puesto', header: 'Puesto'}
			],
			width: '500%'
		},
		searchField: 'nombre',
		displayKey: function(res){
			return res['nombre'];
		},			
	});
	$('.correspondeA', $row).arqzoom('disabled', true);
	$('.dispositivoChck', $row).change(function(){
		var $existente = $('.existente', $row);
		if($(this).prop('checked')){
			$existente.prop('disabled', false);
			$existente.attr('data-parsley-required', 'true');			
		} else {
			$existente.removeAttr('data-parsley-required').parsley().reset();
			$existente.prop('disabled', true);
			$existente.val('').change();
		}
	});
	$('.existente', $row).change(function(){
		var $correspondeA = $('.correspondeA', $row);
		if($(this).val()=='SI'){
			$correspondeA.arqzoom('disabled', false);
			$correspondeA.attr('data-parsley-required', 'true');
		} else {
			$correspondeA.removeAttr('data-parsley-required').parsley().reset();
			$correspondeA.arqzoom('disabled', true);
			$correspondeA.val('').change();
		}
	});
}

function cargarTablaAplicaciones(){
	if($("#tablaAplicaciones tr:gt(1)").length == 0){
		$.ajax({
			type: "POST",
			url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
			contentType: "application/json; charset=utf-8",
			dataType: "json",				
			data: JSON.stringify({
				name : 'PORTAL-Aplicaciones',
				constraints: [
				   {
					  _field: "metadata#active",
					  _initialValue: "true",
					  _finalValue: "true",
					  _type: 1
				   },
				   {
					  _field: "visibleLegajo",
					  _initialValue: "SI",
					  _finalValue: "SI",
					  _type: 1
				   }
				]
			})
		})
		.done(function(dataset) {	
			if(dataset.values.length > 0) {
				for(var i = 0; i < dataset.values.length; i++) {
				
					var $row = $("#tablaAplicaciones").arqmasterdetail("addNewRow");
					$('.aplicacion', $row).val(dataset.values[i]["title"]);
					
				}
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert('No se pudo cargar las aplicaciones.');
		});	
	}
}

function habilitarCampos(modo){
	$('#ingresoPersonal').change(function(){
		
		var ingresoPersonal;
				
		if(modo == 'onEdit'){
			ingresoPersonal = $(this).val();
		}else{
			ingresoPersonal = $(this).html();
		}
		
		$('#planRemu').prop('disabled',true);	
		
		if(ingresoPersonal == 'PE' || ingresoPersonal == 'Puesto Estándar'){

			$('.pe').show();
			$('.apm, .apf').hide();
			$('.apmapf').hide();
			
			$('#lineaEspecialidad').attr('data-parsley-required', 'false');
			$('#zona').attr('data-parsley-required', 'false');
			$('#ciudadZonasVisitar').attr('data-parsley-required', 'false');
			$('#giras').attr('data-parsley-required', 'false');
			$('#productosManejar').attr('data-parsley-required', 'false');
			$('#visitaMedicos').attr('data-parsley-required', 'false');
			$('#visitaInstituciones').attr('data-parsley-required', 'false');
			$('#administraMuestrasMedicas').attr('data-parsley-required', 'false');
			$('#visitaFarmacias').attr('data-parsley-required', 'false');
			$('#coordinacionAccionesFidelizar').attr('data-parsley-required', 'false');
			$('#analisisInformacionAuditoria').attr('data-parsley-required', 'false');
			$('#tareasAdministrativasVarias').attr('data-parsley-required', 'false');
			$('#descExperienciaLaboralReq').attr('data-parsley-required', 'true');
			$('#experienciaPreviaComoAPM').attr('data-parsley-required', 'false');
			$('#experienciaPreviaEnVentas').attr('data-parsley-required', 'false');
			$('#experienciaPreviaComoAPF').attr('data-parsley-required', 'false');
			$('#visitadoEspecialidadesMedicos').attr('data-parsley-required', 'false');
			$('#visitadoInstituciones').attr('data-parsley-required', 'false');
			$('#conocimientoLineasProductos').attr('data-parsley-required', 'false');
			$('#provengaDeLaboratorios').attr('data-parsley-required', 'false');
			$('#conozcaLasAuditorias').attr('data-parsley-required', 'false');
			$('#sede').attr('data-parsley-required', 'true');
			$('#horarioDesde').attr('data-parsley-required', 'true');
			$('#horarioHasta').attr('data-parsley-required', 'true');
			
			$('#aspectosCriticosPuesto').attr('placeholder',"Proyecto puntual, lanzamiento, viajes frecuentes, etc.");
			
			$('#lineaEspecialidad').val('').change();
			$('#zona').val('').change();
			$('#ciudadZonasVisitar').val('').change();
			$('#giras').val('').change();
			$('#productosManejar').val('').change();
			$('#coordinacionAccionesFidelizar').val('').change();
			$('#analisisInformacionAuditoria').val('').change();
			$('#tareasAdministrativasVarias').val('').change();
			$('#origenMatricula').val('').change();
			$('#experienciaPreviaComoAPM').val('').change();
			$('#experienciaPreviaEnVentas').val('').change();
			$('#experienciaPreviaComoAPF').val('').change();
			$('#visitadoEspecialidadesMedicos').val('').change();
			$('#visitadoInstituciones').val('').change();
			$('#conocimientoLineasProductos').val('').change();
			$('#provengaDeLaboratorios').val('').change();
			$('#conozcaLasAuditorias').val('').change();
			$('#otros').val('').change();
			
		}else if(ingresoPersonal == 'APM' || ingresoPersonal == 'Fuerza de Venta (APM)'){
			
			$('.apm').show();
			$('.apmapf').show();
			$('.apf, .pe').hide();
			
			$('#lineaEspecialidad').attr('data-parsley-required', 'true');
			$('#zona').attr('data-parsley-required', 'true');
			
			$('#ciudadZonasVisitar').attr('data-parsley-required', 'true');
			$('#giras').attr('data-parsley-required', 'true');
			$('#productosManejar').attr('data-parsley-required', 'true');
			$('#visitaMedicos').attr('data-parsley-required', 'true');
			$('#visitaInstituciones').attr('data-parsley-required', 'true');
			$('#administraMuestrasMedicas').attr('data-parsley-required', 'true');
			$('#visitaFarmacias').attr('data-parsley-required', 'true');
			$('#coordinacionAccionesFidelizar').attr('data-parsley-required', 'true');
			$('#analisisInformacionAuditoria').attr('data-parsley-required', 'true');
			$('#tareasAdministrativasVarias').attr('data-parsley-required', 'true');
			$('#descExperienciaLaboralReq').attr('data-parsley-required', 'false');
			$('#experienciaPreviaComoAPM').attr('data-parsley-required', 'true');
			$('#experienciaPreviaEnVentas').attr('data-parsley-required', 'false');
			$('#experienciaPreviaComoAPF').attr('data-parsley-required', 'false');
			$('#visitadoEspecialidadesMedicos').attr('data-parsley-required', 'true');
			$('#visitadoInstituciones').attr('data-parsley-required', 'true');
			$('#conocimientoLineasProductos').attr('data-parsley-required', 'true');
			$('#provengaDeLaboratorios').attr('data-parsley-required', 'true');
			$('#conozcaLasAuditorias').attr('data-parsley-required', 'true');
			$('#sede').attr('data-parsley-required', 'false');
			$('#horarioDesde').attr('data-parsley-required', 'false');
			$('#horarioHasta').attr('data-parsley-required', 'false');
			
			$('#aspectosCriticosPuesto').attr('placeholder',"Lanzamiento de producto, zona nueva, equipo nuevo, etc.");
			
			$('#descExperienciaLaboralReq').val('').change();
			$('#habilidadesNecesarias').val('').change();
			$('#clientesInternos').val('').change();
			$('#proveedoresInternos').val('').change();
			$('#contactoConClientes').val('').change();
			$('#detalleMaquinas').val('').change();
			$('#proyeccionPosicion').val('').change();
			$('#experienciaPreviaEnVentas').val('').change();
			$('#experienciaPreviaComoAPF').val('').change();
			
			$('#manejoInfoConfidencial').prop('checked', false);
			$('#esfuerzoFisico').prop('checked', false);
			$('#exposicionMaterialesQuimicos').prop('checked', false);
			
		}else if(ingresoPersonal == 'APF' || ingresoPersonal == 'Fuerza de Venta (APF)'){
			
			$('.apf').show();
			$('.apmapf').show();
			$('.apm, .pe').hide();
			
			$('#lineaEspecialidad').attr('data-parsley-required', 'false');
			
			$('#zona').attr('data-parsley-required', 'true');
			$('#ciudadZonasVisitar').attr('data-parsley-required', 'true');
			$('#giras').attr('data-parsley-required', 'true');
			$('#productosManejar').attr('data-parsley-required', 'false');
			$('#visitaMedicos').attr('data-parsley-required', 'false');
			$('#visitaInstituciones').attr('data-parsley-required', 'false');
			$('#administraMuestrasMedicas').attr('data-parsley-required', 'false');
			$('#visitaFarmacias').attr('data-parsley-required', 'false');
			$('#coordinacionAccionesFidelizar').attr('data-parsley-required', 'false');
			$('#analisisInformacionAuditoria').attr('data-parsley-required', 'false');
			$('#tareasAdministrativasVarias').attr('data-parsley-required', 'false');
			$('#descExperienciaLaboralReq').attr('data-parsley-required', 'false');
			$('#experienciaPreviaComoAPM').attr('data-parsley-required', 'false');
			$('#experienciaPreviaEnVentas').attr('data-parsley-required', 'true');
			$('#experienciaPreviaComoAPF').attr('data-parsley-required', 'true');
			$('#visitadoEspecialidadesMedicos').attr('data-parsley-required', 'false');
			$('#visitadoInstituciones').attr('data-parsley-required', 'false');
			$('#conocimientoLineasProductos').attr('data-parsley-required', 'false');
			$('#provengaDeLaboratorios').attr('data-parsley-required', 'true');
			$('#conozcaLasAuditorias').attr('data-parsley-required', 'false');
			$('#sede').attr('data-parsley-required', 'false');
			$('#horarioDesde').attr('data-parsley-required', 'false');
			$('#horarioHasta').attr('data-parsley-required', 'false');
							
			$('#aspectosCriticosPuesto').attr('placeholder',"");
			
			$('#lineaEspecialidad').val('').change();
			$('#productosManejar').val('').change();
			$('#coordinacionAccionesFidelizar').val('').change();
			$('#analisisInformacionAuditoria').val('').change();
			$('#tareasAdministrativasVarias').val('').change();
			$('#descExperienciaLaboralReq').val('').change();
			$('#habilidadesNecesarias').val('').change();
			$('#clientesInternos').val('').change();
			$('#proveedoresInternos').val('').change();
			$('#contactoConClientes').val('').change();
			$('#detalleMaquinas').val('').change();
			$('#proyeccionPosicion').val('').change();
			$('#experienciaPreviaComoAPM').val('').change();
			$('#visitadoEspecialidadesMedicos').val('').change();
			$('#visitadoInstituciones').val('').change();
			$('#conocimientoLineasProductos').val('').change();
			$('#conozcaLasAuditorias').val('').change();		
			
			$('#manejoInfoConfidencial').prop('checked', false);
			$('#esfuerzoFisico').prop('checked', false);
			$('#exposicionMaterialesQuimicos').prop('checked', false);
			
		}
		
		$('#nivel').arqzoom("option", "filterValues")['tipoPuesto']= $('#ingresoPersonal').val();
			
	});
	$('#ingresoPersonal').change();
}