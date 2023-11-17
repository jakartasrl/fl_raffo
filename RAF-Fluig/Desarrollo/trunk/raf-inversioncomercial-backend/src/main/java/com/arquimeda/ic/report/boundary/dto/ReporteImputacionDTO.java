package com.arquimeda.ic.report.boundary.dto;

import java.math.BigDecimal;

import com.arquimeda.ic.report.entity.Imputacion;

public class ReporteImputacionDTO {
	
	private Integer id;
	private String codigoProducto;
	private String producto;
	private BigDecimal porcentaje;
	private BigDecimal presupuestoARS;
	private BigDecimal consumidoARS;
	
	public static ReporteImputacionDTO fromEntity(Imputacion entity) {

		ReporteImputacionDTO dto = new ReporteImputacionDTO();
		dto.setId(entity.getId());
		dto.setCodigoProducto(entity.getCodigoProducto());
		dto.setProducto(entity.getProducto());
		dto.setPorcentaje(entity.getPorcentaje());
		dto.setPresupuestoARS(entity.getPresupuestoARS());
		dto.setConsumidoARS(entity.getConsumidoARS());

		return dto;
	}
	
	public ReporteImputacionDTO() {
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCodigoProducto() {
		return codigoProducto;
	}
	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}
	public String getProducto() {
		return producto;
	}
	public void setProducto(String producto) {
		this.producto = producto;
	}
	public BigDecimal getPorcentaje() {
		return porcentaje;
	}
	public void setPorcentaje(BigDecimal porcentaje) {
		this.porcentaje = porcentaje;
	}
	public BigDecimal getPresupuestoARS() {
		return presupuestoARS;
	}
	public void setPresupuestoARS(BigDecimal presupuestoARS) {
		this.presupuestoARS = presupuestoARS;
	}
	public BigDecimal getConsumidoARS() {
		return consumidoARS;
	}
	public void setConsumidoARS(BigDecimal consumidoARS) {
		this.consumidoARS = consumidoARS;
	}

}
