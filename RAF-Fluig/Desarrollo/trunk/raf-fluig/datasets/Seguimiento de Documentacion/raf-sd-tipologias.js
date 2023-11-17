/*
* Codigo: raf-sd-tipologias
* Descripcion: Tipologías
*/
function createDataset(fields, constraints, sortFields) { 

    // Creo dataset con las columnas a visualizar
    var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo");
    newDataset.addColumn("nombre");
    newDataset.addColumn("soloConfirmacionLectura");
    newDataset.addColumn("plazoAvanceAutomatico");
	newDataset.addColumn("codigoGrupo"); 
	
	var matricula = getContraint(constraints, "matricula")? getContraint(constraints, "matricula").initialValue : "adm";
	
	var grupos = getGroupList(matricula);
	
	
	var c01 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var constraints = new Array(c01);

	var dataset = DatasetFactory.getDataset("raf-sd-tipologias-form", null, constraints, null);
	
	for(i = 0; i < dataset.rowsCount; i++) {         
		var codigoGrupo = dataset.getValue(i, "codigoGrupo");            
		for(var j=0; j<grupos.size(); j++) {
			if(grupos.get(j).equals(codigoGrupo)){
				newDataset.addRow(new Array(dataset.getValue(i, "codigo"),dataset.getValue(i, "nombre"),
					dataset.getValue(i, "soloConfirmacionLectura"),dataset.getValue(i, "plazoAvanceAutomatico"),
					dataset.getValue(i, "codigoGrupo")));
			}
		}
    }
	
    return newDataset; 

}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i];
		}
	}
	return;
}

function getGroupList(colleagueId){

    var groupList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST); 
    var constraints = new Array(c1);          
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);

	for(i = 0; i < dataset.rowsCount; i++) {         
		var groupId = dataset.getValue(i, "colleagueGroupPK.groupId");            
		groupList.add(groupId);
    }
	
	return new java.util.ArrayList(groupList); 
	
}