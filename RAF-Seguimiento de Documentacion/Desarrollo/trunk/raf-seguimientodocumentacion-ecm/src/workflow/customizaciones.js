function setPlazoAvanceAutomatico(colleagueId) {

	var nroProceso = getValue("WKNumProces");
	var plazoAvanceAutomatico = hAPI.getCardValue("plazoAvanceAutomatico");

	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();

	var obj = hAPI.calculateDeadLineHours(new Date(), ((h*60*60) + (m*60)), plazoAvanceAutomatico, "Default");
	var data = obj[0];
	var segundos = obj[1];
	hAPI.setDueDate(nroProceso,0,colleagueId, data, segundos);
		
}

function getUsuarios(codigoGrupo){

	var usuarios = new java.lang.String("");
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
    var constraints = new Array(c1);          
 
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);

   for(i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");            
      usuarios = usuarios + colleagueId + ",";
   }

   return usuarios.substring(0,usuarios.length-1);
 
}