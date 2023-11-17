/*
 * Codigo: raf-reporte-gestion-contratos
 * Descripcion: Dataset que devuelve los datos de las fichas de Gestion de Contratos para el reporte de estado.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Columnas del dataset
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("nroSolicitud");
	newDataset.addColumn("wf_estado");
	newDataset.addColumn("nroRequerimiento");
	newDataset.addColumn("nroContrato");
	newDataset.addColumn("sector");
	newDataset.addColumn("rubro");
	newDataset.addColumn("fechaRegistracion");
	newDataset.addColumn("fechaFirmaContrato");
	newDataset.addColumn("fechaRevision");	
	newDataset.addColumn("fechaEntradaVigencia");
	newDataset.addColumn("fechaFinVigencia");
	newDataset.addColumn("referenciaControl");
	newDataset.addColumn("desvioPermitido");
	newDataset.addColumn("tipoContrato");
	newDataset.addColumn("observaciones");
	newDataset.addColumn("pro_codigo");
	newDataset.addColumn("pro_razonSocial");
	newDataset.addColumn("formaPago_codigo");
	newDataset.addColumn("formaPago_descripcion");
	newDataset.addColumn("formaPago_detalle");
	newDataset.addColumn("moneda");
	newDataset.addColumn("montoTotalUSD");	
	newDataset.addColumn("motivoAdjudicacion");
	newDataset.addColumn("descripcionMotivo");
	newDataset.addColumn("frecuenciaFacturacion");
	newDataset.addColumn("imputacionContable");	
	newDataset.addColumn("inversion_codigo");	
	newDataset.addColumn("inversion_descripcion");	
	newDataset.addColumn("asignacion_codigo");	
	newDataset.addColumn("asignacion_descripcion");	
	
	//Busco fichas activas 
	var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var constraints_principal = new Array(cst); 
	
    // Por BUG en ECM (ver Issue #1845)
    var filtroEstado = null;
	
	var filtroFechaRegistracionDesde = null;
	var filtroFechaRegistracionHasta = null;
	var filtroFechaFirmaContratoDesde = null;
	var filtroFechaFirmaContratoHasta = null;

    if (constraints != null && constraints.length > 0) {
        for (var i=0; i<constraints.length; i++) {
         
			var c = constraints[i];
            var fieldName = c.getFieldName();
			log.error("asdasdasdasdas: " +fieldName);

			if (fieldName == "fechaRegistracionDate") {			
                filtroFechaRegistracionDesde = c.getInitialValue();
				filtroFechaRegistracionHasta = c.getFinalValue();
				log.error("Desde: " + filtroFechaRegistracionDesde + "Hasta: " + filtroFechaRegistracionHasta);
			}else if (fieldName == "fechaFirmaContratoDate") {			
                filtroFechaFirmaContratoDesde = c.getInitialValue();
				filtroFechaFirmaContratoHasta = c.getFinalValue();
				log.error("Desde: " + filtroFechaFirmaContratoDesde + "Hasta: " + filtroFechaFirmaContratoHasta);
			}else if (fieldName == "wf_estado") {
                filtroEstado = c.getInitialValue();
            }else {
                constraints_principal.push(c);
            }

        }
    }
	
	var sortingFields = new Array("nroSolicitud");
	
	var dsPadre = DatasetFactory.getDataset("raf-gestion-contratos", null, constraints_principal , sortingFields); 
	
	var columns = newDataset.getColumnsName();
	
	for(i = 0; i < dsPadre.rowsCount; i++) { 
	
		// Filtro a mano el estado x bug ECM (ver Issue #1845)
		if (filtroEstado != null) {
			var wf_estado = dsPadre.getValue(i, "wf_estado");
			if(filtroEstado != wf_estado) {
				continue;
			}
		}
		
		if(filtroFechaRegistracionDesde != null &&  parseDate(dsPadre.getValue(i, "fechaRegistracion")) < filtroFechaRegistracionDesde){
			continue;
		}
		
		if(filtroFechaRegistracionHasta != null &&  parseDate(dsPadre.getValue(i, "fechaRegistracion")) > filtroFechaRegistracionHasta){
			continue;
		}
		
		if(filtroFechaFirmaContratoDesde != null &&  parseDate(dsPadre.getValue(i, "fechaFirmaContrato")) < filtroFechaFirmaContratoDesde){
			continue;
		}
		
		if(filtroFechaFirmaContratoHasta != null &&  parseDate(dsPadre.getValue(i, "fechaFirmaContrato")) > filtroFechaFirmaContratoHasta){
			continue;
		}
		
		var row = new Array();
			
		for (j=0; j < columns.length; j++) {
			
			var column = columns[j];
			var value = "";

			try {
			
				value = dsPadre.getValue(i, column);
				if(column == "imputacionContable"){
					var imputacionContable;
					if(value == "imputacionContable1"){
						imputacionContable = "CODIGO DE INVERSION";
					}else if(value == "imputacionContable2"){
						imputacionContable = "CLAVE DE ASIGNACION";
					}else{
						imputacionContable = "COMBINACION DE CUENTAS";
					}
					row.push(imputacionContable);
				}else if(column == "montoTotalUSD"){
					row.push(dsPadre.getValue(i, "totalUSD"));
				}else{
					row.push(value);
				}	
			} catch (ex) {
				log.error("Error obteniendo valor de columna: " + column + " :" + ex.message);
			}
			
		}
	
		// Agrego datos al ds 
		newDataset.addRow(row); 
		
	}
	
	return newDataset; 

}

function parseDate(value) {
	var dateParser1 = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var dateParser2 = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var fecha = null;
	try {
		if (value != "") {
			fecha = dateParser1.parse(value);
			fecha = dateParser2.format(fecha);
		}		
	} catch (ex) {
		log.error("Error parseando fecha con formato dd/MM/yyyy: " + value);
	}
	return fecha;
}