package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.TipoProducto;

public class TipoProductoDTO {
	
	private Integer id;
	private String codigo;
	private String descripcion;
	private String grupoDerivacion;
	private String codGrupoDerivacion;
	
	public TipoProductoDTO() {
		
	}
	
	public static TipoProductoDTO fromEntity(TipoProducto entity) {
		
		if(entity == null) {
			return null;
		}
		
		TipoProductoDTO dto = new TipoProductoDTO();
		dto.setId(entity.getId());
		dto.setCodigo(entity.getCodigo());
		dto.setDescripcion(entity.getDescripcion());
		dto.setGrupoDerivacion(entity.getGrupoDerivacion());
		dto.setCodGrupoDerivacion(entity.getCodGrupoDerivacion());
		
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

	@Override
	public String toString() {
		return descripcion;
	}
	
}
