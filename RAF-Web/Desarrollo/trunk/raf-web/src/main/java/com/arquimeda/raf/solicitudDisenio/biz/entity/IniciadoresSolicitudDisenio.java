package com.arquimeda.raf.solicitudDisenio.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="V_INICIADORES_SOLICITUD_DISENIO")
public class IniciadoresSolicitudDisenio {

	@Id
	@Column(name="colleagueId")
	private String colleagueId;
	
	@NotNull
	@Column(name="colleagueName")
	private String colleagueName;

	@Override
	public String toString() {
		return colleagueName;
	}
	
	public String getColleagueId() {
		return colleagueId;
	}

	public void setColleagueId(String colleagueId) {
		this.colleagueId = colleagueId;
	}

	public String getColleagueName() {
		return colleagueName;
	}

	public void setColleagueName(String colleagueName) {
		this.colleagueName = colleagueName;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		IniciadoresSolicitudDisenio other = (IniciadoresSolicitudDisenio) obj;
		if (colleagueId != other.colleagueId)
			return false;
		return true;
	}
	
}
