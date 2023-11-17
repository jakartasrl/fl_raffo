package com.arquimeda.raf.esb.custom.util;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DBUtils {
	
	private static Logger logger = LoggerFactory.getLogger(DBUtils.class);
	
	public static void close(Connection conn, List<ResultSet> resultSets, List<? extends Statement> statements) {

		if (resultSets != null) {
			for (ResultSet rs : resultSets) {
				if (rs != null) {
					try {
						rs.close();
					} catch (SQLException ex) {
						logger.error("Error cerrando ResultSet", ex);
					}
				}
			}
		}

		if (statements != null) {
			for (Statement st : statements) {
				if (st != null) {
					try {
						st.close();
					} catch (SQLException ex) {
						logger.error("Error cerrando Statement", ex);
					}
				}
			}
		}

		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException ex) {
				logger.error("Error cerrando Connection", ex);
			}
		}

	}

}
