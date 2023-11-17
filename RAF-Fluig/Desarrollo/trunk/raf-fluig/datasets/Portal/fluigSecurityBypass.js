/**
 * Dataset: raf-fluigSecurityProxy
 * Descripción: Se comporta como un proxy para manejar seguridad de documentos.
 * Requerimientos: 
 * 		# Debe tener seteado "securityProxy.user" y "securityProxy.pass" en el dataset "parametros".
 * 		# Crear el servcio soap: ECMDatasetService.
*/
function createDataset(fields, constraints, sortFields) { 
	var datasetName = getConstraintValue(constraints,"datasetName"),
		actualConstraints = removeConstraint(constraints,"datasetName");
	
	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
	
	var companyId = getValue("WKCompany"),
		user = arq.prop.get("securityProxy.user"),
		password = arq.prop.get("securityProxy.pass");
	
	const packageDataservice = "com.totvs.technology.ecm.dataservice.ws";
	const packageArray = "net.java.dev.jaxb.array";
	
	var serviceHelper = ServiceManager.getService("ECMDatasetService").getBean(),
	serviceLocator = serviceHelper.instantiate(packageDataservice + ".ECMDatasetServiceService"),
	service = serviceLocator.getDatasetServicePort();
	
	var fieldsStringArray = serviceHelper.instantiate(packageArray + ".StringArray");
	if(fields) {
		for(var i=0; i<fields.length; i++) {
			fieldsStringArray.getItem().add(fields[i]);
		}
	}
	
	var searchConstraintDtoArray = serviceHelper.instantiate(packageDataservice + ".SearchConstraintDtoArray");
	for (var i=0; i<actualConstraints.length; i++) {
		var searchConstraintDto = serviceHelper.instantiate(packageDataservice + ".SearchConstraintDto");
		searchConstraintDto.setFieldName(actualConstraints[i].fieldName);
		searchConstraintDto.setInitialValue(actualConstraints[i].initialValue);
		searchConstraintDto.setFinalValue(actualConstraints[i].finalValue);
		searchConstraintDto.setContraintType(actualConstraints[i].constraintType.toString());
		searchConstraintDto.setLikeSearch(actualConstraints[i].likeSearch);
		searchConstraintDtoArray.getItem().add(searchConstraintDto);
	}
	
	var orderStringArray = serviceHelper.instantiate(packageArray + ".StringArray");
	if(sortFields) {
		for(var i=0; i<sortFields.length; i++) {
			orderStringArray.getItem().add(sortFields[i]);
		}		
	}
	
	var datasetDTO = service.getDataset(companyId,user,password,datasetName,fieldsStringArray,searchConstraintDtoArray,orderStringArray);
	
	var newDataset = DatasetBuilder.newDataset();
	
	var columns = datasetDTO.getColumns();
	for(var i=0; i<columns.size(); i++) {
		newDataset.addColumn(columns.get(i));
	}
	
	var values = datasetDTO.getValues();
	for(var i=0; i<values.size(); i++) {
		var valueList = values.get(i).getValue();
		newDataset.addRow(valueList.toArray());
	}
	
	return newDataset;
}

function getConstraintValue(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

function removeConstraint(constraints, ctToRemove) {
	var cts = [];
	for (var i=0; i<constraints.length; i++) {
		if(constraints[i].fieldName != ctToRemove){
			cts.push(constraints[i]);
		}
	}
	return cts;
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
