/**
 * Dataset: raf-empleados-ordered
 * Descripción: Consulta directa a la tabla del dataset.
*/
function createDataset(fields, constraints, sortFields) {

	return DatasetFactory.getDataset("raf-empleados", null, null, null);
	
}

//arqLoadLib - v1.0 - All rights reserverd
function arqLoadLib(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("arq_libreriaJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"lib");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("lib","return "+o);t[u]=a(t)}catch(f){log.error("*** Error compilando libreria "+s+":"+f)}}}return t}