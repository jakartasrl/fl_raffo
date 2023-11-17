/*
 Codigo: raf-groups
 Descripcion: Grupos de Usuarios
*/
function createDataset(fields, constraints, sortFields) { 
 
 // Creo dataset con dos columnas
 var newDataset = DatasetBuilder.newDataset();
 newDataset.addColumn("code");
 newDataset.addColumn("description"); 
 
 var constraints = new Array(); 
  
 var datasetGroup = DatasetFactory.getDataset("group", null, constraints, null); 
 
 //Cargo en el dataset
 for(j = 0; j < datasetGroup.rowsCount; j++) {
  var code = datasetGroup.getValue(j, "groupPK.groupId");
  var description = datasetGroup.getValue(j, "groupDescription");
  newDataset.addRow(new Array(code, description));
 }

 return newDataset; 
}