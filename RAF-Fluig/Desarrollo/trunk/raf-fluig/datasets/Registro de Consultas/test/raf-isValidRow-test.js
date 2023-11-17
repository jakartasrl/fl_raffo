/*
* Código: raf-atencion-consultas-FCIA-test
*/
function createDataset(fields, constraints, sortFields) {

	var cts = [
		DatasetFactory.createConstraint("login", "%admin%", "%admin%", ConstraintType.SHOULD),
	];
	cts[0].setLikeSearch(true);
	var dts = DatasetFactory.getDataset("colleague", null, cts, null); 
    
	var ndts = DatasetBuilder.newDataset();
	ndts.addColumn("Colleague");
	ndts.addColumn("Status");
	
	var c1 = DatasetFactory.createConstraint("mail", "%@%", "%@%", ConstraintType.MUST);
	c1.setLikeSearch(true);
	
	for (var j=0; j<dts.rowsCount; j++){
		ndts.addRow([dts.getValue(j, "colleaguePK.colleagueId"), isValidRow(dts, j, [c1])])
	}
	
	return ndts;
       

}


function isValidRow(dataset, rowNum, constraints){
	if (constraints != null) {
		var filters = {};
		for (var i=0; i<constraints.length; i++) {
			if (constraints[i].constraintType == ConstraintType.MUST ||
					constraints[i].constraintType == ConstraintType.MUST_NOT) {
				filters[constraints[i].fieldName] = {
					initialValue: constraints[i].initialValue, 
					finalValue: constraints[i].finalValue,
					likeSearch: constraints[i].likeSearch,
					type: constraints[i].constraintType
				};
			} else if (constraints[i].constraintType == ConstraintType.SHOULD) {
				if (filters[constraints[i].fieldName]){
					filters[constraints[i].fieldName].values.push({
						initialValue: constraints[i].initialValue, 
						finalValue: constraints[i].finalValue,
						likeSearch: constraints[i].likeSearch
					});
				} else {
					filters[constraints[i].fieldName] = {
						values: [{
							initialValue: constraints[i].initialValue, 
							finalValue: constraints[i].finalValue,
							likeSearch: constraints[i].likeSearch
						}],
						type: constraints[i].constraintType
					}
				}
			}
		}
		for (fieldName in filters) {
			if (filters[fieldName].type == ConstraintType.MUST) {
				if(!isValidValue(dataset.getValue(rowNum, fieldName), filters[fieldName].initialValue, filters[fieldName].finalValue, filters[fieldName].likeSearch)){
					return false;
				}
			} else if (filters[fieldName].type == ConstraintType.MUST_NOT) {
				if(isValidValue(dataset.getValue(rowNum, fieldName), filters[fieldName].initialValue, filters[fieldName].finalValue, filters[fieldName].likeSearch)){
					return false;
				}
			} else if (filters[fieldName].type == ConstraintType.SHOULD) {
				var valid = false;
				for (var j=0; j<filters[fieldName].values.length; j++){
					if(isValidValue(dataset.getValue(rowNum, fieldName), filters[fieldName].values[j].initialValue,
							filters[fieldName].values[j].finalValue, filters[fieldName].values[j].likeSearch)){
						valid = true;
					}
				}
				if (!valid) return false;
			}
		}

	}
    return true;
}

function isValidValue(datasetValue, initialValue, finalValue, likeSearch){
	var value;
	if (!(datasetValue instanceof java.lang.String)) {
		value = String.valueOf(datasetValue);
	} else {
		value = datasetValue;
	}
		
	if(initialValue == finalValue){
		return (!likeSearch && value.equalsIgnoreCase(initialValue)) || 
		( likeSearch && value.toLowerCase().matches(initialValue.toLowerCase().replace("%", ".*")));
	} else {
		return (value.toUpperCase().compareTo(initialValue.toUpperCase()) >= 0) &&
		(value.toUpperCase().compareTo(finalValue.toUpperCase()) <= 0);
	}
}