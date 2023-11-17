package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.Producto;

public class ProductoDTO {
	
	private String codigoProducto;
	private String descripcionProducto;
	
	public static ProductoDTO fromEntity(Producto entity) {
		
		if(entity == null) {
			return null;
		}
		
		ProductoDTO dto = new ProductoDTO();
		dto.setCodigoProducto(entity.getCodigoProducto());
		dto.setDescripcionProducto(entity.getDescripcionProducto());
		
		return dto;
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

}
