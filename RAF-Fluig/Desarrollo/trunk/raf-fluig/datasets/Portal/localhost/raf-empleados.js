/**
 * Dataset: raf-empleados
 * Descripción: Trae los empleados del AD + los de Fluig que no esten en AD
*/

function createDataset(fields, constraints, sortFields) { 
	// Get dataset
	var dts = DatasetBuilder.newDataset();
	dts.addColumn("samaccountname");
	dts.addColumn("apellidoynombre");
	dts.addColumn("interno");
	dts.addColumn("sede");
	dts.addColumn("legajo");
	dts.addColumn("puesto");
	dts.addColumn("departamento");
	dts.addColumn("celular");
	dts.addColumn("mail");
	dts.addColumn("gerencia");
	dts.addColumn("fechaNacimiento");
	dts.addColumn("fechaingreso");
	dts.addColumn("dni");
	dts.addColumn("usuarioGenerico");

	
	//Logueo Constraints
	if(constraints){
		for(var i=0; i<constraints.length; i++){
			log.info("DEBUG - CONSTRAINT = {fieldName:"+constraints[i].fieldName+", initialValue:"+constraints[i].initialValue+"}");
		}
	}
	
	var filter = (getContraint(constraints,"apellidoynombre")+"").replace(/%/g,"").toUpperCase();
	
	var data = [
        ["sala1","Sala1","1234","PLANTA VILLA MARTELLI","sala1","Cuenta Administrativa","Desarrollo","","sala1@raffo.com.ar","","","","","true"],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["danalitico","Desarrollo Analitico","5129","PLANTA VILLA MARTELLI","1","Cuenta Administrativa","Desarrollo","","danalitico@raffo.com.ar","","","","",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
		["Dorellana","Orellana, Diego","7222","OFICINAS MUNRO","10308","SUPERVISOR - OPERACIONES IT","TECNOLOGIA","1140468792","dorellana@raffo.com.ar","ADMINISTRACION Y FINANZAS","26/3/1968","6/12/1999","20230239",""],
	];
	
	for(var i=0; i<data.length; i++){
		if(data[i][1].toUpperCase().indexOf(filter) != -1){
			dts.addRow(data[i]);
		}
	}
	
	
	return dts;
}

function getContraint(constraints, fieldName) {
	if(constraints){
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return "";
}

