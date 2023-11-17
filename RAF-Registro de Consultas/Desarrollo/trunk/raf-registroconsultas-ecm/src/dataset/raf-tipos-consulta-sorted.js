/*
 * Dataset: raf-tipos-consulta-sorted
 * Descripcion: Tipos de Consultas Ordenadas.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo");
	newDataset.addColumn("descripcion");

	// Define los campos para ordenacion 
	var sortingFields = new Array("descripcion");
	
	var c01 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var constraints = new Array(c01);

	var dataset = DatasetFactory.getDataset("raf-tipos-consulta", null, constraints, sortingFields);
	
	//Cargo en el dataset
	for(j = 0; j < dataset.rowsCount; j++) {
	  
		var codigo = dataset.getValue(j, "codigo");
		var descripcion = dataset.getValue(j, "descripcion");

		newDataset.addRow(new Array(codigo, descripcion));
	}

	return newDataset;  

}
