/**
 * Dataset: stressConnectionsTest
 * Descripción: Stress test a las conexiones con la base de datos.
*/

function createDataset(fields, constraints, sortFields) {
	
	for (var i = 0; i < 5; i++) {
		var conn = null,
			stmt = null;
		conn = new javax.naming.InitialContext().lookup("java:/jdbc/FluigDS").getConnection();   
		stmt = conn.createStatement();
	}
	
}