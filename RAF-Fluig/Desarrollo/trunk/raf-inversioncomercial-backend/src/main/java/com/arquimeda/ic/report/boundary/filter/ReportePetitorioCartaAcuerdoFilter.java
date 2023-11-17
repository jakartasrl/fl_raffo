package com.arquimeda.ic.report.boundary.filter;

import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.ic.report.entity.PetitorioCartaAcuerdo.Estado;


public class ReportePetitorioCartaAcuerdoFilter {

	private Date fechaSolicitudDesde;
	private Date fechaSolicitudHasta;
	private String solicitante;
	private String area;
	private String region;
	private String linea;
	private String nombre;
	private String apellido;
	private Integer numeroSolicitud;
	private Estado estado;
	private String tipoInversionCodigo;
	private String tipoProductoCodigo;

	public ReportePetitorioCartaAcuerdoFilter(Date fechaSolicitudDesde, Date fechaSolicitudHasta, String solicitante, 
			String area, String region, String linea, String nombre, String apellido, Integer numeroSolicitud, 
			Estado estado, String tipoInversionCodigo, String tipoProductoCodigo) {
		this.fechaSolicitudDesde = fechaSolicitudDesde;
		this.fechaSolicitudHasta = fechaSolicitudHasta;
		this.solicitante = solicitante;
		this.area = area;
		this.region = region;
		this.linea = linea;
		this.nombre = nombre;
		this.apellido = apellido;
		this.numeroSolicitud = numeroSolicitud;
		this.estado = estado;
		this.tipoInversionCodigo = tipoInversionCodigo;
		this.tipoProductoCodigo = tipoProductoCodigo;
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}

	public void addParameters(Query query) {
		
		if(fechaSolicitudDesde != null){
			addParameter(query, "fechaSolicitudDesde", fechaSolicitudDesde);			
		}
		
		if(fechaSolicitudHasta != null){
			addParameter(query, "fechaSolicitudHasta", fechaSolicitudHasta);	
		}

		if(solicitante != null && !solicitante.equals("")){
			addParameter(query, "solicitante", "%" + solicitante.toUpperCase() + "%");			
		}

		if(area != null && !area.equals("")){
			addParameter(query, "area", "%" + area.toUpperCase() + "%");			
		}
		
		if(region != null && !region.equals("")){
			addParameter(query, "region", "%" + region.toUpperCase() + "%");			
		}
		
		if(linea != null && !linea.equals("")){
			addParameter(query, "linea", "%" + linea.toUpperCase() + "%");			
		}
		
		if(nombre != null && !nombre.equals("")){
			addParameter(query, "nombre", "%" + nombre.toUpperCase() + "%");			
		}
		
		if(apellido != null && !apellido.equals("")){
			addParameter(query, "apellido", "%" + apellido.toUpperCase() + "%");			
		}
		
		if(numeroSolicitud != null){
			addParameter(query, "numeroSolicitud", numeroSolicitud);			
		}

		if(estado != null){
			addParameter(query, "estado", estado);			
		}
		
		if(tipoInversionCodigo != null && !tipoInversionCodigo.equals("")){
			addParameter(query, "tipoInversionCodigo", tipoInversionCodigo);			
		}

		if(tipoProductoCodigo != null && !tipoProductoCodigo.equals("")){
			addParameter(query, "tipoProductoCodigo", tipoProductoCodigo);			
		}
	}

	public String getWhere() {

		String filtro = " WHERE 1=1 ";
		
		if(fechaSolicitudDesde!= null){
			filtro += " AND c.fechaSolicitud >= :fechaSolicitudDesde ";
		}
		
		if(fechaSolicitudHasta != null){
			filtro += " AND c.fechaSolicitud <= :fechaSolicitudHasta ";
		}

		if(solicitante != null && !solicitante.equals("")){
			filtro += " AND UPPER(c.solicitante) LIKE :solicitante ";			
		}
		
		if(area != null && !area.equals("")){
			filtro += " AND UPPER(c.areaCodigo) LIKE :area ";			
		}
		
		if(region != null && !region.equals("")){
			filtro += " AND UPPER(c.lineaRegionCodigo) LIKE :region ";			
		}
		
		if(linea != null && !linea.equals("")){
			filtro += " AND UPPER(c.lineaRegionCodigo) LIKE :linea ";			
		}
		
		if(nombre != null && !nombre.equals("")){
			filtro += " AND UPPER(c.nombre) LIKE :nombre ";			
		}
		
		if(apellido != null && !apellido.equals("")){
			filtro += " AND UPPER(c.apellido) LIKE :apellido ";			
		}
		
		if(numeroSolicitud != null){
			filtro += " AND c.numeroSolicitud = :numeroSolicitud ";			
		}

		if(estado != null){
			filtro += " AND c.estado = :estado ";			
		}

		if(tipoInversionCodigo != null && !tipoInversionCodigo.equals("")){
			filtro += " AND c.tipoInversionCodigo = :tipoInversionCodigo ";			
		}
		
		if(tipoProductoCodigo != null && !tipoProductoCodigo.equals("")){
			filtro += " AND c.tipoProductoCodigo = :tipoProductoCodigo ";			
		}
		
		return filtro;

	}

	public Date getFechaSolicitudDesde() {
		return fechaSolicitudDesde;
	}

	public void setFechaSolicitudDesde(Date fechaSolicitudDesde) {
		this.fechaSolicitudDesde = fechaSolicitudDesde;
	}

	public Date getFechaSolicitudHasta() {
		return fechaSolicitudHasta;
	}

	public void setFechaSolicitudHasta(Date fechaSolicitudHasta) {
		this.fechaSolicitudHasta = fechaSolicitudHasta;
	}

	public String getSolicitante() {
		return solicitante;
	}

	public void setSolicitante(String solicitante) {
		this.solicitante = solicitante;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getLinea() {
		return linea;
	}

	public void setLinea(String linea) {
		this.linea = linea;
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

	public Integer getNumeroSolicitud() {
		return numeroSolicitud;
	}

	public void setNumeroSolicitud(Integer numeroSolicitud) {
		this.numeroSolicitud = numeroSolicitud;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public String getTipoInversionCodigo() {
		return tipoInversionCodigo;
	}

	public void setTipoInversionCodigo(String tipoInversionCodigo) {
		this.tipoInversionCodigo = tipoInversionCodigo;
	}

	public String getTipoProductoCodigo() {
		return tipoProductoCodigo;
	}

	public void setTipoProductoCodigo(String tipoProductoCodigo) {
		this.tipoProductoCodigo = tipoProductoCodigo;
	}

}