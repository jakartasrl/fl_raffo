package com.arquimeda.ic.parameters.biz.dto;

import java.util.Date;

import com.arquimeda.ic.parameters.biz.entity.Congreso;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.fasterxml.jackson.annotation.JsonFormat;

public class CongresoExportDTO {
	
	private Integer id;

	private String siglas;

	private String nombre;

	private String nacional;

	private String state;

	private String country;

	private String estado;

	private String localidad;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date fechaInicio;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date fechaFin;

	private Integer diasLimiteCarga;

	private PresupuestoHabilitado presupuestoHabilitado;

	private String web;

	private String metadata;

	private String habitacionSimple;

	private String habitacionDoble;

	private String habitacionTriple;

	private String vueloDirecto;

	private String vueloEscalas;
	
	private String anio;
	
	private String lugarEvento;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")  
	private Date fechaCheckin;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date fechaCheckout;
	
	private String codigo;
	
	public CongresoExportDTO() {}
	
		
	public CongresoExportDTO(Congreso congreso) {
		super();
		this.siglas = congreso.getSiglas();
		this.nombre = congreso.getNombre();
		this.nacional = congreso.getNacional()? "SI" : "NO";
		this.state = congreso.getState() != null? congreso.getState().getDescription() : "";
		this.country = congreso.getCountry() != null? congreso.getCountry().getDescription() : "";
		this.estado = congreso.getEstado();
		this.localidad = congreso.getLocalidad();
		this.fechaInicio = congreso.getFechaInicio();
		this.fechaFin = congreso.getFechaFin();
		this.diasLimiteCarga = congreso.getDiasLimiteCarga();
		this.presupuestoHabilitado = congreso.getPresupuestoHabilitado();
		this.web = congreso.getWeb();
		this.metadata = congreso.getMetadata();
		this.habitacionSimple = congreso.getHabitacionSimple() != null && congreso.getHabitacionSimple()? "SI" : "NO";
		this.habitacionDoble = congreso.getHabitacionDoble() != null && congreso.getHabitacionDoble()? "SI" : "NO";
		this.habitacionTriple = congreso.getHabitacionTriple() != null && congreso.getHabitacionTriple()? "SI" : "NO";
		this.vueloDirecto = congreso.getVueloDirecto() != null && congreso.getVueloDirecto()? "SI" : "NO";
		this.vueloEscalas = congreso.getVueloEscalas() != null && congreso.getVueloEscalas()? "SI" : "NO";
		this.anio = congreso.getAnio();
		this.lugarEvento = congreso.getLugarEvento(); 
		this.fechaCheckin = congreso.getFechaCheckin();
		this.fechaCheckout = congreso.getFechaCheckout();
		this.codigo = congreso.getCodigo();
	}

	

	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getSiglas() {
		return siglas;
	}


	public void setSiglas(String siglas) {
		this.siglas = siglas;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getNacional() {
		return nacional;
	}


	public void setNacional(String nacional) {
		this.nacional = nacional;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getLocalidad() {
		return localidad;
	}


	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}


	public Date getFechaInicio() {
		return fechaInicio;
	}


	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}


	public Date getFechaFin() {
		return fechaFin;
	}


	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}


	public Integer getDiasLimiteCarga() {
		return diasLimiteCarga;
	}


	public void setDiasLimiteCarga(Integer diasLimiteCarga) {
		this.diasLimiteCarga = diasLimiteCarga;
	}


	public PresupuestoHabilitado getPresupuestoHabilitado() {
		return presupuestoHabilitado;
	}


	public void setPresupuestoHabilitado(PresupuestoHabilitado presupuestoHabilitado) {
		this.presupuestoHabilitado = presupuestoHabilitado;
	}


	public String getWeb() {
		return web;
	}


	public void setWeb(String web) {
		this.web = web;
	}


	public String getMetadata() {
		return metadata;
	}


	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}


	public String getHabitacionSimple() {
		return habitacionSimple;
	}


	public void setHabitacionSimple(String habitacionSimple) {
		this.habitacionSimple = habitacionSimple;
	}


	public String getHabitacionDoble() {
		return habitacionDoble;
	}


	public void setHabitacionDoble(String habitacionDoble) {
		this.habitacionDoble = habitacionDoble;
	}


	public String getHabitacionTriple() {
		return habitacionTriple;
	}


	public void setHabitacionTriple(String habitacionTriple) {
		this.habitacionTriple = habitacionTriple;
	}


	public String getVueloDirecto() {
		return vueloDirecto;
	}


	public void setVueloDirecto(String vueloDirecto) {
		this.vueloDirecto = vueloDirecto;
	}


	public String getVueloEscalas() {
		return vueloEscalas;
	}


	public void setVueloEscalas(String vueloEscalas) {
		this.vueloEscalas = vueloEscalas;
	}


	public String getAnio() {
		return anio;
	}


	public void setAnio(String anio) {
		this.anio = anio;
	}


	public String getLugarEvento() {
		return lugarEvento;
	}


	public void setLugarEvento(String lugarEvento) {
		this.lugarEvento = lugarEvento;
	}


	public Date getFechaCheckin() {
		return fechaCheckin;
	}


	public void setFechaCheckin(Date fechaCheckin) {
		this.fechaCheckin = fechaCheckin;
	}


	public Date getFechaCheckout() {
		return fechaCheckout;
	}


	public void setFechaCheckout(Date fechaCheckout) {
		this.fechaCheckout = fechaCheckout;
	}

	public String getCodigo() {
		return codigo;
	}


	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}


	@Override
	public String toString() {
		return "CongresoExportDTO [id=" + id + ", siglas=" + siglas + ", nombre=" + nombre + ", nacional=" + nacional
				+ ", state=" + state + ", country=" + country + ", estado=" + estado + ", localidad=" + localidad
				+ ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", diasLimiteCarga=" + diasLimiteCarga
				+ ", presupuestoHabilitado=" + presupuestoHabilitado + ", web=" + web + ", metadata=" + metadata
				+ ", habitacionSimple=" + habitacionSimple + ", habitacionDoble=" + habitacionDoble
				+ ", habitacionTriple=" + habitacionTriple + ", vueloDirecto=" + vueloDirecto + ", vueloEscalas="
				+ vueloEscalas + ", anio=" + anio + ", lugarEvento=" + lugarEvento + ", fechaCheckin=" + fechaCheckin
				+ ", fechaCheckout=" + fechaCheckout + ", codigo=" + codigo + ", getId()=" + getId() + ", getSiglas()="
				+ getSiglas() + ", getNombre()=" + getNombre() + ", getNacional()=" + getNacional() + ", getState()="
				+ getState() + ", getCountry()=" + getCountry() + ", getEstado()=" + getEstado() + ", getLocalidad()="
				+ getLocalidad() + ", getFechaInicio()=" + getFechaInicio() + ", getFechaFin()=" + getFechaFin()
				+ ", getDiasLimiteCarga()=" + getDiasLimiteCarga() + ", getPresupuestoHabilitado()="
				+ getPresupuestoHabilitado() + ", getWeb()=" + getWeb() + ", getMetadata()=" + getMetadata()
				+ ", getHabitacionSimple()=" + getHabitacionSimple() + ", getHabitacionDoble()=" + getHabitacionDoble()
				+ ", getHabitacionTriple()=" + getHabitacionTriple() + ", getVueloDirecto()=" + getVueloDirecto()
				+ ", getVueloEscalas()=" + getVueloEscalas() + ", getAnio()=" + getAnio() + ", getLugarEvento()="
				+ getLugarEvento() + ", getFechaCheckin()=" + getFechaCheckin() + ", getFechaCheckout()="
				+ getFechaCheckout() + ", getCodigo()=" + getCodigo() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}

}