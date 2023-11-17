package com.arquimeda.raf.solicitudDisenio.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="V_GRUPOS_INICIADORES_SOLICITUD_DISENIO")
public class GruposIiniciadoresSolicitudDisenio {

	@Id
	@Column(name="groupId")
	private String groupId;
	
	@NotNull
	@Column(name="groupDescription")
	private String groupDescription;

	@Override
	public String toString() {
		return groupDescription;
	}
	
	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getGroupDescription() {
		return groupDescription;
	}

	public void setGroupDescription(String groupDescription) {
		this.groupDescription = groupDescription;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GruposIiniciadoresSolicitudDisenio other = (GruposIiniciadoresSolicitudDisenio) obj;
		if (groupId != other.groupId)
			return false;
		return true;
	}
	
}
