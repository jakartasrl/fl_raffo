/**
 * Dataset: RAF05-CompetenciasPorNivel-sorted
 * Descripción: Muestra las competencias por nivel ordenadas.
*/
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("nivel");
	newDataset.addColumn("documentid");
	newDataset.addColumn("version");

	// Define los campos para ordenacion 
	var sortingFields = new Array("nivel");
	
	var dataset = DatasetFactory.getDataset("RAF05-CompetenciasPorNivel", null, constraints, sortingFields);
	
	//Cargo en el dataset
	for(j = 0; j < dataset.rowsCount; j++) {
	  
		var nivel = dataset.getValue(j, "nivel");
		var documentid = dataset.getValue(j, "documentid");
		var version = dataset.getValue(j, "version");

		newDataset.addRow(new Array(nivel, documentid, version));
	}

	if (newDataset.rowsCount > 0) return newDataset; 

}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}
