function createDataset(fields, constraints, sortFields) {

	//arq_libreriaJS.js - All rights reserverd
	
	var dataset =  DatasetBuilder.newDataset();
	dataset.addColumn("lib");
	dataset.addColumn("name");
	dataset.addColumn("version");
	dataset.addColumn("revision");
	dataset.addColumn("src");
	dataset.addColumn("author");
	
	
	dataset.addRow(["com.arquimeda.fluig.js.ds.Sql-v1",
	                "sql",
	                "1",
	                "0",
	                '({error:function(r){log.error("*** com.arquimeda.fluig.js.ds.Sql: "+r);var e=DatasetBuilder.newDataset();return log.error(r),e.addColumn("error"),e.addRow(new Array(r)),e},simpleMerge:function(r,e){var t={};for(attrname in r)t[attrname]=r[attrname];for(attrname in e)t[attrname]=e[attrname];return t},sql2Dataset:function(r){var e=this.simpleMerge({jndiName:"java:/jdbc/FluigDS",sql:"",log:0},r),t=null,n=null,a=DatasetBuilder.newDataset();try{e.log&&log.info("** Obteniendo conexion "+e.jndiName),t=(new javax.naming.InitialContext).lookup(e.jndiName).getConnection(),n=t.createStatement(),e.log&&log.info("** Ejecutando query "+e.sql),rs=n.executeQuery(e.sql);for(var o=rs.getMetaData(),l=!0;rs.next();){for(var i=[],s=1;s<=o.getColumnCount();s++){var u=o.getColumnName(s),g=rs.getString(u);e.log>1&&log.info("** Valor "+u+":"+g),i.push(g),l&&(e.log&&log.info("** Agregando columna "+u),a.addColumn(u))}l=!1,a.addRow(i)}}catch(m){this.error(m)}finally{null!=n&&n.close(),null!=t&&t.close()}return a},whereHelper:function(r){var e=this.simpleMerge({constraints:[],filtros:{},log:0},r),t="1=1 ";try{var n=function(r,e){if(null!=e)for(var t=0;t<e.length;t++)if(e[t].fieldName==r)return e[t];return null};e.log&&log.error("*** Array de constraints:"+e.constraints);for(attrname in e.filtros){var a=n(attrname,e.constraints);e.log&&log.error("***  Buscando Constraint de `"+attrname+"`:"+a),null!=a&&(t+=e.filtros[attrname](a))}}catch(o){throw"Error whereHelper:"+o.message}return t}})',
	                "Arquimeda"]);
	
	dataset.addRow(["com.arquimeda.fluig.js.ds.Numerador-v1",
	                "num",
	                "1",
	                "0",
	                '({simpleMerge:function(e,o){var r={};for(attrname in e)r[attrname]=e[attrname];for(attrname in o)r[attrname]=o[attrname];return r},nextNumber:function(e){var o,r=this.simpleMerge({codigoNumerador:"",jndiName:"java:/jdbc/FluigDS",dialect:"mysql",table:"ARQ_NUMERADOR",sql:"",log:0},e),t={mysql:"SELECT CODIGO, PROXIMONUMERO FROM ARQ_NUMERADOR WHERE CODIGO = ? FOR UPDATE",sqlserver:"SELECT CODIGO, PROXIMONUMERO FROM ARQ_NUMERADOR WITH (UPDLOCK) WHERE CODIGO = ? "},a=null,l=null;if(""==r.codigoNumerador)throw"Debe informar el parametro codigoNumerador";try{var n=r.sql;if(""==n&&(n=t[r.dialect]),null==n||""==n)throw"No esta definido el sql para el dialect "+r.dialect;if(r.log&&log.info("** Obteniendo conexion "+r.jndiName),a=(new javax.naming.InitialContext).lookup(r.jndiName).getConnection(),r.log&&log.info("** Ejecutando prepareStatement "+n),l=a.prepareStatement(n,java.sql.ResultSet.TYPE_SCROLL_SENSITIVE,java.sql.ResultSet.CONCUR_UPDATABLE),l.setString(1,r.codigoNumerador),resultSet=l.executeQuery(),!resultSet.next())throw"No fue encontrado el registro para el numerador "+r.codigoNumerador;o=resultSet.getLong("PROXIMONUMERO"),r.log&&log.info("** Actualizando PROXIMONUMERO de "+r.codigoNumerador+" "+o+1),resultSet.updateLong("PROXIMONUMERO",o+1),resultSet.updateRow(),log.info("***  PROXIMONUMERO codigo: "+r.codigoNumerador+" valor: "+o)}catch(i){var O="*** Error nextNumber codigo: "+r.codigoNumerador+": "+i;throw log.error(O),O}finally{null!=l&&l.close(),null!=a&&a.close()}return o}})',
	                "Arquimeda"]);
	
	dataset.addRow(["com.arquimeda.fluig.js.ds.CustomEmail-v1",
	                "mail",
	                "1",
	                "0",
	                '({simpleMerge:function(a,t){var e={};for(attrname in a)e[attrname]=a[attrname];for(attrname in t)e[attrname]=t[attrname];return e},sendCustomEmail:function(a){var t=this.simpleMerge({companyId:"1",subject:"",from:"notifier@fluig.com",to:"",templateId:"",templateDialect:"",templateHtml:"",datos:{},log:0},a),e="text/html",o=new java.util.HashMap,n=java.io.File.separator,l=(new javax.naming.InitialContext).lookup("java:global/fluig/ecm-ejb/wdk/GlobalParam"),m=l.read(t.companyId).getTemplatesFolder()+n+"tplmail"+n+t.templateId+n+t.templateDialect,r=(new javax.naming.InitialContext).lookup("java:global/fluig/wcm-core/service/SDK");if(o.put("SERVER_URL",r.getServerURL()),o.put("SERVER_EXTERNAL_URL",r.getServerContextURL()),o.put("SERVER_PROTECTED_URL",r.getProtectedTenantContextPath()),o.put("COMPANY_ID",t.companyId),t.datos)for(param in t.datos)o.put(param,t.datos[param]);com.fluig.foundation.mail.EMailSenderFactory.getEMailSender().customEmail(new java.lang.Long(t.companyId),t.subject,t.from,t.to,m,t.templateHtml,e,o)}})',
	                "Arquimeda"]);
	
	return dataset;
}