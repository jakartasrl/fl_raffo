function displayFields(form,customHTML){
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
	
	var user = getValue("WKUser");
	var tareaActual = getValue("WKNumState");
	
	if(tareaActual == 0) {
		var ct1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST); 
		var ct2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RAF07-INI%", "RAF07-INI%", ConstraintType.MUST);
		ct2.setLikeSearch(true);
		var datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [ct1,ct2], null);
		
		if (datasetColleagueGroup.rowsCount > 0) {
			
			var groupId = datasetColleagueGroup.getValue(0, "colleagueGroupPK.groupId");
			var c1 = DatasetFactory.createConstraint("groupPK.groupId", groupId, groupId, ConstraintType.MUST);
			var datasetGroup = DatasetFactory.getDataset("group", null, [c1], null);

			form.setValue("userGroup", datasetGroup.getValue(0, "groupDescription"));
			form.setValue("userGroupCode", datasetGroup.getValue(0, "groupPK.groupId"));
			form.setValue("userGroupPool", "Pool:Group:"+datasetGroup.getValue(0, "groupPK.groupId"));
		}
	}
	
	arq.form.displayFields(form,customHTML);
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

