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
	},
	
	onEdit: function() {
		
		//Convierte todo a mayusculas
		$(':input').blur(function() {
          	this.value = this.value.toUpperCase(); 
    	 });
		
		
		//ECM Zooms
		$('#vacanteACubrir').ecmzoom({
			datasetId: 'RAF05-FormularioPrincipal',
			dataFields: [
				{id: 'nroSolicitud', value: 'Nro. Solicitud'},
				{id: 'codigoBusqueda', value: 'Código de Búsqueda'},
				{id: 'nombreBusqueda', value: 'Nombre de la Búsqueda'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['nroSolicitud', 'codigoBusqueda', 'nombreBusqueda'],
			callback: function(res){
				$('#vacanteACubrir').val(res['codigo'] + ' - ' + res['codigoBusqueda'] + ' - ' + res['nombreBusqueda']).change();
			},
			clean: function(field) {
				$(':vacanteACubrir').val('').change();
			}
		});
		$('#vacanteACubrir').ecmzoom("option", "filterValues", [{ id: 'metadata_active', value: true}]);

		
		
		
		
		
		
		
		
		
		
		
		
		
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
		
		//ECM Zooms
		$('#historialBusquedas').ecmzoom({
			datasetId: 'RAF05-FormularioPrincipal',
			dataFields: [
				{id: 'nroSolicitud', value: 'Nro. Solicitud'},
				{id: 'codigoBusqueda', value: 'Código de Búsqueda'},
				{id: 'nombreBusqueda', value: 'Nombre de la Búsqueda'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['nroSolicitud', 'codigoBusqueda', 'nombreBusqueda'],
			callback: function(res){
				$('#historialBusquedas').val(res['codigo'] + ' - ' + res['codigoBusqueda'] + ' - ' + res['nombreBusqueda']).change();
			},
			clean: function(field) {
				$(':input').val('').change();
				$(':checkbox').attr('checked',false).change();
				$(':radio').attr('checked',false).change();
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
				$('#puestoNuevo').attr('checked',false).change();
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
			filterValues: [{ id: 'nombre', value: $('#reportaaBuscar').val()}],
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
				{id: 'nombre', value: 'Nombre'}
			],  
			resultFields: ['descripcion'],
			callback: function(res){
				$('#centroCosto').val(res['nombre'] ).change();
			},
			clean: function(field) {
				$('#centroCosto').val('').change();
			}
		});
		
		
		$('#puestoNuevo').change(function () {			

			if(this.checked){
				$('#nombrePuestoNuevo').attr('readonly', false);					
			}else{
				$('#nombrePuestoNuevo').attr('readonly', 'readonly');
			}
			
		});
		
		$('.apm, .apf').css('display', 'none');
		
		$('#ingresoPersonal').change(function(){
			
			var ingresoPersonal = $(this).val();
			
			if(ingresoPersonal == 'PE'){
				
				$('.pe').css('display', 'block');
				$('.apm, .apf').css('display', 'none');
				$('.apmapf').css('display', 'none');
				
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
				
				$('#visitaMedicos').attr('checked',false);
				$('#visitaInstituciones').attr('checked',false);
				$('#administraMuestrasMedicas').attr('checked',false);
				$('#visitaFarmacias').attr('checked',false);
				
				
			}else if(ingresoPersonal == 'APM'){
				
				$('.apm').css('display','block');
				$('.apmapf').css('display','block');
				$('.apf, .pe').css('display','none');
				
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
				
				$('#manejoInfoConfidencial').attr('checked',false);
				$('#esfuerzoFisico').attr('checked',false);
				$('#exposicionMaterialesQuimicos').attr('checked',false);
				
			}else if(ingresoPersonal == 'APF'){
				
				$('.apf').css('display', 'block');
				$('.apmapf').css('display','block');
				$('.apm, .pe').css('display', 'none');
				
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
				
				$('#visitaMedicos').attr('checked',false);
				$('#visitaInstituciones').attr('checked',false);
				$('#visitaFarmacias').attr('checked',false);
				$('#administraMuestrasMedicas').attr('checked',false);
				$('#manejoInfoConfidencial').attr('checked',false);
				$('#esfuerzoFisico').attr('checked',false);
				$('#exposicionMaterialesQuimicos').attr('checked',false);
				
			}
			
			$('#nivel').val('');
			//remueve la tabla de tablaDetalleCompetencias
			$("#tablaDetalleCompetencias tr:gt(1)").remove();
			
			$('#nivel').ecmzoom("option", "filterValues", [{ id: 'metadata_active', value: true}, {id: 'tipoPuesto', value: $('#ingresoPersonal').val()}]);
				
		});
		$('#ingresoPersonal').change();
		
				
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
		
		if($("#tablaBeneficios tr:gt(1)").length == 0){
			
			var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
			var dataset = DatasetFactory.getDataset("RAF05-Beneficios", null, [c1], null);	
			
			if(dataset.values.length > 0) {
				
				for(var i = 0; i < dataset.values.length; i++) {
					
					var descripcion = dataset.values[i]["descripcion"];
					
					wdkAddChild('tablaBenef');
					
					var subindice = $('#tablaBeneficios tr:last input').attr('id').split("___");
					var row = subindice[1];	
					
					$("#tablaBeneficios tr:last input[name='beneficios___" + row+ "']").val(descripcion);
				}
				
			}
		}
		
		
		// inicializo framework
		$("#form").ecmlib({
			custom: {
				workflow: {
					"Inicio Solicitud": {
						task: [0, 8, 9],  
						custom: function() {
							//$('#form :input').prop('disabled', false);
							
							

						}
				
					},
					"Completar Remuneraciones y Beneficios": {
						task: [10],  
						custom: function() {
							
							//todo readonly
							$('#form :input').prop('disabled', true);

							//solo esta seccion habilitada
							$(':input .beneficios').prop('disabled', false);
							//ver si habilitan los checkbox
						}
				
					},
					"Revisar y confirmar Perfil": {
						task: [11],  
						custom: function() {
							
							//todo habilitada
							$('#form :input').prop('disabled', false);

							//solo esta seccion readonly
							$(':input .beneficios').prop('disabled', true);
							//ver si se grisan los checkbox
						}
				
					},
					"Circuito Aprobadores": {
						task: [13, 18, 19,22],  
						custom: function() {
							
							//todo readonly
							$('#form :input').prop('disabled', true);

						}
				
					},
					"Aprobar Solicitud de Puesto (Gte. Gral.)": {
						task: [23],  
						custom: function() {
							
							//todo readonly
							$('#form :input').prop('display', 'none');
							$('.divTablaTareasOrdenPrioridad').css('display', 'none');
							
							//solo mostrar estos campos en readonly
							$('#form :input').attr('readonly', 'readonly');
							
							$('#puesto').prop('display', 'block');
							$('#reportaa').prop('display', 'block');
							$('#tipoPosicion').prop('display', 'block');
							$('#efectivoTemporario').prop('display', 'block');
							$('#pea').prop('display', 'block');
							$('#sede').prop('display', 'block');
							
							if($('#ingresoPersonal').val() == 'APM' || $('#ingresoPersonal').val() == 'APF'){
								$('#lineaEspecialidad').prop('display', 'block');
								$('#zona').prop('display', 'block');
							}
				
							if(tipoPosicion == 'reemplazo'){
								
								$('#nombreReemplazo').attr('readonly', false);
								$('#nombreReemplazo').attr('data-parsley-required', false);
								$('#nombreReemplazo').ecmzoom('disable');

							}
						}
				
					},
					"Cancelar Solicitud de Puesto": {
						task: [20],  
						custom: function() {
							
							//todo readonly
							$('#form :input').prop('disabled', true);
							$('#observacionesGralesProceso').prop('display', 'block');
							$('#observacionesGralesProceso').attr('readonly', false);

						}
				
					},
					"Realizar Proceso de Selección": {
						task: [24],  
						custom: function() {
							
							//todo readonly
							$('#form :input').prop('disabled', true);
							$('#observacionesGralesProceso').prop('display', 'block');
							$('#observacionesGralesProceso').attr('readonly', false);

						}
				
					},
					"otherwise": { 
						custom: function() {
							// Si no aplica ninguna de las tareas. Debe ir ultimo.
							$('#form :input').prop('disabled', true);
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
		
		if($("#tablaTareasOrdenPrioridad tr input[name='detalleAccion" + index+ "']").val() != "" ){
			count++;
		}
	
	});
	$("#cantidadTareasOrdenPrioridad").val(count);
	
}
