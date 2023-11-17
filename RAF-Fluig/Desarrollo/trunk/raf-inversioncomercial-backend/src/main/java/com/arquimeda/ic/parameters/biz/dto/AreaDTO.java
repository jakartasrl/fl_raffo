package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.Area;
import com.arquimeda.ic.parameters.biz.entity.AreaDistrito;

public class AreaDTO {
	
	private Integer id;
	private String codigo;
	private String descripcion;
	private String grupoGteArea;
	private String codGrupoGteArea;
	private String grupoGtePromocion;
	private String codGrupoGtePromocion;
	
	public AreaDTO() {
		
	}
	
	public static AreaDTO fromEntity(AreaDistrito entity) {
		
		if(entity == null) {
			return null;
		}
		
		AreaDTO dto = new AreaDTO();
		dto.setId(entity.getId());
		dto.setCodigo(entity.getCodigoArea());
		dto.setDescripcion(entity.getDescripcionArea());
		dto.setGrupoGteArea(entity.getGrupoGteArea());
		dto.setCodGrupoGteArea(entity.getCodigoGrupoGteArea());
		dto.setGrupoGtePromocion(entity.getGrupoGtePromocion());
		dto.setCodGrupoGtePromocion(entity.getCodigoGrupoGtePromocion());
		
		return dto;
	}
	
	public static AreaDTO fromEntity(Area entity) {
		
		if(entity == null) {
			return null;
		}
		
		AreaDTO dto = new AreaDTO();
		dto.setId(entity.getId());
		dto.setCodigo(entity.getCodigo());
		dto.setDescripcion(entity.getDescripcionArea());
		dto.setGrupoGteArea(entity.getGrupoGteArea());
		dto.setCodGrupoGteArea(entity.getCodigoGrupoGteArea());
		dto.setGrupoGtePromocion(entity.getGrupoGtePromocion());
		dto.setCodGrupoGtePromocion(entity.getCodigoGrupoGtePromocion());
		
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

	public String getGrupoGteArea() {
		return grupoGteArea;
	}

	public void setGrupoGteArea(String grupoGteArea) {
		this.grupoGteArea = grupoGteArea;
	}

	public String getCodGrupoGteArea() {
		return codGrupoGteArea;
	}

	public void setCodGrupoGteArea(String codGrupoGteArea) {
		this.codGrupoGteArea = codGrupoGteArea;
	}

	public String getGrupoGtePromocion() {
		return grupoGtePromocion;
	}

	public void setGrupoGtePromocion(String grupoGtePromocion) {
		this.grupoGtePromocion = grupoGtePromocion;
	}

	public String getCodGrupoGtePromocion() {
		return codGrupoGtePromocion;
	}

	public void setCodGrupoGtePromocion(String codGrupoGtePromocion) {
		this.codGrupoGtePromocion = codGrupoGtePromocion;
	}
	
	@Override
	public String toString() {
		return descripcion;
	}

}
