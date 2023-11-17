package com.arquimeda.raf.solicitudDisenio.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="V_SOLICITUDES_DISENIO_TIPOS_NUEVOS_PRODUCTOS")
public class TiposNuevosProductosSolicitudDisenio {

	@Id
	@Column(name="ID", nullable=false)
	private Integer ID;
	
	@NotNull
	@Column(name="nroSolicitud", nullable=false)
	private Integer nroSolicitud;
	
	@Column(name="tipoNewProd")
	private String tipoNewProd;
	
	public TiposNuevosProductosSolicitudDisenio() {
		super();
	}

	public Integer getNroSolicitud() {
		return nroSolicitud;
	}

	public void setNroSolicitud(Integer nroSolicitud) {
		this.nroSolicitud = nroSolicitud;
	}

	public String getTipoNewProd() {
		return tipoNewProd;
	}

	public void setTipoNewProd(String tipoNewProd) {
		this.tipoNewProd = tipoNewProd;
	}

	public TiposNuevosProductosSolicitudDisenio(Integer id, Integer nroSolicitud, String tipoNewProd) {
		super();
		this.ID = id;
		this.nroSolicitud = nroSolicitud;
		this.tipoNewProd = tipoNewProd;
	}

	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}

	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}
	
}
