/*
* Código: raf-sd-usuarios-tipologias
* Descripción: Permite el inicio de una solicitud de seguimiento de documentación unicamente a los usuarios que pertenecen a una tipología.
*/
function resolve(process,colleague,configXML){ 

	var constraints = new Array(); 
	var datasetGroup = DatasetFactory.getDataset("group", null, constraints, null); 
			
	var userList = new java.util.ArrayList();
	
	for(j = 0; j < datasetGroup.rowsCount; j++) {
		var groupCode = datasetGroup.getValue(j, "groupPK.groupId");
		if(new java.lang.String(groupCode).startsWith("SD_TIP_")){
			userList.addAll(getUserList(groupCode));
		}
	}
		
	return userList;
		
}

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
    var constraints = new Array(c1);          
 
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);

   for(i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");            
      userList.add(colleagueId);
    }

   return new java.util.ArrayList(userList);
 
}

