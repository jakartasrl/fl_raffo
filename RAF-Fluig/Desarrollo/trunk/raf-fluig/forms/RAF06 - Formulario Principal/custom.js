
var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		
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
		
		if(arqFormOpts.esDeSistemas){
			//todo oculto
			$('#arqForm .form-group').hide();
			$('.leyenda').hide();
			$('.subsecciones').hide();
			$('.reportaaBuscar').hide();
			$('.seccionBeneficios').hide();
			
			//mostrar nombre apellido nombreUsuario y mailCorporativo
			$('.ingresoNuevoUsuario').show();
		}
		
	},
	
	onEdit: {
		custom: function() {
			
			//$('#zoom').arqzoom('updateWithDefault');
			
			initTables();

			//Masks
			$('#cuil').mask('00-00000000-0');
			$('#dni').mask('0#');
			
			//Manejo de Fechas	
			$('#fechaAlta, #fechaNacimiento').arqdatetimepicker({
				pickTime: false, 
				language:'es', 
				format:'dd/mm/yyyy', 
				autoclose: false, 
				todayHighlight: true,
				multidate: false
			});			
			
			$('#fechaRelevamientoPerfil, #fechaIngreso').arqdatetimepicker({
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
			
			$('#fechaNacimiento ,#fechaAlta, #fechaRelevamientoPerfil, #fechaIngresoNecesaria, #horarioDesde, #horarioHasta').each(function(){
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
						 'adicionalEstudioPreocupacional','tipoEstudioPsicotecnico','personasConDiscapacidad','derivacionJobPosting','primerAutorizante','segundoAutorizante','gerenteN1',
						 'observacionesGralesProceso','busquedaConfidencial','gerenteGeneral', 'primerAutorizanteMatricula','gerenteN1Matricula','segundoAutorizanteMatricula',
						 'detalleBuzones', 'observacionesReqInf', 'tipoInterno', 'usuarioExistenteTelef'];
		
			var listaCheckboxs = ['puestoNuevo','junior','semiSenior','senior','noCorresponde','secundarioCompleto','teciarioCurso', 'terciarioGraduado',
			                     'universitarioCurso','universitarioGraduado','posgradoCurso','posgradoGraduado', 'confirmaCierre',
			                     'accesoInternet', 'cuentaCorreoElectronico', 'accesoBuzones', 'accesoAWebmail', 'salidaLLamadasLocales', 
			                     'salidaDDNNacional', 'salidaDDNInteracional', 'salidaCelular'];
			
			var listaRadios = ['accesoAWebmail'];
			
			//ARQ Zooms
			$('#vacanteACubrir').arqzoom({
				datasetId: 'RAF05-FormularioPrincipal-filteredProcesoSeleccion',
				template: {
					row: [
					      { field: 'nroSolicitud', header: 'Nro. Solicitud'},
				          { field: 'codigoBusqueda', header: 'Código de Búsqueda'},
				          { field: 'nombreBusqueda', header: 'Nombre de la Búsqueda'},
					],
				},
				filterValues:  function(searchValue){
					return [
					    {
					    	"_field" : 'nroSolicitud',
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 2,
					    	"_likeSearch": true
					    },
					    {
					    	"_field" : 'codigoBusqueda',
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 2,
					    	"_likeSearch": true
					    },
					    {
					    	"_field" : 'nombreBusqueda',
					    	"_initialValue": '%'+searchValue+'%',
					    	"_finalValue" : '%'+searchValue+'%',
					    	"_type": 2,
					    	"_likeSearch": true
					    }
					];
				},
				resultFields: lista.concat(listaCheckboxs, listaRadios),
				callback: function(res){

					if ((typeof res['nroSolicitud'] !== "undefined") && (res['nroSolicitud'] !== null)) {

						//para ocultar los campos que estaba hide
						//para un determinado ingresoPersonal
						
						for(var k = 0; k < listaCheckboxs.length; k++){
							if(res[listaCheckboxs[k]] == 'true'){
								$(':input[type="checkbox"][name="'+ listaCheckboxs[k] + '"]').prop('checked', true).change(); 
							}
						}
						
						for(var j = 0; j < listaRadios.length; j++){
							$('[name="' + listaRadios[j] + '"]').each(function() {
								if($(this).val() == res[listaRadios[j]]){
									$(this).prop('checked', true); 
								}
							});
						}
						
						for(var i = 3; i < lista.length; i++){
							var $field = $('#' + lista[i]);
							var value = $field.arqnum('instance') ? res[lista[i]].replace(/\./g,'') : res[lista[i]];
							$field.val(value).change(); 
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
							$('#arqForm').parsley().reset();
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
							$('#arqForm').parsley().reset();
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
							$('#arqForm').parsley().reset();
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
							$('#arqForm').parsley().reset();
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar los programas de informatica.');
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
							$('#arqForm').parsley().reset();
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
							$('#arqForm').parsley().reset();
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
							$('#arqForm').parsley().reset();
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
								$('.desgloseRem', $row)
									.val(dataset.values[i]["desgloseRem"])
									.change();
								$('.desgloseRemMonto', $row).val(dataset.values[i]["desgloseRemMonto"].replace(/\./g,'')).change();
							}
							desabilitarTablaDesgloceRem();
							$('#arqForm').parsley().reset();
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
							$('#arqForm').parsley().reset();
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
										if(dataset.values[i]["dispositivoChck"] == 'true'){
											$('.dispositivoChck', $(this)).prop('checked', true).change();
											$('.existente', $(this)).val(dataset.values[i]["existente"]).change();
											$('.correspondeA', $(this)).val(dataset.values[i]["correspondeA"]).change();											
										}
										break;
									}
								}
							});
							$('#arqForm').parsley().reset();
							
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
										if(dataset.values[i]["aplicacionChck"] == 'true'){
											$('.aplicacionChck', $(this)).prop('checked', true).change();
										}
										break;
									}
								}
							});
							$('#arqForm').parsley().reset();
							
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
							$('#arqForm').parsley().reset();
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar las rutas a carpetas.');
						});
					}
				
					$('#arqForm').parsley().reset();
					
				},
				displayKey: function(res){
					return	res['nroSolicitud'] + ' - ' + res['codigoBusqueda'] + ' - ' + res['nombreBusqueda'];
				},
				clean: function(res) {
		
					$('input[type=text]').val('').change();
					$('textarea').val('').change();
					$('select').val('').change();
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
				}
			});
			
			$('#usuarioColaborador').arqzoom({
				datasetId: 'RAF06-empleados',
				resultFields: ['matricula', 'nombreCompleto', 'puesto', 'categoria', 'estado', 'nombre', 'apellido', 'tipoDocumento', 'nroDocumento', 'cuil', 'fechaNacimiento', 'genero', 'estadoCivil', 'nacionalidad', 'empresa', 'lugarPago', 'domicilio'],
				template: {
					row: [
					    {field: 'nombreCompleto', header: 'Nombre'}
					],
				},
				searchField: 'nombreCompleto',
				callback: function(res){
					$('#nombre').val(res['nombre']).change();
					$('#apellido').val(res['apellido']).change();
					$('#tipoDocumentoIdentidad').val(res['tipoDocumento'].toLowerCase()).change();
					$('#dni').val(res['nroDocumento']).change();
					$('#cuil').val(res['cuil']).change();
					$('#fechaNacimiento').val(res['fechaNacimiento']).change();
					$('#generoAlta').val(res['genero'].toLowerCase()).change();
					$('#estadoCivil').val(res['estadoCivil']).change();
					$('#nacionalidad').val(res['nacionalidad']).change();
					$('#empresa').val(res['empresa'].indexOf("MONTE") >= 0 ? 'monteverde' : 'raffo').change();
					$('#lugarPago , #sedeOriginal').val(res['lugarPago']).change();
					
					$.ajax({
						type: "POST",
						url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
						contentType: "application/json; charset=utf-8",
						dataType: "json",				
						data: JSON.stringify({
							name : 'RAF05-Sedes',
							constraints: [
							  {
								  _field: "descripcion",
								  _initialValue: $('#lugarPago').val(),
								  _finalValue: $('#lugarPago').val(),
								  _type: 1
							   }
							]
						})
					})
					.done(function(dataset) {	
						 $("#grupoAprobadorRRHH").val(dataset.values[0]["grupoAprobadorRRHH"]);
						
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						alert('No se pudo cargar el grupo aprobador de RRHH');
					});	
					
					
					
					
					$('#domicilio').val(res['domicilio']).change();
					$('#legajo').val(res['matricula']).change();
				},
				displayKey: function(res){
					return res['nombreCompleto'];
				},
				clean: function(res) {
					$('#nombre').val('').change();
					$('#apellido').val('').change();
					$('#tipoDocumentoIdentidad').val('').change();
					$('#dni').val('').change();
					$('#cuil').val('').change();
					$('#fechaNacimiento').val('').change();
					$('#generoAlta').val('').change();
					$('#estadoCivil').val('').change();
					$('#nacionalidad').val('').change();
					$('#empresa').val('').change();
					$('#lugarPago').val('').change();
					$('#domicilio').val('').change();
					$('#legajo').val('').change();
				}
			});
			
			$('#vacanteACubrirConColaborador').change(function(){
				var $usuarioColaborador = $('#usuarioColaborador');
				if($(this).val()=='vacanteExterno' || $(this).val()==''){
					$usuarioColaborador.arqzoom('disabled',true);
					$usuarioColaborador.closest('.form-group').hide();
					$usuarioColaborador.removeAttr('data-parsley-required').parsley().reset();
					$('#legajo').prop('disabled',false);
				} else {
					$usuarioColaborador.attr('data-parsley-required', 'true');
					$usuarioColaborador.closest('.form-group').show();
					$usuarioColaborador.arqzoom('disabled',false);
					$('#legajo').prop('disabled',true);
				}
				if($(this).val()!='vacanteInterno'){
					$('label', $('#fechaIngreso').closest('.label-field')).text('Fecha de Ingreso');
					$('label', $('#fechaIngresoNecesaria').closest('.label-field')).text('Fecha de Ingreso Necesaria');
				} else {
					$('label', $('#fechaIngreso').closest('.label-field')).text('Fecha de Cambio de Puesto');
					$('label', $('#fechaIngresoNecesaria').closest('.label-field')).text('Fecha de Cambio de Puesto Necesaria');
				}
			});
			$('#vacanteACubrirConColaborador').change().parsley().reset();
			
			$('#puesto').arqzoom({
				datasetId: 'RAF06-puestos',
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
				}
			});
			
			$('#categoria').arqzoom({
				datasetId: 'RAF06-categorias',
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
				datasetId: 'RAF06-gerencias',
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
				datasetId: 'RAF06-areas',
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
				datasetId: 'RAF06-sectores',
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
				datasetId: 'RAF06-subsectores',
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
				datasetId: 'RAF06-aperturasPorSector',
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
				datasetId: 'RAF06-lineasEspecialidad',
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
				datasetId: 'RAF06-empleados',
				resultFields: ['nombreCompleto', 'puesto', 'categoria'],
				searchField: 'nombreCompleto',
				template: {
					row: [
					    {field: 'nombreCompleto', header: 'Nombre'},
					    {field: 'puesto', header: 'Puesto'},
					],
				},
				searchField: 'nombreCompleto',
				callback: function(res){
					$('#categoriaReportaa').val(res['categoria']).change();
					$('#puestoReportaa').val(res['puesto']).change();
				},
				displayKey: function(res){
					return res['nombreCompleto'];
				},
				clean: function(res) {
					$('#categoriaReportaa').val('').change();
					$('#puestoReportaa').val('').change();
				}
			});
			
			$('#nombreReemplazo').arqzoom({
				datasetId: 'RAF06-empleados',
				resultFields: ['nombreCompleto', 'puesto'],
				searchField: 'nombreCompleto',
				template: {
					row: [
					    {field: 'nombreCompleto', header: 'Nombre'},
					    {field: 'puesto', header: 'Puesto'},
					],
				},
				searchField: 'nombreCompleto',
				displayKey: function(res){
					return res['nombreCompleto'];
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
				datasetId: 'RAF06-convenios',
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
				datasetId: 'RAF06-categoriasConvenio',
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
				datasetId: 'RAF06-jefes',
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
				datasetId: 'RAF06-gerentesN2',
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
				datasetId: 'RAF06-gerentesN1',
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
				datasetId: 'RAF06-centrosCosto',
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
				datasetId: 'RAF06-zonas',
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
			
			//nuevos zooms
			$('#estadoCivil').arqzoom({
				datasetId: 'RAF06-estadoCivil',
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
					$('#estadoCivil').val('').change();
				}
			});
			
			$('#nacionalidad').arqzoom({
				datasetId: 'RAF06-nacionalidades',
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
					$('#nacionalidad').val('').change();
				}
			});
			
			$('#lugarPago').arqzoom({
				datasetId: 'RAF05-Sedes',
				resultFields: ['descripcion','grupoAprobadorRRHH'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				searchField: 'descripcion',
				displayKey: function(res){
					return res['descripcion'];
				},
				callback: function(res){
					$('#grupoAprobadorRRHH').val(res['grupoAprobadorRRHH']);
     			},
				clean: function(res) {
					$('#lugarPago').val('').change();
					$('#grupoAprobadorRRHH').val('');
					if ($('#vacanteACubrirConColaborador').val()!="vacanteExterno"){
						FLUIGC.message.alert({
						    message: 'Se debe cambiar la carpeta de legajo de lugar a la sede correspondiente',
						    title: `USTED ESTÁ MODIFICANDO EL LUGAR DE PAGO DEL ${($('#vacanteACubrirConColaborador').val() == "vacanteReingreso")?"REINGRESANTE":"INTERNO"}`,
						    label: 'OK'
						}, function(el, ev) {								    				
						});
					}
				}
			});
						
			$('#modalidadContratacion').arqzoom({
				datasetId: 'RAF06-modalidadContratacion',
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
					$('#modalidadContratacion').val('').change();
				}
			});			
			
			$('#regimenHorario').arqzoom({
				datasetId: 'RAF06-regimenHorario',
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
					$('#regimenHorario').val('').change();
				}
			});
			
			$('#horario').arqzoom({
				datasetId: 'RAF06-horarios',
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
					$('#horario').val('').change();
				}
			});
			
			$('#transporte').arqzoom({
				datasetId: 'RAF06-transporte',
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
					$('#transporte').val('').change();
				}
			});
			
			$('#grupoDeUsuarios').arqzoom({
				datasetId: 'RAF06-PapelesStartLike',
				resultFields: ['codigo','descripcion'],
				template: {
					row: [
					    { field: 'descripcion'},
					],
				},
				filterValues: {'roleLike':'RAF06-GPO-'},
				searchField: 'descripcion',
				displayKey: function(res){
					return res['descripcion'];
				},
				clean: function(res) {
					$('#codGrupoDeUsuarios').val('').change();
				},
				callback: function(res){
									
					$('#codGrupoDeUsuarios').val(res['codigo']).change();
					$.ajax({
						type: "POST",
						url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
						contentType: "application/json; charset=utf-8",
						dataType: "json",				
						data: JSON.stringify({
							name : 'RAF06-GrupoDeUsuarios',
							constraints: [
							   {
								  _field: "roleId",
								  _initialValue: $('#codGrupoDeUsuarios').val(),
								  _finalValue: $('#codGrupoDeUsuarios').val(),
								  _type: 1
							   }
							]
						})
					})
					.done(function(dataset) {	
						var str = "";
						for(var i = 0; i < dataset.values.length; i++) {								
							str = str + dataset.values[i]["mail"] + ";"							
						}
						
						$('#destinatarios').val(str).change();
							
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						alert('No se pudo cargar los mails.');
					});			
					
					
				},
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
				datasetId: 'RAF06-empleados',
				resultFields: ['nombreCompleto', 'puesto'],
				searchField: 'nombreCompleto',
				template: {
					row: [
					    { field: 'nombreCompleto', header: 'Nombre'},
					    { field: 'puesto', header: 'Puesto'}
					],
					width: '200%'
				},
				searchField: 'nombreCompleto',
				displayKey: function(res){
					return res['nombreCompleto'];
				},			
			});
			$('#tipoInterno').change(function() {
				var $usuarioExistenteTelef = $('#usuarioExistenteTelef');
				if($(this).val()=='internoExistente') {
					$usuarioExistenteTelef.arqzoom('disabled',false);
					$usuarioExistenteTelef.attr('data-parsley-required', 'true');
				} else {
					$usuarioExistenteTelef.removeAttr('data-parsley-required').parsley().reset();
					$usuarioExistenteTelef.arqzoom('disabled',true);
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
					
					$('.quienesEntrevistan', $tr).arqzoom({
						datasetId: 'RAF06-empleados',
						resultFields: ['nombreCompleto', 'puesto'],
						searchField: 'nombreCompleto',
						template: {
							row: [
							    { field: 'nombreCompleto', header: 'Nombre'},
							    { field: 'puesto', header: 'Puesto'}
							],
						},
						searchField: 'nombreCompleto',
						displayKey: function(res){
							return res['nombreCompleto'];
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
						datasetId: 'RAF06-empleados',
						resultFields: ['nombreCompleto', 'puesto'],
						searchField: 'nombreCompleto',
						template: {
							row: [
							    {field: 'nombreCompleto', header: 'Nombre'},
							    {field: 'puesto', header: 'Puesto'},
							],
						},
						searchField: 'nombreCompleto',
						displayKey: function(res){
							return res['nombreCompleto'];
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
						datasetId: 'RAF06-carreras',
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
				task: [0, 10],  
				custom: function() {
					
					$('#fechaAlta, #nombre, #apellido, #tipoDocumentoIdentidad, #dni, #cuil, #fechaNacimiento, #genero, #generoAlta, #estadoCivil, #nacionalidad').attr('data-parsley-required','true');
					$('#empresa, #lugarPago, #domicilio, #telefonoContacto, #mailContacto, #modalidadContratacion, #regimenHorario, #horario, #transporte').attr('data-parsley-required','true');
					$('#fechaRelevamientoPerfil, #fechaIngresoNecesaria, #categoria, #gerencia, #area, #sector, #subsector, #reportaa').attr('data-parsley-required','true');
					$('#tipoPosicion, #efectivoTemporario, #personalACargo, #franjaEdad, #genero, #gerenteGeneral').attr('data-parsley-required','true');
					$('#comedor, #tarjetaAcceso, #tarjetaCafeteria, #induccion').attr('data-parsley-required','true');
										
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', false);
					$('#gerenteGeneral').prop('disabled', false);
					$('#gerenteGeneral').attr('data-parsley-required','true');
					
					//cargarTablaBeneficios();
					desabilitarTablaDesgloceRem();
				},
				'otherwise': function() {
					$('#ingresoPersonal').prop('disabled', true);
				}
		
			},
			"Completar Remuneraciones y Beneficios": {
				task: [11],  
				custom: function() {
					
					//todo deshabilitado
					//deshabilitarTodo();
					//$('.fluigicon-trash').hide();
					
					//solo esta seccion habilitada
					$('#remuneracionBruta').attr('data-parsley-required','true');
					$('#remuneracionBruta').prop('disabled', false);
					$('.desgloseRem, .desgloseRemMonto').prop('disabled', false);
					
					$('#convenio').arqzoom('disabled', false);
					$('#categoriaConvenio').arqzoom('disabled', false);
					$('#obraSocial').arqzoom('disabled', false);
					$('#obraSocial').change();
					$('.beneficiosChck').prop('disabled', false);					
					$('#comentariosBeneficios').prop('disabled', false);
					$('#btnNuevoDesgloseRem').prop('disabled', false);

					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
					$('#gerenteGeneral').attr('data-parsley-required','false');
										
				},
				'otherwise': function() {
					//esta seccion se deshabilitada para todas las tareas menos la 10
					$('#remuneracionBruta').attr('data-parsley-required','false');
					$('.seccionBeneficios').prop('disabled', true);
					$('.desgloseRem:visible').arqzoom('disabled', true);
					$('#convenio').arqzoom('disabled', true);
					$('#categoriaConvenio').arqzoom('disabled', true);
					$('#obraSocial').arqzoom('disabled', true);
					$('#nombrePuestoNuevo').change();
					$('.beneficiosChck').prop('disabled', true);

				}
			
			},
			"Circuito Aprobadores": {
				task: [15,20,22,32],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.fluigicon-trash').hide();
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
					$('#gerenteGeneral').attr('data-parsley-required','false');

				}
		
			},
			"Aprobar Solicitud de Puesto (Gte. Gral.)": {
				task: [40],  
				custom: function() {
					
					//solo mostrar estos campos deshabilitados
					deshabilitarTodo();
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', true);
					$('#gerenteGeneral').prop('disabled', true);
					$('#gerenteGeneral').attr('data-parsley-required','false');
					
					var ocultarDetalleGteGral = function() {
						$('#arqForm .form-group').hide();
						$('.leyenda').hide();
						$('.subsecciones').hide();
						$('.reportaaBuscar').hide();
						//Mostrar puesto, puesto nuevo, nombrePuestoNuevo,Gerencia, reportaa, tipoPosicion, efectivoTemporario, pea, sede
						$('.aprobacionGteGral').show();
						if($('#ingresoPersonal').val() == 'APM' || $('#ingresoPersonal').val() == 'APF'){
							//mostrar lineaEspecialidad, zona
							$('.aprobacionGteGralAPMAPF').show();
						}
						if($('#tipoPosicion').val() == 'reemplazo'){
							$('.nombreReemplazo').show();
						}
					}
					
					var mostrarDetalleGteGral = function() {
						$('#arqForm .form-group').show();
						$('.leyenda').show();
						$('.subsecciones').show();
						$('.reportaaBuscar').show();
					}
					
					var verDetalle = false;
					ocultarDetalleGteGral();
					$('#btnVerDetalle').show().click(function() {
						verDetalle = !verDetalle;
						if(verDetalle) {
							mostrarDetalleGteGral();
							$('#btnVerDetalle').text("Ocultar detalle");
						} else {
							ocultarDetalleGteGral();
							$('#btnVerDetalle').text("Ver detalle");
						}
					});
					
				}
		
			},			
			"Revisar Solicitud de Alta de Empleado": {
				task: [25],  
				custom: function() {
										
					$('#fechaAlta, #nombre, #apellido, #tipoDocumentoIdentidad, #dni, #cuil, #fechaNacimiento, #genero, #generoAlta, #estadoCivil, #nacionalidad').attr('data-parsley-required','true');
					$('#empresa, #lugarPago, #domicilio, #telefonoContacto, #mailContacto, #modalidadContratacion, #regimenHorario, #horario, #transporte').attr('data-parsley-required','true');
					$('#fechaRelevamientoPerfil, #fechaIngresoNecesaria, #categoria, #gerencia, #area, #sector, #subsector, #reportaa').attr('data-parsley-required','true');
					$('#tipoPosicion, #efectivoTemporario, #personalACargo, #franjaEdad, #genero, #gerenteGeneral').attr('data-parsley-required','true');
					
					$('#nombrePuestoNuevo').change();
					$('input[name=vacanteACubrir]').prop('disabled', true);
					$('#vacanteACubrir').prop('disabled',true);
					
					$('#primerAutorizante, #segundoAutorizante, #gerenteN1').arqzoom('disabled', false);
					$('#gerenteGeneral').prop('disabled', false);
					$('#gerenteGeneral').attr('data-parsley-required','false');
					
					$('#responsableAltaUsuario, #responsableTarjetaAcceso, #responsableTarjetaCafeteria').prop('disabled', false);
					
				}
		
			},
			"Confirmar Fecha de Ingreso": {
				task: [95],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.fluigicon-trash').hide();
					
					$('#fechaIngreso').prop('disabled', false);
					$('#fechaIngreso').attr('data-parsley-required','true');

				}
		
			},
			"Notificar Ingreseo de Empleado": {
				task: [43],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.fluigicon-trash').hide();
					
					$('#destinatarios').prop('disabled', false);
					$('#grupoDeUsuarios').arqzoom('disabled', false);
					$('#destinatarios').attr('data-parsley-required','true');
					
					$('#notificarIngreso').show();

				},
				'otherwise': function() {
					$('#notificarIngreso').hide();
				}
		
			},
			"Dar de Alta Empleado en AFIP": {
				task: [45],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.fluigicon-trash').hide();

				}
		
			},
			"Completar Información en RHPRO": {
				task: [47,105],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					
					if($('#vacanteACubrirConColaborador').val()=='vacanteExterno'){
						$('#legajo').prop('disabled', false);	
					}
					
					$('#efectivoTemporario, #remuneracionBruta, #comentariosBeneficios, .seniority, .beneficiosChck, .puestoNuevo').prop('disabled', false);					
					$('#puesto, #categoria, #gerencia, #area, #sector, #subsector, #aperturaPorSector, #centroCosto, '
							+ '#reportaa, #categoriaConvenio, #obraSocial, #convenio').arqzoom('disabled', false);
					$('#legajo, #efectivoTemporario, #remuneracionBruta, #categoria, #gerencia, #area, #sector, #subsector, #reportaa').attr('data-parsley-required','true');
					$('.fluigicon-trash').hide();
										
					if($('#ingresoPersonal').val() == 'APM' || $('#ingresoPersonal').val() == 'APF'){
						//mostrar lineaEspecialidad, zona
						$('#zona').arqzoom('disabled', false);
						$('#zona').attr('data-parsley-required','true');
						
						if($('#ingresoPersonal').val() == 'APM'){
							$('#lineaEspecialidad').arqzoom('disabled', false);
							$('#lineaEspecialidad').attr('data-parsley-required','true');
						}
						
					}else{
						$('#ubicacionFisica, #horarioDesde, #horarioHasta, #horasExtras, #viajes, #comedor, #tarjetaAcceso, #tarjetaCafeteria, #induccion, #entregaDocumentacion').prop('disabled', false);	
						$('#sede').arqzoom('disabled', false);
						$('#sede, #horarioDesde, #horarioHasta').attr('data-parsley-required','true');
					}				

				}
		
			},
			"Ingresar Nuevo Usuario": {
				task: [54],  
				custom: function() {
					
					//todo deshabilitado
					deshabilitarTodo();
					$('.fluigicon-trash').hide();

					//todo oculto
					$('#arqForm .form-group').hide();
					$('.leyenda').hide();
					$('.subsecciones').hide();
					$('.reportaaBuscar').hide();
					$('.seccionBeneficios').hide();
					
					//mostrar nombre apellido nombreUsuario y mailCorporativo
					$('.ingresoNuevoUsuario').show();
					
					if($('#vacanteACubrirConColaborador')!='vacanteExterno'){
						var lejajo = $('#legajo').val();
						$.ajax({
							type: "POST",
							url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
							contentType: "application/json; charset=utf-8",
							dataType: "json",				
							data: JSON.stringify({
								name : 'colleague',
								constraints: [
						              {
						            	  _field: "colleaguePK.colleagueId",
						            	  _initialValue: lejajo,
						            	  _finalValue: lejajo,
						            	  _type: 1
						              }
				                ]
							})
						})
						.done(function(dataset) {	
							if(dataset.values.length > 0) {
								$('#nombreUsuario').val(dataset.values[0]['login']);
								$('#mailCorporativo').val(dataset.values[0]['mail']);
							} else {
								$('#nombreUsuario').prop('disabled', false);
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							alert('No se pudo cargar la información del usuario.');
						});	
					} else {
						$('#nombreUsuario').prop('disabled', false);
					}
					
					$('#mailCorporativo').prop('disabled', false);
					$('#nombreUsuario, #mailCorporativo').attr('data-parsley-required','true');
					
				}
		
			},
			"otherwise": { 
				custom: function() {
					// Si no aplica ninguna de las tareas. 
					deshabilitarTodo();
					$('.fluigicon-trash').hide();
					$('.documentacion').hide();	

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
		datasetId: 'RAF06-empleados',
		resultFields: ['nombreCompleto', 'puesto'],
		searchField: 'nombreCompleto',
		template: {
			row: [
			    { field: 'nombreCompleto', header: 'Nombre'},
			    { field: 'puesto', header: 'Puesto'}
			],
			width: '500%'
		},
		displayKey: function(res){
			return res['nombreCompleto'];
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
	
	if(modo == 'onView'){
		
		if($("#tablaDocumentacion tr:gt(1)").length > 0){
			$('#documentacion').show();
		}else{
			$('#documentacion').hide();
		}
		
	} else {
	
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
}

function desabilitarTablaDesgloceRem(){
	$("#tablaDesgloseRem tbody tr:gt(0)").each(function(){
		var $row = $(this);
		var $desgloseRem = $('.desgloseRem', $row);
		if($desgloseRem.arqzoom('instance')){
			$desgloseRem.arqzoom('disabled', true);
		} else {
			$desgloseRem.prop('disabled', true);
		}
		$('.deleteRow', $row).remove();
	});
}


