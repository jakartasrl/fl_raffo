/**
 * Dataset: raf-empleados
 * Descripción: raf-empleados
 * Explicación: Dataset asíncrono que materializa la base de empleados de AD, Fluig y Genéricos.
*/

// Define the dataset's result fields
var resultFields = {
	"samaccountname": "samaccountname",
	"apellidoynombre": "displayName", 
	"interno": "telephoneNumber", 
	"sede": "physicalDeliveryOfficeName",
	"legajo": "employeeID",
	"puesto": "title",
	"departamento": "department",
	"celular": "homePhone",
	"mail": "mail",
	"gerencia": "division",
	"fechaNacimiento": "extensionAttribute3",
	"fechaingreso": "extensionAttribute2",
	"dni": "employeeNumber",
	"usuarioGenerico": "usuarioGenerico"
};

function defineStructure() {
	for(field in resultFields) {
		addColumn(field);
	}
	setKey(["samaccountname"]);
	addIndex(["samaccountname"]);
	addIndex(["apellidoynombre"]);
}

function onSync(lastSyncDate) {
	cleanDataset("raf-empleados");
	
	var dts = DatasetBuilder.newDataset();

	var accountList = syncAD(dts);
	syncFluig(dts, accountList);
	syncGenerics(dts, accountList);

	return dts;
}

function cleanDataset (datasetDescription){
	log.info("*** INIT Clean Dataset");
	
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
			stmt.execute("DELETE FROM " + datasetMetaTable);
			log.info("***   Cleaned Dataset: " + datasetMetaTable);
		}
		
	} catch (ex) {
		log.error("DEBUG - error: " + ex);
    } finally {
        if (stmt != null) { stmt.close(); }
        if (conn != null) { conn.close(); }
        log.info("*** END Clean Dataset");
    }
}

function syncFluig(dataset, accountList){
	log.info("*** INIT Sync Fluig");
	
	var c1 = DatasetFactory.createConstraint('active', true, true, ConstraintType.MUST);
	var cts = [c1];
	var colleagues = DatasetFactory.getDataset("colleague", null, cts, null);
	var totalResults = 0;
	
	for(var i=0; i<colleagues.rowsCount; i++) {
		
		var login = colleagues.getValue(i, "login");
		
		if (!accountList.contains(login.trim().toUpperCase())){
			
			var c1 = DatasetFactory.createConstraint('colleagueId', colleagues.getValue(i, "colleaguePK.colleagueId"), colleagues.getValue(i, "colleaguePK.colleagueId"), ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('dataKey', "FechaNacimiento", "FechaNacimiento", ConstraintType.MUST);
			var colleagueData = DatasetFactory.getDataset("colleagueData", null, [c1,c2], null);
			var fechaNacimiento = (colleagueData.rowsCount>0 ? colleagueData.getValue(0, "dataValue"): "");
			log.info("***   Sync Fluig: " + login);
			dataset.addRow([
			                login,
			                colleagues.getValue(i, "colleagueName"),
			                "",
			                "",
			                colleagues.getValue(i, "colleaguePK.colleagueId"),
			                "",
			                "",
			                "",
			                colleagues.getValue(i, "mail"),
			                "",
			                fechaNacimiento,
			                "",
			                "",
			                ""
			                ]);
			totalResults++;
		}
	}
	
	log.info("***   Total results Fluig: " + totalResults);
	log.info("*** END Sync Fluig");
	return dataset;
}

function syncGenerics(dataset, accountList){
	log.info("*** INIT Sync Generics");
	var generics = DatasetFactory.getDataset("PORTAL-UsuariosGenericos", null, [], null);
	var totalResults = 0;
	for(var i=0; i<generics.rowsCount; i++) {
		
		var login = generics.getValue(i,"legajo");
		
		if (!accountList.contains(login.trim().toUpperCase())){
			log.info("***   Sync Generics: " + login);
			dataset.addRow([
			                login,
			                generics.getValue(i,"nombre"), 
			                generics.getValue(i,"interno"), 
			                generics.getValue(i,"sede"), 
			                generics.getValue(i,"legajo"), 
			                generics.getValue(i,"cargo"), 
			                generics.getValue(i,"departamento"), 
			                generics.getValue(i,"celular"), 
			                generics.getValue(i,"mail"), 
			                "",
			                "",
			                "",
			                "",
			                "true"
			                ]);
			totalResults++;
		}
		
	}
	log.info("***   Total results Generics: " + totalResults);
	log.info("*** END Sync Generics");
	return dataset;
}

function syncAD(dataset){
	log.info("*** INIT Sync AD");

	var accountList = new java.util.ArrayList();
	
	// Get connection
	var ldapEnv = new java.util.Hashtable(11);
	ldapEnv.put(javax.naming.Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	ldapEnv.put(javax.naming.Context.PROVIDER_URL,  "ldap://192.168.0.27:389/");
	ldapEnv.put(javax.naming.Context.SECURITY_AUTHENTICATION, "simple");
	ldapEnv.put(javax.naming.Context.SECURITY_PRINCIPAL, "procesobpm@RAFFO");
	ldapEnv.put(javax.naming.Context.SECURITY_CREDENTIALS, "Fl4r921$");
	ldapEnv.put(javax.naming.Context.SECURITY_PROTOCOL, "");
	
	var ldapContext = new javax.naming.ldap.InitialLdapContext(ldapEnv, null);

	// Create the search controls         
	var searchCtls = new javax.naming.directory.SearchControls();
	
	// Specify the attributes to return
	var returnedAtts = java.lang.reflect.Array.newInstance(java.lang.String, Object.keys(resultFields).length);
	var i=0;
	for(field in resultFields) {
		  returnedAtts[i] = resultFields[field];
		  i++;
	}
	searchCtls.setReturningAttributes(returnedAtts);
	
	// Specify the search scope
	searchCtls.setSearchScope(javax.naming.directory.SearchControls.SUBTREE_SCOPE);
	
	// We want all results.
	searchCtls.setCountLimit(0);
	  
	// We want to wait to get all results.
	searchCtls.setTimeLimit(0);
	
	// Specify the LDAP search filter
	var searchFilter = "(&(objectclass=user)(objectcategory=person)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))";
	
	// optional (!(employeeID=1))
	
	// Specify the Base for the search
	var searchBase = "DC=raffo,DC=local";
	
	var cookie = null;
	
	// We want 1000 results per request.
	var reqControl = new javax.naming.ldap.PagedResultsControl(1000, javax.naming.ldap.Control.CRITICAL);
	var arrReqControl = java.lang.reflect.Array.newInstance(reqControl.getClass(), 1);
	arrReqControl[0] = reqControl;
	ldapContext.setRequestControls(arrReqControl);
	
	// Initialize counter to total the results
	var totalResults = 0;
	
	do {
		
		// AD sólo retorna max 1000 registros
		// para devolver más hay que paginar con una cookie
	
		// Search for objects using the filter
		var answer = ldapContext.search(searchBase, searchFilter, searchCtls);
		
		// Loop through the search results
		while (answer.hasMoreElements())
		{
		  var sr = answer.next();
		  var attrs = sr.getAttributes();
		  
		  var login = getIfExists(attrs, "samaccountname").trim().toUpperCase();
		  log.info("***   Sync AD: " + login);
		  if (!accountList.contains(login.trim().toUpperCase())){
			  accountList.add(login);
			  var array = [];
			  for(field in resultFields) {
				  if(field == "apellidoynombre") {
					  array.push(getIfExists(attrs,resultFields[field]).toUpperCase());
				  } else {
					  array.push(getIfExists(attrs,resultFields[field]));
				  }
			  }
			  dataset.addRow(array);
			  totalResults++;
		  }
			  
		}		
		
	    // Find the cookie in our response and save it.
	    var controls = ldapContext.getResponseControls();
	    if (controls != null) {
	        for (var i = 0; i < controls.length; i++) {
	        	var control = controls[i];
	        	if (control instanceof javax.naming.ldap.PagedResultsResponseControl){
	        		cookie = control.getCookie();
	        	}
	        }
	    }
		
		var reqControl = new javax.naming.ldap.PagedResultsControl(1000, cookie, javax.naming.ldap.Control.CRITICAL);
		var arrReqControl = java.lang.reflect.Array.newInstance(reqControl.getClass(), 1);
		arrReqControl[0] = reqControl;
		ldapContext.setRequestControls(arrReqControl);
		
	} while (cookie != null);
	

	
	log.info("***   Total results AD: " + totalResults);
	
	ldapContext.close();
	
	log.info("*** END Sync AD");
	return accountList;
}

function getIfExists(javaAttributes, attributeID) {
	var attribute = javaAttributes.get(attributeID);
	return (attribute ?  attribute.get() : new java.lang.String(""));
}
