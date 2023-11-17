package com.arquimeda.ic.parameters.biz.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.arquimeda.ic.fdn.entity.BaseEntity;

@Entity
@Table(name="Z_RAF_PRESUPUESTO", uniqueConstraints=@UniqueConstraint(columnNames={"CODIGO_GRUPO_GTE_DIST", "CODIGO_PRODUCTO","ANIO"}))
public class Presupuesto extends BaseEntity{
	
	@Id
	@Column(nullable=false, name="ID")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Size(max=255)
	@NotNull
	@Column(name="CODIGO_GRUPO_GTE_DIST",nullable=false, length=255)
	private String codigoGrupoGteDist;
	
	@Size(max=255)
	@NotNull
	@Column(name="DESC_GRUPO_GTE_DIST",nullable=false, length=255)
	private String descGrupoGteDist;
	
	@Size(max=255)
	@NotNull
	@Column(name="CODIGO_PRODUCTO",nullable=false, length=255)
	private String codigoProducto;
	
	@Size(max=255)
	@NotNull
	@Column(name="DESCRIPCION_PRODUCTO",nullable=false, length=255)
	private String descripcionProducto;
	
	@NotNull
	@Column(name="ANIO")
	private Integer anio;
	
	@NotNull
	@Column(name="MONTO_PRESUPUESTADO", precision=18,scale=2)
	private BigDecimal montoPresupuestado;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCodigoGrupoGteDist() {
		return codigoGrupoGteDist;
	}

	public void setCodigoGrupoGteDist(String codigoGrupoGteDist) {
		this.codigoGrupoGteDist = codigoGrupoGteDist;
	}

	public String getDescGrupoGteDist() {
		return descGrupoGteDist;
	}

	public void setDescGrupoGteDist(String descGrupoGteDist) {
		this.descGrupoGteDist = descGrupoGteDist;
	}

	public String getCodigoProducto() {
		return codigoProducto;
	}

	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

	public String getDescripcionProducto() {
		return descripcionProducto;
	}

	public void setDescripcionProducto(String descripcionProducto) {
		this.descripcionProducto = descripcionProducto;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public BigDecimal getMontoPresupuestado() {
		return montoPresupuestado;
	}

	public void setMontoPresupuestado(BigDecimal montoPresupuestado) {
		this.montoPresupuestado = montoPresupuestado;
	}

}
