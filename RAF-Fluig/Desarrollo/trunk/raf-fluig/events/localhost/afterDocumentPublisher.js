function afterDocumentPublisher(){
	var doc = getValue("WKDocument");
    var state = getValue("WKState");
    var companyId = doc.getCompanyId(),
    	documentId = doc.getDocumentId(),
    	version = doc.getVersion(),
    	parentDocumentId = doc.getParentDocumentId();
    
    if(state=="PUBLISH"){
    	var conn = null,
			pstmt = null,
			sql = null,
			jndiName = "java:/jdbc/FluigDS";
	
		try {
			conn = new javax.naming.InitialContext().lookup(jndiName).getConnection();
			sql = 	"SELECT DISTINCT d.NR_DOCUMENTO " +
					"FROM [DOCUMENTO] d, [APROVADOR] a " +
					"WHERE d.COD_EMPRESA=? AND d.NR_DOCUMENTO=? AND d.VERSAO_ATIVA=1 AND " +
					"((d.COD_EMPRESA=a.COD_EMPRESA AND d.NR_DOCUMENTO=a.NR_DOCUMENTO AND d.NR_VERSAO=a.NR_VERSAO) OR d.LOG_HERDA_APROV=1)";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, companyId);
			pstmt.setInt(2, parentDocumentId);
			var resultSet = pstmt.executeQuery();
			if(resultSet.next()) {
				sql =	"UPDATE DOCUMENTO " +
						"SET LOG_HERDA_APROV=1 " +
						"WHERE COD_EMPRESA=? AND NR_DOCUMENTO=? AND NR_VERSAO=?";
							
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1, companyId);
				pstmt.setInt(2, documentId);
				pstmt.setInt(3, version);
				pstmt.executeUpdate();
			}
	
		} catch (ex) {
			log.error("*** afterDocumentPublisher error al setear la aprbación por defecto: " + ex);
	    } finally {
	        if (pstmt != null) { pstmt.close(); }
	        if (conn != null) { conn.close(); }
	    }
    }
    

}


