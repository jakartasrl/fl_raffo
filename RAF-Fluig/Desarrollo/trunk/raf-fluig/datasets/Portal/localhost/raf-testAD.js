/**
 * Dataset: raf-testAD
 * Descripción: Test LDAP - Active Directory
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
	"dni": "employeeNumber"
};

function createDataset(fields, constraints, sortFields) { 
	// Get dataset
	var dts = DatasetBuilder.newDataset();
	for(field in resultFields) {
		dts.addColumn(field);
	}
	
	syncFluig(dts);
//	dts = syncAD(dts);

	return dts;
}

function syncFluig(dataset){
	log.info("*** INIT Sync Fluig");
	var colleagues = DatasetFactory.getDataset("colleague", null, [], null);
	for(var i=0; i<colleagues.rowsCount; i++) {
		var c1 = DatasetFactory.createConstraint('colleagueId', colleagues.getValue(i, "colleaguePK.colleagueId"), colleagues.getValue(i, "colleaguePK.colleagueId"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('dataKey', "FechaNacimiento", "FechaNacimiento", ConstraintType.MUST);
		var colleagueData = DatasetFactory.getDataset("colleagueData", null, [c1,c2], null);
		var fechaNacimiento = (colleagueData.rowsCount>0 ? colleagueData.getValue(0, "dataValue"): "");

		dataset.addRow([
		    colleagues.getValue(i, "login"),
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
		    ""
	    ]);
	}
	log.info("*** END Sync Fluig");
	return dataset;
}

function syncAD(dataset){
	log.info("*** INIT Sync AD");

	// Get connection
	var ldapEnv = new java.util.Hashtable(11);
	ldapEnv.put(javax.naming.Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	ldapEnv.put(javax.naming.Context.PROVIDER_URL,  "ldap://192.168.0.27:389/");
	ldapEnv.put(javax.naming.Context.SECURITY_AUTHENTICATION, "simple");
	ldapEnv.put(javax.naming.Context.SECURITY_PRINCIPAL, "procesobpm@RAFFO");
	ldapEnv.put(javax.naming.Context.SECURITY_CREDENTIALS, "Fl4r921$");
	ldapEnv.put(javax.naming.Context.SECURITY_PROTOCOL, "");
	
	var ldapContext = new javax.naming.directory.InitialDirContext(ldapEnv);

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
	
	// Specify the LDAP search filter
	var searchFilter = "(&(objectClass=user)(objectClass=person))";
	
	// optional (!(!(employeeID=*)))(!(employeeID=*))
	
	// Specify the Base for the search
	var searchBase = "DC=raffo,DC=local";
	
	// Initialize counter to total the results
	var totalResults = 0;
	
	// Search for objects using the filter
	var answer = ldapContext.search(searchBase, searchFilter, searchCtls);
	
	// Loop through the search results
	while (answer.hasMoreElements())
	{
	  var sr = answer.next();
	  var attrs = sr.getAttributes();
	  var array = [];
	  for(field in resultFields) {
	  	array.push(getIfExists(attrs,resultFields[field]));
	  }
	  dataset.addOrUpdateRow(array);
	  totalResults++;
	}
	
	log.info("*** Total results AD: " + totalResults);
	
	ldapContext.close();
	
	log.info("*** END Sync AD");
	return dataset;
}

function getIfExists(javaAttributes, attributeID) {
	var attribute = javaAttributes.get(attributeID);
	return (attribute ?  attribute.get() : "");
}
