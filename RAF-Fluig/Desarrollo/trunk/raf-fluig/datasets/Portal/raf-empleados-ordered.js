/**
 * Dataset: raf-empleados-ordered
 * Descripción: Consulta directa a la tabla del dataset.
*/
function createDataset(fields, constraints, sortFields) {

    var arq = arqLoadLib(["com.arquimeda.fluig.js.ds.Sql-v1"]);

	var whereShould = arq.sql.whereHelper({
		constraints: getConstraintsWithType(constraints, "SHOULD"), 
		filtros: {
			'samaccountname': function(filtro) {
				return " OR samaccountname LIKE '" + filtro.initialValue + "'";
			},
			'legajo': function(filtro) {
				return " OR legajo LIKE '" + filtro.initialValue + "'";
			},
			'apellidoynombre': function(filtro) {
				return " OR apellidoynombre LIKE '" + filtro.initialValue + "'";
			},
			'sede': function(filtro) {
				return " OR sede LIKE '" + filtro.initialValue + "'";
			},
			'departamento': function(filtro) {
				return " OR departamento LIKE '" + filtro.initialValue + "'";
			},
			'gerencia': function(filtro) {
				return " OR gerencia LIKE '" + filtro.initialValue + "'";
			},
			'puesto': function(filtro) {
				return " OR puesto LIKE '" + filtro.initialValue + "'";
			},
			'interno': function(filtro) {
				return " OR interno LIKE '" + filtro.initialValue + "'";
			},
			'celular': function(filtro) {
				return " OR celular LIKE '" + filtro.initialValue + "'";
			},
			'fechaNacimiento': function(filtro) {
				var fechasNacimiento = filtro.initialValue.split(";");
				var whereStr = "";
				for (var i=0; i<fechasNacimiento.length; i++) {
					whereStr += " OR fechaNacimiento LIKE '" + fechasNacimiento[i] + "'";
				}
				return whereStr;
			},
			'fechaingreso': function(filtro) {
				return " OR fechaingreso LIKE '" + filtro.initialValue + "'";
			},
			'dni': function(filtro) {
				return " OR dni LIKE '" + filtro.initialValue + "'";
			},
			'mail': function(filtro) {
				return " OR mail LIKE '" + filtro.initialValue + "'";
			}
		}
	});
	whereShould = (whereShould.indexOf('OR')==-1 ? whereShould : whereShould.replace('OR','AND (')+' )');
	
	var whereMustNot = arq.sql.whereHelper({
		constraints: getConstraintsWithType(constraints, "MUST_NOT"), 
		filtros: {
			'legajo': function(filtro) {
				return " AND legajo NOT LIKE '" + filtro.initialValue + "'";
			},
			'mail': function(filtro) {
				return " AND mail NOT LIKE '" + filtro.initialValue + "'";
			},
			'filtroCuentasAdministrativas': function(filtro) {
				return (filtro.initialValue == "true" ? " AND NOT (legajo = '1' AND mail = '' AND celular = '' AND interno= '')" : '');
			}
		}
	});
	
    return arq.sql.sql2Dataset({
        jndiName: "java:/jdbc/FluigDSRO",
        sql: "SELECT *" + 
             "  FROM " + getMetaLista("raf-empleados") +
             " WHERE " + whereShould + " AND " + whereMustNot +
             " ORDER BY apellidoynombre",
        log: 0
    });

}

function getMetaLista(datasetDescription){
	var conn = null,
		stmt = null;
	
	try {
		conn = new javax.naming.InitialContext().lookup("java:/jdbc/FluigDS").getConnection();   
		stmt = conn.createStatement();
		
		var query = "SELECT TOP 1 'MD' + RIGHT('000' + CAST(COD_EMPRESA AS VARCHAR),3) + RIGHT('000' + CAST(COD_LISTA AS VARCHAR),3) AS DATASET_METALISTA" + 
					"  FROM META_LISTA " +
					" WHERE DSL_LISTA='"+datasetDescription+"' " +
			        " ORDER BY COD_LISTA DESC"
					
		var resultSet = stmt.executeQuery(query);
		if(resultSet.next()) {
			var datasetMetaTable = resultSet.getString("DATASET_METALISTA");
		}
		
	} catch (ex) {
		log.error("DEBUG - error: " + ex);
    } finally {
        if (stmt != null) { stmt.close(); }
        if (conn != null) { conn.close(); }
    }
    
    return datasetMetaTable;
}

function getConstraintsWithType(constraints, type){
	var cts = [];
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].constraintType == type){
			cts.push(constraints[i]);
		}
	}
	return cts;
}

//arqLoadLib - v1.0 - All rights reserverd
function arqLoadLib(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("arq_libreriaJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"lib");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("lib","return "+o);t[u]=a(t)}catch(f){log.error("*** Error compilando libreria "+s+":"+f)}}}return t}

