package com.arquimeda.raf.esb.custom.datasources;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.dbcp2.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ESBDataSource {

	private static Logger logger = LoggerFactory.getLogger(ESBDataSource.class);
	private static BasicDataSource datasource = new BasicDataSource();

	private static String PROPERTIES_FILE_PATH = "raffo/conf/fluig_ds.properties";

	static {

		try {
			
			Properties properties = new Properties();
			properties.load(new FileInputStream(new File(PROPERTIES_FILE_PATH)));
			
			String url = properties.getProperty("url");

			String username = properties.getProperty("username");
			String password = properties.getProperty("password");
			Integer minIdle = Integer.valueOf(properties.getProperty("minIdle"));
			Integer maxIdle = Integer.valueOf(properties.getProperty("maxIdle"));
			Integer maxOpenPreparedStatements = Integer.valueOf(properties.getProperty("maxOpenPreparedStatements")); 
			Integer maxTotal = Integer.valueOf(properties.getProperty("maxTotal"));
			Integer maxWaitMillis = Integer.valueOf(properties.getProperty("maxWaitMillis"));			
			
			datasource.setUrl(url);
			datasource.setUsername(username);
			datasource.setPassword(password);
			datasource.setMinIdle(minIdle);
			datasource.setMaxIdle(maxIdle);
			datasource.setMaxOpenPreparedStatements(maxOpenPreparedStatements);
			datasource.setMaxTotal(maxTotal);
			datasource.setMaxWaitMillis(maxWaitMillis);

		} catch (Exception e) {
			logger.error("Se produjo un error inicializando el ESBDataSource.",e);
		}

	}

	public static Connection getConnection() throws SQLException {
		return datasource.getConnection();		
	}

	public static void logStatus(){		
		logger.info("ESB Datasource - Active Connections: " + datasource.getNumActive() + ", Idle Connections: " + datasource.getNumIdle());	
	}
	
}
