package com.arquimeda.ic.fdn.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

@MappedSuperclass
public class BaseEntity {

	@Column(name="OPTLOCK")
	@Version
	private Long version;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="FECHA_ALTA")
	private Date fechaAlta;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="FECHA_ULTIMA_MODIFICACION")
	private Date fechaUltimaModificacion;

	
	@PrePersist
	protected void prePersist() {
		fechaAlta = new Date();
		preUpdate();
	}

	@PreUpdate
	protected void preUpdate() {
		fechaUltimaModificacion = new Date();
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public Date getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public Date getFechaUltimaModificacion() {
		return fechaUltimaModificacion;
	}

	public void setFechaUltimaModificacion(Date fechaUltimaModificacion) {
		this.fechaUltimaModificacion = fechaUltimaModificacion;
	}	

}

