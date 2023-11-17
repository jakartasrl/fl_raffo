package com.arquimeda.ic.report.boundary;

import java.util.List;

public class FiltroGrupo {

	private String where;
	private String nombreParametro;
	private List<String> valoresParametro;
	
	
	public FiltroGrupo(String where, String nombreParametro, List<String> valoresParametro) {
		this.where = where;
		this.nombreParametro = nombreParametro;
		this.valoresParametro = valoresParametro;
	}

	public String getWhere() {
		return where;
	}
	
	public void setWhere(String where) {
		this.where = where;
	}

	public String getNombreParametro() {
		return nombreParametro;
	}

	public void setNombreParametro(String nombreParametro) {
		this.nombreParametro = nombreParametro;
	}

	public List<String> getValoresParametro() {
		return valoresParametro;
	}

	public void setValoresParametro(List<String> valoresParametro) {
		this.valoresParametro = valoresParametro;
	}

	@Override
	public String toString() {
		return "FiltroGrupo [where=" + where + ", nombreParametro=" + nombreParametro + ", valoresParametro="
				+ valoresParametro + "]";
	}
	
}
