package com.arquimeda.ic.parameters.biz.dto;

import java.math.BigDecimal;
import java.util.Date;

import com.arquimeda.ic.parameters.biz.entity.Presupuesto;

public class PresupuestoDTO {
	
	private Integer id;
	private String codigoGrupoGteDist;
	private String descGrupoGteDist;
	private String codigoProducto;
	private String descripcionProducto;
	private Integer anio;
	private BigDecimal montoPresupuestado;
	private Date fechaAlta;
	private Date fechaUltimaModificacion;
	
	public PresupuestoDTO() {
		
	}
	
	public PresupuestoDTO(Presupuesto entity) {
		setId(entity.getId());
		setCodigoGrupoGteDist(entity.getCodigoGrupoGteDist());
		setDescGrupoGteDist(entity.getDescGrupoGteDist());
		setCodigoProducto(entity.getCodigoProducto());
		setDescripcionProducto(entity.getDescripcionProducto());
		setAnio(entity.getAnio());
		setMontoPresupuestado(entity.getMontoPresupuestado());
		setFechaAlta(entity.getFechaAlta());
		setFechaUltimaModificacion(entity.getFechaUltimaModificacion());
	}
	
	
	public static PresupuestoDTO fromEntity(Presupuesto entity) {
		
		if(entity == null) {
			return null;
		}
	
		PresupuestoDTO dto = new PresupuestoDTO();
		dto.setId(entity.getId());
		dto.setCodigoGrupoGteDist(entity.getCodigoGrupoGteDist());
		dto.setDescGrupoGteDist(entity.getDescGrupoGteDist());
		dto.setCodigoProducto(entity.getCodigoProducto());
		dto.setDescripcionProducto(entity.getDescripcionProducto());
		dto.setAnio(entity.getAnio());
		dto.setMontoPresupuestado(entity.getMontoPresupuestado());
		dto.setFechaAlta(entity.getFechaAlta());
		dto.setFechaUltimaModificacion(entity.getFechaUltimaModificacion());
		
		return dto;
	}

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
