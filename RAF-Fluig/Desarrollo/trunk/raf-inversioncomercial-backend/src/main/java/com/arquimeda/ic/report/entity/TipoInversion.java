package com.arquimeda.ic.report.entity;

public enum TipoInversion {

	alojamientos("ALOJAMIENTO CONGRESO O EVENTO CIENTIFICO"),
	aereosNac("AEREO CONGRESO NACIONAL"),
	inscripciones("INSCRIPCION A CONGRESO"),
	aereosInt("AEREO CONGRESO INTERNACIONAL"),
	equipamientos("EQUIPAMIENTO MEDICO"),
	becaNac("BECA COMPLETA/PARCIAL NACIONAL"),
	becaInt("BECA COMPLETA/PARCIAL INTERNACIONAL"),
	patrocinio("PATROCINIO EDUCACION MEDICA");

	private String descripcion;
	
	private TipoInversion(String descripcion) {
		this.descripcion = descripcion;
		
	}
	
	public String toString() {
		return this.name();
	}
	
	public String getDescripcion() {
		return descripcion;
	};	
	
}
