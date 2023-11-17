/**
* Código: raf-numeradores
* Descripción: Consulta la tabla de numeradores del ECM.
*/
function createDataset(fields, constraints, sortFields) {

    var dataset =  DatasetBuilder.newDataset();
    dataset.addColumn("CODIGO");
    dataset.addColumn("DESCRIPCION");
	dataset.addColumn("PROXIMO_NUMERO");

    var conn, stmt, rs;

    try {
        conn = new javax.naming.InitialContext().lookup("jdbc/webdeskDS").getConnection();   

        stmt = conn.createStatement();
        rs = stmt.executeQuery("SELECT CODIGO, DESCRIPCION, PROXIMONUMERO FROM CUSTOM_NUMERADOR");

        while (rs.next()) {
            dataset.addRow([rs.getString("CODIGO"), rs.getString("DESCRIPCION"), rs.getString("PROXIMONUMERO")]);
        }
    } finally {
        if (stmt != null) { stmt.close(); }
        if (conn != null) { conn.close(); }
    }

    return dataset;
}