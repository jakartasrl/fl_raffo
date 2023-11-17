package com.arquimeda.raf.lms.biz.control;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.daffy.crud.ui.CrudFilter;
import com.arquimeda.raf.lms.biz.entity.Examen;

public class HistoricoLMSCrudFilter implements CrudFilter{
	
	private Date fechaDesde;
	private Date fechaHasta;
	private String login;
	private Examen examen;

	public Date getFechaDesde() {
		return fechaDesde;
	}

	public void setFechaDesde(Date fechaDesde) {
		this.fechaDesde = fechaDesde;
	}

	public Date getFechaHasta() {
		return fechaHasta;
	}

	public void setFechaHasta(Date fechaHasta) {
		this.fechaHasta = fechaHasta;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public Examen getExamen() {
		return examen;
	}

	public void setExamen(Examen examen) {
		this.examen = examen;
	}

	public void addParameters(Query query) {
		
		if(fechaDesde != null){

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaDesde);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			
			addParameter(query, "fechaDesde", calendar.getTime());	
			
		}
		
		if(fechaHasta != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaHasta);
			calendar.set(Calendar.HOUR_OF_DAY,23);
			calendar.set(Calendar.MINUTE,59);
			calendar.set(Calendar.SECOND,59);
			calendar.set(Calendar.MILLISECOND,999);
			
			addParameter(query, "fechaHasta", calendar.getTime());			
		}
		
		if(login != null){
			addParameter(query, "login",  "%" + login + "%");			
		}
		
		if(examen != null){
			addParameter(query, "examen", examen.toString());			
		}
		
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}
	
	public String getWhere() {
		
		String filtro = "";
		
		if(login != null){
			filtro += " AND lms.login LIKE :login ";
		}
		
		if(examen != null){
			filtro += " AND lms.examen = :examen ";
		}
		
		if(fechaDesde != null){
			filtro += " AND lms.fecha >= :fechaDesde ";
		}

		if(fechaHasta != null){
			filtro += " AND lms.fecha <= :fechaHasta ";
		}
		
		if(!filtro.isEmpty()){			
			filtro = filtro.substring(4);
			filtro = " WHERE " + filtro;
		}
		
		return filtro;
	}
	
}
