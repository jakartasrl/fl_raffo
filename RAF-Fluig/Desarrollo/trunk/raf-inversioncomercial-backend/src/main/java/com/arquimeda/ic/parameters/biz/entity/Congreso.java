package com.arquimeda.ic.parameters.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.arquimeda.ic.fdn.entity.BaseEntity;

@Entity
@Table(name="Z_RAF_CONGRESO", 
uniqueConstraints={
		@UniqueConstraint(name = "UK_Z_RAF_CONGRESO_CODIGO", columnNames = {"CODIGO"})
	})
public class Congreso extends BaseEntity{
	
	@Id
	@Column(nullable=false, name="ID")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Size(max=9)
	@NotNull
	@Column(name="CODIGO", nullable=false, length=9)
	private String codigo;
	
	@Size(max=50)
	@Column(name="SIGLAS", length=50)
	private String siglas;
	
	@Size(max=255)
	@NotNull
	@Column(name="NOMBRE", nullable=false, length=255)
	private String nombre;
	
	@NotNull
	@Column(name="NACIONAL")
	private Boolean nacional;
	
	@ManyToOne
	@JoinColumn(name="STATE_ID")
	private State state;

	@NotNull
	@ManyToOne
	@JoinColumn(name="COUNTRY_ID", nullable = false)
	private Country country;
	
	@Size(max=50)
	@Column(name="ESTADO",nullable=true, length=50)
	private String estado;
	
	@Size(max=100)
	@Column(name="LOCALIDAD",nullable=true, length=100)
	private String localidad;

	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_INICIO")
	private Date fechaInicio;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_FIN")
	private Date fechaFin;
	
	@NotNull
	@Column(name="DIAS_LIMITE_CARGA", nullable=true)
	private Integer diasLimiteCarga;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name="PRESUPUESTO_HABILITADO")
	private PresupuestoHabilitado presupuestoHabilitado;
	
	@Size(max=4000)
	@Column(name="WEB", length=4000)
	private String web;
	
	@NotNull
	@Size(max=200)
	@Column(name="METADATA", nullable=true, length=200)
	private String metadata;
	
	@Column(name="HABITACION_SIMPLE")
	private Boolean habitacionSimple;
	
	@Column(name="HABITACION_DOBLE")
	private Boolean habitacionDoble;
	
	@Column(name="HABITACION_TRIPLE")
	private Boolean habitacionTriple;
	
	@Column(name="VUELO_DIRECTO")
	private Boolean vueloDirecto;
	
	@Column(name="VUELO_ESCALAS")
	private Boolean vueloEscalas;
	
	@Column(name="ANIO")
	private String anio;
	
	@Size(max=500)
	@Column(name="LUGAR", length=500)
	private String lugarEvento;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_CHECKIN")
	private Date fechaCheckin;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_CHECKOUT")
	private Date fechaCheckout;
	

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


	public State getState() {
		return state;
	}


	public void setState(State state) {
		this.state = state;
	}


	public Country getCountry() {
		return country;
	}


	public void setCountry(Country country) {
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


	@Override
	public String toString() {
		return "Congreso [id=" + id + ", codigo=" + codigo + ", siglas=" + siglas + ", nombre=" + nombre + ", nacional="
				+ nacional + ", state=" + state + ", country=" + country + ", estado=" + estado + ", localidad="
				+ localidad + ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", diasLimiteCarga="
				+ diasLimiteCarga + ", presupuestoHabilitado=" + presupuestoHabilitado + ", web=" + web + ", metadata="
				+ metadata + ", habitacionSimple=" + habitacionSimple + ", habitacionDoble=" + habitacionDoble
				+ ", habitacionTriple=" + habitacionTriple + ", vueloDirecto=" + vueloDirecto + ", vueloEscalas="
				+ vueloEscalas + ", anio=" + anio + ", lugarEvento=" + lugarEvento + ", fechaCheckin=" + fechaCheckin
				+ ", fechaCheckout=" + fechaCheckout + "]";
	}

}
