package com.arquimeda.ic.parameters.biz.dto;

import java.util.Date;

import com.arquimeda.ic.parameters.biz.entity.Congreso;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.fasterxml.jackson.annotation.JsonFormat;

public class CongresoDTO {
	
	private Integer id;

	private String siglas;

	private String nombre;

	private Boolean nacional;

	private StateDTO state;

	private CountryDTO country;

	private String estado;

	private String localidad;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "es_AR", timezone="America/Argentina/Buenos_Aires")  
	private Date fechaInicio;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "es_AR", timezone="America/Argentina/Buenos_Aires")  
	private Date fechaFin;

	private Integer diasLimiteCarga;

	private PresupuestoHabilitado presupuestoHabilitado;

	private String web;

	private String metadata;

	private Boolean habitacionSimple;

	private Boolean habitacionDoble;

	private Boolean habitacionTriple;

	private Boolean vueloDirecto;

	private Boolean vueloEscalas;
	
	private String anio;
	
	private String lugarEvento;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "es_AR", timezone="America/Argentina/Buenos_Aires")  
	private Date fechaCheckin;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "es_AR", timezone="America/Argentina/Buenos_Aires")  
	private Date fechaCheckout;
	
	private String codigo;
	
	public CongresoDTO() {}
	
		
	public CongresoDTO(String siglas, String nombre, Boolean nacional, StateDTO state, CountryDTO country,
			String estado, String localidad, Date fechaInicio, Date fechaFin, Integer diasLimiteCarga,
			PresupuestoHabilitado presupuestoHabilitado, String web, String metadata, Boolean habitacionSimple,
			Boolean habitacionDoble, Boolean habitacionTriple, Boolean vueloDirecto, Boolean vueloEscalas,
			String anio, String lugarEvento, Date fechaCheckin, Date fechaCheckout, String codigo) {
		super();
		this.siglas = siglas;
		this.nombre = nombre;
		this.nacional = nacional;
		this.state = state;
		this.country = country;
		this.estado = estado;
		this.localidad = localidad;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.diasLimiteCarga = diasLimiteCarga;
		this.presupuestoHabilitado = presupuestoHabilitado;
		this.web = web;
		this.metadata = metadata;
		this.habitacionSimple = habitacionSimple;
		this.habitacionDoble = habitacionDoble;
		this.habitacionTriple = habitacionTriple;
		this.vueloDirecto = vueloDirecto;
		this.vueloEscalas = vueloEscalas;
		this.anio = anio;
		this.lugarEvento = lugarEvento; 
		this.fechaCheckin = fechaCheckin;
		this.fechaCheckout = fechaCheckout;
		this.codigo = codigo;
	}



	public CongresoDTO(Congreso congreso) {
		this.id = congreso.getId();
		this.siglas = congreso.getSiglas();
		this.nombre = congreso.getNombre();
		this.nacional = congreso.getNacional();
		this.state = StateDTO.fromEntity(congreso.getState());
		this.country = CountryDTO.fromEntity(congreso.getCountry());
		this.estado = congreso.getEstado();
		this.localidad = congreso.getLocalidad();
		this.fechaInicio = congreso.getFechaInicio();
		this.fechaFin = congreso.getFechaFin();
		this.diasLimiteCarga = congreso.getDiasLimiteCarga();
		this.presupuestoHabilitado = congreso.getPresupuestoHabilitado();
		this.web = congreso.getWeb();
		this.metadata = congreso.getMetadata();
		this.habitacionSimple = congreso.getHabitacionSimple();
		this.habitacionDoble = congreso.getHabitacionDoble();
		this.habitacionTriple = congreso.getHabitacionTriple();
		this.vueloDirecto = congreso.getVueloDirecto();
		this.vueloEscalas = congreso.getVueloEscalas();
		this.anio = congreso.getAnio();
		this.lugarEvento = congreso.getLugarEvento(); 
		this.fechaCheckin = congreso.getFechaCheckin();
		this.fechaCheckout = congreso.getFechaCheckout();
		this.codigo = congreso.getCodigo();
	}

	public static CongresoDTO fromEntity(Congreso congreso) {		
		return congreso != null? new CongresoDTO(congreso) : null;		
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


	public Boolean getNacional() {
		return nacional;
	}


	public void setNacional(Boolean nacional) {
		this.nacional = nacional;
	}


	public StateDTO getState() {
		return state;
	}


	public void setState(StateDTO state) {
		this.state = state;
	}


	public CountryDTO getCountry() {
		return country;
	}


	public void setCountry(CountryDTO country) {
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


	public Boolean getHabitacionSimple() {
		return habitacionSimple;
	}


	public void setHabitacionSimple(Boolean habitacionSimple) {
		this.habitacionSimple = habitacionSimple;
	}


	public Boolean getHabitacionDoble() {
		return habitacionDoble;
	}


	public void setHabitacionDoble(Boolean habitacionDoble) {
		this.habitacionDoble = habitacionDoble;
	}


	public Boolean getHabitacionTriple() {
		return habitacionTriple;
	}


	public void setHabitacionTriple(Boolean habitacionTriple) {
		this.habitacionTriple = habitacionTriple;
	}


	public Boolean getVueloDirecto() {
		return vueloDirecto;
	}


	public void setVueloDirecto(Boolean vueloDirecto) {
		this.vueloDirecto = vueloDirecto;
	}


	public Boolean getVueloEscalas() {
		return vueloEscalas;
	}


	public void setVueloEscalas(Boolean vueloEscalas) {
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
		return "CongresoDTO [id=" + id + ", siglas=" + siglas + ", nombre=" + nombre + ", nacional=" + nacional
				+ ", state=" + state + ", country=" + country + ", estado=" + estado + ", localidad=" + localidad
				+ ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", diasLimiteCarga=" + diasLimiteCarga
				+ ", presupuestoHabilitado=" + presupuestoHabilitado + ", web=" + web + ", metadata=" + metadata
				+ ", habitacionSimple=" + habitacionSimple + ", habitacionDoble=" + habitacionDoble
				+ ", habitacionTriple=" + habitacionTriple + ", vueloDirecto=" + vueloDirecto + ", vueloEscalas="
				+ vueloEscalas + ", anio=" + anio + ", lugarEvento=" + lugarEvento + ", fechaCheckin=" + fechaCheckin
				+ ", fechaCheckout=" + fechaCheckout + ", codigo=" + codigo + "]";
	}

}