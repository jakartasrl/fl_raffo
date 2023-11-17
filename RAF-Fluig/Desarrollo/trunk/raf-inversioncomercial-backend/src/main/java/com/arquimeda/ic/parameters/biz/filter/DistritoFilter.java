package com.arquimeda.ic.parameters.biz.filter;

import javax.persistence.Query;

public class DistritoFilter {
	
	private String codigo;
	
	public DistritoFilter(String codigo) {
		this.codigo = codigo;
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}

	public void addParameters(Query query) {

		if(codigo != null){
			addParameter(query, "codigo", codigo);			
		}
	}

	public String getWhere() {

		String filtro = " WHERE 1=1 ";

		if(codigo != null){
			filtro += " AND d.codigo = :codigo ";			
		}

		return filtro;

	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

}
