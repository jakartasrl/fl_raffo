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
@Table(name="V_RAF08_AREA")
public class Area {
	
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
	private String descripcionArea;
	
	@Column(name="GRUPO_GTE_AREA")
	private String grupoGteArea;
	
	@Column(name="COD_GRUPO_GTE_AREA")
	private String codigoGrupoGteArea;
	
	@Column(name="GRUPO_GTE_PROMOCION")
	private String grupoGtePromocion;
	
	@Column(name="COD_GRUPO_GTE_PROMOCION")
	private String codigoGrupoGtePromocion;


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

	public String getGrupoGteArea() {
		return grupoGteArea;
	}

	public void setGrupoGteArea(String grupoGteArea) {
		this.grupoGteArea = grupoGteArea;
	}

	public String getCodigoGrupoGteArea() {
		return codigoGrupoGteArea;
	}

	public void setCodigoGrupoGteArea(String codigoGrupoGteArea) {
		this.codigoGrupoGteArea = codigoGrupoGteArea;
	}

	public String getGrupoGtePromocion() {
		return grupoGtePromocion;
	}

	public void setGrupoGtePromocion(String grupoGtePromocion) {
		this.grupoGtePromocion = grupoGtePromocion;
	}

	public String getCodigoGrupoGtePromocion() {
		return codigoGrupoGtePromocion;
	}

	public void setCodigoGrupoGtePromocion(String codigoGrupoGtePromocion) {
		this.codigoGrupoGtePromocion = codigoGrupoGtePromocion;
	}

	public String getDescripcionArea() {
		return descripcionArea;
	}

	public void setDescripcionArea(String descripcionArea) {
		this.descripcionArea = descripcionArea;
	}

}
