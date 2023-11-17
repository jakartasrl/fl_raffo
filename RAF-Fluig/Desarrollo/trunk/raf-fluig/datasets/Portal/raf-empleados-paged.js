/**
 * Dataset: raf-empleados-paged
 * Descripción: Consulta el dataset raf-empleados con nuevas constraints.
*/

// Define the dataset's result fields
var resultFields = {
	"samaccountname": "samaccountname",
	"apellidoynombre": "displayName", 
	"interno": "telephoneNumber", 
	"sede": "physicalDeliveryOfficeName",
	"legajo": "employeeID",
	"puesto": "title",
	"departamento": "department",
	"celular": "homePhone",
	"mail": "mail",
	"gerencia": "division",
	"fechaNacimiento": "extensionAttribute3",
	"fechaingreso": "extensionAttribute2",
	"dni": "employeeNumber",
	"usuarioGenerico": "usuarioGenerico"
};

function createDataset(fields, constraints, sortFields) { 
	
	var dts = DatasetBuilder.newDataset();
	for(field in resultFields) {
		dts.addColumn(field);
	}
	
	var countFrom = getContraint(constraints,"countFrom");
	var countTo = getContraint(constraints,"countTo");
	
	var empleados = DatasetFactory.getDataset("raf-empleados-ordered", fields, filterConstraints(constraints,['countFrom','countTo']), sortFields);
	
	if(!countFrom) countFrom = 0;
	if(!countTo || countTo > empleados.rowsCount) {
		countTo = empleados.rowsCount;
	}
	
	for (var i=countFrom; i<countTo; i++){
		var array = [];
		for(field in resultFields) {
			array.push(empleados.getValue(i, field));
		}
		dts.addRow(array);
	}
	
	return dts;
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

function filterConstraints(constraints, constraintsToRemove) {
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