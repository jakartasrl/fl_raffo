function setFechaRevision(colleagueId) {

	var nroProceso = getValue("WKNumProces");
	var fechaRevision = hAPI.getCardValue("fechaRevision");
		
	var dataArr = fechaRevision.split("/");	
	
	var data = new Date(new java.lang.Integer(dataArr[2]), (new java.lang.Integer(dataArr[1])-1), new java.lang.Integer(dataArr[0]));

	//32400 segundos = 9 hs de la mañana
	
	hAPI.setDueDate(nroProceso, 0, colleagueId, data, 32400); 
		
}

function setFechaFinVigencia(colleagueId) {

	var nroProceso = getValue("WKNumProces");
	var fechaFinVigencia = hAPI.getCardValue("fechaFinVigencia");
		
	var dataArr = fechaFinVigencia.split("/");	
	
	var data = new Date(new java.lang.Integer(dataArr[2]), (new java.lang.Integer(dataArr[1])-1), new java.lang.Integer(dataArr[0]));

	//32400 segundos = 9 hs de la mañana
	
	hAPI.setDueDate(nroProceso, 0, colleagueId, data, 32400); 
		
}

function proximoNumero(codigoNumerador) {
	
	return 1;
	/*
    var connection, preparedStatement, resultSet;
    var proximoNumero = 0;

    try {

		connection = new javax.naming.InitialContext().lookup("jdbc/webdeskDS").getConnection();   
		
		preparedStatement = connection.prepareStatement("SELECT CODIGO, PROXIMONUMERO FROM CUSTOM_NUMERADOR WITH (UPDLOCK) WHERE CODIGO = ? ", java.sql.ResultSet.TYPE_SCROLL_SENSITIVE, java.sql.ResultSet.CONCUR_UPDATABLE);
		preparedStatement.setString(1, codigoNumerador);
		resultSet = preparedStatement.executeQuery();
	 
		if (resultSet.next()) {
	
			proximoNumero = resultSet.getLong("PROXIMONUMERO");
			resultSet.updateLong("PROXIMONUMERO", proximoNumero + 1);
			resultSet.updateRow();
				
		}               
		
	  } finally {
	    if (preparedStatement != null) { preparedStatement.close(); }
        if (connection != null) { connection.close(); }
    }

    return proximoNumero;
	*/
}