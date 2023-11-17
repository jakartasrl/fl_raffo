
/**
 * Dataset: raf-organigrama-json
 * Descripción: Devuelve el organigrama en formato JSON.
*/
function createDataset(fields, constraints, sortFields) { 
	
	//Esto por usar el raf-customSecurity
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == 'tablename'){
			return DatasetFactory.getDataset("PORTAL-Organigrama", fields, constraints, sortFields);
		}
	}
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("JSON");
	
	var rootNode = getContraint(constraints,"rootNode");
	var validConstraints = getValidConstraints(constraints, ["rootNode"])
	var objOrgChart = getNodeInfo(rootNode,validConstraints);
	
	newDataset.addRow([JSON.stringify(objOrgChart)]);
	
	return newDataset;
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

function getValidConstraints(constraints, invalidConstraints) {
	if (!invalidConstraints) invalidConstraints = [];
	var cts = [];
	for (var i=0; i<constraints.length; i++) {
		var isValid = true;
		for (var j=0; j<invalidConstraints.length; j++) {
			if (constraints[i].fieldName == invalidConstraints[j]){
				isValid = false;
			}
		}
		if (isValid) cts.push(constraints[i]);
	}
	return cts;
}

function getNodeInfo(nodeId,constraints){
	var node = {};

	// Recupero los datos del nodo
	var c1 = DatasetFactory.createConstraint("documentid", nodeId, nodeId, ConstraintType.MUST);
	var dtsNode = DatasetFactory.getDataset("PORTAL-Organigrama", null, constraints.concat([c1]), null);
	
	node.nombre = dtsNode.getValue(0, "nombre")+'';
	node.cargo = dtsNode.getValue(0, "cargo")+'';
	node.legajo = dtsNode.getValue(0, "legajo")+'';
	node.interno = dtsNode.getValue(0, "interno")+'';
	node.mail = dtsNode.getValue(0, "mail")+'';
	node.supFuncional = dtsNode.getValue(0, "supFuncional")+'';
	node.supFuncionalCode = dtsNode.getValue(0, "supFuncionalCode")+'';
	
	// Obtengo el color
	var nivelJerarquico = dtsNode.getValue(0, "nivelJerarquico");
	var c2 = DatasetFactory.createConstraint("descripcion", nivelJerarquico, nivelJerarquico, ConstraintType.MUST);
	var dtsColor = DatasetFactory.getDataset("PORTAL-NivelesJerarquicos", ["color"], [c2], null);
	node.color = dtsColor.getValue(0, "color")+'';
	
	// Obtengo los nodos hijos
	var c3 = DatasetFactory.createConstraint("supJerarquicoCod", nodeId, nodeId, ConstraintType.MUST);
	var dtsChildren = DatasetFactory.getDataset("PORTAL-Organigrama", ["documentid"], constraints.concat([c3]), null);
	node.children = [];
	for(var i=0; i<dtsChildren.rowsCount; i++) {
		node.children.push(getNodeInfo(dtsChildren.getValue(i, "documentid"),constraints));
	}
	
	return node;
}
