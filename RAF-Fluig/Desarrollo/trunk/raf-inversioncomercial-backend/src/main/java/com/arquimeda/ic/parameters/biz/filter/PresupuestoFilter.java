package com.arquimeda.ic.parameters.biz.filter;

import javax.persistence.Query;

public class PresupuestoFilter {

	private String codigoGrupoGteDist;
	private String codigoProducto;
	private Integer anio;

	public PresupuestoFilter(String codigoGrupoGteDist, String codigoProducto, Integer anio) {
		this.codigoGrupoGteDist = codigoGrupoGteDist;
		this.codigoProducto = codigoProducto;
		this.anio = anio;
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}

	public void addParameters(Query query) {

		if(codigoGrupoGteDist != null && !codigoGrupoGteDist.equals("")){
			addParameter(query, "codigoGrupoGteDist", "%" + codigoGrupoGteDist.toUpperCase() + "%");			
		}

		if(codigoProducto != null && !codigoProducto.equals("")){
			addParameter(query, "codigoProducto", "%" + codigoProducto.toUpperCase() + "%");			
		}
		
		if(anio != null){
			addParameter(query, "anio", anio);			
		}
		
	}

	public String getWhere() {

		String filtro = " WHERE 1=1 ";

		if(codigoGrupoGteDist != null && !codigoGrupoGteDist.equals("")){
			filtro += " AND UPPER(p.codigoGrupoGteDist) LIKE :codigoGrupoGteDist ";			
		}
		
		if(codigoProducto != null && !codigoProducto.equals("")){
			filtro += " AND UPPER(p.codigoProducto) LIKE :codigoProducto ";			
		}
		
		if(anio != null){
			filtro += " AND p.anio = :anio ";			
		}
		
		return filtro;

	}

	public String getCodigoGrupoGteDist() {
		return codigoGrupoGteDist;
	}

	public void setCodigoGrupoGteDist(String codigoGrupoGteDist) {
		this.codigoGrupoGteDist = codigoGrupoGteDist;
	}

	public String getCodigoProducto() {
		return codigoProducto;
	}

	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}
}