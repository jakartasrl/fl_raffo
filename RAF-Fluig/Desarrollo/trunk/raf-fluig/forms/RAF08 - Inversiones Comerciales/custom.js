	var	arqFormOpts = {
		parsley: {
			// Parametros configuracion enviados a parseley
		},
		
		onView: function() {
			
			$('.btn-default, .btn').remove();
			$('#printBtView').remove();
			$('.fluigicon-plus').remove();
			$('.fluigicon-trash').remove();
			arqFormOpts.habilitarCampos('onView');
	
		},
		
		onEdit: {
			
			custom: function() {
			
				$('.btn-default').remove();
				$('#printBtView').remove();
				
				arqFormOpts.habilitarCampos('onEdit');
				
				$('#porcentajeImputadoTotal').arqnum({
					decimals: 2,
					dec_point: ',',
					thousands_sep: '',
				});
				
				$('#montoInversion').arqnum({
					decimals: 2,
					dec_point: ',',
					thousands_sep: '',
				});
				
				$('#importe').arqnum({
					decimals: 2,
					dec_point: ',',
					thousands_sep: '',
				});
				
				$('#importeARS').arqnum({
					decimals: 2,
					dec_point: ',',
					thousands_sep: '',
				});
				
				$('#importeUSD').arqnum({
					decimals: 2,
					dec_point: ',',
					thousands_sep: '',
				});
			
				$('#tipoCambioARS').arqnum({
					decimals: 4,
					dec_point: ',',
					thousands_sep: '',
				});
				
				$('#tipoCambioUSD').arqnum({
					decimals: 4,
					dec_point: ',',
					thousands_sep: '',
				});
				
				$('#cantidadNoche').arqnum({
					decimals: 0,
				});
	
				$('#fechaNacimiento, #fechaVtoPasaporte, #fechaIda, #fechaRegreso, #checkinHotel, #checkoutHotel').arqdatetimepicker({
					pickTime: false, 
					language:'es', 
					format:'dd/mm/yyyy', 
					autoclose: true, 
					todayHighlight: true,
					multidate: false
				});
								
				$('#anioEgreso').datetimepicker({
					viewMode: 'years',
					format: 'YYYY',
					language:'es', 
					autoclose: true, 
					minViewMode: 2
				});
				
				$('#mesInversion').arqdatetimepicker({
					language:'es', 
					format:'mm/yyyy', 
					autoclose: true, 
					multidate: false,
					startView: "months", 
					minViewMode: "months"
				});
					
				var onlyTime = FLUIGC.calendar('#horaSalidaIda', {
				    pickDate: false,
				    pickTime: true
				});
				
				var onlyTime = FLUIGC.calendar('#horaSalidaRegreso', {
				    pickDate: false,
				    pickTime: true
				});
				
				
				$('#apellido').arqzoom({
					datasetId: 'RAF08-Medicos',
					resultFields: ['apellido', 'nombre', 'dni', 'tipoDocumento', 
									'numeroDocumento', 'numeroPasaporte', 'nacionalidad', 
									'telefonoContacto', 'celular', 'mailContacto',
									'especialidadProfesional', 'tituloGrado', 'institucionDondeObtuvo', 
									'anioEgreso', 'matricula', 'institucionQueTrabaja', 'cargoPosicion', 
									'membresia', 'ciudad'
								  ],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "apellido",
						        	"_initialValue": ''+searchValue+'',
						        	"_finalValue" : ''+searchValue+'',
						        	"_type": 2, //SHOULD
						        	"_likeSearch": true
						        }
						        ];
					},
					template: {
						row: [
						      { field: 'apellido', header: "Apellido", width: '20%', value: `<span class="origen_{{origen}}">{{apellido}}</span>`},
						      { field: 'nombre', header: "Nombre", width: '20%', value: `<span class="origen_{{origen}}">{{nombre}}</span>`},
						      { field: 'localidad', header: "Ciudad", width: '20%', value: `<span class="origen_{{origen}}">{{localidad}}</span>`},
						      { field: 'especialidadProfesional', header: "Especialidad", width: '20%', value: `<span class="origen_{{origen}}">{{especialidadProfesional}}</span>`},
							  { field: 'origen', header: "Origen", width: '20%', value: `<span class="origen_{{origen}}">{{origen}}</span>`},
						],
						width: '60vw',
						height: '60vh'
					},
					displayKey: function(res){
						return res['apellido'];
					},
			        callback: function(res){
	
						$('#nombre').val(res['nombre']);
						$('#cuit').val(res['cuit']);
						$('#dni').val(res['dni']);
						$('#tipoDocumento').val(res['tipoDocumento']);
						$('#numeroDocumento').val(res['numeroDocumento']);
						$('#numeroPasaporte').val(res['numeroPasaporte']);
						$('#fechaVtoPasaporte').val(corregirCampoFecha(res['fechaVtoPasaporte']));
						$("input:radio[value='"+ res['sexo'] +"']").prop('checked',true);
						$('#fechaNacimiento').val(corregirCampoFecha(res['fechaNacimiento']));
						$('#nacionalidad').val(res['nacionalidad']).change();
						$('#domicilio').val(res['domicilio']);
						$('#localidad').val(res['localidad']);
						$('#provincia').val(res['provincia']);
						$('#pais').val(res['pais']);
						$('#codigoPostal').val(res['codigoPostal']);
						$('#telefonoContacto').val(res['telefonoContacto']);
						$('#celular').val(res['celular']);
						$('#mailContacto').val(res['mailContacto']);
						$('#especialidadProfesional').val(res['especialidadProfesional']);
						$('#tituloGrado').val(res['tituloGrado']);
						$('#institucionDondeObtuvo').val(res['institucionDondeObtuvo']);
						$('#anioEgreso').val(res['anioEgreso']);
						$('#matricula').val(res['matricula']);
						$('#institucionQueTrabaja').val(res['institucionQueTrabaja']);
						$('#cargoPosicion').val(res['cargoPosicion']);
						$('#membresia').val(res['membresia']);
						$('#ciudad').val(res['ciudad']);
			        },
			        clean: function(res){
						$('#nombre').val('');
						$('#cuit').val('');
						$('#dni').val('');
						$('#tipoDocumento').val('');
						$('#numeroDocumento').val('');
						$('#numeroPasaporte').val('');
						$('#fechaVtoPasaporte').val('');
						$('#sexo').val('');
						$('#fechaNacimiento').val('').change();
						$('#nacionalidad').val('').change();
						$('#domicilio').val('');
						$('#localidad').val('');
						$('#provincia').val('');
						$('#pais').val('');
						$('#codigoPostal').val('');
						$('#telefonoContacto').val('');
						$('#celular').val('');
						$('#mailContacto').val('');
						$('#especialidadProfesional').val('');
						$('#tituloGrado').val('');
						$('#institucionDondeObtuvo').val('');
						$('#anioEgreso').val('');
						$('#matricula').val('');
						$('#institucionQueTrabaja').val('');
						$('#cargoPosicion').val('');
						$('#membresia').val('');
						$('#ciudad').val('');
			        }
				});
				
				$('#nacionalidad').arqzoom({
					datasetId: 'RAF06-nacionalidades',
					resultFields: ['descripcion'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "descripcion",
						        	"_initialValue": '%'+searchValue+'%',
						        	"_finalValue" : '%'+searchValue+'%',
						        	"_type": 2, //SHOULD
						        	"_likeSearch": true
						        }
						        ];
					},
					template: {
						row: [{ field: 'descripcion'}],
					},
					displayKey: function(res){
						return res['descripcion'];
					},
			        callback: function(res){
			        },
			        clean: function(res){
			        }
				});
				
				$('#cartaPetitorio').arqzoom({
					datasetId: 'RAF08-Adjuntos',
					resultFields: ['documentid','version','description','fileName'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "nroSolicitud",
						        	"_initialValue": $('#nroSolicitud').val(),
						        	"_finalValue" : $('#nroSolicitud').val(),
						        	"_type": 2, //SHOULD
						        	"_likeSearch": false
						        }
						     ];
					},
					template: {
						row: [{ field: 'fileName', header:"Nombre Archivo"}],
						width: "400px",
					},
					displayKey: function(res){
						return res['description'];
					},
			        callback: function(res){
			        	$('#cartaPetitorio').val(res['fileName']).change();
			        	$('#cartaPetitorioDocumentId').val(res['documentid']).change();
			        },
			        clean: function(res){
			        	$('#cartaPetitorio').val('').change();
			        	$('#cartaPetitorioDocumentId').val('').change();
			        }
				});
				
				$('#cartaAcuerdo').arqzoom({
					datasetId: 'RAF08-Adjuntos',
					resultFields: ['documentid','version','description','fileName'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "nroSolicitud",
						        	"_initialValue": $('#nroSolicitud').val(),
						        	"_finalValue" : $('#nroSolicitud').val(),
						        	"_type": 2, //SHOULD
						        	"_likeSearch": false
						        }
						     ];
					},
					template: {
						row: [{ field: 'fileName', header:"Nombre Archivo"}],
						width: "400px",
					},
					displayKey: function(res){
						return res['description'];
					},
			        callback: function(res){
			        	$('#cartaAcuerdo').val(res['fileName']).change();
			        	$('#cartaAcuerdoDocumentId').val(res['documentid']).change();
			        },
			        clean: function(res){
			        	$('#cartaAcuerdo').val('').change();
			        	$('#cartaAcuerdoDocumentId').val('').change();
			        }
				});
				
				$('#flyer').arqzoom({
					datasetId: 'RAF08-Adjuntos',
					resultFields: ['documentid','version','description','fileName'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "nroSolicitud",
						        	"_initialValue": $('#nroSolicitud').val(),
						        	"_finalValue" : $('#nroSolicitud').val(),
						        	"_type": 2, //SHOULD
						        	"_likeSearch": false
						        }
						     ];
					},
					template: {
						row: [{ field: 'fileName', header:"Nombre Archivo"}],
						width: "400px",
					},
					displayKey: function(res){
						return res['description'];
					},
			        callback: function(res){
			        	$('#flyer').val(res['fileName']).change();
			        	$('#flyerDocumentId').val(res['documentid']).change();
			        },
			        clean: function(res){
			        	$('#flyer').val('').change();
			        	$('#flyerDocumentId').val('').change();
			        }
				});
				
				$('#nombreAPM').arqzoom({
					datasetId: 'RAF08-AgentePropagandaMedica',
					resultFields: ['distritoCodigo','distrito','matricula','nombre','email'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "nombre",
						        	"_initialValue": '%'+searchValue+'%',
						        	"_finalValue" : '%'+searchValue+'%',
						        	"_type": 2, //SHOULD
						        	"_likeSearch": true
						        },
						        {
						        	"_field" : "distritoCodigo",
						        	"_initialValue": $('#distritoCodigo').val(),
						        	"_finalValue" : $('#distritoCodigo').val(),
						        	"_type": 1, //SHOULD
						        	"_likeSearch": true
						        }
						     ];
					},
					template: {
						row: [{ field: 'nombre', header:"Nombre y Apellido"}],
						width: "400px",
					},
					displayKey: function(res){
						return res['nombre'];
					},
			        callback: function(res){
			        	$('#matriculaAPM').val(res['matricula']);
			        	$('#emailAPM').val(res['email']);
			        },
			        clean: function(res){
			        	$('#matriculaAPM').val('');
			        	$('#emailAPM').val('');
			        }
				});
				
				$('#formaPago').arqzoom({
					datasetId: 'RAF08-FormaPago',
					resultFields: ['codigo','descripcion'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "descripcion",
						        	"_initialValue": '%'+searchValue+'%',
						        	"_finalValue" : '%'+searchValue+'%',
						        	"_type": 2, //SHOULD
						        	"_likeSearch": true
						        }
						        ];
					},
					template: {
						row: [{ field: 'descripcion'}],
					},
					displayKey: function(res){
						return res['descripcion'];
					},
			        callback: function(res){
			        	$('#codFormaPago').val(res['codigo']);
			        },
			        clean: function(res){
			        	$('#codFormaPago').val('');
			        }
				});
				
				$('#moneda').arqzoom({
					datasetId: 'RAF08-Monedas',
					resultFields: ['codigo','descripcion'],
					filterValues: function(searchValue){
						return [
						        {
						        	"_field" : "descripcion",
						        	"_initialValue": '%'+searchValue+'%',
						        	"_finalValue" : '%'+searchValue+'%',
						        	"_type": 2, //SHOULD
						        	"_likeSearch": true
						        }
						        ];
					},
					template: {
						row: [{ field: 'descripcion'}],
					},
					displayKey: function(res){
						return res['descripcion'];
					},
			        callback: function(res){
			        	$('#moneda').val(res['descripcion']);
			        	$('#codMoneda').val(res['codigo']);
						
			        	arqFormOpts.cotizacionARS();
						arqFormOpts.cotizacionUSD();
			        	
			        },
			        clean: function(res){
			        	$('#moneda').val('');
			        	$('#codMoneda').val('');
						$('#tipoCambioARS').val('');
						$('#tipoCambioUSD').val('');
						$('#importeARS').val('');
						$('#importeUSD').val('');
				
			        }
				});
				
				
				$('#importe').change(function() {
					arqFormOpts.calcularImportes($('#tipoCambioARS').val(),$('#tipoCambioUSD').val());
				});
	
	
				$('#tblImputaciones').arqmasterdetail({
					buttonNewRow: "#newImputaciones",
					buttonsDeleteRow: ".deleteRow",		
					confirmDeleteRow: true,
					afterDeleteRow: function($tr, index){
						validarPorcentaje();
					},
					onCustomizeRow: function($tr, index){
						
						$('.newProd', $tr).arqzoom({
							datasetId: 'RAF08-Productos',
							resultFields: ['codigoProducto','descripcionProducto'],
							filterValues: function(searchValue){
								return [
								    {
								    	"_field" : "descripcionProducto",
								    	"_initialValue": searchValue,
								    	"_finalValue" : searchValue,
								    	"_type": 2, //SHOULD
								    	"_likeSearch": true
								    }
							    ];
							},
							template: {
								row: [{ field: 'descripcionProducto'}],
							},
					        displayKey: function(res){
					        	return res['descripcionProducto'];
					        },
					        callback: function(res){
					        	
					        	$('.codigoProducto',$tr).val(res['codigoProducto']);
					        	
					        	arqFormOpts.obtenerPresupuestoConsumidoARS($('#codGrupoGteDistrito').val(), res['codigoProducto'], $tr);
					        	
					        },
					        clean: function(res){
					        	$('.presupuestoARS',$tr).val('');
					        	$('.consumidoARS',$tr).val('');
					        	$('.codigoProducto',$tr).val('');
								$('.porcentajeImputado',$tr).val('');
								arqFormOpts.validarPresupuesto($tr);
								validarPorcentaje();
					        }
						});
						
						$('.porcentajeImputado',$tr).arqnum({
							decimals: 2,
							dec_point: ',',
							thousands_sep: '',
						});
						
						$('.porcentajeImputado',$tr).blur(function(){
							validarPorcentaje();
							
							arqFormOpts.validarPresupuesto($tr);
				        	
						});
						
					}
				});
				
				$('#btnMultiSearchCongreso').congresosearch({
					datasetId: 'RAF08-Congresos',
					rowIdField: 'nombre',
					filterTemplate: '#multisearchCongresoFilters',
					filterValues: function(){
						var cts = [];
						
						return cts;
					},
					template: {
						row: [
							  { field: 'siglas', header: "Siglas", width: '15%'},						      
							  { field: 'nombre', header: "Nombre", width: '25%'},
						      { field: 'lugar', header: "Lugar", width: '20%'},
							  { field: 'localidad', header: "Localidad", width: '10%'},
						      { field: 'fechaInicio', header: "Fecha Inicio", width: '10%'},
						      { field: 'fechaFin', header: "Fecha Fin", width: '10%'},
							  { field: 'presupuestoHabilitado', header: "Presupuesto Hab.", width: '10%'},
						],
						width: '70vw',
						height: '60vh',
						title: 'Seleccione el Congreso'
					},
					onLoad: function(){
						
						$('#filterFechaDesde, #filterFechaHasta').arqdatetimepicker({
							pickTime: false, 
							language:'es', 
							format:'dd/mm/yyyy', 
							autoclose: true, 
							todayHighlight: true,
							multidate: false,
							startDate: new Date()
						});
						
					},
			        callback: function(data) {
				
						var inicio = data['fechaCheckin'].split("/");
						var fin = data['fechaCheckout'].split("/");
				
						$('#idCongreso').val(data['id']);
						$('#nombreCongreso').val(data['nombre']);
						$('#lugarCongreso').val(data['lugar']);
						$('#fechaDesdeCongreso').val(data['fechaInicio']);
						$('#fechaHastaCongreso').val(data['fechaFin']);
						
						$("#checkinHotel").datepicker({
					        dateFormat: 'dd/mm/yyyy',
							language:'es',
							autoclose: true, 
							todayHighlight: false,
							multidate: false
					    }).datepicker('setDate', new Date(inicio[2],inicio[1]-1,inicio[0]));
						
						$("#checkoutHotel").datepicker({
					        dateFormat: 'dd/mm/yyyy',
							language:'es',
							autoclose: true, 
							todayHighlight: false,
							multidate: false
					    }).datepicker('setDate', new Date(fin[2],fin[1]-1,fin[0]));
	
						$("#fechaIda").datepicker({
					        dateFormat: 'dd/mm/yyyy',
							language:'es',
							autoclose: true, 
							todayHighlight: false,
							multidate: false
					    }).datepicker('setDate', new Date(inicio[2],inicio[1]-1,inicio[0]));
						
						$("#fechaRegreso").datepicker({
					        dateFormat: 'dd/mm/yyyy',
							language:'es',
							autoclose: true, 
							todayHighlight: false,
							multidate: false
					    }).datepicker('setDate', new Date(fin[2],fin[1]-1,fin[0]));


					
						$('#diasLimiteCarga').val(data['diasLimiteCarga']);
						$('#presupuestoHabilitado').val(data['presupuestoHabilitado']);
						$('#web').val(data['web']);
						
										
						calcularCantidadNoches(data['fechaCheckin'], data['fechaCheckout']);
						
						seteaMesInversion(data['fechaInicio']);
	
					},
					clean: function(res){
			        	$('#idCongreso').val('');
						$('#nombreCongreso').val('');
						$('#lugarCongreso').val('');
						$('#fechaDesdeCongreso').val('');
						$('#fechaHastaCongreso').val('');
						$('#checkinHotel').datepicker('setDate', null);
						$('#checkoutHotel').datepicker('setDate', null);
						$('#fechaIda').datepicker('setDate', null);
						$('#fechaRegreso').datepicker('setDate', null);
						$('#diasLimiteCarga').val('');
						$('#presupuestoHabilitado').val('');
						$('#web').val('');
						$('#mesInversion').datepicker('setDate', null);
			        }
				});
				
				$('#btnNewCongreso').click(function() {
					window.open('/portal/p/1/RAF08-Congreso','_blank');
				});
				
				
				$('#tipoInscripcion').change(function() {
	
					if($('#tipoInscripcion').val() == "SOCIO"){
						$('.socio').show();
					}else{
						$('#nombreSociedad').val('');
						$('#numeroSocio').val('');
						$('.socio').hide();
					}
					
				});
				

				$('#checkinHotel, #checkoutHotel').change(function () {	
					calcularCantidadNoches($('#checkinHotel').val(), $('#checkoutHotel').val());
				});	
				
				$('#comparteHabitacion').change(function() {
					seleccionComparteHabitacion();
				});
				
				$('#tipoHabitacion').change(function() {
					seleccionTipoHabitacion();
				});
				
				$('#tipoInversion').change(function(){
					
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').val('');
					$('#selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').val('');
					
					arqFormOpts.habilitarCamposPorTipoInversion($('#tipoInversion').val());
					
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').change();
					
					habilitarPresupuesto();
					mostrarImputaciones();
					deshabilitarMesInversion();
					cleanImporteImputacion();
					validarMontoInversion();
					
				});
					

				$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').change(function() {
					
					habilitarPresupuesto();
					mostrarImputaciones();
					cleanImporteImputacion();
				});
				
				$('#selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').change(function() {
					mostrarImputaciones();
					presupuestosMarketing();
					cleanImporteImputacion();
				});

				
			},
			
			bpm: {
				"Inicio Solicitud": {
					task: [0,4],  
					custom: function() {
						
						arqFormOpts.habilitarCampos('onEdit');
						arqFormOpts.validarTablaImputaciones();
					
						if($('#esAPM').val() == 'true') {
							$('#nombreAPM').arqzoom('disabled',true);
						}else{
							$('#nombreAPM').attr("data-parsley-required", "true");
						}
						
						
						/*
						$('#moneda').arqzoom('setSelectedItem',{
					  		'codigo' : "PES",
							'descripcion' : "Pesos"
						});
						$("input[id^=codMoneda]").val("PES");
						*/
						
						arqFormOpts.cotizacionARS();
						arqFormOpts.cotizacionUSD();
				
					},
					'otherwise': function() {
						$('#tipoInversion').prop('disabled', true);
						$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
						
						if($('#incluyeAlojamiento').val() == "NO"){
							$('#selAlojamientoPresupuesto').prop('disabled', true);
						}
						if($('#incluyeTraslado').val() == "NO"){
							$('#selTrasladoPresupuesto').prop('disabled', true);
						}
						if($('#incluyeInscripcion').val() == "NO"){
							$('#selInscripcionPresupuesto').prop('disabled', true);
						}

					}
				},
				"Completar Inversion": {
					task: [12],  
					custom: function() {
						
						arqFormOpts.habilitarCampos('onEdit');
						arqFormOpts.validarTablaImputaciones();
						$('#nombreAPM').arqzoom('disabled',true);
						$('.apm').hide();
						
					},
					'otherwise': function() {
					}
				},
				"Revisar y Aprobar": {
					task: [7],  
					custom: function() {
					
						arqFormOpts.habilitarCampos('onEdit');
						arqFormOpts.validarTablaImputaciones();
						validarMontoInversion();
						$('.motivoRechazo').show();
						$('.motivoRechazo').prop('disabled', false);

					},
					'otherwise': function() {
					}
				},
				"Aprobar Gte Area": {
					task: [9],  
					custom: function() {
						arqFormOpts.habilitarCampos('onEdit');
						arqFormOpts.disableAllFields();
						$('.fluigicon-plus').remove();
						$('.fluigicon-trash').remove();
											
						if($('#notificacionGte').val() == 'true'){
							$('.divNotificacion').show();
						}
						$('.motivoRechazo').show();
						$('.motivoRechazo').prop('disabled', false);
						
					},
					'otherwise': function() {
						$('.divNotificacion').hide();
					}
				},
				"Aprobar Gte Promoción": {
					task: [19],  
					custom: function() {
						arqFormOpts.habilitarCampos('onEdit');
						arqFormOpts.disableAllFields();
						$(".fluigicon-plus").remove();
						$(".fluigicon-trash").remove();
						$('.motivoRechazo').show();
						$('.motivoRechazo').prop('disabled', false);
					},
					'otherwise': function() {
					}
				},
				"Medical": {
					task: [69],  
					custom: function() {
						arqFormOpts.disableAllFields();
						$(".fluigicon-plus").remove();
						$(".fluigicon-trash").remove();
						$('.motivoRechazo').hide();
						$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
						$('.esAPMRO').show();
						$('.apm').hide();
					},
					'otherwise': function() {
					}
				},
				"Ejecutar y Cerrar Inversión": {
					task: [41,63],  
					custom: function() {
						arqFormOpts.habilitarCampos('onEdit');
						arqFormOpts.disableAllFields();
						$('.fluigicon-plus').remove();
						$('.fluigicon-trash').remove();
						$('.motivoRechazo').hide();
					},
					'otherwise': function() { 
					}
				},
				"otherwise": { 
					custom: function() {
						// Si no aplica ninguna de las tareas. 
						arqFormOpts.disableAllFields();
						$('.hidden-print').hide();
						$('.motivoRechazo').hide();
					}
				}
			},
			
			ged: function() {
			}
		},
		
	    disableField: function(selector){
	    	if($(selector).arqzoom('instance')){
				$(selector).arqzoom('disabled', true);
			} else {
				$(selector).prop('disabled', true);
			}
	    },
	    
	    disableAllFields: function() {
	    	$('#arqForm :input:not(.tt-input, .tt-hint, [id^="__arqzoom__"])').each(function(){
	    		arqFormOpts.disableField(this);
	    	});
		},
		
		hideAllFields: function() {
			$(':input[type="text"][name="'+ listaCheckboxs[k] + '"]').prop('checked', true).change(); 
		},
		
		habilitarCampos: function(modo){

			if(modo == 'onView') {
				
				if($('#esAPM').val() == 'true'){
					// Nombre del APM, Gte de Distrito, nro Solicitud y nombre del médico.
					$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
					$('.esAPMRO, .montoInversion').show();
					$('.apm').hide();

				}else{ 
					arqFormOpts.habilitarCamposPorTipoInversion($('#tipoInversion').text());
					
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
					$('#selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);
					
					if($('#motivoRechazo').text() != '') {
						$('.motivoRechazo').show();
						$('.motivoRechazo').prop('disabled', false);
					}else{
						$('.motivoRechazo').hide();
						$('.motivoRechazo').prop('disabled', true);
					}	
				}
				
				mostrarImputaciones();
				habilitarPresupuesto();
				presupuestosMarketing();
				
				validarMontoInversion();
		
			}else{
				
				if($('#tipoInversion').val() == '') {
					$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
				} 
	
				arqFormOpts.habilitarCamposPorTipoInversion($('#tipoInversion').val());
				
				mostrarImputaciones();
				habilitarPresupuesto();
				deshabilitarMesInversion();
				presupuestosMarketing();
				
				validarMontoInversion();
			
			}
			 
		 },
		 
		 habilitarCamposPorTipoInversion : function(tipoInversion){
			 
			    if($('#esAPM').val() == 'true') {
					$('#importe').attr("data-parsley-required", "false");
				}

				if(tipoInversion == 'alojamientos' || tipoInversion == 'ALOJAMIENTO CONGRESO O EVENTO CIENTIFICO') {
					
					$('.aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').not('.alojamientos').find(':input').attr("data-parsley-required", "false");
					$('.aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
					$('.alojamientos').show();
					
					
					if($('#esAPM').val() != 'true') {
						$('.alojamientos').find(':input').attr("data-parsley-required", "true");
					}
					
					$('#comparteHabitacion').attr("data-parsley-required", "true");
					
					seleccionTipoHabitacion();

					$('.divSeleccion').show();
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "false");
					$('#incluyeAlojamiento').val('SI');
					$('#incluyeTraslado').val('NO');
					$('#incluyeInscripcion').val('NO');
					$('#selAlojamientoPresupuesto').prop('disabled', false);
					$('#selTrasladoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);

					
				} else if(tipoInversion == 'aereosNac' || tipoInversion == 'AEREO CONGRESO NACIONAL') {
					
					$('.alojamientos, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').not('.aereosNac').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .inscripciones, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
					$('.aereosNac').show();
					
					if($('#esAPM').val() != 'true') {
						$('.aereosNac').find(':input').attr("data-parsley-required", "true");
					}

					$('#nroVueloIda, #nroVueloRegreso').attr("data-parsley-required", "false");
					$('.divSeleccion').show();
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "false");
					$('#incluyeAlojamiento').val('NO');
					$('#incluyeTraslado').val('SI');
					$('#incluyeInscripcion').val('NO');
					$('#selTrasladoPresupuesto').prop('disabled', false);
					$('#selAlojamientoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);
					
				} else if(tipoInversion == 'inscripciones' || tipoInversion == 'INSCRIPCION A CONGRESO') {
					
					$('.alojamientos, .aereosNac, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').not('.inscripciones').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .aereosNac, .aereosInt, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
					$('.inscripciones').show();
					
					if($('#esAPM').val() != 'true') {
						$('.inscripciones').find(':input').attr("data-parsley-required", "true");
					}
					
					$('#nombreSociedad, #numeroSocio').attr("data-parsley-required", "false");
					
					if($('#tipoInscripcion').val() == "SOCIO" || $('#tipoInscripcion').text() == "Socio"){
						$('.socio').show();
					}else{
						$('#nombreSociedad').val('');
						$('#numeroSocio').val('');
						$('.socio').hide();
					}
					
					$('.divSeleccion').show();
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "false");
					$('#incluyeAlojamiento').val('NO');
					$('#incluyeTraslado').val('NO');
					$('#incluyeInscripcion').val('SI');
					$('#selInscripcionPresupuesto').prop('disabled', false);
					$('#selAlojamientoPresupuesto, #selTrasladoPresupuesto').prop('disabled', true);
					
				} else if(tipoInversion == 'aereosInt' || tipoInversion == 'AEREO CONGRESO INTERNACIONAL') {
					
					$('.alojamientos, .aereosNac, .inscripciones, .equipamientos, .becaNac, .becaInt, .patrocinio').not('.aereosInt').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .aereosNac, .inscripciones, .equipamientos, .becaNac, .becaInt, .patrocinio').hide();
					$('.aereosInt').show();
					
					if($('#esAPM').val() != 'true') {
						$('.aereosInt').find(':input').attr("data-parsley-required", "true");
					}
					
					$('#nroVueloIda, #nroVueloRegreso').attr("data-parsley-required", "false");
	
					$('.divSeleccion').show();
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "false");
					$('#incluyeAlojamiento').val('NO');
					$('#incluyeTraslado').val('SI');
					$('#incluyeInscripcion').val('NO');
					$('#selTrasladoPresupuesto').prop('disabled', false);
					$('#selAlojamientoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);
					
				} else if(tipoInversion == 'equipamientos' || tipoInversion == 'EQUIPAMIENTO MEDICO') {
					
					$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .becaNac, .becaInt, .patrocinio').not('.equipamientos').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .aereosNac, .inscripciones, .aereosInt, .becaNac, .becaInt, .patrocinio').hide();
					$('.equipamientos').show();
					
					if($('#esAPM').val() != 'true') {
						$('.equipamientos').find(':input').attr("data-parsley-required", "true");
					}
					
					$('.divSeleccion').show();
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', true);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "false");
					$('#incluyeAlojamiento').val('NO');
					$('#incluyeTraslado').val('NO');
					$('#incluyeInscripcion').val('NO');
					
				} else if(tipoInversion == 'becaNac' || tipoInversion == 'BECA COMPLETA/PARCIAL NACIONAL') {
					
					$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaInt, .patrocinio').not('.becaNac').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaInt, .patrocinio').hide();
					$('.becaNac').show();
					
					$('#lugarCongreso, #fechaDesdeCongreso, #fechaHastaCongreso, #cantidadNoche, #tipoHabitacion, #fechaIda, #nroVueloIda, #fechaRegreso, #nroVueloRegreso').attr("data-parsley-required", "false");
					$('#tituloGrado,#institucionDondeObtuvo,#anioEgreso,#matricula,#institucionQueTrabaja,#cargoPosicion,#membresia,#tipoInscripcion,#nombreSociedad, #numeroSocio').attr("data-parsley-required", "false");

					if($('#tipoInscripcion').val() == "SOCIO" || $('#tipoInscripcion').text() == "Socio"){
						$('.socio').show();
					}else{
						$('#nombreSociedad').val('');
						$('#numeroSocio').val('');
						$('.socio').hide();
					}
					
					seleccionTipoHabitacion();
					
					$('.divSeleccion').show();
					
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', false);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "true");

					
				} else if(tipoInversion == 'becaInt' || tipoInversion == 'BECA COMPLETA/PARCIAL INTERNACIONAL') {
					
					$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .patrocinio').not('.becaInt').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .aereosNac, .inscripciones, .aereosInt, .equipamientos, .becaNac, .patrocinio').hide();
					$('.becaInt').show();
					
					$('#lugarCongreso, #fechaDesdeCongreso, #fechaHastaCongreso, #cantidadNoche, #tipoHabitacion, #fechaIda, #nroVueloIda, #fechaRegreso, #nroVueloRegreso').attr("data-parsley-required", "false");
					$('#tituloGrado,#institucionDondeObtuvo,#anioEgreso,#matricula,#institucionQueTrabaja,#cargoPosicion,#membresia,#tipoInscripcion,#nombreSociedad, #numeroSocio').attr("data-parsley-required", "false");

					if($('#tipoInscripcion').val() == "SOCIO" || $('#tipoInscripcion').text() == "Socio"){
						$('.socio').show();
					}else{
						$('#nombreSociedad').val('');
						$('#numeroSocio').val('');
						$('.socio').hide();
					}

					seleccionTipoHabitacion();
										
					$('.divSeleccion').show();
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').prop('disabled', false);
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion').attr("data-parsley-required", "true");
					
					$('#selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);
					
				} else if(tipoInversion == 'patrocinio' || tipoInversion == 'PATROCINIO EDUCACION MEDICA') {
					
					$('.alojamientos, .aereosNac, .inscripciones, .aereosInt, .becaNac, .becaInt, .equipamientos').not('.patrocinio').find(':input').attr("data-parsley-required", "false");
					$('.alojamientos, .alojamientosLegend, .aereosNac, .inscripciones, .aereosInt, .becaNac, .becaInt, .equipamientos').hide();
					$('.patrocinio').show();
					
					if($('#esAPM').val() != 'true') {
						$('.patrocinio').find(':input').attr("data-parsley-required", "true");
					}
					
					$('.divSeleccion').hide();
					$('#incluyeAlojamiento').val('NO');
					$('#incluyeTraslado').val('NO');
					$('#incluyeInscripcion').val('NO');
					$('#incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion, #montoInversion').attr("data-parsley-required", "false");
					
					$('#montoInversion').val('');
					$('#montoInversion').attr("data-parsley-required", "false");
			
				}
				
				$('#cartaPetitorio, #cartaPetitorioDocumentId, #cartaAcuerdo, #cartaAcuerdoDocumentId, #flyer, #flyerDocumentId').attr("data-parsley-required", "false");
				$('#comentariosAlojamiento, #tipoHabitacion, #comentariosIda, #comentariosRegreso, #comparteHabitacion, #comentariosCongreso, #web').attr("data-parsley-required", "false");
				$('#nombreHotel, #contactoHotel, #telefonoHotel').attr("data-parsley-required", "false");

		 },
		 
		 obtenerPresupuestoConsumidoARS: function(codGrupoGteDistrito, codigoProducto, tr){
				
				$.ajax({
					type: "POST",
					url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
					contentType: "application/json; charset=utf-8",
					dataType: "json",				
					data: JSON.stringify({
						name : 'RAF08-Presupuestos',
						constraints: [
						   {
							  _field: "codGrupoGteDistrito",
							  _initialValue: codGrupoGteDistrito,
							  _finalValue: codGrupoGteDistrito,
							  _type: 1
						   },{
							  _field: "codigoProducto",
							  _initialValue: codigoProducto,
							  _finalValue: codigoProducto,
							  _type: 1
						   }
						]
					})
				})
				.done(function(dataset) {
					
					if (dataset.values.length > 0){
						$('.presupuestoARS', tr).val(dataset.values[0]["montoPresupuestado"]);
						$('.consumidoARS', tr).val(dataset.values[0]["montoConsumido"]);
					}else{
						$('.presupuestoARS', tr).val(0);
						$('.consumidoARS', tr).val(0);
					}
					
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					alert('No se pudo encontrar el presupuesto.');
				});		
	
		 },
		 
		 cotizacionARS: function(){
				
				$.ajax({
					type: "POST",
					url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
					contentType: "application/json; charset=utf-8",
					dataType: "json",				
					data: JSON.stringify({
						name : 'RAF08-Cotizaciones',
						constraints: [
						   {
							  _field: "codigoMoneda2",
							  _initialValue: $('#codMoneda').val(),
							  _finalValue: $('#codMoneda').val(),
							  _type: 1
						   },{
							  _field: "codigoMoneda1",
							  _initialValue: "PES",
							  _finalValue: "PES",
							  _type: 1
						   }
						]
					})
				})
				.done(function(dataset) {
					
					$('#tipoCambioARS').prop('readonly', false);
					$('#tipoCambioARS').val(dataset.values[0]["cotizacion"]);
					$('#tipoCambioARS').prop('readonly', true);
					
					arqFormOpts.calcularImportes($('#tipoCambioARS').val(), $('#tipoCambioUSD').val());
					
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					alert('No se pudo encontrar cotizaciones.');
				});		
	
		 },
		 
		 cotizacionUSD: function(){
			
			$.ajax({
				type: "POST",
				url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
				contentType: "application/json; charset=utf-8",
				dataType: "json",				
				data: JSON.stringify({
					name : 'RAF08-Cotizaciones',
					constraints: [
					   {
						  _field: "codigoMoneda2",
						  _initialValue: $('#codMoneda').val(),
						  _finalValue: $('#codMoneda').val(),
						  _type: 1
					   },{
						  _field: "codigoMoneda1",
						  _initialValue: "USD",
						  _finalValue: "USD",
						  _type: 1
					   }
					]
				})
			})
			.done(function(dataset) {	
				
				$('#tipoCambioUSD').prop('readonly', false);
				$('#tipoCambioUSD').val(dataset.values[0]["cotizacion"]);
				$('#tipoCambioUSD').prop('readonly', true);
				
				arqFormOpts.calcularImportes($('#tipoCambioARS').val(), $('#tipoCambioUSD').val());
				
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert('No se pudo encontrar cotizaciones.');
			});		
	
		 },
		 
		 calcularImportes: function(tipoCambioARS, tipoCambioUSD){
			 
			if(!($('#importe').val() == "" || tipoCambioARS == "" || tipoCambioUSD == "")){
				$('#importeARS').val((parseFloat($('#importe').val()) * parseFloat(tipoCambioARS)).toFixed(2));
				$('#importeUSD').val((parseFloat($('#importe').val()) * parseFloat(tipoCambioUSD)).toFixed(2));
			}else{
				$('#importeARS').val("");
				$('#importeUSD').val("");
			}
			
			arqFormOpts.validarTablaImputaciones();
			
		 },
		 
		validarTablaImputaciones: function(){
				 
			$("#tblImputaciones tbody tr:gt(0)").each(function(i, tr){
				
			   arqFormOpts.validarPresupuesto(tr);
				
			}); 
		},
		
		validarPresupuesto: function(tr){
	
			 var porcentajeImporteARS = (parseFloat($('.porcentajeImputado', tr).val()) * parseFloat($('#importeARS').val())).toFixed(2)/100;
			 var disponibleARS = parseFloat($('.presupuestoARS', tr).val()) - parseFloat($('.consumidoARS', tr).val());
 
			 if(porcentajeImporteARS > disponibleARS){
				 $('.porcentajeImputado', tr).css({'background':'#ffc107'});
				 $('.divFueraPresupuesto', tr).show();
			 }else{
				$('.porcentajeImputado', tr).css({'background':'#ffffff'});
				$('.divFueraPresupuesto', tr).hide();
			 }
	
		 }
		 
	};
	
	
	function validarPorcentaje(){
		var suma = 0;
		
		$('.porcentajeImputado', $('#tblImputaciones')).each(function(i, elem){
			if(i!=0){
				suma += parseFloat($(this).val() || 0);
				
				console.log("sumando.. " + suma);
				console.log("calculando " + parseFloat($(this).val() || 0));
			}
			
		}); 
		
		$('#porcentajeImputadoTotal').prop('readonly', false);
		$('#porcentajeImputadoTotal').val(suma);
		$('#porcentajeImputadoTotal').prop('readonly', true);
		
		console.log("porcentajeImputadoTotal.. " + suma);
		
		if(suma == 100){
			$('.divPresupuesto').hide();
		}else{
			$('.divPresupuesto').show();
		}
		
	}
	
	function parseValor(valor) {
		var num = parseFloat(valor);
		if(isNaN(num) || num == "" || num == null){
			num = 0;
		}
		return num;
	}
	
	function pad(s){
		return (s < 10) ? '0' + s : s;
	}
	
	function corregirCampoFecha(value){
		console.log("*** Fecha a modificar " + value );
		var date = value;
		
		if (value != null && value != ""){
		  
			var fechaArray = value.split("-");
		  	if (fechaArray.length > 1) {
		   		var date =  fechaArray[2]+"/"+fechaArray[1]+"/"+fechaArray[0];
				console.log("*** Fue modificado el campo " + date );
		  	}  
		 }
	
		return date;
	}
	
	function mostrarImputaciones(){

		if($('#selAlojamientoPresupuesto').val() == "DELEGADO" ||
				$('#selTrasladoPresupuesto').val() == "DELEGADO" ||
				$('#selInscripcionPresupuesto').val() == "DELEGADO" ||
				$('#selAlojamientoPresupuesto').text() == "Delegado" ||
				$('#selTrasladoPresupuesto').text() == "Delegado" ||
				$('#selInscripcionPresupuesto').text() == "Delegado" 
				){ 
				    if($('#esAPM').val() == 'true') {
						$('#importe, #moneda, #formaPago').attr("data-parsley-required", "false");
					}else{
						$('.inversion, .montoInversion').show();
						$('#importe, #moneda, #formaPago').attr("data-parsley-required", "true");
						$('#montoInversion').attr("data-parsley-required", "false");
					}
		}else{
		
			if($('#tipoInversion').val() == 'patrocinio' || $('#tipoInversion').text() == 'PATROCINIO EDUCACION MEDICA'){
				$('.inversion').show();
				$('#importe, #moneda, #formaPago').attr("data-parsley-required", "true");
			}else{ 
				$('.inversion').hide();
				$('#importe, #moneda, #formaPago').attr("data-parsley-required", "false");
			}
		}
	}
	
	function habilitarPresupuesto(){
		
		if($('#incluyeAlojamiento').val() == "SI" || $('#incluyeAlojamiento').text() == "SI"){
			$('.isAlojamiento').show();
			$('.selAlojamientoPresupuesto').attr("data-parsley-required", "true"); 
			$('.selAlojamientoPresupuesto').prop('disabled', false);
			$('#comparteHabitacion, #tipoHabitacion, #checkinHotel, #checkoutHotel').attr("data-parsley-required", "true");
		}else{
			$('.isAlojamiento').hide();
			$('#selAlojamientoPresupuesto').val('');
			$('.selAlojamientoPresupuesto').attr("data-parsley-required", "false");
			$('.selAlojamientoPresupuesto').prop('disabled', true);
			$('#comparteHabitacion, #tipoHabitacion, #checkinHotel, #checkoutHotel').attr("data-parsley-required", "false");
		}
		
		if($('#incluyeTraslado').val() == "SI" || $('#incluyeTraslado').text() == "SI"){
			$('.isTraslado').show();
			$('.selTrasladoPresupuesto').attr("data-parsley-required", "true");
			$('.selTrasladoPresupuesto').prop('disabled', false);
		}else{
			$('.isTraslado').hide();
			$('#selTrasladoPresupuesto').val('');
			$('.selTrasladoPresupuesto').attr("data-parsley-required", "false");
			$('.selTrasladoPresupuesto').prop('disabled', true);
		}

		if($('#incluyeInscripcion').val() == "SI" || $('#incluyeInscripcion').text() == "SI"){
			$('.isInscripcion').show();
			$('.selInscripcionPresupuesto').attr("data-parsley-required", "true");
			$('.selInscripcionPresupuesto').prop('disabled', false);
		}else{
			$('.isInscripcion').hide();
			$('#selInscripcionPresupuesto').val('');
			$('.selInscripcionPresupuesto').attr("data-parsley-required", "false");
			$('.selInscripcionPresupuesto').prop('disabled', true);
		}
		
		if($('#esAPM').val() == 'true') {
			$('#selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').attr("data-parsley-required", "false");
			$('.selAlojamientoPresupuesto, .selTrasladoPresupuesto, .selInscripcionPresupuesto').hide();	
		}
		
		$('#mesInversion').attr("data-parsley-required", "true");

}

function presupuestosMarketing(){
	
	if((($('#incluyeAlojamiento').val() == "SI" || $('#incluyeAlojamiento').text() == "SI") && 
		($('#incluyeTraslado').val() == "SI" || $('#incluyeTraslado').text() == "SI") && 
		($('#incluyeInscripcion').val() == "SI" || $('#incluyeInscripcion').text() == "SI"))
		&& (($('#selAlojamientoPresupuesto').text() == "Marketing" || $('#selAlojamientoPresupuesto').val() == "MARKETING") && 
		($('#selTrasladoPresupuesto').text() == "Marketing" || $('#selTrasladoPresupuesto').val() == "MARKETING") && 
		($('#selInscripcionPresupuesto').text() == "Marketing" || $('#selInscripcionPresupuesto').val() == "MARKETING"))
	){
		$('.inversion, .montoInversion').hide();
		$('#importe, #moneda, #formaPago, #montoInversion').attr("data-parsley-required", "false");
	}

	if((($('#incluyeAlojamiento').val() == "SI" || $('#incluyeAlojamiento').text() == "SI") && 
		($('#incluyeTraslado').val() == "NO" || $('#incluyeTraslado').text() == "NO") && 
		($('#incluyeInscripcion').val() == "NO" || $('#incluyeInscripcion').text() == "NO"))
	&& ($('#selAlojamientoPresupuesto').text() == "Marketing" || $('#selAlojamientoPresupuesto').val() == "MARKETING")
	){
		$('.inversion, .montoInversion').hide();
		$('#importe, #moneda, #formaPago, #montoInversion').attr("data-parsley-required", "false");
		
		//$(' #nombreHotel').attr("data-parsley-required", "true");
	}

	if((($('#incluyeAlojamiento').val() == "NO" || $('#incluyeAlojamiento').text() == "NO") && 
		($('#incluyeTraslado').val() == "SI" || $('#incluyeTraslado').text() == "SI") && 
		($('#incluyeInscripcion').val() == "NO" || $('#incluyeInscripcion').text() == "NO"))
	&& ($('#selTrasladoPresupuesto').text() == "Marketing" || $('#selTrasladoPresupuesto').val() == "MARKETING")
	){
		$('.inversion, .montoInversion').hide();
		$('#importe, #moneda, #formaPago, #montoInversion').attr("data-parsley-required", "false");
	}
	
	if((($('#incluyeAlojamiento').val() == "NO" || $('#incluyeAlojamiento').text() == "NO") && 
		($('#incluyeTraslado').val() == "NO" || $('#incluyeTraslado').text() == "NO") && 
		($('#incluyeInscripcion').val() == "SI" || $('#incluyeInscripcion').text() == "SI"))
	&& ($('#selInscripcionPresupuesto').text() == "Marketing" || $('#selInscripcionPresupuesto').val() == "MARKETING")
	){
		$('.inversion, .montoInversion').hide();
		$('#importe, #moneda, #formaPago, #montoInversion').attr("data-parsley-required", "false");
	}

}

function calcularCantidadNoches(fechaCheckin, fechaCheckout){
	
	var inicio = fechaCheckin.split("/");
	var fin = fechaCheckout.split("/");	
	var fi = new Date(inicio[2]+"-"+inicio[1]+"-"+inicio[0]).getTime();
	var ff = new Date(fin[2]+"-"+fin[1]+"-"+fin[0]).getTime();
	var diff = ff - fi;
	
	$('#cantidadNoche').val(diff/(1000*60*60*24));
}

function deshabilitarMesInversion(){
	if($('#tipoInversion').val() == 'patrocinio'){
		$("#mesInversion").prop('disabled', false);
		$("#mesInversion").next('span').show();
	}else{ 
		if($('#nombreCongreso').val() != ""){
			seteaMesInversion($('#fechaDesdeCongreso').val());
		}
	}
}

function seteaMesInversion(fecha){

		var mesInversion = fecha.split("/");
	
		$("#mesInversion").datepicker({
	       	language:'es', 
			format:'mm/yyyy', 
			autoclose: true, 
			multidate: false,
			startView: "months", 
			minViewMode: "months" 
	    }).datepicker('setDate', new Date(mesInversion[2],mesInversion[1]-1));
		
		$("#mesInversion").prop('disabled', true);
		$("#mesInversion").next('span').hide();
}

function seleccionComparteHabitacion(){
	
	if($('#comparteHabitacion').val() == "SI" || $('#comparteHabitacion').text() == "SI"){
		$('#tipoHabitacion').prop('disabled', false);
		$("select[id^=tipoHabitacion]").val('');
		$('#nombreMedico1, #nombreMedico2, #contactoMedico1, #contactoMedico2').val('');
		$('.nombreMedico1, .nombreMedico2').hide();
		$('#nombreMedico1, #nombreMedico2, #contactoMedico1, #contactoMedico2').attr("data-parsley-required", "false");
	}else{ 
		$('#nombreMedico1, #nombreMedico2, #contactoMedico1, #contactoMedico2').attr("data-parsley-required", "false");
		$('#nombreMedico1, #contactoMedico1').val('');
		$('#nombreMedico2, #contactoMedico2').val('');
		$('.nombreMedico1, .nombreMedico2').hide();
		
		$("select[id^=tipoHabitacion]").val("SIMPLE");
		$('#tipoHabitacion').prop('disabled', true);
	}
}
					
function seleccionTipoHabitacion(){ 
	if($('#tipoHabitacion').val() == "MATRIMONIAL" || $('#tipoHabitacion').text() == "Matrimonial" ||
		$('#tipoHabitacion').val() == "TWIN" || $('#tipoHabitacion').text() == "Twin"){
		$('.nombreMedico1').show();
		$('.nombreMedico2').hide();
		$('#nombreMedico1').attr("data-parsley-required", "true");
		$('#nombreMedico2, #contactoMedico1, #contactoMedico2').attr("data-parsley-required", "false");
	}else if($('#tipoHabitacion').val() == "TRIPLE" || $('#tipoHabitacion').text() == "Triple"){
		$('.nombreMedico1, .nombreMedico2').show();
		$('#nombreMedico1, #nombreMedico2, #contactoMedico1, #contactoMedico2').attr("data-parsley-required", "true");
	}else{
		$('#nombreMedico1, #nombreMedico2, #contactoMedico1, #contactoMedico2').attr("data-parsley-required", "false");
		$('#nombreMedico1, #nombreMedico2, #contactoMedico1, #contactoMedico2').val('');
		$('.nombreMedico1, .nombreMedico2').hide();
	
		$("select[id^=tipoHabitacion]").val("SIMPLE");
		$('#tipoHabitacion').prop('disabled', true);
		$("select[id^=comparteHabitacion]").val("NO")
	}	
}

function cleanImporteImputacion(){
	
	if($('#importe').val() !== "" || $('#importe').val() === undefined){
		$('#importe').val("").change();
	}
	
	$('#importeARS').val('');
	$('#importeUSD').val('');
	$('#tipoCambioARS').val('');
	$('#tipoCambioUSD').val('');
	$('#tipoCambioARS, #tipoCambioUSD').attr("data-parsley-required", "false");
	$("#tblImputaciones tr:gt(1)").remove();
	$('#porcentajeImputadoTotal').prop('readonly', false);
	$('#porcentajeImputadoTotal').val('');
	$('#porcentajeImputadoTotal').prop('readonly', true);
	$('.divPresupuesto').hide();
	
	if($('#moneda').val() != ''){
		$('#moneda').arqzoom('setSelectedItem','');
		$("input[id^=codMoneda]").val('');
	}					

	if($('#formaPago').val() != ''){
		$('#formaPago').arqzoom('setSelectedItem','');
		$('#codFormaPago').val('');
	}
}

function validarMontoInversion(){
	if($('#esAPM').val() == 'true') {
		$('#montoInversion').attr("data-parsley-required", "true");
	}else{
		//$('#montoInversion').prop('readonly', true);
		$('#montoInversion').attr("data-parsley-required", "false");
	}
	
}
			