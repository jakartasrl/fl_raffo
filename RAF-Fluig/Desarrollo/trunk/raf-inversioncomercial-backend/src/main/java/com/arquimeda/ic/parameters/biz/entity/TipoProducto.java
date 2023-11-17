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
public class TipoProducto {
		
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
	
	@Column(name="GRUPO_DERIVACION")
	private String grupoDerivacion;
	
	@Column(name="COD_GRUPO_DERIVACION")
	private String codGrupoDerivacion;

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

	public String getGrupoDerivacion() {
		return grupoDerivacion;
	}

	public void setGrupoDerivacion(String grupoDerivacion) {
		this.grupoDerivacion = grupoDerivacion;
	}

	public String getCodGrupoDerivacion() {
		return codGrupoDerivacion;
	}

	public void setCodGrupoDerivacion(String codGrupoDerivacion) {
		this.codGrupoDerivacion = codGrupoDerivacion;
	}

}
