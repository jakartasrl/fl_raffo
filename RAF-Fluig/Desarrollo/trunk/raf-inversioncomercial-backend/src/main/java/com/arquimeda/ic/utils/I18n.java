package com.arquimeda.ic.utils;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class I18n {

	private static Logger logger = LoggerFactory.getLogger(I18n.class);
	
    private static ResourceBundle messages;
    
    static{
        messages = java.util.ResourceBundle.getBundle("i18n/messages", java.util.Locale.getDefault());
    }
     
	public static String getString(String key) {
		
		try {
			return messages.getString(key);
		} catch (MissingResourceException e) {
			logger.warn("No encontrado i18n key " + key);
			return '!' + key + '!';
		}
		
	}
     
	public static String getString(String key, Object... params) {
		
		String msg;
		MessageFormat mf = new MessageFormat(getString(key));
		
		try {
			msg = mf.format(params);
		} catch (Exception e) {
			
			String strParams = "'";
			for (int i = 0; i < params.length; i++) {
				strParams += params[i] + "' | '";
			}
			logger.error("No se pudo formatear la traduccion de " + key + " con parametros " + strParams);
			msg = "!!" + key + "!!";
		}
		
		return msg;
	}
}
