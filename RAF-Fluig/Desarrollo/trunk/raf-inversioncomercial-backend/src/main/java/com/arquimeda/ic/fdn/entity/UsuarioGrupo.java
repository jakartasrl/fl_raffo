package com.arquimeda.ic.fdn.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name="FDN_GROUPUSERROLE")
public class UsuarioGrupo implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="GROUPUSERROLE_ID")
	private Long id;
	
	@Column(name="GROUP_CODE")
	private String codigoGrupo;

	@Column(name="LOGIN")
	private String login;
	
	@Column(name="TENANT_ID")
	private String tenantId;
	
	@PrePersist
	@PreRemove
	@PreUpdate
	public void readOnlyEntity() {
		throw new RuntimeException("Entity: " + getClass() + " es de solo lectura.");
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCodigoGrupo() {
		return codigoGrupo;
	}

	public void setCodigoGrupo(String codigoGrupo) {
		this.codigoGrupo = codigoGrupo;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	@Override
	public String toString() {
		return codigoGrupo;
	}
	
}
