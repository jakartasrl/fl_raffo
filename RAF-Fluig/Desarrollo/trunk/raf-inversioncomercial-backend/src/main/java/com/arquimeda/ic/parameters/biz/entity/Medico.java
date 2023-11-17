package com.arquimeda.ic.parameters.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import com.arquimeda.ic.fdn.entity.BaseEntity;

@Entity
@Table(name="Z_RAF_MEDICO", uniqueConstraints=@UniqueConstraint(columnNames={"CUIT"}))
public class Medico extends BaseEntity{
	
	@Id
	@Column(nullable=false, name="ID")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@NotNull
	@Column(name="ORIGEN")
	private String origen;
	
	@NotNull
	@Column(name="APELLIDO",nullable=false)
	private String apellido;
	
	@NotNull
	@Column(name="NOMBRE",nullable=false)
	private String nombre;
	
	@Column(name="CUIT")
	private String cuit;
	
	@Column(name="TIPO_DOCUMENTO")
	private String tipoDocumento;
	
	@Column(name="DNI")
	private String dni;
	
	@Column(name="NUMERO_DOCUMENTO")
	private String numeroDocumento;
	
	@Column(name="NUMERO_PASAPORTE")
	private String numeroPasaporte;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_VTO_PASAPORTE")
	private Date fechaVtoPasaporte;
	
	@Column(name="SEXO")
	private String sexo;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_NACIMIENTO")
	private Date fechaNacimiento;
	
	@Column(name="NACIONALIDAD")
	private String nacionalidad;
	
	@Column(name="DOMICILIO")
	private String domicilio;
	
	@Column(name="LOCALIDAD")
	private String localidad;
	
	@Column(name="PROVINCIA")
	private String provincia;
	
	@Column(name="PAIS")
	private String pais;
	
	@Column(name="CODIGO_POSTAL")
	private String codigoPostal;
	
	@Column(name="TELEFONO_CONTACTO")
	private String telefonoContacto;
	
	@Column(name="CELULAR")
	private String celular;
	
	@Column(name="MAIL_CONTACTO")
	private String mailContacto;
	
	@Column(name="ESPECIALIDAD_PROFESIONAL")
	private String especialidadProfesional;
	
	@Column(name="TITULO_GRADO")
	private String tituloGrado;
	
	@Column(name="INSTITUCION_DODDE_OBTUVO")
	private String institucionDondeObtuvo;
	
	@Column(name="ANIO_EGRESO")
	private String anioEgreso;
	
	@Column(name="MATRICULA")
	private String matricula;
	
	@Column(name="INSTITUCION_QUE_TRABAJA")
	private String institucionQueTrabaja;
	
	@Column(name="CARGO_POSICION")
	private String cargoPosicion;

	@Column(name="MEMBRESIA")
	private String membresia;
	
	@Column(name="CIUDAD")
	private String ciudad;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOrigen() {
		return origen;
	}

	public void setOrigen(String origen) {
		this.origen = origen;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public String getTipoDocumento() {
		return tipoDocumento;
	}

	public void setTipoDocumento(String tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getNumeroDocumento() {
		return numeroDocumento;
	}

	public void setNumeroDocumento(String numeroDocumento) {
		this.numeroDocumento = numeroDocumento;
	}

	public String getNumeroPasaporte() {
		return numeroPasaporte;
	}

	public void setNumeroPasaporte(String numeroPasaporte) {
		this.numeroPasaporte = numeroPasaporte;
	}

	public Date getFechaVtoPasaporte() {
		return fechaVtoPasaporte;
	}

	public void setFechaVtoPasaporte(Date fechaVtoPasaporte) {
		this.fechaVtoPasaporte = fechaVtoPasaporte;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getNacionalidad() {
		return nacionalidad;
	}

	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}

	public String getDomicilio() {
		return domicilio;
	}

	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getCodigoPostal() {
		return codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public String getTelefonoContacto() {
		return telefonoContacto;
	}

	public void setTelefonoContacto(String telefonoContacto) {
		this.telefonoContacto = telefonoContacto;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getMailContacto() {
		return mailContacto;
	}

	public void setMailContacto(String mailContacto) {
		this.mailContacto = mailContacto;
	}

	public String getEspecialidadProfesional() {
		return especialidadProfesional;
	}

	public void setEspecialidadProfesional(String especialidadProfesional) {
		this.especialidadProfesional = especialidadProfesional;
	}

	public String getTituloGrado() {
		return tituloGrado;
	}

	public void setTituloGrado(String tituloGrado) {
		this.tituloGrado = tituloGrado;
	}

	public String getInstitucionDondeObtuvo() {
		return institucionDondeObtuvo;
	}

	public void setInstitucionDondeObtuvo(String institucionDondeObtuvo) {
		this.institucionDondeObtuvo = institucionDondeObtuvo;
	}

	public String getAnioEgreso() {
		return anioEgreso;
	}

	public void setAnioEgreso(String anioEgreso) {
		this.anioEgreso = anioEgreso;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public String getInstitucionQueTrabaja() {
		return institucionQueTrabaja;
	}

	public void setInstitucionQueTrabaja(String institucionQueTrabaja) {
		this.institucionQueTrabaja = institucionQueTrabaja;
	}

	public String getCargoPosicion() {
		return cargoPosicion;
	}

	public void setCargoPosicion(String cargoPosicion) {
		this.cargoPosicion = cargoPosicion;
	}

	public String getMembresia() {
		return membresia;
	}

	public void setMembresia(String membresia) {
		this.membresia = membresia;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	@Override
	public String toString() {
		return "Medico [id=" + id + ", origen=" + origen + ", apellido=" + apellido + ", nombre=" + nombre + ", cuit="
				+ cuit + ", tipoDocumento=" + tipoDocumento + ", dni=" + dni + ", numeroDocumento=" + numeroDocumento
				+ ", numeroPasaporte=" + numeroPasaporte + ", fechaVtoPasaporte=" + fechaVtoPasaporte + ", sexo=" + sexo
				+ ", fechaNacimiento=" + fechaNacimiento + ", nacionalidad=" + nacionalidad + ", domicilio=" + domicilio
				+ ", localidad=" + localidad + ", provincia=" + provincia + ", pais=" + pais + ", codigoPostal="
				+ codigoPostal + ", telefonoContacto=" + telefonoContacto + ", celular=" + celular + ", mailContacto="
				+ mailContacto + ", especialidadProfesional=" + especialidadProfesional + ", tituloGrado=" + tituloGrado
				+ ", institucionDondeObtuvo=" + institucionDondeObtuvo + ", anioEgreso=" + anioEgreso + ", matricula="
				+ matricula + ", institucionQueTrabaja=" + institucionQueTrabaja + ", cargoPosicion=" + cargoPosicion
				+ ", membresia=" + membresia + ", ciudad=" + ciudad + "]";
	}
	
}
