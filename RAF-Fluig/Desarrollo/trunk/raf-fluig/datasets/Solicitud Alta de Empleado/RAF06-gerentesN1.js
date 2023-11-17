/*
* Código: raf-gerentesN1
* Descripción: Devuelve matrícula, nombre y mail de los usuarios del grupo ROL-GTE-N1.
*/
function createDataset(fields, constraints, sortFields){

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("matricula");	
	newDataset.addColumn("nombre");
	newDataset.addColumn("email");	

	var codigoGrupo = 'ROL-GTE-N1';
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
	var datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

	var constraintsObj = arqConstraintApplier.createConstraintsObj(constraints);
	for(var i = 0; i < datasetColleagueGroup.rowsCount; i++) {         
		var matricula = datasetColleagueGroup.getValue(i, "colleagueGroupPK.colleagueId");            
		
		var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST); 
		var constraintsUser = new Array(c2);          
		var datasetUser = DatasetFactory.getDataset("colleague", null, constraintsUser, null);
		var email = datasetUser.getValue(0, "mail");
		var nombre = datasetUser.getValue(0, "colleagueName");
		
		var isValidRow = arqConstraintApplier.isValidValue(matricula, constraintsObj['nombre'][0].initialValue, constraintsObj['nombre'][0].finalValue, true) 
						|| arqConstraintApplier.isValidValue(nombre, constraintsObj['nombre'][0].initialValue, constraintsObj['nombre'][0].finalValue, true) 
						|| arqConstraintApplier.isValidValue(email, constraintsObj['nombre'][0].initialValue, constraintsObj['nombre'][0].finalValue, true);
		
		if (isValidRow) {
			newDataset.addRow([matricula, nombre, email]);
		}
		
	}	

    return newDataset;
 
}

var arqConstraintApplier = {
	createConstraintsObj: function(constraints){
		var constraintsObj = {};
		if (constraints != null) {
			for (var i=0; i<constraints.length; i++) {
				if (constraintsObj[constraints[i].fieldName]){
					constraintsObj[constraints[i].fieldName].push({
						initialValue: constraints[i].initialValue, 
						finalValue: constraints[i].finalValue,
						likeSearch: constraints[i].likeSearch,
						type: constraints[i].constraintType
					});
				} else {
					constraintsObj[constraints[i].fieldName] = [{
							initialValue: constraints[i].initialValue, 
							finalValue: constraints[i].finalValue,
							likeSearch: constraints[i].likeSearch,
							type: constraints[i].constraintType
					}];
				}
			}
		}
		return constraintsObj;
	},
	
	isValidRow: function(dataset, rowNum, constraintsObj){
		for (fieldName in constraintsObj) {
			var shouldValid = false;
				anyShould = false;
			for (var j=0; j<constraintsObj[fieldName].length; j++) {
				if (constraintsObj[fieldName][j].type == ConstraintType.MUST) {
					if(!this.isValidValue(dataset.getValue(rowNum, fieldName), constraintsObj[fieldName][j].initialValue,
							constraintsObj[fieldName][j].finalValue, constraintsObj[fieldName][j].likeSearch)){
						return false;
					}
				} else if (constraintsObj[fieldName][j].type == ConstraintType.MUST_NOT) {
					if(this.isValidValue(dataset.getValue(rowNum, fieldName), constraintsObj[fieldName][j].initialValue,
							constraintsObj[fieldName][j].finalValue, constraintsObj[fieldName][j].likeSearch)){
						return false;
					}
				} else if (constraintsObj[fieldName][j].type == ConstraintType.SHOULD) {
					anyShould = true;
					if(this.isValidValue(dataset.getValue(rowNum, fieldName), constraintsObj[fieldName][j].initialValue,
							constraintsObj[fieldName][j].finalValue, constraintsObj[fieldName][j].likeSearch)){
						shouldValid = true;
					}
				}
			}
			if (anyShould && !shouldValid) return false;
		}
		return true;
	},
	
	isValidValue: function(datasetValue, initialValue, finalValue, likeSearch){
		var value;
		if (!(datasetValue instanceof java.lang.String)) {
			value = java.lang.String.valueOf(datasetValue);
		} else {
			value = datasetValue;
		}
		
		if(initialValue == finalValue){
			return (!likeSearch && value.equalsIgnoreCase(initialValue)) || 
			( likeSearch && value.toLowerCase().matches(initialValue.toLowerCase().replace(".", "\\.").replace("%", ".*")));
		} else {
			return (value.toUpperCase().compareTo(initialValue.toUpperCase()) >= 0) &&
			(value.toUpperCase().compareTo(finalValue.toUpperCase()) <= 0);
		}
	}	
}

