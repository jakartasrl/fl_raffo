package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.TipoInversion;

public class TipoInversionDTO {
	
	private Integer id;
	private String codigo;
	private String descripcion;
	
	public TipoInversionDTO() {
		
	}
	
	public static TipoInversionDTO fromEntity(TipoInversion entity) {
		
		if(entity == null) {
			return null;
		}
		
		TipoInversionDTO dto = new TipoInversionDTO();
		dto.setId(entity.getId());
		dto.setCodigo(entity.getCodigo());
		dto.setDescripcion(entity.getDescripcion());
		
		return dto;
	}


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

	@Override
	public String toString() {
		return descripcion;
	}
	
}
