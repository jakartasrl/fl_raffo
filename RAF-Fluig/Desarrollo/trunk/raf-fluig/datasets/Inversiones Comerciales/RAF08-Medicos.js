function createDataset(fields, constraints, sortFields) {

	var apellido = getContraint(constraints, "apellido");	

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where1 = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {		
			'apellido': function(apellido) {
				return " AND (APELLIDO LIKE '" + apellido.initialValue + "%')";
			}
		},
		log: 1
	});
	
	var ds1 = arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: 	" SELECT TOP 500 'Fluig ' as origen " +
				",CUIT as cuit  " +
				",APELLIDO as apellido " +
				",NOMBRE as nombre " +
				",DNI as dni " +
				",TIPO_DOCUMENTO as tipoDocumento " +
				",NUMERO_DOCUMENTO as numeroDocumento " +
				",NUMERO_PASAPORTE as numeroPasaporte " +
	 		   	",FECHA_VTO_PASAPORTE as fechaVtoPasaporte " +
				",SEXO as sexo " +
				",FECHA_NACIMIENTO as fechaNacimiento " +
				",NACIONALIDAD as nacionalidad " +
				",DOMICILIO as domicilio " +
			 	",LOCALIDAD as localidad " +
				",PROVINCIA as provincia " +
				",PAIS as pais " +
				",CODIGO_POSTAL as codigoPostal " +
				",TELEFONO_CONTACTO as telefonoContacto " +
				",CELULAR as celular " +
				",MAIL_CONTACTO as mailContacto " +
				",ESPECIALIDAD_PROFESIONAL as especialidadProfesional " +
				",TITULO_GRADO as tituloGrado " +
				",INSTITUCION_DODDE_OBTUVO as institucionDondeObtuvo " +
				",ANIO_EGRESO as anioEgreso " +
				",MATRICULA as matricula " +
				",INSTITUCION_QUE_TRABAJA as institucionQueTrabaja " +
				",CARGO_POSICION as cargoPosicion " +
				",MEMBRESIA as membresia " +
				",CIUDAD as ciudad " +
				 "   FROM Z_RAF_MEDICO " +
				 " 	 WHERE " + where1 +
				 "  ORDER BY apellido, nombre;",
		log: 1
	});
	
	var where2 = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {		
			'apellido': function(apellido) {
				return " AND (apellido LIKE '" + apellido.initialValue + "%')";
			},
		},
		log: 1
	});
	
	var ds2 = arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FicheroMedicoDSRO",
		sql: 	" SELECT TOP 500 'Fichero Médico' as origen " +
				" ,CUIT as cuit" +    
 		   	 	" ,APELLIDO as apellido " + 
				" ,NOMBRE as nombre " +
				" ,'' as dni " +
				" ,'CUIT' as tipoDocumento " +
				" ,CUIT as numeroDocumento " +
				" ,'' as numeroPasaporte " +
				" ,'' as fechaVtoPasaporte " +
				" ,'' as sexo " +
				" ,'' as fechaNacimiento " +
				" ,'' as nacionalidad " +
				" ,CALLE + ' ' + NUMERO + CASE WHEN (PISO IS NOT NULL AND PISO <> 0) THEN ' PISO ' + PISO ELSE '' END +  CASE WHEN (DEPTO IS NOT NULL AND DEPTO <> '') THEN ' DEPTO ' + DEPTO ELSE '' END as domicilio " +
				" ,CIUDAD as localidad " +
				" ,'' as provincia " +
				" ,'' as pais " +
				" ,COPO as codigoPostal " + 
				" ,'' as telefonoContacto " +
				" ,'' as celular " +
				" ,'' as mailContacto " +
				" ,ESP1 as especialidadProfesional " +
				" ,'' as tituloGrado " +
				" ,'' as institucionDondeObtuvo " +
				" ,'' as anioEgreso " +
				" ,CASE WHEN (MATN IS NOT NULL AND MATN <> '' AND MATN <> 0) THEN MATN ELSE MATP END as matricula " +
				" ,CASE WHEN (INSTITUCIONES IS NOT NULL) THEN INSTITUCIONES ELSE '' END as institucionQueTrabaja " +
				" ,'' as cargoPosicion " +
				" ,'' as membresia " +
				" ,CIUDAD as ciudad " +
			 "   FROM [FICHERO_IMKT].[dbo].[lv_med_fichero_medico] " +
			 " 	 WHERE " + where2 +
			 "  ORDER BY APELLIDO, NOMBRE;",
		log: 1
	});
	
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("origen");	
	newDataset.addColumn("cuit");
	newDataset.addColumn("apellido");	
	newDataset.addColumn("nombre");
	newDataset.addColumn("dni");
	newDataset.addColumn("tipoDocumento");
	newDataset.addColumn("numeroDocumento");
	newDataset.addColumn("numeroPasaporte");
	newDataset.addColumn("fechaVtoPasaporte");
	newDataset.addColumn("sexo");
	newDataset.addColumn("fechaNacimiento");
	newDataset.addColumn("nacionalidad");
	newDataset.addColumn("domicilio");
	newDataset.addColumn("localidad");
	newDataset.addColumn("provincia");
	newDataset.addColumn("pais");
	newDataset.addColumn("codigoPostal");
	newDataset.addColumn("telefonoContacto");
	newDataset.addColumn("celular");
	newDataset.addColumn("mailContacto");
	newDataset.addColumn("especialidadProfesional");
	newDataset.addColumn("tituloGrado");
	newDataset.addColumn("institucionDondeObtuvo");
	newDataset.addColumn("anioEgreso");
	newDataset.addColumn("matricula");
	newDataset.addColumn("institucionQueTrabaja");
	newDataset.addColumn("cargoPosicion");
	newDataset.addColumn("membresia");
	newDataset.addColumn("ciudad");
	
	for(j = 0; j < ds1.rowsCount; j++) {
	  
		var origen = ds1.getValue(j, "origen");
		var cuit = ds1.getValue(j, "cuit");
		var apellido = ds1.getValue(j, "apellido");
		var nombre = ds1.getValue(j, "nombre");
		var dni = ds1.getValue(j, "dni");
		var tipoDocumento = ds1.getValue(j, "tipoDocumento");
		var numeroDocumento = ds1.getValue(j, "numeroDocumento");
		var numeroPasaporte = ds1.getValue(j, "numeroPasaporte");
		var fechaVtoPasaporte = ds1.getValue(j, "fechaVtoPasaporte");
		var sexo = ds1.getValue(j, "sexo");
		var fechaNacimiento = ds1.getValue(j, "fechaNacimiento");
		var nacionalidad = ds1.getValue(j, "nacionalidad");
		var domicilio = ds1.getValue(j, "domicilio");
		var localidad = ds1.getValue(j, "localidad");
		var provincia = ds1.getValue(j, "provincia");
		var pais = ds1.getValue(j, "pais");
		var codigoPostal = ds1.getValue(j, "codigoPostal");
		var telefonoContacto = ds1.getValue(j, "telefonoContacto");
		var celular = ds1.getValue(j, "celular");
		var mailContacto = ds1.getValue(j, "mailContacto");
		var especialidadProfesional = ds1.getValue(j, "especialidadProfesional");
		var tituloGrado = ds1.getValue(j, "tituloGrado");
		var institucionDondeObtuvo = ds1.getValue(j, "institucionDondeObtuvo");
		var anioEgreso = ds1.getValue(j, "anioEgreso");
		var matricula = ds1.getValue(j, "matricula");
		var institucionQueTrabaja = ds1.getValue(j, "institucionQueTrabaja");
		var cargoPosicion = ds1.getValue(j, "cargoPosicion");
		var membresia = ds1.getValue(j, "membresia");
		var ciudad = ds1.getValue(j, "ciudad");

		newDataset.addRow(new Array(origen, cuit, apellido, nombre, dni, tipoDocumento, numeroDocumento, numeroPasaporte, 
		fechaVtoPasaporte, sexo, fechaNacimiento, nacionalidad, domicilio, 
		localidad, provincia, pais, codigoPostal, telefonoContacto, celular, 
		mailContacto, especialidadProfesional, tituloGrado, institucionDondeObtuvo, 
		anioEgreso, matricula, institucionQueTrabaja, cargoPosicion, membresia, ciudad));
		
	}
	
	for(j = 0; j < ds2.rowsCount; j++) {
	  
		var origen = ds2.getValue(j, "origen");
		var cuit = ds2.getValue(j, "cuit");
		var apellido = ds2.getValue(j, "apellido");
		var nombre = ds2.getValue(j, "nombre");
		var dni = ds2.getValue(j, "dni");
		var tipoDocumento = ds2.getValue(j, "tipoDocumento");
		var numeroDocumento = ds2.getValue(j, "numeroDocumento");
		var numeroPasaporte = ds2.getValue(j, "numeroPasaporte");
		var fechaVtoPasaporte = ds2.getValue(j, "fechaVtoPasaporte");
		var sexo = ds2.getValue(j, "sexo");
		var fechaNacimiento = ds2.getValue(j, "fechaNacimiento");
		var nacionalidad = ds2.getValue(j, "nacionalidad");
		var domicilio = ds2.getValue(j, "domicilio");
		var localidad = ds2.getValue(j, "localidad");
		var provincia = ds2.getValue(j, "provincia");
		var pais = ds2.getValue(j, "pais");
		var codigoPostal = ds2.getValue(j, "codigoPostal");
		var telefonoContacto = ds2.getValue(j, "telefonoContacto");
		var celular = ds2.getValue(j, "celular");
		var mailContacto = ds2.getValue(j, "mailContacto");
		var especialidadProfesional = ds2.getValue(j, "especialidadProfesional");
		var tituloGrado = ds2.getValue(j, "tituloGrado");
		var institucionDondeObtuvo = ds2.getValue(j, "institucionDondeObtuvo");
		var anioEgreso = ds2.getValue(j, "anioEgreso");
		var matricula = ds2.getValue(j, "matricula");
		var institucionQueTrabaja = ds2.getValue(j, "institucionQueTrabaja");
		var cargoPosicion = ds2.getValue(j, "cargoPosicion");
		var membresia = ds2.getValue(j, "membresia");
		var ciudad = ds2.getValue(j, "ciudad");

		newDataset.addRow(new Array(origen, cuit, apellido, nombre, dni, tipoDocumento, numeroDocumento, numeroPasaporte, 
		fechaVtoPasaporte, sexo, fechaNacimiento, nacionalidad, domicilio, 
		localidad, provincia, pais, codigoPostal, telefonoContacto, celular, 
		mailContacto, especialidadProfesional, tituloGrado, institucionDondeObtuvo, 
		anioEgreso, matricula, institucionQueTrabaja, cargoPosicion, membresia, ciudad));
		
	}
	
	return newDataset;

}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};