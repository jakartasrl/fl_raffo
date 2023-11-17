var	arqForms = {
	initForm: function(formType) {
		
		$("#tablaDetalleCompetencias").ecmmasterdetail();
		$("#tablaBeneficios").ecmmasterdetail();
		
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
		
		var ingresoPersonal = $('#ingresoPersonal').html();
		
		if(ingresoPersonal == 'PE'){

			$('.pe').show();
			$('.apm, .apf').hide();
			$('.apmapf').hide();
			
		}else if(ingresoPersonal == 'APM'){
			
			$('.apm').show();
			$('.apmapf').show();
			$('.apf, .pe').hide();
			
		}else if(ingresoPersonal == 'APF'){
			
			$('.apf').show();
			$('.apmapf').show();
			$('.apm, .pe').hide();
			
		}

	},
	
	onEdit: function() {
		
		convierteAMayusculas();
		

		//Manejo de Fechas		
		$('#fechaRelevamientoPerfil').ecmdatetimepicker({
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
		
		$('#fechaIngresoNecesaria').ecmdatetimepicker({
			pickTime: false, 
			language:'es', 
			format:'mm/yyyy',
			firstDay: 1,
			autoclose: true, 
			todayHighlight: true,
			startDate: date
		});
		
		var lista = ['nroSolicitud','documentid', 'version','ingresoPersonal','fechaRelevamientoPerfil','fechaIngresoNecesaria','codigoBusqueda','nombreBusqueda','puesto',
						 'nombrePuestoNuevo','categoria','gerencia','area','sector','subsector','aperturaPorSector','lineaEspecialidad',
						 'zona','centroCosto','reportaa','cargo','sugiereAlguien','tipoPosicion','nombreReemplazo','motivoReemplazo','observaciones',
						 'cantidadMeses','motivoPuestoNuevo','pea','personalACargo','clientesInternos','proveedoresInternos','contactoConClientes','detalleMaquinas',
						 'proyeccionPosicion','ciudadZonasVisitar','giras','productosManejar','coordinacionAccionesFidelizar','analisisInformacionAuditoria',
						 'tareasAdministrativasVarias','franjaEdadDesde','franjaEdadHasta','genero','carrera','origenMatricula','descExperienciaLaboralReq',
						 'habilidadesNecesarias','experienciaPreviaComoAPM','experienciaPreviaEnVentas','experienciaPreviaComoAPF','visitadoEspecialidadesMedicos',
						 'conocimientoLineasProductos','provengaDeLaboratorios','conozcaLasAuditorias','otros','nivel','otras',
						 'aspectosCriticosPuesto','sede','ubicacionFisica','horarioDesde','horarioHasta','horasExtras','viajes','remuneracionBrutaDesde',
						 'remuneracionBrutaHasta','convenio','categoriaConvenio','obraSocial','planes','comentariosBeneficios','adicionalEstudioPreocupacional',
						 'tipoEstudioPsicotecnico','personasConDiscapacidad','derivacionJobPosting','jefe','gerenteN2','gerenteN1','observacionesGralesProceso',
						 'busquedaConfidencial','efectivoTemporario','manejoInfoConfidencial','esfuerzoFisico','exposicionMaterialesQuimicos','visitaInstituciones',
		                 'administraMuestrasMedicas','visitaFarmacias','gerenteGeneral',
		                 'puestoNuevo','junior','semiSenior','senior','noCorresponde','secundarioCompleto','teciarioCurso',
		                 'terciarioGraduado','universitarioCurso','universitarioGraduado','posgradoCurso','posgradoGraduado',
		                 'jefeMatricula','gerenteN1Matricula','gerenteN2Matricula'];	
		
		var listaRadios = ['busquedaConfidencial','efectivoTemporario','manejoInfoConfidencial','esfuerzoFisico','exposicionMaterialesQuimicos','visitaInstituciones',
		                   'administraMuestrasMedicas','visitaFarmacias','gerenteGeneral'];
		
		var listaCheckboxs = ['puestoNuevo','junior','semiSenior','senior','noCorresponde','secundarioCompleto','teciarioCurso',
		                      'terciarioGraduado','universitarioCurso','universitarioGraduado','posgradoCurso','posgradoGraduado'];
		
		
		//ECM Zooms
		$('#historialBusquedas').ecmzoom({
			datasetId: 'RAF05-FormularioPrincipal',
			dataFields: [
				{id: 'nroSolicitud', value: 'Nro. Solicitud'},
				{id: 'codigoBusqueda', value: 'Código de Búsqueda'},
				{id: 'nombreBusqueda', value: 'Nombre de la Búsqueda'}
			],  
			filterValues: [{ id: 'metadata_active', value: true},{ id: 'matriculaSolicitante', value: $('#matriculaSolicitante').val()}], 
			resultFields: lista,
			callback: function(res){
				
				if ((typeof res['nroSolicitud'] !== "undefined") && (res['nroSolicitud'] !== null)) {
					
						
					$('#historialBusquedas').val(res['nroSolicitud'] + ' - ' + res['codigoBusqueda'] + ' - ' + res['nombreBusqueda']).change();
					
					for(var i = 3; i < lista.length; i++){
						$('#' + lista[i]).val(res[lista[i]]); 
					}
					
					//para ocultar los campos que estaba hide
					//para un determinado ingresoPersonal
					$('#ingresoPersonal').change();
					$('#nivel').val(res['nivel']);
					
					for(var j = 0; j < listaRadios.length; j++){
						$('input[type="radio"][name="'+ listaRadios[j] + '"][value=' + res[listaRadios[j]] + ']').prop('checked',true); 
					}
						
					for(var k = 0; k < listaCheckboxs.length; k++){
						if(res[listaCheckboxs[k]] != null){
							$(':input[type="checkbox"][name="'+ listaCheckboxs[k] + '"]').prop('checked',true); 
						}
					}	
					
					$("#tablaQuienesEntrevistan tr:gt(1)").remove();
					var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("documentid", res[lista[1]], res[lista[1]], ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("version", res[lista[2]], res[lista[2]], ConstraintType.MUST);
					var c4 = DatasetFactory.createConstraint("tablename", "tablaQuienesEntre", "tablaQuienesEntre", ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c1,c2,c3,c4], null);
					  
					for (var i = 0; i < dataset.values.length; i++) {
						
						var $row = $("#tablaQuienesEntrevistan").ecmmasterdetail("addNewRow");
						
						$('.quienesEntrevistan', $row).val(dataset.values[i]["quienesEntrevistan"]);
	
					}
					
					$("#tablaTareasOrdenPrioridad tr:gt(1)").remove();
					var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("documentid", res[lista[1]], res[lista[1]], ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("version", res[lista[2]], res[lista[2]], ConstraintType.MUST);
					var c4 = DatasetFactory.createConstraint("tablename", "tablaTareasOrdenPrio", "tablaTareasOrdenPrio", ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c1,c2,c3,c4], null);
					  
					for (var i = 0; i < dataset.values.length; i++) {
						  
						var $row = $("#tablaTareasOrdenPrioridad").ecmmasterdetail("addNewRow");
						
						$('.detalleAccion', $row).val(dataset.values[i]["detalleAccion"]);
	
					}
				
					$("#tablaIdiomas tr:gt(1)").remove();
					var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("documentid", res[lista[1]], res[lista[1]], ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("version", res[lista[2]], res[lista[2]], ConstraintType.MUST);
					var c4 = DatasetFactory.createConstraint("tablename", "tablaIdiom", "tablaIdiom", ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c1,c2,c3,c4], null);
					  
					for (var i = 0; i < dataset.values.length; i++) {
					  	
						var $row = $("#tablaIdiomas").ecmmasterdetail("addNewRow");
						
						$('.idiomas', $row).val(dataset.values[i]["idiomas"]);
						$('.nivelLectura[value=' + dataset.values[i]["nivelLectura"] + ']', $row).prop('checked',true);
						$('.nivelEscrito[value=' + dataset.values[i]["nivelEscrito"] + ']', $row).prop('checked',true);
						$('.nivelOral[value=' + dataset.values[i]["nivelOral"] + ']', $row).prop('checked',true);
						
					}
					
					$("#tablaProgramasInformatica tr:gt(1)").remove();
					var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("documentid", res[lista[1]], res[lista[1]], ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("version", res[lista[2]], res[lista[2]], ConstraintType.MUST);
					var c4 = DatasetFactory.createConstraint("tablename", "tablaProgramasInformat", "tablaProgramasInformat", ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c1,c2,c3,c4], null);
					  
					for (var i = 0; i < dataset.values.length; i++) {
					  	
						var $row = $("#tablaProgramasInformatica").ecmmasterdetail("addNewRow");
	
						$('.programasInformatica', $row).val(dataset.values[i]["programasInformatica"]);
						$('.programasInformaticaNivel[value=' + dataset.values[i]["programasInformaticaNivel"] + ']', $row).prop('checked',true);
	
					}
					
					$("#tablaDetalleCompetencias tr:gt(1)").remove();
					var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("documentid", res[lista[1]], res[lista[1]], ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("version", res[lista[2]], res[lista[2]], ConstraintType.MUST);
					var c4 = DatasetFactory.createConstraint("tablename", "tablaDetalleComp", "tablaDetalleComp", ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c1,c2,c3,c4], null);
					  
					for (var i = 0; i < dataset.values.length; i++) {
					  	
						var $row = $("#tablaDetalleCompetencias").ecmmasterdetail("addNewRow");
						
						$('.competencia', $row).val(dataset.values[i]["competencia"]);
						$('.nivelCompetencia', $row).val(dataset.values[i]["nivelCompetencia"]);
						$('.descripcionAmpliada', $row).val(dataset.values[i]["descripcionAmpliada"]);
	
					}
					
					$("#tablaBeneficios tr:gt(1)").remove();
					var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("documentid", res[lista[1]], res[lista[1]], ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("version", res[lista[2]], res[lista[2]], ConstraintType.MUST);
					var c4 = DatasetFactory.createConstraint("tablename", "tablaBenef", "tablaBenef", ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c1,c2,c3,c4], null);
					  
					for (var i = 0; i < dataset.values.length; i++) {
					  	
						var $row = $("#tablaBeneficios").ecmmasterdetail("addNewRow");
						
						$('.beneficios', $row).val(dataset.values[i]["beneficios"]);
						
						if(dataset.values[i]["beneficiosChck"] != null){
							$('.beneficiosChck', $row).prop('checked',true); 
						}else{
							$('.beneficiosChck', $row).prop('checked',false);
						}
						
					}
				
				}
			
			},
			clean: function(field) {
	
				$('input[type=text]').val('').change();
				$('textarea').val('').change();
				$(':checkbox').prop('checked',false).change();
				$(':radio').prop('checked',false).change();
				$('#personalACargo').val(0).change();
				$('.programasInformaticaNivel').attr('checked', false); 
				
				$("#tablaQuienesEntrevistan tr:gt(1)").remove();
				$("#tablaTareasOrdenPrioridad tr:gt(1)").remove();
				$("#tablaIdiomas tr:gt(1)").remove();
				$("#tablaProgramasInformatica tr:gt(1)").remove();
				$("#tablaDetalleCompetencias tr:gt(1)").remove();
				$("#tablaBeneficios tr:gt(1)").remove();
				cargarTablaBeneficios();
			}
		});
		
		$('#puesto').ecmzoom({
			datasetId: 'RAF-Puestos',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#puesto').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#puesto').val('').change();
				$('#puestoNuevo').prop('checked',false).change();
				$('#nombrePuestoNuevo').val('').change();
			}
		});
		
		$('#categoria').ecmzoom({
			datasetId: 'RAF-Categorias',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#categoria').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#categoria').val('').change();
			}
		});
		
		$('#gerencia').ecmzoom({
			datasetId: 'RAF-Gerencias',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#gerencia').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#gerencia').val('').change();
			}
		});
		
		$('#area').ecmzoom({
			datasetId: 'RAF-Areas',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#area').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#area').val('').change();
			}
		});
		
		$('#sector').ecmzoom({
			datasetId: 'RAF-Sectores',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#sector').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#sector').val('').change();
			}
		});
		
		$('#subsector').ecmzoom({
			datasetId: 'RAF-Subsectores',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#subsector').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#subsector').val('').change();
			}
		});
		
		$('#aperturaPorSector').ecmzoom({
			datasetId: 'RAF-AperturasPorSector',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#aperturaPorSector').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#aperturaPorSector').val('').change();
			}
		});
		
		$('#lineaEspecialidad').ecmzoom({
			datasetId: 'RAF-LineasEspecialidad',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#lineaEspecialidad').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#lineaEspecialidad').val('').change();
			}
		});
		
		$('#reportaaBuscar').ecmzoom({
			datasetId: 'RAF-Empleados',
			dataFields: [
				{id: 'nombre', value: 'Nombre'},
				{id: 'cargo', value: 'Cargo'}
			],  
			resultFields: ['nombre', 'cargo'],
			callback: function(res){
				$('#reportaa').val(res['nombre']).change();
				$('#cargo').val(res['cargo'] ).change();
			},
			clean: function(field) {
				$('#reportaa').val('').change();
				$('#cargo').val('').change();
				$('#reportaaBuscar').val('').change();
			}
		})
		.blur(function(){
			$(this).ecmzoom("option", "filterValues", [{id: 'nombre', value: $(this).val()}]);
		});
		
		$('#sugiereAlguien').ecmzoom({
			datasetId: 'RAF-Empleados',
			dataFields: [
				{id: 'nombre', value: 'Nombre'},
				{id: 'cargo', value: 'Cargo'}
			],  
			filterValues: [{ id: 'nombre', value: $('#sugiereAlguien').val()}],
			resultFields: ['nombre', 'cargo'],
			callback: function(res){
				$('#sugiereAlguien').val(res['nombre']).change();
			},
			clean: function(field) {
				$('#sugiereAlguien').val('').change();
			}
		})
		.blur(function(){
			$(this).ecmzoom("option", "filterValues", [{id: 'nombre', value: $(this).val()}]);
		});
		
		$('#nombreReemplazo').ecmzoom({
			datasetId: 'RAF-Empleados',
			dataFields: [
				{id: 'nombre', value: 'Nombre'},
				{id: 'cargo', value: 'Cargo'}
			],  
			filterValues: [{ id: 'nombre', value: $('#nombreReemplazo').val()}],
			resultFields: ['nombre', 'cargo'],
			callback: function(res){
				$('#nombreReemplazo').val(res['nombre']).change();
			},
			clean: function(field) {
				$('#nombreReemplazo').val('').change();
			}
		})
		.blur(function(){
			$(this).ecmzoom("option", "filterValues", [{id: 'nombre', value: $(this).val()}]);
		});
		
		$('#carrera').ecmzoom({
			datasetId: 'RAF-Carreras',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#carrera').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#carrera').val('').change();
			}
		});
		
		$('#nivel').ecmzoom({
			datasetId: 'RAF05-CompetenciasPorNivel',
			dataFields: [
				{id: 'nivel', value: 'Nivel'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['nivel', 'documentid', 'version'],
			callback: function(res){
				
				$('#nivel').val('');
				//remueve la tabla de tablaDetalleCompetencias
				$("#tablaDetalleCompetencias tr:gt(1)").remove();
				
				$('#nivel').val(res['nivel']).change();

			 
			  var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
			  var c2 = DatasetFactory.createConstraint("documentid", res['documentid'], res['documentid'], ConstraintType.MUST);
			  var c3 = DatasetFactory.createConstraint("version", res['version'], res['version'], ConstraintType.MUST);
			  var c4 = DatasetFactory.createConstraint("tablename", "tablaComp", "tablaComp", ConstraintType.MUST);
			  var dataset = DatasetFactory.getDataset('RAF05-CompetenciasPorNivel', null, [c1,c2,c3,c4], null);
			  
			  for (var i = 0; i < dataset.values.length; i++) {
				  
				  	var competencia = dataset.values[i]["competencia"];
				  	var nivelPorDefecto = dataset.values[i]["nivelPorDefecto"];
				  	
					wdkAddChild('tablaDetalleComp');
					
					var subindice = $('#tablaDetalleCompetencias tr:last input').attr('id').split("___");
					var row = subindice[1];	
					
					$("#tablaDetalleCompetencias tr:last input[name='competencia___" + row + "']").val(competencia);
					$("#tablaDetalleCompetencias tr:last select[name='nivelCompetencia___" + row + "']").val(nivelPorDefecto);

			  }
				
			},
			clean: function(field) {
				$('#nivel').val('').change();
				//remueve la tabla de tablaDetalleCompetencias
				$("#tablaDetalleCompetencias tr:gt(1)").remove();
			}
		});
		
		$('#convenio').ecmzoom({
			datasetId: 'RAF-Convenios',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#convenio').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#convenio').val('').change();
			}
		});
		
		$('#categoriaConvenio').ecmzoom({
			datasetId: 'RAF-CategoriasConvenio',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#categoriaConvenio').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#categoriaConvenio').val('').change();
			}
		});
		
		$('#obraSocial').ecmzoom({
			datasetId: 'RAF-ObrasSociales',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#obraSocial').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#obraSocial').val('').change();
			}
		});
		
		$('#planes').ecmzoom({
			datasetId: 'RAF-Planes',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#planes').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#planes').val('').change();
			}
		});
		
		$('#jefe').ecmzoom({
			datasetId: 'RAF-Jefes',
			dataFields: [
				{id: 'matricula', value: 'Matrícula'},
				{id: 'nombre', value: 'Nombre'},
				{id: 'email', value: 'Email'}
			],  
			resultFields: ['matricula','nombre', 'email'],
			callback: function(res){
				$('#jefe').val(res['nombre'] ).change();
				$('#jefeMatricula').val(res['matricula'] ).change();
			},
			clean: function(field) {
				$('#jefe').val('').change();
				$('#jefeMatricula').val('').change();
			}
		});
		
		$('#gerenteN2').ecmzoom({
			datasetId: 'RAF-GerentesN2',
			dataFields: [
				{id: 'matricula', value: 'Matrícula'},
				{id: 'nombre', value: 'Nombre'},
				{id: 'email', value: 'Email'}
			],  
			resultFields: ['matricula','nombre', 'email'],
			callback: function(res){
				$('#gerenteN2').val(res['nombre'] ).change();
				$('#gerenteN2Matricula').val(res['matricula'] ).change();
			},
			clean: function(field) {
				$('#gerenteN2').val('').change();
				$('#gerenteN2Matricula').val('').change();
			}
		});
		
		$('#gerenteN1').ecmzoom({
			datasetId: 'RAF-GerentesN1',
			dataFields: [
				{id: 'matricula', value: 'Matrícula'},
				{id: 'nombre', value: 'Nombre'},
				{id: 'email', value: 'Email'}
			],  
			resultFields: ['matricula','nombre', 'email'],
			callback: function(res){
				$('#gerenteN1').val(res['nombre'] ).change();
				$('#gerenteN1Matricula').val(res['matricula'] ).change();
			},
			clean: function(field) {
				$('#gerenteN1').val('').change();
				$('#gerenteN1Matricula').val('').change();
			}
		});
		
		$('#centroCosto').ecmzoom({
			datasetId: 'RAF-CentrosCosto',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#centroCosto').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#centroCosto').val('').change();
			}
		});
		
		$('#zona').ecmzoom({
			datasetId: 'RAF-Zonas',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#zona').val(res['descripcion'] ).change();
			},
			clean: function(field) {
				$('#zona').val('').change();
			}
		});
		
		
		$('#puestoNuevo').change(function () {			

			if(this.checked){
				$('#nombrePuestoNuevo').attr('readonly', false);					
			}else{
				$('#nombrePuestoNuevo').attr('readonly', 'readonly');
				$('#nombrePuestoNuevo').val('');
			}
			
		});
		
		
		//
		
		
		$('.apm, .apf').hide();
		
		$('#ingresoPersonal').change(function(){
			
			var ingresoPersonal = $(this).val();
			
			if(ingresoPersonal == 'PE'){

				$('.pe').show();
				$('.apm, .apf').hide();
				$('.apmapf').hide();
				
				$('#lineaEspecialidad').attr('data-parsley-required', false);
				$('#zona').attr('data-parsley-required', false);
				$('#ciudadZonasVisitar').attr('data-parsley-required', false);
				$('#giras').attr('data-parsley-required', false);
				$('#productosManejar').attr('data-parsley-required', false);
				$('#visitaMedicos').attr('data-parsley-required', false);
				$('#visitaInstituciones').attr('data-parsley-required', false);
				$('#administraMuestrasMedicas').attr('data-parsley-required', false);
				$('#visitaFarmacias').attr('data-parsley-required', false);
				$('#coordinacionAccionesFidelizar').attr('data-parsley-required', false);
				$('#analisisInformacionAuditoria').attr('data-parsley-required', false);
				$('#tareasAdministrativasVarias').attr('data-parsley-required', false);
				$('#descExperienciaLaboralReq').attr('data-parsley-required', true);
				$('#experienciaPreviaComoAPM').attr('data-parsley-required', false);
				$('#experienciaPreviaEnVentas').attr('data-parsley-required', false);
				$('#experienciaPreviaComoAPF').attr('data-parsley-required', false);
				$('#visitadoEspecialidadesMedicos').attr('data-parsley-required', false);
				$('#visitadoInstituciones').attr('data-parsley-required', false);
				$('#conocimientoLineasProductos').attr('data-parsley-required', false);
				$('#provengaDeLaboratorios').attr('data-parsley-required', false);
				$('#conozcaLasAuditorias').attr('data-parsley-required', false);
				
				$('#aspectosCriticosPuesto').attr('placeholder',"Proyecto puntual, lanzamiento, viajes frecuentes, etc.");
				
				$('#lineaEspecialidad').val('');
				$('#zona').val('');
				$('#ciudadZonasVisitar').val('');
				$('#giras').val('');
				$('#productosManejar').val('');
				$('#coordinacionAccionesFidelizar').val('');
				$('#analisisInformacionAuditoria').val('');
				$('#tareasAdministrativasVarias').val('');
				$('#origenMatricula').val('');
				$('#experienciaPreviaComoAPM').val('');
				$('#experienciaPreviaEnVentas').val('');
				$('#experienciaPreviaComoAPF').val('');
				$('#visitadoEspecialidadesMedicos').val('');
				$('#visitadoInstituciones').val('');
				$('#conocimientoLineasProductos').val('');
				$('#provengaDeLaboratorios').val('');
				$('#conozcaLasAuditorias').val('');
				$('#otros').val('');
				
				$('#visitaMedicos').prop('checked',false);
				$('#visitaInstituciones').prop('checked',false);
				$('#administraMuestrasMedicas').prop('checked',false);
				$('#visitaFarmacias').prop('checked',false);
				
				
			}else if(ingresoPersonal == 'APM'){
				
				$('.apm').show();
				$('.apmapf').show();
				$('.apf, .pe').hide();
				
				$('#lineaEspecialidad').attr('data-parsley-required', true);
				$('#zona').attr('data-parsley-required', true);
				
				$('#ciudadZonasVisitar').attr('data-parsley-required', true);
				$('#giras').attr('data-parsley-required', true);
				$('#productosManejar').attr('data-parsley-required', true);
				$('#visitaMedicos').attr('data-parsley-required', true);
				$('#visitaInstituciones').attr('data-parsley-required', true);
				$('#administraMuestrasMedicas').attr('data-parsley-required', true);
				$('#visitaFarmacias').attr('data-parsley-required', true);
				$('#coordinacionAccionesFidelizar').attr('data-parsley-required', true);
				$('#analisisInformacionAuditoria').attr('data-parsley-required', true);
				$('#tareasAdministrativasVarias').attr('data-parsley-required', true);
				$('#descExperienciaLaboralReq').attr('data-parsley-required', false);
				$('#experienciaPreviaComoAPM').attr('data-parsley-required', true);
				$('#experienciaPreviaEnVentas').attr('data-parsley-required', false);
				$('#experienciaPreviaComoAPF').attr('data-parsley-required', false);
				$('#visitadoEspecialidadesMedicos').attr('data-parsley-required', true);
				$('#visitadoInstituciones').attr('data-parsley-required', true);
				$('#conocimientoLineasProductos').attr('data-parsley-required', true);
				$('#provengaDeLaboratorios').attr('data-parsley-required', true);
				$('#conozcaLasAuditorias').attr('data-parsley-required', true);
				
				$('#aspectosCriticosPuesto').attr('placeholder',"Lanzamiento de producto, zona nueva, equipo nuevo, etc.");
				
				$('#descExperienciaLaboralReq').val('');
				$('#habilidadesNecesarias').val('');
				$('#clientesInternos').val('');
				$('#proveedoresInternos').val('');
				$('#contactoConClientes').val('');
				$('#detalleMaquinas').val('');
				$('#proyeccionPosicion').val('');
				$('#experienciaPreviaEnVentas').val('');
				$('#experienciaPreviaComoAPF').val('');
				
				$('#manejoInfoConfidencial').prop('checked',false);
				$('#esfuerzoFisico').prop('checked',false);
				$('#exposicionMaterialesQuimicos').prop('checked',false);
				
			}else if(ingresoPersonal == 'APF'){
				
				$('.apf').show();
				$('.apmapf').show();
				$('.apm, .pe').hide();
				
				$('#lineaEspecialidad').attr('data-parsley-required', false);
				
				$('#zona').attr('data-parsley-required', true);
				$('#ciudadZonasVisitar').attr('data-parsley-required', true);
				$('#giras').attr('data-parsley-required', true);
				$('#productosManejar').attr('data-parsley-required', false);
				$('#visitaMedicos').attr('data-parsley-required', false);
				$('#visitaInstituciones').attr('data-parsley-required', false);
				$('#administraMuestrasMedicas').attr('data-parsley-required', false);
				$('#visitaFarmacias').attr('data-parsley-required', false);
				$('#coordinacionAccionesFidelizar').attr('data-parsley-required', false);
				$('#analisisInformacionAuditoria').attr('data-parsley-required', false);
				$('#tareasAdministrativasVarias').attr('data-parsley-required', false);
				$('#descExperienciaLaboralReq').attr('data-parsley-required', false);
				$('#experienciaPreviaComoAPM').attr('data-parsley-required', false);
				$('#experienciaPreviaEnVentas').attr('data-parsley-required', true);
				$('#experienciaPreviaComoAPF').attr('data-parsley-required', true);
				$('#visitadoEspecialidadesMedicos').attr('data-parsley-required', false);
				$('#visitadoInstituciones').attr('data-parsley-required', false);
				$('#conocimientoLineasProductos').attr('data-parsley-required', false);
				$('#provengaDeLaboratorios').attr('data-parsley-required', true);
				$('#conozcaLasAuditorias').attr('data-parsley-required', false);
								
				$('#aspectosCriticosPuesto').attr('placeholder',"");
				
				$('#lineaEspecialidad').val('');
				$('#productosManejar').val('');
				$('#coordinacionAccionesFidelizar').val('');
				$('#analisisInformacionAuditoria').val('');
				$('#tareasAdministrativasVarias').val('');
				$('#descExperienciaLaboralReq').val('');
				$('#habilidadesNecesarias').val('');
				$('#clientesInternos').val('');
				$('#proveedoresInternos').val('');
				$('#contactoConClientes').val('');
				$('#detalleMaquinas').val('');
				$('#proyeccionPosicion').val('');
				$('#experienciaPreviaComoAPM').val('');
				$('#visitadoEspecialidadesMedicos').val('');
				$('#visitadoInstituciones').val('');
				$('#conocimientoLineasProductos').val('');
				$('#conozcaLasAuditorias').val('');		
				
				$('#visitaMedicos').prop('checked',false);
				$('#visitaInstituciones').prop('checked',false);
				$('#visitaFarmacias').prop('checked',false);
				$('#administraMuestrasMedicas').prop('checked',false);
				$('#manejoInfoConfidencial').prop('checked',false);
				$('#esfuerzoFisico').prop('checked',false);
				$('#exposicionMaterialesQuimicos').prop('checked',false);
				
			}
			
			$('#nivel').ecmzoom("option", "filterValues", [{ id: 'metadata_active', value: true}, {id: 'tipoPuesto', value: $('#ingresoPersonal').val()}]);
				
		});
		$('#ingresoPersonal').change();
		
		$('#ingresoPersonal').change(function(){
			$('#nivel').val('');
			//remueve la tabla de tablaDetalleCompetencias
			$("#tablaDetalleCompetencias tr:gt(1)").remove();
		});
		
				
		$('#tipoPosicion').change(function(){
			
			var tipoPosicion = $(this).val();
			
			if(tipoPosicion == 'reemplazo'){
				
				$('#nombreReemplazo').attr('readonly', false);
				$('#nombreReemplazo').attr('data-parsley-required', true);
				$('#nombreReemplazo').ecmzoom('enable');
				
				$('#motivoReemplazo').attr('disabled', false);
				$('#motivoReemplazo').attr('data-parsley-required', true);
				$('#motivoPuestoNuevo').attr('data-parsley-required', false);
				$('.divTablaTareasOrdenPrioridad').css('display', 'none');

			}else{
				
				if(tipoPosicion == 'puestoNuevo'){
					$('#motivoPuestoNuevo').attr('data-parsley-required', true);
				}

				$('#nombreReemplazo').attr('data-parsley-required', false);
				$('#nombreReemplazo').val('');
				$('#nombreReemplazo').attr('readonly', 'readonly');
				$('#nombreReemplazo').ecmzoom('disable');
				
				$('#motivoReemplazo').val('');
				$('#motivoReemplazo').attr('disabled', 'disabled');
				$('#motivoReemplazo').attr('data-parsley-required', false);
				
			}
		});
		$('#tipoPosicion').change();	

		
		$('input[name=efectivoTemporario]').change(function () { 

			if($('input:radio[name=efectivoTemporario]:checked').val() == 'TEMPORARIO'){
				$('#cantidadMeses').attr('readonly', false);
			}else{
				$('#cantidadMeses').val('');
				$('#cantidadMeses').attr('readonly', 'readonly');
			}
			
		});
		$("input[name=efectivoTemporario]").change();
		
		
		var count = 0;
		$('.nivelEstudio').change(function () { 

			if($('input.nivelEstudio:checked').val()){
				count++;
				$('#nivelEstudioSeleccionados').val(count);
			}
			
		});
		$('.nivelEstudio').change();
		
		
		//ecmmasterdetail
		
		$("#tablaQuienesEntrevistan").ecmmasterdetail({
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
				
				convierteAMayusculas();
				
				$('.quienesEntrevistan', $tr).ecmzoom({
					datasetId: 'RAF-Empleados',
					dataFields: [
						{id: 'nombre', value: 'Nombre'},
						{id: 'cargo', value: 'Cargo'}
					],  
					filterValues: [{ id: 'nombre', value: $('#quienesEntrevistan', $tr).val()}],
					resultFields: ['nombre', 'cargo'],
					callback: function(res){
						$('.quienesEntrevistan', $tr).val(res['nombre']).change();
					},			
				})
				.blur(function(){
					$(this).ecmzoom("option", "filterValues", [{id: 'nombre', value: $(this).val()}]);
				});
			}	
		});	
		
		$("#tablaTareasOrdenPrioridad").ecmmasterdetail({
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
				
				convierteAMayusculas();
				
				//Se validará que se hayan cargado al menos 4 tareas
				cantidadTareas();
				
			}	
		});		
		 
		$("#tablaIdiomas").ecmmasterdetail({
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
				
				convierteAMayusculas();
				
			}	
		});	
		
		$("#tablaProgramasInformatica").ecmmasterdetail({
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
				
				$('.programasInformatica', $tr).ecmzoom({
					datasetId: 'RAF05-ProgramasInformatica',
					dataFields: [
						{id: 'nombre', value: 'Nombre'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['nombre'],
					callback: function(res){
						$('.programasInformatica', $tr).val(res['nombre']).change();
					},			
				});
			}	
		});
		
		cargarTablaBeneficios();
		
		
		$("#form").ecmlib({
			custom: {
				workflow: {
					"Inicio Solicitud": {
						task: [0, 8],  
						custom: function() {
							
						}
				
					},"Revisar y relevar Perfil": {
						task: [9],  
						custom: function() {
							
							//todo habilitado
							$('#form :input').prop('disabled', false);
							
							$('input[name=historialBusquedas]').prop('disabled', 'disabled');
							$('#historialBusquedas').ecmzoom('disable');
						}
				
					},
					"Completar Remuneraciones y Beneficios": {
						task: [10],  
						custom: function() {
							
							//todo deshabilitado
							$('#form :input').prop('disabled', 'disabled');
							$('.glyphicon-remove').hide();
							//solo esta seccion habilitada
							$('.seccionBeneficios').prop('disabled', false);
							
							$('#jefe').prop('disabled', false);
							$('#gerenteN2').prop('disabled', false);
							$('#gerenteN1').prop('disabled', false);
							
							$('#jefe').ecmzoom('enable');
							$('#gerenteN2').ecmzoom('enable');
							$('#gerenteN1').ecmzoom('enable');
							$('input[name=gerenteGeneral]').prop('disabled', false);
							
						}
					
					},
					"Revisar y confirmar Perfil": {
						task: [11],  
						custom: function() {

							//todo habilitado
							$('#form :input').prop('disabled', false);

							//solo esta seccion deshabilitada
							$('.seccionBeneficios').prop('disabled', 'disabled');
							
							$('input[name=historialBusquedas]').prop('disabled', 'disabled');
							$('#historialBusquedas').ecmzoom('disable');
														
							$('#jefe').ecmzoom('enable');
							$('#gerenteN2').ecmzoom('enable');
							$('#gerenteN1').ecmzoom('enable');
							$('input[name=gerenteGeneral]').prop('disabled', false);

						}
				
					},
					"Circuito Aprobadores": {
						task: [13, 18, 19,22],  
						custom: function() {
							
							//todo deshabilitado
							$('#form :input').prop('disabled', 'disabled');
							
							$('#jefe').ecmzoom('disable');
							$('#gerenteN2').ecmzoom('disable');
							$('#gerenteN1').ecmzoom('disable');
							$('input[name=gerenteGeneral]').prop('disabled', 'disabled');
							$('.glyphicon-remove').hide();

						}
				
					},
					"Aprobar Solicitud de Puesto (Gte. Gral.)": {
						task: [23],  
						custom: function() {
							
							//todo oculto
							$('#form .form-group').hide();
							$('.leyenda').hide();
							$('.subsecciones').hide();
							$('.reportaaBuscar').hide();
							$('.seccionBeneficios').hide();
														
							//solo mostrar estos campos deshabilitados
							$('#form :input').prop('disabled', 'disabled');
							
							//Mostrar puesto, reportaa, tipoPosicion, efectivoTemporario, pea, sede
							$('.aprobacionGteGral').show();
							
							if($('#ingresoPersonal').val() == 'APM' || $('#ingresoPersonal').val() == 'APF'){
								//mostrar lineaEspecialidad, zona
								$('.aprobacionGteGralAPMAPF').show();
							}
				
							if($('#tipoPosicion').val() == 'reemplazo'){
								
								$('#nombreReemplazo').attr('readonly', false);
								$('#nombreReemplazo').attr('data-parsley-required', false);
								$('#nombreReemplazo').ecmzoom('disable');

							}
							
							$('#jefe').ecmzoom('disable');
							$('#gerenteN2').ecmzoom('disable');
							$('#gerenteN1').ecmzoom('disable');
							$('input[name=gerenteGeneral]').prop('disabled', 'disabled');
							$('.deleteRow').prop('disabled', 'disabled');
						}
				
					},
					"Cancelar Solicitud de Puesto": {
						task: [20],  
						custom: function() {
							
							//todo deshabilitado
							$('#form :input').prop('disabled', 'disabled');
							$('.observacionesGralesProceso').prop('disabled', false);
							
							$('#jefe').ecmzoom('disable');
							$('#gerenteN2').ecmzoom('disable');
							$('#gerenteN1').ecmzoom('disable');
							$('input[name=gerenteGeneral]').prop('disabled', 'disabled');
							$('.glyphicon-remove').hide();

						}
				
					},
					"Realizar Proceso de Selección": {
						task: [24],  
						custom: function() {
							
							//todo deshabilitado
							$('#form :input').prop('disabled', 'disabled');
							$('.observacionesGralesProceso').prop('disabled', false);
							
							$('#jefe').ecmzoom('disable');
							$('#gerenteN2').ecmzoom('disable');
							$('#gerenteN1').ecmzoom('disable');
							$('input[name=gerenteGeneral]').prop('disabled', 'disabled');
							$('.glyphicon-remove').hide();

						}
				
					},
					"otherwise": { 
						custom: function() {
							// Si no aplica ninguna de las tareas. 
							$('#form :input').prop('disabled', 'disabled');
							$('.glyphicon-remove').hide();
						}
					}				
				}
			},
			parsley: {
				// Parametros configuracion enviados a parseley
			}			
		});	
		
	}
};


function cantidadTareas(){
	
	var count = 0;

	$("#tablaTareasOrdenPrioridad tr:gt(1)").each(function (index, value){
		
		if(($("#tablaTareasOrdenPrioridad tr input[name='detalleAccion" + index+ "']").val() != "" ) 
				&& ($("#tablaTareasOrdenPrioridad tr input[name='detalleAccion" + index+ "']").val() != null )){
			count++;
			alert(count);
		}
	
	});
	$("#cantidadTareasOrdenPrioridad").val(count);
	
}

function convierteAMayusculas(){
	
	//Convierte todo a mayusculas
	$(':input').blur(function() {
      	this.value = this.value.toUpperCase(); 
	 });
}

function cargarTablaBeneficios(){
	
	if($("#tablaBeneficios tr:gt(1)").length == 0){
		
		var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
		var dataset = DatasetFactory.getDataset("RAF05-Beneficios", null, [c1], null);	
		
		if(dataset.values.length > 0) {
			
			for(var i = 0; i < dataset.values.length; i++) {
			
				var $row = $("#tablaBeneficios").ecmmasterdetail("addNewRow");
				$('.beneficios', $row).val(dataset.values[i]["descripcion"]);
				
			}
			
		}
	}
}