package com.arquimeda.ic.utils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class Utils {

	public static String getStackTrace(Exception e) {
		StringWriter sw = new StringWriter();
		if (e != null) {
			e.printStackTrace(new PrintWriter(sw));
		}
		return sw.toString(); 
	}

	public static Date addHours(Date date, Integer hours) {
		Calendar c = GregorianCalendar.getInstance();
		c.setTime(date);
		c.add(Calendar.HOUR_OF_DAY, hours);
		return c.getTime();
	}
	
	
	public static String sha256Base64Encrypt(String password) throws Exception {

		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.update(password.getBytes("UTF-8"));
		byte[] digest = md.digest();
		return Base64.getEncoder().encodeToString(digest);

	}
}
