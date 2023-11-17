package com.arquimeda.ic.parameters.biz.filter;

import javax.persistence.Query;

public class ProductoFilter {

	private String codigoProducto;

	public ProductoFilter(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}

	public void addParameters(Query query) {

		if(codigoProducto != null && !codigoProducto.equals("")){
			addParameter(query, "codigoProducto", "%" + codigoProducto.toUpperCase() + "%");			
		}
		
	}

	public String getWhere() {

		String filtro = " WHERE 1=1 ";

		if(codigoProducto != null && !codigoProducto.equals("")){
			filtro += " AND UPPER(p.codigoProducto) LIKE :codigoProducto ";			
		}
		
		return filtro;

	}

	public String getCodigoProducto() {
		return codigoProducto;
	}

	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

}