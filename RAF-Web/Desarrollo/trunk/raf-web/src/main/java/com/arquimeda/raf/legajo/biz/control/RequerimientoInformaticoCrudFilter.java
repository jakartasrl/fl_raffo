package com.arquimeda.raf.legajo.biz.control;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.daffy.crud.ui.CrudFilter;
import com.arquimeda.raf.legajo.biz.entity.Empleado;
import com.arquimeda.raf.legajo.biz.entity.Puesto;
import com.arquimeda.raf.legajo.biz.entity.Sector;
import com.arquimeda.raf.legajo.biz.entity.Sede;

public class RequerimientoInformaticoCrudFilter implements CrudFilter{
	
	private Date fechaAltaDesde;
	private Date fechaAltaHasta;
	private String nombre;
	private String apellido;
	private Puesto puesto;
	private Sector sector;
	private Empleado reportaA;
	private Sede sede;
	private Boolean pendiente;

	public Date getFechaAltaDesde() {
		return fechaAltaDesde;
	}

	public void setFechaAltaDesde(Date fechaAltaDesde) {
		this.fechaAltaDesde = fechaAltaDesde;
	}

	public Date getFechaAltaHasta() {
		return fechaAltaHasta;
	}

	public void setFechaAltaHasta(Date fechaAltaHasta) {
		this.fechaAltaHasta = fechaAltaHasta;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}	

	public Puesto getPuesto() {
		return puesto;
	}

	public void setPuesto(Puesto puesto) {
		this.puesto = puesto;
	}

	public Sector getSector() {
		return sector;
	}

	public void setSector(Sector sector) {
		this.sector = sector;
	}
	
	public Empleado getReportaA() {
		return reportaA;
	}

	public void setReportaA(Empleado reportaA) {
		this.reportaA = reportaA;
	}

	public Sede getSede() {
		return sede;
	}

	public void setSede(Sede sede) {
		this.sede = sede;
	}
	
	public Boolean getPendiente() {
		return pendiente;
	}

	public void setPendiente(Boolean pendiente) {
		this.pendiente = pendiente;
	}

	public void addParameters(Query query) {
		
		if(fechaAltaDesde != null){

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaAltaDesde);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			
			addParameter(query, "fechaAltaDesde", calendar.getTime());	
			
		}
		
		if(fechaAltaHasta != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaAltaHasta);
			calendar.set(Calendar.HOUR_OF_DAY,23);
			calendar.set(Calendar.MINUTE,59);
			calendar.set(Calendar.SECOND,59);
			calendar.set(Calendar.MILLISECOND,999);
			
			addParameter(query, "fechaAltaHasta", calendar.getTime());			
		}
		
		if(nombre != null){
			addParameter(query, "nombre",  "%" + nombre + "%");			
		}
		
		if(apellido != null){
			addParameter(query, "apellido",  "%" + apellido + "%");			
		}
		
		if(puesto != null){
			addParameter(query, "puesto", "%" + puesto.toString() + "%");			
		}
		
		if(sector != null){
			addParameter(query, "sector", "%" + sector.toString() + "%");			
		}
		
		if(reportaA != null){
			addParameter(query, "reportaA", "%" + reportaA.toString() + "%");			
		}
		
		if(sede != null){
			addParameter(query, "sede", "%" + sede.toString() + "%");			
		}
		
		if(pendiente != null){
			addParameter(query, "pendiente", pendiente);
		}
		
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}
	
	public String getWhere() {
		
		String filtro = "";
		
		if(nombre != null){
			filtro += " AND ri.nombre LIKE :nombre ";
		}
		
		if(apellido != null){
			filtro += " AND ri.apellido LIKE :apellido ";
		}
		
		if(fechaAltaDesde != null){
			filtro += " AND ri.fechaIngresoNecesaria >= :fechaAltaDesde ";
		}

		if(fechaAltaHasta != null){
			filtro += " AND ri.fechaIngresoNecesaria <= :fechaAltaHasta ";
		}
		
		if(puesto != null){
			filtro += " AND ri.puesto LIKE :puesto ";
		}
		
		if(sector != null){
			filtro += " AND ri.sector LIKE :sector ";
		}
		
		if(reportaA != null){
			filtro += " AND ri.reportaA LIKE :reportaA ";
		}
		
		if(sede != null){
			filtro += " AND ri.sede LIKE :sede ";
		}
		
		if(pendiente != null){
			filtro += " AND ri.pendiente = :pendiente ";
		}
		
		if(!filtro.isEmpty()){			
			filtro = filtro.substring(4);
			filtro = " WHERE " + filtro;
		}
		
		return filtro;
	}
	
}
