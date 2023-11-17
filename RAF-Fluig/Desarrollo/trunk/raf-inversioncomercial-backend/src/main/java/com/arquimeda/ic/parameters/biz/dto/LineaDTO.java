package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.Linea;

public class LineaDTO {
	
	private Integer id;
	private String codigo;
	private String descripcion;
	private String grupoSolicitante;
	private String codGrupoSolicitante;
	private String grupoGteMKT;
	private String codGrupoGteMKT;
	
	public LineaDTO() {
		
	}
	
	public static LineaDTO fromEntity(Linea entity) {
		
		if(entity == null) {
			return null;
		}
		
		LineaDTO dto = new LineaDTO();
		dto.setId(entity.getId());
		dto.setCodigo(entity.getCodigo());
		dto.setDescripcion(entity.getDescripcion());
		dto.setGrupoSolicitante(entity.getGrupoSolicitante());
		dto.setCodGrupoSolicitante(entity.getCodGrupoSolicitante());
		dto.setGrupoGteMKT(entity.getGrupoGteMKT());
		dto.setCodGrupoGteMKT(entity.getCodGrupoGteMKT());
		
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

	public String getGrupoSolicitante() {
		return grupoSolicitante;
	}

	public void setGrupoSolicitante(String grupoSolicitante) {
		this.grupoSolicitante = grupoSolicitante;
	}

	public String getCodGrupoSolicitante() {
		return codGrupoSolicitante;
	}

	public void setCodGrupoSolicitante(String codGrupoSolicitante) {
		this.codGrupoSolicitante = codGrupoSolicitante;
	}

	public String getGrupoGteMKT() {
		return grupoGteMKT;
	}

	public void setGrupoGteMKT(String grupoGteMKT) {
		this.grupoGteMKT = grupoGteMKT;
	}

	public String getCodGrupoGteMKT() {
		return codGrupoGteMKT;
	}

	public void setCodGrupoGteMKT(String codGrupoGteMKT) {
		this.codGrupoGteMKT = codGrupoGteMKT;
	}

	@Override
	public String toString() {
		return descripcion;
	}
	
}
