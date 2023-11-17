var	arqForms = {
	initForm: function(formType) {
		var $this = this;
		
		$("#tablaDocumentos").ecmmasterdetail();
		
		$(function () {	
			if (formType == "ADD" || formType == "MOD") { 			
				$this.onEdit();
			} else {
				$this.onView();
			}
		});
	},

	onView: function() {

		$('.detProdTotal').number(true, 2, ',', '.' );
		$("#__detProdTotal1").number(true, 2, ',', '.' );
		$("#ultimaCotizacion").number(true, 2, ',', '.' );
		

		// Restauro valores de campos ocultos.
		$("#titulo1").text($("#__titulo1").val());
		$("#titulo2").text($("#__titulo2").val());
		$("#titulo3").text($("#__titulo3").val());
		$("#titulo4").text($("#__titulo4").val());
		$("#titulo5").text($("#__titulo5").val());
		$("#detProdTotal1").text($.number(Number($("#__detProdTotal1").val()),2,',','.'));
		$("#detProdTotal2").text($.number(Number($("#__detProdTotal2").val()),2,',','.'));
		$("#detProdTotal3").text($.number(Number($("#__detProdTotal3").val()),2,',','.'));
		$("#detProdTotal4").text($.number(Number($("#__detProdTotal4").val()),2,',','.'));
		$("#detProdTotal5").text($.number(Number($("#__detProdTotal5").val()),2,',','.'));
		
		$("#detProdTotal11").text($.number(Number($("#__detProdTotal11").val()),2,',','.'));
		$("#detProdTotal22").text($.number(Number($("#__detProdTotal22").val()),2,',','.'));
		$("#detProdTotal33").text($.number(Number($("#__detProdTotal33").val()),2,',','.'));
		$("#detProdTotal44").text($.number(Number($("#__detProdTotal44").val()),2,',','.'));
		$("#detProdTotal55").text($.number(Number($("#__detProdTotal55").val()),2,',','.'));
		
		$("#sumatoria_porcentaje").text($("#__sumatoria_porcentaje").val());	
	
		$(".btn").hide();
		$(".btnEliminarCuenta").hide();
		
		for(i=1; i <= 5; i++){
			$('.colProvTotalPesos'+ i).number(true, 2, ',', '.' );
			$('.colProvTotalDolares'+ i).number(true, 2, ',', '.' );
		}
		
		//Obtengo el proveedor que fue seleccionado para poder colorear la columna seleccionada en modo readonly
		var proveedorSeleccionado = $("#proveedorSeleccionado").val();
		proveedorSeleccionado = parseInt(proveedorSeleccionado);
		if(!isNaN(proveedorSeleccionado)){
			$("#btnProveedor" + proveedorSeleccionado).removeClass("glyphicon-hand-left").addClass("glyphicon-hand-down");
				proveedorSeleccionado = proveedorSeleccionado + parseInt(3);
				
			if($("#tablaDetalleProducto tr:gt(1)").length > 0){
				$("#tablaDetalleProducto tr td:nth-child(" + (proveedorSeleccionado) + ")").css('background-color', '#DFD3CE');	
			}
		}
		
		$("#tablaProductos tr").each(function (index){   
		
			var onVerComentarioTablaProductos = function(){
					
				var descripcionAmpliadaId = $(this).closest('tr').find("input.prod_decripcion_ampliada_id").val();
				$("#descripcionAmpliada").text($("#" + descripcionAmpliadaId).text());
				$('.btn-primary').css("display", "none");
				$("#descripcionAmpliada").attr('readonly','readonly');		
			
			};
				
			$(".glyphicon-comment",$(this)).click(onVerComentarioTablaProductos);
		
		});
		
		$("#tablaDetalleProducto tr").each(function (index){   
		
			var onVerComentarioTablaDetalleProductos = function(){
				
				var subindice = $(this).closest('tr').find("span.det_prod_cantidad").attr('id').split("___");
				var columnIndex = subindice[1];
				$("#descripcionAmpliada").text($("#ampliada___" + columnIndex ).text());
				$('.btn-primary').css("display", "none");
				$("#descripcionAmpliada").attr('readonly','readonly');		
			
			};
				
			$(".glyphicon-comment",$(this)).click(onVerComentarioTablaDetalleProductos);
		
		});
		
		
		var imputacionContable = $('input:radio[name=imputacionContable]:checked').val();
		
		if ((typeof imputacionContable !== "undefined") && (imputacionContable !== null)) {
			seleccionImputacionContable();
		} else{
			$("#divCodigoInversion").css("display","none");
			$("#divClaveAsignacion").css("display","none");
			$("#divCombinacionCuentas").css("display","none");
		}
	},
	
	onEdit: function() {
		
		$('.detProdTotal').number(true, 2, ',', '.' );
		$("#ultimaCotizacion").number(true, 2, ',', '.' );
		
		// Restauro valores de campos ocultos porque el ECM no guarda los valores de los campos que estan en los footers.
		$("#titulo1").val($("#__titulo1").val());
		$("#titulo2").val($("#__titulo2").val());
		$("#titulo3").val($("#__titulo3").val());
		$("#titulo4").val($("#__titulo4").val());
		$("#titulo5").val($("#__titulo5").val());
		$("#detProdTotal1").val($("#__detProdTotal1").val());
		$("#detProdTotal2").val($("#__detProdTotal2").val());
		$("#detProdTotal3").val($("#__detProdTotal3").val());
		$("#detProdTotal4").val($("#__detProdTotal4").val());
		$("#detProdTotal5").val($("#__detProdTotal5").val());
		$("#detProdTotal11").val($("#__detProdTotal11").val());
		$("#detProdTotal22").val($("#__detProdTotal22").val());
		$("#detProdTotal33").val($("#__detProdTotal33").val());
		$("#detProdTotal44").val($("#__detProdTotal44").val());
		$("#detProdTotal55").val($("#__detProdTotal55").val());
		$("#sumatoria_porcentaje").val($("#__sumatoria_porcentaje").val());
		
		$("#tablaProductos").ecmmasterdetail({
			onCustomizeRow: function($tr) {				
				
				var onVerComentariosTablaProductos = function(){
					
					var descripcionAmpliadaId = $(this).closest('tr').find("input.prod_decripcion_ampliada_id").val();
					$("#descripcionAmpliada").val($("#" + descripcionAmpliadaId).val());
					$('.btn-primary').css("display", "none");
					$("#descripcionAmpliada").attr('readonly','readonly');			
			
				};
				
				$(".glyphicon-comment",$tr).click(onVerComentariosTablaProductos);
				
			}
		});
			
		ocultarDocumentosAsociadosVacios();
		
		$("#proveedorTemporal").css("visibility","hidden");
		
	
		$("#desvioPermitido").number(true, 0, '', '' );
	
		
		for(i=1; i <= 5; i++){
			$('.colProvTotalPesos'+ i).number(true, 2, ',', '.' );
			$('.colProvTotalDolares'+ i).number(true, 2, ',', '.' );
		}
		
		$('#fechaFirmaContrato, #fechaRevision, #fechaEntradaVigencia, #fechaFinVigencia').ecmdatetimepicker({
			pickTime: false, 
			language:'es', 
			format:'dd/mm/yyyy', 
			autoclose: true, 
			todayHighlight: true
		});		
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd='0'+dd;
		} 

		if(mm<10) {
			mm='0'+mm;
		} 

		today = dd+'/'+mm+'/'+yyyy;
		
		$('#fechaRegistracion').attr('disabled','disabled');
		$('#fechaRegistracion').val(today);
		
		$('#referenciaControl').ecmzoom({
			datasetId: 'raf-referenciaControl',
			dataFields: [
				{id: 'descripcion', value: 'Descripción'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}],
			resultFields: ['descripcion'],
			callback: function(res){
				$('#referenciaControl').val(res['descripcion']).change();
			},
			clean: function(field) {
				$('#referenciaControl').val("").change();
			}
		});	
		
		$('#sector').ecmzoom({
			datasetId: 'raf-sectores',
			dataFields: [
				{id: 'codigo', value: 'Código'},
				{id: 'nombre', value: 'Nombre'}
			],  
			resultFields: ['codigo','nombre'],
			callback: function(res){
				$('#sector').val(res['nombre']).change();
			},
			clean: function(field) {
				$('#sector').val("").change();
			}
		});	
			
		$('#rubro').ecmzoom({
			datasetId: 'raf-rubros',
			dataFields: [
				{id: 'rub_codigo', value: 'Código'},
				{id: 'rub_descripcion', value: 'Descripción'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['rub_codigo','rub_descripcion'],
			callback: function(res){
				$('#rubro').val(res['rub_descripcion']).change();
			},
			clean: function(field) {
				$('#rubro').val("").change();
			}
		});

		$('#frecuenciaFacturacion').ecmzoom({
			datasetId: 'raf-frecuencia-facturacion',
			dataFields: [
				{id: 'fre_codigo', value: 'Código'},
				{id: 'fre_descripcion', value: 'Descripción'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['fre_codigo','fre_descripcion'],
			callback: function(res){
				$('#frecuenciaFacturacion').val(res['fre_descripcion']).change();
			},
			clean: function(field) {
				$('#frecuenciaFacturacion').val("").change();
			}
		});		

		$('#motivoAdjudicacion').ecmzoom({
			datasetId: 'raf-motivo-adjudicacion',
			dataFields: [
				{id: 'mot_codigo', value: 'Código'},
				{id: 'mot_descripcion', value: 'Descripción'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['mot_codigo','mot_descripcion'],
			callback: function(res){
				$('#motivoAdjudicacion').val(res['mot_descripcion']).change();
			},
			clean: function(field) {
				$('#motivoAdjudicacion').val("").change();
			}
		});	

		$('#inversion_codigo').ecmzoom({
			datasetId: 'raf-inversiones',
			dataFields: [
				{id: 'codigo', value: 'Código'},
				{id: 'descripcion', value: 'Descripción'},
				{id: 'activo', value: 'Activo'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['codigo','descripcion','activo'],
			callback: function(res){
				$('#inversion_codigo').val(res['codigo']).change();
				$('#inversion_descripcion').val(res['descripcion']).change();
			},
			clean: function(field) {
				$('#inversion_codigo').val("").change();
				$('#inversion_descripcion').val("").change();
			}
		});	

		$('#asignacion_codigo').ecmzoom({
			datasetId: 'raf-asignaciones',
			dataFields: [
				{id: 'codigo', value: 'Código'},
				{id: 'descripcion', value: 'Descripción'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['codigo','descripcion'],
			callback: function(res){
				$('#asignacion_codigo').val(res['codigo']).change();
				$('#asignacion_descripcion').val(res['descripcion']).change();
			},
			clean: function(field) {
				$('#asignacion_codigo').val("").change();
				$('#asignacion_descripcion').val("").change();
			}
		});	

		$('#referenciaControl').ecmzoom({
			datasetId: 'raf-referencias-control',
			dataFields: [
				{id: 'referenciaControl', value: 'Código'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}], 
			resultFields: ['referenciaControl'],
			callback: function(res){
				$('#referenciaControl').val(res['referenciaControl']).change();
			},
			clean: function(field) {
				$('#referenciaControl').val("").change();
			}
		});	

		for(var i=1; i<=5; i++){
			$('#provs_codDesc'+i)
			.change(function(){
				var id = $(this).attr('id');
				var index = id.substring(id.length-1);
				$('#provs_codigo'+index).val('').change();
				$('#provs_razonSocial'+index).val('').change();
				$('#provs_formaPagoCodigo'+index).val('').change();
				$('#provs_formaPagoDesc'+index).val('').change();
				$('#provs_estado'+index).val('').change();
				$('#titulo'+index).val('').change();
				$('#__titulo'+index).val('').change();
				$('#provs_monedaCodigo'+index).val('').change();
				$('#provs_monedaDesc'+index).val('').change();
				$('.det_prod_moneda'+index).val('').change();
				recalcularMontosEnUSD();
				cantidadProveedores();
				limpiarSiProveedorSeleccionado(index);			
			})
			.ecmzoom({
				datasetId: 'raf-proveedores',
				dataFields: [
					{id: 'codigoProveedor', value: 'Código'},
					{id: 'razonSocialProveedor', value: 'Razón Social'},
					{id: 'codigoFormaPago', value: 'Forma Pago Código'},
					{id: 'descripcionFormaPago', value: 'Forma Pago Descripción'},
					{id: 'estadoProveedor', value: 'Estado'}
				],  
				filterValues: [{ id: 'metadata_active', value: true}], 
				resultFields: ['codigoProveedor','razonSocialProveedor','codigoFormaPago','descripcionFormaPago','estadoProveedor'],
				callback: function(res){
					var index = res['type'].substring(res['type'].length-1);
					$('#provs_codDesc'+index).val(res['codigoProveedor'] + " - " + res['razonSocialProveedor']).change();
					$('#provs_codigo'+index).val(res['codigoProveedor']).change();
					$('#provs_razonSocial'+index).val(res['razonSocialProveedor']).change();
					$('#provs_formaPagoCodigo'+index).val(res['codigoFormaPago']).change();
					$('#provs_formaPagoDesc'+index).val(res['descripcionFormaPago']).change();
					$('#provs_estado'+index).val(res['estadoProveedor']).change();
					$('#titulo'+index).val(res['razonSocialProveedor']).change();
					$('#__titulo'+index).val(res['razonSocialProveedor']).change();
					cantidadProveedores();
					limpiarSiProveedorSeleccionado(index);
				}
			});	
		
			$('#provs_formaPagoDesc'+i).ecmzoom({
				datasetId: 'raf-formas-pago',
				dataFields: [
					{id: 'codigo', value: 'Código'},
					{id: 'descripcion', value: 'Descripción'}
				],  
				filterValues: [{ id: 'metadata_active', value: true}], 
				resultFields: ['codigo','descripcion'],
				callback: function(res){
					var index = res['type'].substring(res['type'].length-1);
					$('#provs_formaPagoCodigo'+index).val(res['codigo']).change();
					$('#provs_formaPagoDesc'+index).val(res['descripcion']).change();
					
					if ($('#proveedorSeleccionado').val() == index){
						$('#formaPago_codigo').val(res['codigo']).change();
						$('#formaPago_descripcion').val(res['descripcion']).change();
					}
				}
			});	
			
			$('#provs_monedaDesc'+i).ecmzoom({
				datasetId: 'raf-monedas',
				dataFields: [
					{id: 'codigo', value: 'Código'},
					{id: 'descripcion', value: 'Descripción'}
				],  
				filterValues: [{ id: 'metadata_active', value: true}], 
				resultFields: ['codigo','descripcion'],
				callback: function(res){
					var index = res['type'].substring(res['type'].length-1);
					$('#provs_monedaCodigo'+index).val(res['codigo']).change();
					$('#provs_monedaDesc'+index).val(res['descripcion']).change();
					$('.det_prod_moneda'+index).val(res['descripcion']).change();
					
					recalcularMontosEnUSD();
				}
			});	
		
		}


		//Seleccion de los 5 proveedores
		var onProveedor1Blur = function(){
			$('#provs_codDesc1').ecmzoom("option", "filterValues", [{id: 'textoBusqueda', value: $('#provs_codDesc1').val()}]); 
		};
		$('#provs_codDesc1').blur(onProveedor1Blur);
		
		var onProveedor2Blur = function(){
			$('#provs_codDesc2').ecmzoom("option", "filterValues", [{id: 'textoBusqueda', value: $('#provs_codDesc2').val()}]); 
		};
		$('#provs_codDesc2').blur(onProveedor2Blur);

		var onProveedor3Blur = function(){
			$('#provs_codDesc3').ecmzoom("option", "filterValues", [{id: 'textoBusqueda', value: $('#provs_codDesc3').val()}]); 
		};
		$('#provs_codDesc3').blur(onProveedor3Blur);

		var onProveedor4Blur = function(){
			$('#provs_codDesc4').ecmzoom("option", "filterValues", [{id: 'textoBusqueda', value: $('#provs_codDesc4').val()}]); 
		};
		$('#provs_codDesc4').blur(onProveedor4Blur);

		var onProveedor5Blur = function(){
			$('#provs_codDesc5').ecmzoom("option", "filterValues", [{id: 'textoBusqueda', value: $('#provs_codDesc5').val()}]); 
		};
		$('#provs_codDesc5').blur(onProveedor5Blur);

		marcarColumnaProveedorSeleccionado();
		
		$('.btnProveedor1').click(function(){onSeleccionarProveedorClick(1)});
		$('.btnProveedor2').click(function(){onSeleccionarProveedorClick(2)});
		$('.btnProveedor3').click(function(){onSeleccionarProveedorClick(3)});
		$('.btnProveedor4').click(function(){onSeleccionarProveedorClick(4)});
		$('.btnProveedor5').click(function(){onSeleccionarProveedorClick(5)});

		// Cuando hacen click en guardar la descripcion ampliada.
		$("#btnGuardar").click(function() {
			$($("#indexAmpliada").val()).val($("#descripcionAmpliada").val());
			$("#btnCerrar").click();
		});
		
		//Creo una fila DetallePeoveedorPorducto
		$("#tablaDetalleProducto").ecmmasterdetail({
			buttonNewRow: "#btnNuevoDetalleProducto",
			buttonsDeleteRow: ".btnEliminarDetalleProducto",			
			onDeleteRow: function($tr) {
				var ret;
				ret = confirm("Confirma eliminación?");
				return ret;
			},
			afterDeleteRow: function($tr) {
				
				recalcularFooterEnUSD();
				recalcularFooterEnMonedaCotizada();
				
				//eliminar de la tabla de productos el producto eliminado y recalcular los totales de la misma
				onSeleccionarProveedorClick($("#proveedorSeleccionado").val());	

			},
			onCustomizeRow: function($tr) {	
			
				var $that = this;
				
				if ($(".noCodificado", $tr).prop('checked')){
					$(".det_prod_buscar", $tr).attr('disabled','disabled');
					$(".det_prod_buscar", $tr).val("");
					$(".det_prod_codigo", $tr).attr('disabled','disabled');
					$(".det_prod_codigo", $tr).css("display", "none");
					$(".det_prod_codigo", $tr).val("");
					$(".det_prod_descripcion", $tr).attr('readonly',false);
					$(".det_prod_descripcion", $tr).attr('placeholder',"DESCRIPCIÓN");
					$(".det_prod_unidadMedida", $tr).attr('disabled',false);					
				}else{
					$(".det_prod_buscar", $tr).attr('disabled',false);
					$(".det_prod_codigo", $tr).css("display", "block");
					$(".det_prod_codigo", $tr).css("disabled", "disabled");
					$(".det_prod_descripcion", $tr).attr('readonly','readonly');
					$(".det_prod_descripcion", $tr).attr('placeholder',"DESCRIPCIÓN");
					$(".det_prod_unidadMedida", $tr).attr('disabled','disabled');
				}
				
				
				$(".det_prod_descripcion", $tr).attr("data-parsley-required", true);
				$(".det_prod_cantidad", $tr).attr("data-parsley-required", true);
				$(".det_prod_unidadMedida", $tr).attr("data-parsley-required", true);
					
				//cada vez q se selecciona el producto no codificado
				$(".noCodificado", $tr).click(function() {
					if(this.checked) {					
						$(".det_prod_buscar", $tr).attr('disabled','disabled');
						$(".det_prod_buscar", $tr).val("");
						$(".det_prod_codigo", $tr).attr('disabled','disabled');
						$(".det_prod_codigo", $tr).css("display", "none");
						$(".det_prod_codigo", $tr).val("");
						$(".det_prod_descripcion", $tr).attr('readonly',false);
						$(".det_prod_descripcion", $tr).val("");
						$(".det_prod_descripcion", $tr).attr('placeholder',"DESCRIPCIÓN");
						$(".det_prod_unidadMedida", $tr).val("");
						$(".det_prod_unidadMedida", $tr).attr('disabled',false);
					}else{
						$(".det_prod_unidadMedida", $tr).val("");
						$(".det_prod_buscar", $tr).attr('disabled',false);
						$(".det_prod_codigo", $tr).css("display", "block");
						$(".det_prod_codigo", $tr).css("disabled", "disabled");
						$(".det_prod_descripcion", $tr).attr('readonly','readonly');
						$(".det_prod_descripcion", $tr).val("");
						$(".det_prod_descripcion", $tr).attr('placeholder',"DESCRIPCIÓN");
						$(".det_prod_unidadMedida", $tr).attr('disabled','disabled');
					}
				});
				
				$('.rowProvTotalPesos').attr('disabled','disabled');	
				
				$('.det_prod_buscar', $tr).ecmzoom({
					datasetId: 'raf-productos',
					dataFields: [
						{id: 'codigoProducto', value: 'Código'},
						{id: 'descripcionProducto', value: 'Descripción'},
						{id: 'estadoProducto', value: 'Estado'},
						{id: 'codigoUnidadMedida', value: 'Unidad de Medida Código'},
						{id: 'descUnidadMedida', value: 'Unidad de Medida Descripción'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['codigoProducto','descripcionProducto','estadoProducto','codigoUnidadMedida','descUnidadMedida'],
					callback: function(res){
						$(".det_prod_codigo", $tr).val(res['codigoProducto']).change();
						$(".det_prod_descripcion",$tr).val(res['descripcionProducto']).change();
						$(".det_prod_unidadMedida",$tr).val(res['codigoUnidadMedida']).change();
						$(".det_prod_unidadMedidaDes",$tr).val(res['descUnidadMedida']).change();
					}
				});
				// cuando pierde el foco actualizo el filtro del zoom para pasarle un texto de busqueda
				$('.det_prod_buscar', $tr).blur(function() {
					$('.det_prod_buscar', $tr).ecmzoom("option", "filterValues", [{id: 'textoBusqueda', value: $('.det_prod_buscar', $tr).val()}]); 
				});
				
				// agrego los decimales a los campos numericos
				$('.det_prod_cantidad', $tr).number(true, 2, ',', '.' );
				$('.det_prod_precioUnitario', $tr).number(true, 2, ',', '.' );
				$('.rowProvTotalPesos', $tr).number(true, 2, ',', '.' );
				$('.rowProvTotalDolares', $tr).number(true, 2, ',', '.' );
				
				$('.detProdTotal').number(true, 2, ',', '.' );
				for(i=1; i <= 5; i++){
					$('.colProvTotalPesos'+ i).number(true, 2, ',', '.' );
					$('.colProvTotalDolares'+ i).number(true, 2, ',', '.' );
					
					$('.det_prod_moneda'+ i).val($("#provs_monedaDesc"+ i).val());
				}
				
				$('.det_prod_unidadMedida', $tr).ecmzoom({
					datasetId: 'raf-unidades',
					dataFields: [
						{id: 'codigo', value: 'Código'},
						{id: 'descripcion', value: 'Descripción'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['codigo','descripcion'],
					callback: function(res){
						$(".det_prod_unidadMedida", $tr).val(res['codigo']).change();
					}
				});
								
				//cada vez que edito un comentario				
				var onEditarComentarioTablaDetalleProducto = function() {
					
					var subindice = $(".noCodificado", $tr).attr('id').split("___");
					var columnIndex = subindice[1];
					$("#descripcionAmpliada").val($("#ampliada___" + columnIndex).val());
					$("#indexAmpliada").val("#ampliada___" + columnIndex);
					$('.btn-primary').css("display", "inline");
					$("#descripcionAmpliada").attr('readonly',false);
					$("#ampliada").val($("#ampliada___" + columnIndex).val());
					
				};			
				
				$("#btnAgregarComentario", $tr).click(onEditarComentarioTablaDetalleProducto);
				
				//cada vez que modifico una cantidad y/o un precioUnitario de la fila
				//Recalcula los campos subtotales y totales de cada proveedor al modificar cantidades y PUs
				$(".det_prod_cantidad, .det_prod_precioUnitario", $tr).blur(function() {
					recalcularMontosPorFila(this);
					recalcularFooterEnUSD();
					recalcularFooterEnMonedaCotizada();
				});
				
				$(".det_prod_cantidad, .det_prod_precioUnitario", $tr).blur(function() {				
					onSeleccionarProveedorClick($("#proveedorSeleccionado").val());
				});
				
				$(".det_prod_unidadMedida, .det_prod_descripcion", $tr).change(function() {				
					onSeleccionarProveedorClick($("#proveedorSeleccionado").val());
				});
				
				var $that = this;
				
			}
			
		});
		
		//Tooltips
		var onProveedor1Mouseover = function(){
			$('#titulo1').attr("title", $('#titulo1').val());
		};
		$('#titulo1').mousemove(onProveedor1Mouseover);
		
		var onProveedor2Mouseover = function(){
			$('#titulo2').attr("title", $('#titulo2').val());
		};
		$('#titulo2').mousemove(onProveedor2Mouseover);
		
		var onProveedor3Mouseover = function(){
			$('#titulo3').attr("title", $('#titulo3').val());
		};
		$('#titulo3').mousemove(onProveedor3Mouseover);
		
		var onProveedor4Mouseover = function(){
			$('#titulo4').attr("title", $('#titulo4').val());
		};
		$('#titulo4').mousemove(onProveedor4Mouseover);
		
		var onProveedor5Mouseover = function(){
			$('#titulo5').attr("title", $('#titulo5').val());
		};
		$('#titulo5').mousemove(onProveedor5Mouseover);

		
		//tratamiento de cuentas
		$("#tablaCuenta").ecmmasterdetail({
			buttonNewRow: "#btnNuevaCuenta",
			buttonsDeleteRow: ".btnEliminarCuenta",			
			onDeleteRow: function($tr) {
				var ret;
				ret = confirm("Confirma eliminación?");
				return ret;
			},
			afterDeleteRow: function() {
				this.sumatoriaPorcentaje();
				
				//es para cuando la tabla cuentas se queda sin filas
				if($("#tablaCuenta tr:gt(2)").length == 0){
					$("#divSumatoriaPorcentaje").css("visibility","hidden");
				}
			},
			onCustomizeRow: function($tr) {				
				$('.cta_porcentaje', $tr).number(true, 2, ',', '.' );
				$("#sumatoria_porcentaje").number(true, 2, ',', '.' );
				
				$('.cta_codigo', $tr).ecmzoom({
					datasetId: 'raf-cuentas-contables',
					dataFields: [
						{id: 'codigo', value: 'Código'},
						{id: 'descripcion', value: 'Descripción'},
						{id: 'activo', value: 'Activo'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['codigo','descripcion','activo'],
					callback: function(res){
						$('.cta_codigo', $tr).val(res['codigo']).change();
						$('.cta_descripcion', $tr).val(res['descripcion']).change();
						$('.cta_activo', $tr).val(res['activo']).change();
						$('.cta_subcuenta_codigo', $tr).ecmzoom("option", "filterValues", [{id: 'codigoCuentaContable', value: res['codigo']}]); 
					}
				});
				
				$('.cta_subcuenta_codigo', $tr).ecmzoom({
					datasetId: 'raf-subcuentas',
					dataFields: [
						{id: 'codigo', value: 'Código'},
						{id: 'descripcion', value: 'Descripción'},
						{id: 'activo', value: 'Activo'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['codigo','descripcion','activo'],
					callback: function(res){
						$('.cta_subcuenta_codigo', $tr).val(res['codigo']).change();
						$('.cta_subcuenta_descripcion', $tr).val(res['descripcion']).change();
						$('.cta_subcuenta_activo', $tr).val(res['activo']).change();
					}
				});
				
				$('.cta_centroCosto_codDesc', $tr).ecmzoom({
					datasetId: 'raf-centros-costo',
					dataFields: [
						{id: 'codigo', value: 'Código'},
						{id: 'descripcion', value: 'Descripción'},
						{id: 'activo', value: 'Activo'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['codigo','descripcion','activo'],
					callback: function(res){
						$('.cta_centroCosto_codDesc', $tr).val(res['codigo'] + " - " + res['descripcion']).change();
						$('.cta_centroCosto_codigo', $tr).val(res['codigo']).change();
						$('.cta_centroCosto_desc', $tr).val(res['descripcion']).change();
						$('.cta_centroCosto_activo', $tr).val(res['activo']).change();
					}
				});
				
				$('.cta_proyecto_descripcion', $tr).ecmzoom({
					datasetId: 'raf-proyectos',
					dataFields: [
						{id: 'codigo', value: 'Código'},
						{id: 'descripcion', value: 'Descripción'},
						{id: 'activo', value: 'Activo'}
					],  
					filterValues: [{ id: 'metadata_active', value: true}], 
					resultFields: ['codigo','descripcion','activo'],
					callback: function(res){
						$('.cta_proyecto_codigo', $tr).val(res['codigo']).change();
						$('.cta_proyecto_descripcion', $tr).val(res['descripcion']).change();
						$('.cta_proyecto_activo', $tr).val(res['activo']).change();

					}
				});

				
				var $that = this;
				$(".cta_porcentaje", $tr).blur(function() {
					$that.sumatoriaPorcentaje();
				});

				
			},			
			sumatoriaPorcentaje: function() {
				var sum = 0;
				$(".cta_porcentaje:visible", $("#tablaCuenta")).each(function (i, elem) {
					var num = parseFloat($(this).val());
					if(!isNaN(num)) {
						sum += num;
					}						
				});
				$("#sumatoria_porcentaje").val(sum);
				$("#__sumatoria_porcentaje").val(sum);
					
				if(sum == 100){
					$("#divSumatoriaPorcentaje").css("visibility","hidden");
				}else{
					$("#divSumatoriaPorcentaje").css("visibility","visible");
				}

			}
		});
		
		
		if($('input:radio[name=imputacionContable]').is(':checked') && $('input:radio[name=imputacionContable]:checked').val() != "imputacionContable0"){
			if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable1"){
				$("#divCodigoInversion").css("display","block");
				$("#divClaveAsignacion").css("display","none");
				$("#divCombinacionCuentas").css("display","none");
			}
			if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable2"){
				$("#divCodigoInversion").css("display","none");
				$("#divClaveAsignacion").css("display","block");
				$("#divCombinacionCuentas").css("display","none");
			}
			if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable3"){
				$("#divCodigoInversion").css("display","none");
				$("#divClaveAsignacion").css("display","none");
				$("#divCombinacionCuentas").css("display","block");
			}
		}else{
			if(!$('input:radio[name=imputacionContable]').is(':checked')) $("#imputacionContable0").prop('checked',true);
			$("#divCodigoInversion").css("display","none");
			$("#divClaveAsignacion").css("display","none");
			$("#divCombinacionCuentas").css("display","none");
		}
		
		$("input[name=imputacionContable]").click(function () { 
			seleccionImputacionContable();
		});

		// Validaciones a nivel formulario
/*		$('#form').parsley().subscribe('parsley:form:validated', function(parsleyForm){
			// limpio msjs viejos
			$("#globalErrors").removeClass("alert alert-danger")
							  .html("");
			 
		  // Validacion fechas
		  var reverse = function(dt) {			
			var arr = dt.split("/");			
			return (arr.lenght < 2)? 0 : parseInt(arr[2] + arr[1] + arr[0]);
		  };		  
		  if (reverse($("#fechaEntradaVigencia").val()) > reverse($("#fechaFinVigencia").val())) {
			// msj error
			$("#globalErrors").addClass("alert alert-danger")
							 .append('<div>La fecha de Entrada en Vigencia tiene que ser menor o igual a la de Fin de Vigencia.</div>');
			// que parseley retorne no valido
			parsleyForm.validationResult = false;
		  }
		  
		});
*/		
		// inicializo framework
		$("#form").ecmlib({
			custom: {
				init: function() {
					// inicializa siempre el formulario (sea workflow o ficha) NO USAR ESTE LUGAR!!!
				}, 
				workflow: {
					"Cargar Contrato o Revision": {
						task: [0,1,34],  
						custom: function() {
						
						},
						"otherwise": function() {
							
							$.each($('form').serializeArray(), function(index, value){
								var elem = $('[name="' + value.name + '"]');
								if (elem.attr('type')!='hidden') {
									elem.attr('disabled', 'disabled');
								}
							});
							
							$(".btnEliminarDetalleProducto").remove();
							$(".btnEliminarCuenta").remove();
							$(".btnNuevoDetalleProducto").remove();
							$(".btnNuevaCuenta").remove();	
							$("#btnNuevoDetalleProducto").attr('disabled','disabled');
							$(".noCodificado").attr('disabled', 'disabled');	
							$('input:radio[name=tipoContrato]').attr('disabled', 'disabled');
							$('.documentoAsociadoChk1').attr('disabled', 'disabled');
							$('.documentoAsociadoChk2').attr('disabled', 'disabled');
							$('#tablaCuenta .glyphicon-remove').hide();
							
							if(!$("input[name=imputacionContable]:checked").val()) {
								$('input:radio[name=imputacionContable]').attr('disabled', 'disabled');
							}
							
							for(var i=1; i<=5; i++){
								$("#btnProveedor" + i).remove();
							}
								
							$('.glyphicon glyphicon-trash').hide();
						}
					},
					"Adjuntar Contrato Firmado": {
						task: 29,  
						custom: function() {
							
							$("#fechaFirmaContrato").attr('disabled', false);
							$("#fechaFirmaContrato").attr('required', true);
							
							$("#fechaEntradaVigencia").attr('disabled', false);
							$("#fechaEntradaVigencia").attr('required', true);
							
							$("#fechaFinVigencia").attr('disabled', false);
							$("#fechaFinVigencia").attr('required', true);
							
							$("#fechaRevision").attr('disabled', false);
							$("#fechaRevision").attr('required', true);
						},
						"otherwise": function() {
							
						}
					},
					"Tareas que requieren recalcular cotizacion": {
						task: [7, 34, 35, 36, 38, 39, 41, 42], 
						custom: function() {
							recalcularMontosEnUSD();
						},
						"otherwise": function() {
							
						}
					},					
					"otherwise": { 
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
		
	} //Fin onEdit
	
};

function marcarColumnaProveedorSeleccionado(){

	//Guardo el proveedor que fue seleccionado para poder colorear 
	//la columna seleccionada en otras tareas
	var proveedorSeleccionado = $("#proveedorSeleccionado").val();
	if(proveedorSeleccionado != ""){
		// baja la manito en el proveedor seleccionado
		$("#btnProveedor" + proveedorSeleccionado).removeClass("glyphicon-hand-left").addClass("glyphicon-hand-down");
		// pone el background color en la columna del proveedor seleccionado
		$("#tablaDetalleProducto tr td:nth-child(" + (Number(proveedorSeleccionado) + 3) + ")").css('background-color', '#DFD3CE');	
	}
	
}

//Para cada fila/columna realiza el calculo precio*cantidad
function recalcularMontosPorFila(campo){
			
	var subindice = campo.id.split("___");
	var row = subindice[1];
	var cantidad = $("#det_prod_cantidad___" + row).val();
	
	$('.rowProvTotalDolares').number(true, 2, ',', '.' );
	$('.rowProvTotalPesos').number(true, 2, ',', '.' );

	
	$('.rowProvTotalPesos').each(function( index, value ) {
		index++;
		var precioUnitario = $("#det_prod_precioUnitario" + index +"___" + row).val();
		$("#det_prod_totalPesos" + index +"___" + row).val(precioUnitario * cantidad);
		
		var ultimaCotizacion = $("#provs_ultimaCotizacion" + index).val();

		if(ultimaCotizacion != ""){			
			$("#det_prod_totalDolares" + index +"___" + row).val(precioUnitario * cantidad / ultimaCotizacion);
		}
	
	});
			
}

//Sumatoria de montos en dolares de cada columna para el footer USD
function recalcularFooterEnUSD(){
	
	$('.detProdTotal').number(true, 2, ',', '.' );
	$('.rowProvTotalDolares').number(true, 2, ',', '.' );
	
	for(i=1; i <= 5; i++){	
		$("#detProdTotal" + i).number(true, 2, ',', '.' );

		var sum = 0;
		$('.colProvTotalDolares' + i, $("#tablaDetalleProducto")).each(function (index, elem) {
			var num = parseFloat($(this).val());
			if(!isNaN(num)) {
				sum += num;
			}						
		});
		
		$("#detProdTotal" + i).val(sum);
		$("#__detProdTotal" + i).val(sum);
	
	}
	
}

//Sumatoria de montos en moneda cotizada de cada columna para el footer en moneda cotizada
function recalcularFooterEnMonedaCotizada(){

	$('.detProdTotal').number(true, 2, ',', '.' );
	$('.rowProvTotalPesos').number(true, 2, ',', '.' );
			
	for(i=1; i <= 5; i++){	

		var sum = 0;
		$('.colProvTotalPesos' + i, $("#tablaDetalleProducto")).each(function (index, elem) {
			var num = parseFloat($(this).val());
			if(!isNaN(num)) {
				sum += num;
			}						
		});
		$("#detProdTotal"+ i + "" + i).val(sum);
		$("#__detProdTotal"+ i + "" + i).val(sum);
	
	}
	
}

//Cada vez que se modifica la cotizacion de la moneda
//actualiza los calculos de la tabla detalle proveedor producto
function recalcularMontosEnUSD(){

	$('.det_prod_cantidad').number(true, 2, ',', '.' );
	$('.det_prod_precioUnitario').number(true, 2, ',', '.' );
	$('.rowProvTotalPesos').number(true, 2, ',', '.' );
	$('.rowProvTotalDolares').number(true, 2, ',', '.' );
	$('.detProdTotal').number(true, 2, ',', '.' );

	for(i=1; i <= 5; i++){
		$('.colProvTotalPesos'+ i).number(true, 2, ',', '.' );
		$('.colProvTotalDolares'+ i).number(true, 2, ',', '.' );
		
		// Buscar cotizacion nueva con dataset de cotizaciones
		var codigoMoneda1 = $('#provs_monedaCodigo'+i).val();
		
		var c1 = new SearchConstraint("codigoMoneda1", codigoMoneda1, codigoMoneda1, ConstraintType.MUST);
		var c2 = new SearchConstraint("codigoMoneda2", "USD", "USD", ConstraintType.MUST);
		var constraints = new Array(c1,c2);
		var dataset = DatasetFactory.getDataset("raf-cotizaciones", null, constraints, null);			

		// Pegar cotizacion nueva y fecha ultima actualizacion en formulario
		$('#provs_ultimaCotizacion'+i).val(dataset.values[0]["cotizacion"]).change();
		$('#provs_fechaUltimaCotizacion'+i).val(dataset.values[0]["fechaUltimaActualizacion"]).change();
		
	}
	
	$("#tablaDetalleProducto tr:gt(1)").each(function (index, value){ 
		
		if(!$(this).parent().is("tfoot")){

			recalcularMontosPorFila($(this).find(".det_prod_unidadMedida")[0]);
			recalcularFooterEnUSD();
			recalcularFooterEnMonedaCotizada();
	
		}
		
	});
	
	onSeleccionarProveedorClick($("#proveedorSeleccionado").val());
	
}

function onSeleccionarProveedorClick(provedorSeleccionadoIndex){
	
	//remueve la tabla de productos al cambiar de proveedor
	$("#tablaProductos tr:gt(1)").remove();
	
	$("#proveedorSeleccionado").val(provedorSeleccionadoIndex);
		
	if($("#provs_estado" + provedorSeleccionadoIndex).val() == "temporal"){
		
		$("#proveedorTemporal").css("visibility","visible");
		
		// Limpio los datos del proveedor seleccionado		
		$('#pro_codigo').val("");
		$('#pro_razonSocial').val("");
		$('#formaPago_codigo').val("");
		$('#formaPago_descripcion').val("");
		$('#formaPago_detalle').val("");
		$("#moneda").val("");
		$("#ultimaCotizacion").val("");
		$("#fechaUltimaCotizacion").val("");
		$("#montoTotalUSD").val("");
		$("#totalUSD").val("");
		$('#motivoAdjudicacion').attr("data-parsley-required", false);
		$('#frecuenciaFacturacion').attr("data-parsley-required", false);
				
		// recorro todos los proveedores para levantar la manito	
		for(var i=1; i<=5; i++){
			if(i != provedorSeleccionadoIndex){
				// levanta la manito en el resto de los proveedores
				$("#btnProveedor" + i).removeClass("glyphicon-hand-down").addClass("glyphicon-hand-left");	
				// quita el background color del resto de los proveedores
				$("#tablaDetalleProducto tr td:nth-child(" + (i + 3) + ")").css('background-color', 'table-striped table-bordered table-hover');					
			}
		}
		
	}else{
		
		$("#proveedorTemporal").css("visibility","hidden");
		$('#motivoAdjudicacion').attr("data-parsley-required", true);
		$('#frecuenciaFacturacion').attr("data-parsley-required", true);
		
		// recorro todos los proveedores	
		for(var i=1; i<=5; i++){
			if(i != provedorSeleccionadoIndex){
				// levanta la manito en el resto de los proveedores
				$("#btnProveedor" + i).removeClass("glyphicon-hand-down").addClass("glyphicon-hand-left");	
				// quita el background color del resto de los proveedores
				$("#tablaDetalleProducto tr td:nth-child(" + (i + 3) + ")").css('background-color', 'table-striped table-bordered table-hover');					
			}else{
				//Guardo el proveedor que fue seleccionado para poder colorear la columna seleccionada en otras tareas
				$("#proveedorSeleccionado").val(i);
				// baja la manito en el proveedor seleccionado
				$("#btnProveedor" + i).removeClass("glyphicon-hand-left").addClass("glyphicon-hand-down");
				// pone el background color en la columna del proveedor seleccionado
				$("#tablaDetalleProducto tr td:nth-child(" + (i + 3) + ")").css('background-color', '#DFD3CE');				
			}
		}
		
		// copio los datos del proveedor seleccionado		
		$('#pro_codigo').val($('#provs_codigo' + provedorSeleccionadoIndex).val());
		$('#pro_razonSocial').val($('#provs_razonSocial' + provedorSeleccionadoIndex).val());
		$('#formaPago_codigo').val($('#provs_formaPagoCodigo' + provedorSeleccionadoIndex).val());
		$('#formaPago_descripcion').val($('#provs_formaPagoDesc' + provedorSeleccionadoIndex).val());
		$('#formaPago_detalle').val($('#provs_detalle' + provedorSeleccionadoIndex).val());
		
		// Pegar cotizacion nueva y fecha ultima actualizacion en formulario
		$('#ultimaCotizacion').val($('#provs_ultimaCotizacion' + provedorSeleccionadoIndex).val());
		$('#fechaUltimaCotizacion').val($('#provs_fechaUltimaCotizacion' + provedorSeleccionadoIndex).val());
		$('#moneda').val($('#provs_monedaDesc' + provedorSeleccionadoIndex).val());
		
		$('.detProdTotal').number(true, 2, ',', '.' );
		
		var sumatoriaDolares = 0;
		
		$("#tablaDetalleProducto tr:gt(1)").each(function (index, value){
						
			if(!$(this).parent().is("tfoot")){
			
				var $row = $("#tablaProductos").ecmmasterdetail("addNewRow");
								
				$('.prod_cantidad', $row).number(true, 2, ',', '.' );
				$('.prod_precioUnitario', $row).number(true, 2, ',', '.' );
				$('.prod_total', $row).number(true, 2, ',', '.' );
				$('.prod_totalDolares', $row).number(true, 2, ',', '.' );
				
				var precioUnitario = $(this).find("input.det_prod_precioUnitario:eq(" + (provedorSeleccionadoIndex-1) + ")").val();
				var prod_total = $(this).find("input.rowProvTotalPesos:eq(" + (provedorSeleccionadoIndex-1) + ")").val();
				var prod_totalDolares = $(this).find("input.rowProvTotalDolares:eq(" + (provedorSeleccionadoIndex-1) + ")").val();
																		
				$('.prod_code',$row).val($(this).find("input.det_prod_codigo").val());
				$('.prod_descripcion',$row).val($(this).find("textarea.det_prod_descripcion").val());
				$('.prod_unidadMedida',$row).val($(this).find("input.det_prod_unidadMedida").val());
				$('.prod_cantidad',$row).val($(this).find("input.det_prod_cantidad").val());
				$('.prod_precioUnitario',$row).val(precioUnitario);
				$('.prod_total',$row).val(prod_total);
				$('.prod_totalDolares',$row).val(prod_totalDolares);
				$('.prod_decripcion_ampliada_id',$row).val($(this).find("textarea.ampliada").attr('id'));
												
				sumatoriaDolares = sumatoriaDolares + Number(prod_totalDolares);
			
			}			
		
		});
		$('#totalUSD').number(true, 2, ',', '.' );
		$("#montoTotalUSD").val(sumatoriaDolares);
		$("#totalUSD").val(sumatoriaDolares);
	}	

}

function cantidadProveedores(){
	var count = 0;

	$("#tablaProveedores tr:gt(0)").each(function (index, value){
		index = index + 1;
		
		if($("#tablaProveedores tr input[name='provs_codDesc" + index+ "']").val() != "" ){
			count++;
		}
		
	});
	$("#provs_countProveedores").val(count);
	
}

function limpiarSiProveedorSeleccionado(provedorIndex){
	provedorIndex = parseInt(provedorIndex);
	if(provedorIndex == $("#proveedorSeleccionado").val()){
		//Guardo el proveedor que fue seleccionado para poder colorear la columna seleccionada en otras tareas
		$("#proveedorSeleccionado").val('');
		// sube la manito en el proveedor seleccionado
		$("#btnProveedor" + provedorIndex).removeClass("glyphicon-hand-down").addClass("glyphicon-hand-left");	
		// quita el background color del resto del proveedor seleccionado
		$("#tablaDetalleProducto tr td:nth-child(" + (provedorIndex + 3) + ")").css('background-color', 'table-striped table-bordered table-hover');
		
		// Limpio los datos del proveedor seleccionado		
		$('#pro_codigo').val("");
		$('#pro_razonSocial').val("");
		$('#formaPago_codigo').val("");
		$('#formaPago_descripcion').val("");
		$('#formaPago_detalle').val("");
		$("#moneda").val("");
		$("#ultimaCotizacion").val("");
		$("#fechaUltimaCotizacion").val("");
		$("#montoTotalUSD").val("");
		$("#totalUSD").val("");
		$('#motivoAdjudicacion').attr("data-parsley-required", false);
		$('#frecuenciaFacturacion').attr("data-parsley-required", false);
		
		$("#tablaProductos tr:gt(1)").remove();
		$("#tablaDetalleProducto tr:gt(1)").each(function (index, value){
						
			if(!$(this).parent().is("tfoot")) {
			
				var $row = $("#tablaProductos").ecmmasterdetail("addNewRow");
								
				$('.prod_cantidad', $row).number(true, 2, ',', '.' );
				$('.prod_precioUnitario', $row).number(true, 2, ',', '.' );
				$('.prod_total', $row).number(true, 2, ',', '.' );
				$('.prod_totalDolares', $row).number(true, 2, ',', '.' );
																		
				$('.prod_code',$row).val($(this).find("input.det_prod_codigo").val());
				$('.prod_descripcion',$row).val($(this).find("textarea.det_prod_descripcion").val());
				$('.prod_unidadMedida',$row).val($(this).find("input.det_prod_unidadMedida").val());
				$('.prod_cantidad',$row).val($(this).find("input.det_prod_cantidad").val());
				$('.prod_precioUnitario',$row).val(0);
				$('.prod_total',$row).val(0);
				$('.prod_totalDolares',$row).val(0);
				$('.prod_decripcion_ampliada_id',$row).val($(this).find("textarea.ampliada").attr('id'));
			
			}
		
		});
		$('#totalUSD').number(true, 2, ',', '.' );
	}
}

function seleccionImputacionContable(){

	// Si es no tiene imputación contable
	if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable0"){
	
		$("#divCodigoInversion").css("display","none");
		$("#divClaveAsignacion").css("display","none");
		$("#divCombinacionCuentas").css("display","none");
		
		$("#inversion_codigo").attr('disabled','disabled');
		$("#asignacion_codigo").attr('disabled','disabled');
		
		$("#inversion_codigo").val("");
		$("#inversion_descripcion").val("");
		$("#asignacion_codigo").val("");
		$("#asignacion_descripcion").val("");
		
		$("#btnNuevaCuenta").attr('disabled','disabled');
		$('#tablaCuenta .glyphicon-remove').hide();
		
		// Elimina las cuentas contables cargadas
		$("#tablaCuenta tr:gt(1)").remove();

		$("#sumatoria_porcentaje").val("");
		$("#divSumatoriaPorcentaje").css("visibility","hidden");

	}
	
	// Si es por codigo de inversion
	if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable1"){
	
		$("#divCodigoInversion").css("display","block");
		$("#divClaveAsignacion").css("display","none");
		$("#divCombinacionCuentas").css("display","none");
		
		$("#inversion_codigo").attr('disabled',false);
		$("#asignacion_codigo").attr('disabled','disabled');
		
		$("#asignacion_codigo").val("");
		$("#asignacion_descripcion").val("");
		
		$("#btnNuevaCuenta").attr('disabled','disabled');
		$('#tablaCuenta .glyphicon-remove').hide();
		
		// Elimina las cuentas contables cargadas
		$("#tablaCuenta tr:gt(1)").remove();

		$("#sumatoria_porcentaje").val("");
		$("#divSumatoriaPorcentaje").css("visibility","hidden");

	}
	
	// Si es por clave de asignacion
	if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable2"){
	
		$("#divCodigoInversion").css("display","none");
		$("#divClaveAsignacion").css("display","block");
		$("#divCombinacionCuentas").css("display","none");

		$("#inversion_codigo").attr('disabled','disabled');
		$("#asignacion_codigo").attr('disabled',false);
		
		$("#inversion_codigo").val("");
		$("#inversion_descripcion").val("");
		
		$("#btnNuevaCuenta").attr('disabled','disabled');
		$('#tablaCuenta .glyphicon-remove').hide();
		
		// Elimina las cuentas contables cargadas
		$("#tablaCuenta tr:gt(1)").remove();
		
		$("#sumatoria_porcentaje").val("");
		$("#divSumatoriaPorcentaje").css("visibility","hidden");
	}
	
	// Si es por combinacion de cuentas
	if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable3"){
	
		$("#divCodigoInversion").css("display","none");
		$("#divClaveAsignacion").css("display","none");
		$("#divCombinacionCuentas").css("display","block");

		$("#inversion_codigo").attr('disabled','disabled');
		$("#asignacion_codigo").attr('disabled','disabled');
		
		$("#inversion_codigo").val("");
		$("#inversion_descripcion").val("");
		$("#asignacion_codigo").val("");
		$("#asignacion_descripcion").val("");
		
		$('#tablaCuenta .glyphicon-remove').show();
		$("#btnNuevaCuenta").attr('disabled',false);
		$('.btnEliminarCuenta').css("display", "block");
		$('.btnEliminarCuenta:visible');
		
	}
	
	// Si cuando carga la pagina esta chequeado combinacion de cuentas habilito el boton nuevo
	if($('input:radio[name=imputacionContable]:checked').val() == "imputacionContable3"){
		$("#btnNuevaCuenta").attr('disabled',false);
	}else{
		$("#btnNuevaCuenta").attr('disabled','disabled');
	}
}

function agregarDocumentosAsociados(documentosAsociados){

	for(var i=0; i < documentosAsociados.length; i++){
		if(i % 2 == 0){
			var $row = $("#tablaDocumentos").ecmmasterdetail("addNewRow");
			$(".documentoAsociadoNombre1", $row).val(documentosAsociados[i]);
		}else {
			$(".documentoAsociadoNombre2", $row).val(documentosAsociados[i]);
		}
	}
	
	ocultarDocumentosAsociadosVacios();
	
}

function ocultarDocumentosAsociadosVacios(){
	if($("#tablaDocumentos .documentoAsociadoNombre2:last").val() == ""){
		$("#tablaDocumentos .documentoAsociadoChk2:last").removeClass('center-check');
		$("#tablaDocumentos .documentoAsociadoChk2:last").hide();
		$("#tablaDocumentos .documentoAsociadoNombre2:last").hide();
	}
}