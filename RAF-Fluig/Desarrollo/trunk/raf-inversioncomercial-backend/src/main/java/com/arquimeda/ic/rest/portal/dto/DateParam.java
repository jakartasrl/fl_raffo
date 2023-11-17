package com.arquimeda.ic.rest.portal.dto;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateParam implements Serializable {

	protected static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	protected Date date;
	
	public DateParam(Date date) {
		this.date=date;
	}
	
	 public static DateParam valueOf(String date) throws ParseException {
		DateParam dateParam = null;
		if(date != null) {
			dateParam = new DateParam(dateFormat.parse(date));
		}
		return dateParam;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}
