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
@Table(name="V_RAF08_AREA_DISTRITO")
public class AreaDistrito {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}

	@Column(name="DISTRITO_CODIGO")
	private String codigoDistrito;
	
	@Column(name="DISTRITO_DESCRIPCION")
	private String descripcionDistrito;
	
	@Column(name="AREA_CODIGO")
	private String codigoArea;
	
	@Column(name="AREA_DESCRIPCION")
	private String descripcionArea;
	
	@Column(name="GRUPO_GTE_DISTRITO")
	private String grupoGteDistrito;
		
	@Column(name="COD_GRUPO_GTE_DISTRITO")
	private String codigoGrupoGteDistrito;
	
	@Column(name="GRUPO_ASISTENTE_DISTRITO")
	private String grupoAsistDistrito;
	
	@Column(name="COD_GRUPO_ASISTENTE_DISTRITO")
	private String codigoGrupoAsistDistrito;
	
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

	public String getCodigoDistrito() {
		return codigoDistrito;
	}

	public void setCodigoDistrito(String codigoDistrito) {
		this.codigoDistrito = codigoDistrito;
	}

	public String getDescripcionDistrito() {
		return descripcionDistrito;
	}

	public void setDescripcionDistrito(String descripcionDistrito) {
		this.descripcionDistrito = descripcionDistrito;
	}

	public String getCodigoArea() {
		return codigoArea;
	}

	public void setCodigoArea(String codigoArea) {
		this.codigoArea = codigoArea;
	}

	public String getDescripcionArea() {
		return descripcionArea;
	}

	public void setDescripcionArea(String descripcionArea) {
		this.descripcionArea = descripcionArea;
	}

	public String getGrupoGteDistrito() {
		return grupoGteDistrito;
	}

	public void setGrupoGteDistrito(String grupoGteDistrito) {
		this.grupoGteDistrito = grupoGteDistrito;
	}

	public String getCodigoGrupoGteDistrito() {
		return codigoGrupoGteDistrito;
	}

	public void setCodigoGrupoGteDistrito(String codigoGrupoGteDistrito) {
		this.codigoGrupoGteDistrito = codigoGrupoGteDistrito;
	}

	public String getGrupoAsistDistrito() {
		return grupoAsistDistrito;
	}

	public void setGrupoAsistDistrito(String grupoAsistDistrito) {
		this.grupoAsistDistrito = grupoAsistDistrito;
	}

	public String getCodigoGrupoAsistDistrito() {
		return codigoGrupoAsistDistrito;
	}

	public void setCodigoGrupoAsistDistrito(String codigoGrupoAsistDistrito) {
		this.codigoGrupoAsistDistrito = codigoGrupoAsistDistrito;
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

}
