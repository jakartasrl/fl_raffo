package com.arquimeda.raf.legajo.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="V_REQUERIMIENTO_INFORMATICO")
public class RequerimientoInformatico {
		
	@Id
	@NotNull
	@Column(name="nroSolicitud", nullable=false)
	private Integer nroSolicitud;
	
	@NotNull
	@Column(name="pendiente")
	private Boolean pendiente;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="fechaIngresoNecesaria")
	private Date fechaIngresoNecesaria;
	
	@NotNull
	@Column(name="nombre")
	private String nombre;
	
	@NotNull
	@Column(name="apellido")
	private String apellido;
	
	@NotNull
	@Column(name="puesto")
	private String puesto;
	
	@NotNull
	@Column(name="gerencia")
	private String gerencia;
	
	@NotNull
	@Column(name="area")
	private String area;
	
	@NotNull
	@Column(name="sector")
	private String sector;
	
	@NotNull
	@Column(name="subSector")
	private String subSector;
	
	@NotNull
	@Column(name="centroCosto")
	private String centroCosto;
	
	@NotNull
	@Column(name="reportaA")
	private String reportaA;
	
	@NotNull
	@Column(name="tipoPosicion")
	private String tipoPosicion;
	
	@NotNull
	@Column(name="pea")
	private String pea;
	
	@NotNull
	@Column(name="sede")
	private String sede;
	
	@NotNull
	@Column(name="ubicacionFisica")
	private String ubicacionFisica;
	
	@Column(name="equipamientoRequerido")
	private String equipamientoRequerido;
	
	@Column(name="usuarioQAD")
	private String usuarioQAD;
	
	@Column(name="accesos")
	private String accesos;
	
	@Column(name="webmail")
	private String webmail;
	
	@Column(name="telefonia")
	private String telefonia;	

	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}
	
	public Integer getNroSolicitud() {
		return nroSolicitud;
	}

	public void setNroSolicitud(Integer nroSolicitud) {
		this.nroSolicitud = nroSolicitud;
	}

	public Boolean getPendiente() {
		return pendiente;
	}

	public void setPendiente(Boolean pendiente) {
		this.pendiente = pendiente;
	}

	public Date getFechaIngresoNecesaria() {
		return fechaIngresoNecesaria;
	}

	public void setFechaIngresoNecesaria(Date fechaIngresoNecesaria) {
		this.fechaIngresoNecesaria = fechaIngresoNecesaria;
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

	public String getPuesto() {
		return puesto;
	}

	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}

	public String getGerencia() {
		return gerencia;
	}

	public void setGerencia(String gerencia) {
		this.gerencia = gerencia;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

	public String getSubSector() {
		return subSector;
	}

	public void setSubSector(String subSector) {
		this.subSector = subSector;
	}

	public String getCentroCosto() {
		return centroCosto;
	}

	public void setCentroCosto(String centroCosto) {
		this.centroCosto = centroCosto;
	}

	public String getReportaA() {
		return reportaA;
	}

	public void setReportaA(String reportaA) {
		this.reportaA = reportaA;
	}

	public String getTipoPosicion() {
		return tipoPosicion;
	}

	public void setTipoPosicion(String tipoPosicion) {
		this.tipoPosicion = tipoPosicion;
	}

	public String getPea() {
		return pea;
	}

	public void setPea(String pea) {
		this.pea = pea;
	}

	public String getSede() {
		return sede;
	}

	public void setSede(String sede) {
		this.sede = sede;
	}

	public String getUbicacionFisica() {
		return ubicacionFisica;
	}

	public void setUbicacionFisica(String ubicacionFisica) {
		this.ubicacionFisica = ubicacionFisica;
	}

	public String getEquipamientoRequerido() {
		return equipamientoRequerido;
	}

	public void setEquipamientoRequerido(String equipamientoRequerido) {
		this.equipamientoRequerido = equipamientoRequerido;
	}

	public String getUsuarioQAD() {
		return usuarioQAD;
	}

	public void setUsuarioQAD(String usuarioQAD) {
		this.usuarioQAD = usuarioQAD;
	}

	public String getAccesos() {
		return accesos;
	}

	public void setAccesos(String accesos) {
		this.accesos = accesos;
	}

	public String getWebmail() {
		return webmail;
	}

	public void setWebmail(String webmail) {
		this.webmail = webmail;
	}

	public String getTelefonia() {
		return telefonia;
	}

	public void setTelefonia(String telefonia) {
		this.telefonia = telefonia;
	}
		
}
