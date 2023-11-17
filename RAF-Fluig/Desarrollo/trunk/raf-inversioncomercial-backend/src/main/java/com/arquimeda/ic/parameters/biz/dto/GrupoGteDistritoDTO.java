package com.arquimeda.ic.parameters.biz.dto;

public class GrupoGteDistritoDTO {
	
	private String codigoGrupoGteDist;
	private String descGrupoGteDist;
	
	public static GrupoGteDistritoDTO fromEntity(String codigo, String descripcion) {
		
		if(codigo == null) {
			return null;
		}
		
		GrupoGteDistritoDTO dto = new GrupoGteDistritoDTO();
		dto.setCodigoGrupoGteDist(codigo);
		dto.setDescGrupoGteDist(descripcion);
		
		return dto;
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

}
