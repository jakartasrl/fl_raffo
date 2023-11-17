function createDataset(fields, constraints, sortFields) {

    var dataset =  DatasetBuilder.newDataset();
    dataset.addColumn("PROXIMO_NRO_CONTRATO");
	dataset.addColumn("PROXIMO_NRO_REQUISITO");

    dataset.addRow([proximoNumero('R01_NRO_CONTRATO'), proximoNumero('R01_NRO_REQUERIMIENTO')]);

    return dataset;
	
}

// Utilizar esta funcion dentro de un dataset.
function proximoNumero(codigoNumerador) {

    var connection, preparedStatement, resultSet;
	var proximoNumero = 0;

    try {

		connection = new javax.naming.InitialContext().lookup("jdbc/webdeskDS").getConnection();   
		connection.setAutoCommit(false);
		
		preparedStatement = connection.prepareStatement("SELECT CODIGO, PROXIMONUMERO FROM CUSTOM_NUMERADOR WITH (UPDLOCK) WHERE CODIGO = ?", java.sql.ResultSet.TYPE_SCROLL_SENSITIVE, java.sql.ResultSet.CONCUR_UPDATABLE);
		preparedStatement.setString(1, codigoNumerador);
		resultSet = preparedStatement.executeQuery();
	 
		if (resultSet.next()) {
	
			proximoNumero = resultSet.getLong("PROXIMONUMERO");
			resultSet.updateLong("PROXIMONUMERO", proximoNumero + 1);
			resultSet.updateRow();
				
		}               
		
		connection.commit();

	} catch (e1) {
			log.error("Se produjo un error al obtener el proximo numero.");
			try {
				connection.rollback();
			} catch (e2) {
				log.error("Se produjo un error al hacer rollback obteniendo proximo numero.");
				throw e2;
			}
			throw e1;
    } finally {
	    if (preparedStatement != null) { preparedStatement.close(); }
        if (connection != null) { connection.close(); }
    }

    return proximoNumero;
	
}

// Utilizar esta funcion dentro de un beforeTaskSave.
/*function proximoNumero(codigoNumerador) {

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
	
}*/