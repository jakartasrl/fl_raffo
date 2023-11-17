/*
* Código: RAF-Jefes
* Descripción: Devuelve matrícula, nombre y mail de los usuarios del grupo ROL-JFE.
*/
function createDataset(fields, constraints, sortFields){

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("matricula");	
	newDataset.addColumn("nombre");
	newDataset.addColumn("email");	

	var codigoGrupo = 'ROL-JFE';
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
    var constraintsGrupo = new Array(c1);          
 
    var datasetGrupo = DatasetFactory.getDataset("colleagueGroup", null, constraintsGrupo, null);

   for(var i = 0; i < datasetGrupo.rowsCount; i++) {         
   
		var matricula = datasetGrupo.getValue(i, "colleagueGroupPK.colleagueId");            
      
		var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST); 
		var constraintsUser = new Array(c2);          
		var datasetUser = DatasetFactory.getDataset("colleague", null, constraintsUser, null);
		
		var email = datasetUser.getValue(0, "mail");
		var nombre = datasetUser.getValue(0, "colleagueName");
		
		log.info("RAF-Jefes - COLLEAGUE NAME: " + nombre + " - ID: " + matricula);
	  
		newDataset.addRow([matricula, nombre, email]);
	  
    }	

    return newDataset;
 
}