package com.arquimeda.ic.fdn.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name="FDN_USERTENANT")
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="USER_TENANT_ID")
	private Long id;

	@Column(name="USER_CODE")
	private String codigo;
	
	@Column(name="USER_ID")
	private String userId;

	@Column(name="LOGIN")
	private String login;

	@Column(name="TENANT_ID")
	private String tenantId;

	@Column(name="EMAIL")
	private String email;

	@OneToMany
	@JoinColumns({
		@JoinColumn(updatable=false,insertable=false, name="LOGIN", referencedColumnName="LOGIN"),
		@JoinColumn(updatable=false,insertable=false, name="TENANT_ID", referencedColumnName="TENANT_ID")})
	private Set<UsuarioGrupo> usuarioGrupos = new HashSet<UsuarioGrupo>();

	@PrePersist
	@PreRemove
	@PreUpdate
	public void readOnlyEntity() {
		throw new RuntimeException("Entity: " + getClass() + " es de solo lectura.");
	}

	public Long getId() {
		return id;
	}

	public String getLogin() {
		return login;
	}

	public String getEmail() {
		return email;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	@Override
	public String toString() {
		String string =  "Usuario [id:" +this.id + ", codigo:" + this.codigo + ", nombre:" + this.login + ", grupos: ";
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			string += usuarioGrupo.getCodigoGrupo() + ", ";
		}
		string += "]";
		return string;
	}

	public boolean isGteArea() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF08-GTE-AREA-")){
				return true;
			}
		}
		return false;
	}

	public List<String> getCodigosGrupoGteArea() {
		List<String> grupos = new ArrayList<String>();
		
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF08-GTE-AREA-")){
				grupos.add(usuarioGrupo.getCodigoGrupo());
			}
		}
		return grupos;
	}

	public boolean isGteDistrito() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF08-GTE-DIST-")){
				return true;
			}
		}
		return false;
	}

	public String getCodigoGrupoGteDistrito() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF08-GTE-DIST-")){
				return usuarioGrupo.getCodigoGrupo();
			}
		}
		return null;
	}

	public boolean isAsistDistrito() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF08-ASIST-DIST-")){
				return true;
			}
		}
		return false;
	}

	public String getCodigoGrupoAsistDistrito() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF08-ASIST-DIST-")){
				return usuarioGrupo.getCodigoGrupo();
			}
		}
		return null;
	}
	
	public boolean isSolicitanteLinea() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF10-SOL-LINEA-")){
				return true;
			}
		}
		return false;
	}

	public String getCodigoGrupoSolicitanteLinea() {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith("RAF10-SOL-LINEA-")){
				return usuarioGrupo.getCodigoGrupo();
			}
		}
		return null;
	}
	
	public boolean isEnGrupo(String prefijoGrupo) {
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith(prefijoGrupo)){
				return true;
			}
		}
		return false;
	}

	public List<String> getCodigosGrupo(String prefijoGrupo) {
		
		List<String> codigosGrupo = new ArrayList<String>();
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith(prefijoGrupo)){
				codigosGrupo.add(usuarioGrupo.getCodigoGrupo());
			}
		}
		return codigosGrupo;
		
	}
	
	public List<String> getCodigosGrupoEnPool(String prefijoGrupo) {
		
		List<String> codigosGrupo = new ArrayList<String>();
		for(UsuarioGrupo usuarioGrupo : usuarioGrupos){
			if(usuarioGrupo.getCodigoGrupo().startsWith(prefijoGrupo)){
				codigosGrupo.add("Pool:Group:" + usuarioGrupo.getCodigoGrupo());
			}
		}
		return codigosGrupo;
		
	}

}
