package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.AreaDistrito;

public class DistritoDTO {
	
	private Integer id;
	private String codigo;
	private String descripcion;
	private String grupoGteDistrito;
	private String codGrupoGteDistrito;
	private String grupoAsistDistrito;
	private String codGrupoAsistDistrito;
	private String area;
	private String areaCodigo;
	
	public DistritoDTO() {
		
	}
	
	public static DistritoDTO fromEntity(AreaDistrito entity) {
		
		if(entity == null) {
			return null;
		}
		
		DistritoDTO dto = new DistritoDTO();
		dto.setId(entity.getId());
		dto.setCodigo(entity.getCodigoDistrito());
		dto.setDescripcion(entity.getDescripcionDistrito());
		dto.setGrupoGteDistrito(entity.getGrupoGteDistrito());
		dto.setCodGrupoGteDistrito(entity.getCodigoGrupoGteDistrito());
		dto.setGrupoAsistDistrito(entity.getGrupoAsistDistrito());
		dto.setCodGrupoAsistDistrito(entity.getCodigoGrupoAsistDistrito());
		dto.setArea(entity.getDescripcionArea());
		dto.setAreaCodigo(entity.getCodigoArea());
		
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

	public String getGrupoGteDistrito() {
		return grupoGteDistrito;
	}

	public void setGrupoGteDistrito(String grupoGteDistrito) {
		this.grupoGteDistrito = grupoGteDistrito;
	}

	public String getCodGrupoGteDistrito() {
		return codGrupoGteDistrito;
	}

	public void setCodGrupoGteDistrito(String codGrupoGteDistrito) {
		this.codGrupoGteDistrito = codGrupoGteDistrito;
	}

	public String getGrupoAsistDistrito() {
		return grupoAsistDistrito;
	}

	public void setGrupoAsistDistrito(String grupoAsistDistrito) {
		this.grupoAsistDistrito = grupoAsistDistrito;
	}

	public String getCodGrupoAsistDistrito() {
		return codGrupoAsistDistrito;
	}

	public void setCodGrupoAsistDistrito(String codGrupoAsistDistrito) {
		this.codGrupoAsistDistrito = codGrupoAsistDistrito;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAreaCodigo() {
		return areaCodigo;
	}

	public void setAreaCodigo(String areaCodigo) {
		this.areaCodigo = areaCodigo;
	}

	@Override
	public String toString() {
		return descripcion;
	}
	
}
