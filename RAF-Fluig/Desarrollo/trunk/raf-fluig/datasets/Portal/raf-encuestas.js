/**
 * Dataset: raf-encuestas
 * Descripción: Devuelve las encuestas válidas.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var user = getValue('WKUser');
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("companyId");
	newDataset.addColumn("documentId");
	newDataset.addColumn("version");
	newDataset.addColumn("documentDescription");
	newDataset.addColumn("additionalComments");
	newDataset.addColumn("expires");
	newDataset.addColumn("validationStartDate");
	newDataset.addColumn("expirationDate");
	
	var c1 = DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentType", 4, 4, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("activeVersion", true, true, ConstraintType.MUST);
	// Esto es por el layout
	var c4;
	var dtsParams = DatasetFactory.getDataset("parametros", null, [], null);
	for(var j=0; j<dtsParams.rowsCount; j++){
		if(dtsParams.getValue(j,"clave")=="PORTAL.encuestasFolder"){
			c4 = DatasetFactory.createConstraint("folderId", dtsParams.getValue(j,"valor"), dtsParams.getValue(j,"valor"), ConstraintType.MUST);
		}
	}
	var dts = DatasetFactory.getDataset("raf-allDocumentsIntoFolderRecursive", fields, (constraints? constraints:[]).concat([c1,c2,c3,c4]), sortFields);
	
	var simpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var simpleDateFormat2 = new java.text.SimpleDateFormat("dd/MM/yyyy");
	for(var i=0; i<dts.rowsCount && dts.getValue(i, "documentPK.documentId")!=""; i++){
		var validationStart = simpleDateFormat.parse(dts.getValue(i, "validationStartDate"));
		var validationEnd = simpleDateFormat.parse(dts.getValue(i, "expirationDate"));
		var dateNow = simpleDateFormat.parse(simpleDateFormat.format(new java.util.Date()));
		
		var agregarRow = dts.getValue(i, "expires") == false || ( afterOrEqual(dateNow,validationStart) &&  beforeOrEqual(dateNow,validationEnd));
		
		if(agregarRow && dts.getValue(i, "allowMuiltiCardsPerUser")==false) {
			var documentId =  dts.getValue(i,"documentPK.documentId")
			var c1 = DatasetFactory.createConstraint("parentDocumentId", documentId, documentId, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("colleagueId", user, user, ConstraintType.MUST);
			var usrs = DatasetFactory.getDataset("document", ['documentPK.documentId'], [c1,c2], null);
			if (usrs.rowsCount>0){
				agregarRow = false;
			}
		}
		
		if(agregarRow){
			newDataset.addRow([
			    dts.getValue(i,"documentPK.companyId"),
			    dts.getValue(i,"documentPK.documentId"),
			    dts.getValue(i,"documentPK.version"),
			    dts.getValue(i,"documentDescription"),
			    dts.getValue(i,"additionalComments"),
			    dts.getValue(i,"expires"),
			    simpleDateFormat2.format(validationStart),
			    simpleDateFormat2.format(validationEnd)
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
