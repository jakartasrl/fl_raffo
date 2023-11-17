package com.arquimeda.ic.report.boundary.filter;

import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.ic.report.entity.InversionComercial.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;

public class ReporteExportInversionComercialFilter {

	private Date fechaSolicitudDesde;
	private Date fechaSolicitudHasta;
	private String distrito;
	private String area;
	private TipoInversion tipoInversion;
	private String apellido;
	private Integer numeroSolicitud;
	private Estado estado;
	private Integer congreso;

	public ReporteExportInversionComercialFilter(Date fechaSolicitudDesde, 
			Date fechaSolicitudHasta, String distrito, 
			String area, TipoInversion tipoInversion, String apellido,  
			Integer numeroSolicitud, Estado estado,
			Integer congreso) {
		
		this.fechaSolicitudDesde = fechaSolicitudDesde;
		this.fechaSolicitudHasta = fechaSolicitudHasta;
		this.distrito = distrito;
		this.area = area;
		this.tipoInversion = tipoInversion;
		this.apellido = apellido;
		this.numeroSolicitud = numeroSolicitud;
		this.estado = estado;
		this.congreso = congreso;
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

		if(distrito != null && !distrito.equals("")){
			addParameter(query, "distrito", "%" + distrito.toUpperCase() + "%");			
		}

		if(area != null && !area.equals("")){
			addParameter(query, "area", "%" + area.toUpperCase() + "%");			
		}
		
		if(tipoInversion != null && !tipoInversion.equals("")){
			addParameter(query, "tipoInversion", tipoInversion);			
		}
		
		if(apellido != null && !apellido.equals("")){
			addParameter(query, "apellido", "%" + apellido.toUpperCase() + "%");			
		}
		
		if(numeroSolicitud != null){
			addParameter(query, "numeroSolicitud", numeroSolicitud);			
		}
		
		if(estado != null && !estado.equals("")){
			addParameter(query, "estado", estado);			
		}
		
		if(congreso != null){
			addParameter(query, "congreso", congreso);	
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

		if(distrito != null && !distrito.equals("")){
			filtro += " AND UPPER(c.distritoCodigo) LIKE :distrito ";			
		}
		
		if(area != null && !area.equals("")){
			filtro += " AND UPPER(c.areaCodigo) LIKE :area ";			
		}
		
		if(tipoInversion != null && !tipoInversion.equals("")){
			filtro += " AND c.tipoInversion = :tipoInversion ";			
		}
		
		if(apellido != null && !apellido.equals("")){
			filtro += " AND UPPER(c.apellido) LIKE :apellido ";			
		}
		
		if(numeroSolicitud != null){
			filtro += " AND c.numeroSolicitud = :numeroSolicitud ";			
		}
		
		if(estado != null && !estado.equals("")){
			filtro += " AND c.estado = :estado ";			
		}
		
		if(congreso != null){
			filtro += " AND c.congreso.id = :congreso ";			
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

	public String getDistrito() {
		return distrito;
	}

	public void setDistrito(String distrito) {
		this.distrito = distrito;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public TipoInversion getTipoInversion() {
		return tipoInversion;
	}

	public void setTipoInversion(TipoInversion tipoInversion) {
		this.tipoInversion = tipoInversion;
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

	public Integer getCongreso() {
		return congreso;
	}

	public void setCongreso(Integer congreso) {
		this.congreso = congreso;
	}

}