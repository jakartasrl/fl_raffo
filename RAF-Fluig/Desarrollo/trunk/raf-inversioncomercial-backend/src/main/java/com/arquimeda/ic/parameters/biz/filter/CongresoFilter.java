package com.arquimeda.ic.parameters.biz.filter;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;

public class CongresoFilter {

	private String siglas;
	private String nombre;
	private Date fechaInicioDesde; 
	private Date fechaInicioHasta;
	private Date fechaFinDesde;
	private Date fechaFinHasta;
	private PresupuestoHabilitado presupuestoHabilitado;
	private String codigo;

	public CongresoFilter(String siglas, String nombre, Date fechaInicioDesde, Date fechaInicioHasta,
			Date fechaFinDesde, Date fechaFinHasta, PresupuestoHabilitado presupuestoHabilitado,
			String codigo) {
		
		this.siglas = siglas;
		this.nombre = nombre;
		this.fechaInicioDesde = fechaInicioDesde;
		this.fechaInicioHasta = fechaInicioHasta;
		this.fechaFinDesde = fechaFinDesde;
		this.presupuestoHabilitado = presupuestoHabilitado;
		this.codigo = codigo;
		
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}

	public void addParameters(Query query) {

		if(siglas != null && !siglas.equals("")){
			addParameter(query, "siglas", "%" + siglas.toUpperCase() + "%");			
		}
		
		if(nombre != null && !nombre.equals("")){
			addParameter(query, "nombre", "%" + nombre.toUpperCase() + "%");			
		}
		
		if(fechaInicioDesde != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaInicioDesde);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			
			addParameter(query, "fechaInicioDesde", calendar.getTime());
		
		}
		
		if(fechaInicioHasta != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaInicioHasta);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			calendar.add(Calendar.DAY_OF_YEAR, 1);
			
			addParameter(query, "fechaInicioHasta", calendar.getTime());
	
		}
		
		if(getFechaFinDesde() != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaFinDesde);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			
			addParameter(query, "fechaFinDesde", calendar.getTime());

		}
		
		if(fechaFinHasta != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaFinHasta);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			calendar.add(Calendar.DAY_OF_YEAR, 1);
			
			addParameter(query, "fechaFinHasta", calendar.getTime());
	
		}
		
		if(presupuestoHabilitado != null && !presupuestoHabilitado.equals("")){
			addParameter(query, "presupuestoHabilitado", presupuestoHabilitado);			
		}
		
		if(codigo != null && !codigo.equals("")){
			addParameter(query, "codigo", "%" + codigo + "%");			
		}
		
	}

	public String getWhere() {

		String filtro = " WHERE 1=1 ";

		if(siglas != null && !siglas.equals("")){
			filtro += " AND UPPER(c.siglas) LIKE :siglas ";			
		}
		
		if(nombre != null && !nombre.equals("")){
			filtro += " AND UPPER(c.nombre) LIKE :nombre ";			
		}
		
		if(fechaInicioDesde!= null){
			filtro += " AND c.fechaInicio >= :fechaInicioDesde ";
		}
		
		if(fechaInicioHasta != null){
			filtro += " AND c.fechaInicio <= :fechaInicioHasta ";
		}
		
		if(fechaFinDesde != null){
			filtro += " AND c.fechaFin >= :fechaFinDesde ";
		}
		
		if(fechaFinHasta != null){
			filtro += " AND c.fechaFin <= :fechaFinHasta ";
		}

		if(presupuestoHabilitado != null && !presupuestoHabilitado.equals("")){
			filtro += " AND c.presupuestoHabilitado = :presupuestoHabilitado ";			
		}
		
		if(codigo != null && !codigo.equals("")){
			filtro += " AND c.codigo LIKE :codigo ";			
		}
		
		return filtro;

	}

	public String getSiglas() {
		return siglas;
	}

	public void setSiglas(String siglas) {
		this.siglas = siglas;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFechaInicioDesde() {
		return fechaInicioDesde;
	}

	public void setFechaInicioDesde(Date fechaInicioDesde) {
		this.fechaInicioDesde = fechaInicioDesde;
	}

	public Date getFechaInicioHasta() {
		return fechaInicioHasta;
	}

	public void setFechaInicioHasta(Date fechaInicioHasta) {
		this.fechaInicioHasta = fechaInicioHasta;
	}

	public Date getFechaFinDesde() {
		return fechaFinDesde;
	}

	public void setFechaFinDesde(Date fechaFinDesde) {
		this.fechaFinDesde = fechaFinDesde;
	}

	public Date getFechaFinHasta() {
		return fechaFinHasta;
	}

	public void setFechaFinHasta(Date fechaFinHasta) {
		this.fechaFinHasta = fechaFinHasta;
	}

	public PresupuestoHabilitado getPresupuestoHabilitado() {
		return presupuestoHabilitado;
	}

	public void setPresupuestoHabilitado(PresupuestoHabilitado presupuestoHabilitado) {
		this.presupuestoHabilitado = presupuestoHabilitado;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
}
