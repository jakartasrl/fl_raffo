package com.arquimeda.ic.report.boundary.filter;

import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.ic.report.entity.CartaAcuerdo.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;

public class ReporteCartaAcuerdoFilter {

	private Date fechaSolicitudDesde;
	private Date fechaSolicitudHasta;
	private String distrito;
	private String area;
	private String nombre;
	private String apellido;
	private Integer nroInversionComercial;
	private Integer numeroSolicitud;
	private Estado estado;
	private TipoInversion tipoInversion;

	public ReporteCartaAcuerdoFilter(Date fechaSolicitudDesde, Date fechaSolicitudHasta, String distrito, 
			String area, String nombre, String apellido, Integer nroInversionComercial, Integer numeroSolicitud, 
			Estado estado, TipoInversion tipoInversion) {
		this.fechaSolicitudDesde = fechaSolicitudDesde;
		this.fechaSolicitudHasta = fechaSolicitudHasta;
		this.distrito = distrito;
		this.area = area;
		this.nombre = nombre;
		this.apellido = apellido;
		this.nroInversionComercial = nroInversionComercial;
		this.numeroSolicitud = numeroSolicitud;
		this.tipoInversion = tipoInversion;
		this.estado = estado;
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
		if(nombre != null && !nombre.equals("")){
			addParameter(query, "nombre", "%" + nombre.toUpperCase() + "%");			
		}
		
		if(apellido != null && !apellido.equals("")){
			addParameter(query, "apellido", "%" + apellido.toUpperCase() + "%");			
		}
		
		if(nroInversionComercial != null){
			addParameter(query, "nroInversionComercial", nroInversionComercial);			
		}
		
		if(numeroSolicitud != null){
			addParameter(query, "numeroSolicitud", numeroSolicitud);			
		}
		
		if(tipoInversion != null && !tipoInversion.equals("")){
			addParameter(query, "tipoInversion", tipoInversion);			
		}

		if(estado != null && !estado.equals("")){
			addParameter(query, "estado", estado);			
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
		
		if(nombre != null && !nombre.equals("")){
			filtro += " AND UPPER(c.nombre) LIKE :nombre ";			
		}
		
		if(apellido != null && !apellido.equals("")){
			filtro += " AND UPPER(c.apellido) LIKE :apellido ";			
		}
		
		if(nroInversionComercial != null){
			filtro += " AND c.nroInversionComercial = :nroInversionComercial ";			
		}
		
		if(numeroSolicitud != null){
			filtro += " AND c.numeroSolicitud = :numeroSolicitud ";			
		}
		
		if(tipoInversion != null && !tipoInversion.equals("")){
			filtro += " AND c.tipoInversion = :tipoInversion ";			
		}

		if(estado != null && !estado.equals("")){
			filtro += " AND c.estado = :estado ";			
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

	public Integer getNroInversionComercial() {
		return nroInversionComercial;
	}

	public void setNroInversionComercial(Integer nroInversionComercial) {
		this.nroInversionComercial = nroInversionComercial;
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

	public TipoInversion getTipoInversion() {
		return tipoInversion;
	}

	public void setTipoInversion(TipoInversion tipoInversion) {
		this.tipoInversion = tipoInversion;
	}

}