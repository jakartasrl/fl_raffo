/*
 * Dataset que devuelve un listado de regimenes de horarios.
 */
function createDataset(fields, constraints, sortFields) {

	var arq = arqLoadLib(["com.arquimeda.fluig.js.ds.Sql-v1"]);
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'descripcion': function(filtro) {
				return " AND descripcion LIKE '%" + filtro.initialValue + "%'";
			},
		}
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: " SELECT  descripcion" + 
			 "   FROM [dbo].[Z_RAF_REGIMEN_HORARIO] " +
			 " 	 WHERE " + where +
			 "  ORDER BY [descripcion]",
		log: 0
	});
	
}

//arqLoadLib - v1.0 - All rights reserverd
function arqLoadLib(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("arq_libreriaJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"lib");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("lib","return "+o);t[u]=a(t)}catch(f){log.error("*** Error compilando libreria "+s+":"+f)}}}return t}
