/**
 * Codigo: raf-unidades
 * Descripcion: Consulta de Unidades de Medida al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarUnidadesMedida_opttRowHolder");	      	                       
	
	service.buscarUnidadesMedida("RAFFO",result);
	
	var descripcion = getConstraint(constraints,"descripcion");
	log.error("*********** descr:  ************" + descripcion);
	
	for (var i=0; i<result.value.length; i++) {
		var unidad = result.value[i];
		if (descripcion != ""){		
			if (unidad.getDescripcion().toLowerCase().contains(descripcion.toLowerCase())) {
				newDataset.addRow(new Array(unidad.getCodigo(), unidad.getDescripcion())); 					
			}
		}
		else{
			newDataset.addRow(new Array(unidad.getCodigo(), unidad.getDescripcion())); 	
		}
		
	}
	
	return newDataset;
	
}

function getConstraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

function removeConstraints(constraints, constraintsToRemove) {
	if (!constraintsToRemove) constraintsToRemove = [];
	var cts = [];
	for (var i=0; i<constraints.length; i++) {
		var isValid = true;
		for (var j=0; j<constraintsToRemove.length; j++) {
			if (constraints[i].fieldName == constraintsToRemove[j]){
				isValid = false;
			}
		}
		if (isValid) cts.push(constraints[i]);
	}
	return cts;
}