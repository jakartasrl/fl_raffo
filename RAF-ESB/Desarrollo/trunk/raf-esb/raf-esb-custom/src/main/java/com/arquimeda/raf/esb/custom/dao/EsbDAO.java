package com.arquimeda.raf.esb.custom.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

import com.arquimeda.raf.esb.custom.datasources.ESBDataSource;
import com.arquimeda.raf.esb.custom.util.DBUtils;

public class EsbDAO {

	private static final String CHARACTER_ENCODING = "UTF-8";

	protected Connection connection = null;
	private PreparedStatement updatePreparedStatement = null;
	private PreparedStatement selectSolicitudPreparedStatement = null;
	private ResultSet selectSolicitudResultSet = null;

	public EsbDAO(Boolean autoCommit) throws SQLException {
		connection = ESBDataSource.getConnection();
		connection.setAutoCommit(autoCommit);
	}

	public void close() {
		DBUtils.close(connection, Arrays.asList(selectSolicitudResultSet), Arrays.asList(updatePreparedStatement, selectSolicitudPreparedStatement));		
	}

	public void commit() throws SQLException {
		connection.commit();
	}

	public void rollback() throws SQLException {
		connection.rollback();
	}

//	public void actualizarTransaccion(int idTransaccion, RespuestaProtheus respuestaProtheus) throws SQLException {
//
//		//deberia recibir el idTrx, mensaje para las observaciones y los 3 parametros que devuelve el SP
//
//		String updateTransaccionSql = "UPDATE Z_TOT_TRANSACCION SET " +
//				" ID_DESTINO = ?, " +
//				" ESTADO = ?, " +
//				" OBSERVACIONES = ?, " +
//				" FECHA_PROCESAMIENTO = ?, " +
//				" FECHA_ULTIMA_MODIFICACION = ?, " + 
//				" USUARIO_ULTIMA_MODIFICACION = ?, " +				
//				" OPTLOCK = OPTLOCK + 1" +
//				" WHERE ID = ?";
//
//		if(updatePreparedStatement == null) {
//			updatePreparedStatement = connection.prepareStatement(updateTransaccionSql);
//		}
//
//		updatePreparedStatement.setDate(4, new Date(Calendar.getInstance().getTime().getTime()));
//		updatePreparedStatement.setDate(5, new Date(Calendar.getInstance().getTime().getTime()));
//		updatePreparedStatement.setString(6, "ESB");
//		updatePreparedStatement.setInt(7, idTransaccion);
//
//		if ("OK".equals(respuestaProtheus.getStatus())) {
//			updatePreparedStatement.setString(1, respuestaProtheus.getIdTransaccion());
//			updatePreparedStatement.setString(2, "PROCESADO");
//			updatePreparedStatement.setString(3, respuestaProtheus.getMensaje());
//		}else {
//			updatePreparedStatement.setNull(1, Types.VARCHAR);
//			updatePreparedStatement.setString(2, "ERROR");
//			updatePreparedStatement.setString(3, respuestaProtheus.getMensaje());
//		}
//
//		updatePreparedStatement.executeUpdate();
//
//	}
//
//	public void actualizarTransaccionAnulada(int idTransaccion, RespuestaProtheus respuestaProtheus) throws SQLException {
//
//		String updateTransaccionSql = "UPDATE Z_TOT_TRANSACCION SET " +
//				" ID_DESTINO = ?, " +
//				" ESTADO = ?, " +
//				" OBSERVACIONES = ?, " +
//				" ID_ANULACION = ?, " +
//				" FECHA_ANULADO = ?, " +
//				" FECHA_ULTIMA_MODIFICACION = ?, " + 
//				" USUARIO_ULTIMA_MODIFICACION = ?, " +				
//				" OPTLOCK = OPTLOCK + 1" +
//				" WHERE ID = ?";
//
//		if(updatePreparedStatement == null) {
//			updatePreparedStatement = connection.prepareStatement(updateTransaccionSql);
//		}
//
//		updatePreparedStatement.setDate(5, new Date(Calendar.getInstance().getTime().getTime()));
//		updatePreparedStatement.setDate(6, new Date(Calendar.getInstance().getTime().getTime()));
//		updatePreparedStatement.setString(7, "ESB");
//		updatePreparedStatement.setInt(8, idTransaccion);
//
//
//		if ("OK".equals(respuestaProtheus.getStatus())) {
//
//			updatePreparedStatement.setString(1, respuestaProtheus.getIdTransaccion());
//			updatePreparedStatement.setString(2, "ANULADO");
//			updatePreparedStatement.setString(3, respuestaProtheus.getMensaje());
//
//			if(respuestaProtheus.getIdReversion() != null){
//				updatePreparedStatement.setString(4, respuestaProtheus.getIdReversion());
//			}else{
//				updatePreparedStatement.setNull(4, Types.VARCHAR);
//			}
//
//		}else {
//
//			updatePreparedStatement.setNull(1, Types.VARCHAR);
//			updatePreparedStatement.setString(2, "ERROR");
//			updatePreparedStatement.setString(3, respuestaProtheus.getMensaje());
//			updatePreparedStatement.setNull(4, Types.VARCHAR);
//
//		}
//
//		updatePreparedStatement.executeUpdate();
//
//	}
//
//	public String getSolicitud(String nroSolicitud) throws Exception{
//
//		String selectTransaccion = "SELECT MENSAJE_SALIDA " +
//				" FROM  " +
//				" WHERE nroSolicitud = ? ";
//
//		if(selectSolicitudPreparedStatement == null) {
//			selectSolicitudPreparedStatement = connection.prepareStatement(selectTransaccion);
//		}
//
//		selectSolicitudPreparedStatement.setString(1, nroSolicitud);
//		selectSolicitudResultSet = selectSolicitudPreparedStatement.executeQuery();
//
//		if(!selectSolicitudResultSet.next()){				
//			throw new Exception("No se encontro ningun registro en la tabla ML001018 para la solicitud " + nroSolicitud);
//		}
//
//		byte[] mensajeSalidaBytes = selectSolicitudResultSet.getBytes(1);
//		String mensajeSalidaStr = "";
//
//		if(mensajeSalidaBytes != null) {
//			mensajeSalidaStr = new String(mensajeSalidaBytes, CHARACTER_ENCODING);
//			mensajeSalidaStr = mensajeSalidaStr.replace("&lt;", "<").replace("&gt;", ">");
//		}
//
//		return mensajeSalidaStr;
//
//	}
//


}
