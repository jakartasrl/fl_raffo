
/**
 * Dataset: raf-novedades
 * Descripción: Devuelve las novedades válidas.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("documentPK.companyId");
	newDataset.addColumn("documentPK.documentId");
	newDataset.addColumn("documentPK.version");
	newDataset.addColumn("documentDescription");
	newDataset.addColumn("additionalComments");
	newDataset.addColumn("lastModifiedDate");
	newDataset.addColumn("documentTypeId");
	
	var c1 = DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("draft", "false", "false", ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("approved", "true", "true", ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("documentType", 8, 8, ConstraintType.MUST);
	
	var dts = DatasetFactory.getDataset("raf-allDocumentsIntoFolderRecursive", fields, (constraints? constraints:[]).concat([c1,c2,c3,c4,c5]), sortFields);
	
	var simpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
	for(var i=0; i<dts.rowsCount; i++){
		var validationStart = simpleDateFormat.parse(dts.getValue(i, "validationStartDate"));
		var validationEnd = simpleDateFormat.parse(dts.getValue(i, "expirationDate"));
		var dateNow = simpleDateFormat.parse(simpleDateFormat.format(new java.util.Date()));
		
		if(dts.getValue(i, "expires") == false || ( afterOrEqual(dateNow,validationStart) &&  beforeOrEqual(dateNow,validationEnd) )){
			newDataset.addRow([
			    dts.getValue(i,"documentPK.companyId"),
			    dts.getValue(i,"documentPK.documentId"),
			    dts.getValue(i,"documentPK.version"),
			    dts.getValue(i,"documentDescription"),
			    dts.getValue(i,"additionalComments"),
			    dts.getValue(i,"lastModifiedDate"),
			    dts.getValue(i,"documentTypeId")
			]);
		} 
	}
	
	return newDataset;
}

function beforeOrEqual(date,compareDate){
	return ( date.before(compareDate) || date.equals(compareDate) )
}

function afterOrEqual(date,compareDate){
	return ( date.after(compareDate) || date.equals(compareDate) )
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}
