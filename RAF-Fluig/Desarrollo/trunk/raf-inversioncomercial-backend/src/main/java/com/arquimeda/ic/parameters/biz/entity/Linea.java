package com.arquimeda.ic.parameters.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name="V_RAF10_LINEA")
public class Linea {
		
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}

	@Column(name="CODIGO")
	private String codigo;
	
	@Column(name="DESCRIPCION")
	private String descripcion;
	
	@Column(name="GRUPO_SOLICITANTE")
	private String grupoSolicitante;
	
	@Column(name="COD_GRUPO_SOLICITANTE")
	private String codGrupoSolicitante;
	
	@Column(name="GRUPO_GTE_MKT")
	private String grupoGteMKT;
	
	@Column(name="COD_GRUPO_GTE_MKT")
	private String codGrupoGteMKT;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getGrupoSolicitante() {
		return grupoSolicitante;
	}

	public void setGrupoSolicitante(String grupoSolicitante) {
		this.grupoSolicitante = grupoSolicitante;
	}

	public String getCodGrupoSolicitante() {
		return codGrupoSolicitante;
	}

	public void setCodGrupoSolicitante(String codGrupoSolicitante) {
		this.codGrupoSolicitante = codGrupoSolicitante;
	}

	public String getGrupoGteMKT() {
		return grupoGteMKT;
	}

	public void setGrupoGteMKT(String grupoGteMKT) {
		this.grupoGteMKT = grupoGteMKT;
	}

	public String getCodGrupoGteMKT() {
		return codGrupoGteMKT;
	}

	public void setCodGrupoGteMKT(String codGrupoGteMKT) {
		this.codGrupoGteMKT = codGrupoGteMKT;
	}

}
