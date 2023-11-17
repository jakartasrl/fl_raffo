package com.arquimeda.fluig;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="META_LISTA")
public class MetaLista {

	@Column(name="COD_EMPRESA")
	private long codEmpresa;
	
	@Id
	@Column(name="COD_LISTA")
	private int codLista;
	
	@Column(name="LOG_DELETE")
	private boolean logDelete;
	
	@Column(name="DSL_LISTA")
	private String dslLista;
	
	@Column(name="NOM_LISTA")
	private String nomLista;
	
	@Column(name="TP_LISTA")
	private int tpLista;

	public long getCodEmpresa() {
		return codEmpresa;
	}

	public void setCodEmpresa(long codEmpresa) {
		this.codEmpresa = codEmpresa;
	}

	public int getCodLista() {
		return codLista;
	}

	public void setCodLista(int codLista) {
		this.codLista = codLista;
	}

	public boolean isLogDelete() {
		return logDelete;
	}

	public void setLogDelete(boolean logDelete) {
		this.logDelete = logDelete;
	}

	public String getDslLista() {
		return dslLista;
	}

	public void setDslLista(String dslLista) {
		this.dslLista = dslLista;
	}

	public String getNomLista() {
		return nomLista;
	}

	public void setNomLista(String nomLista) {
		this.nomLista = nomLista;
	}

	public int getTpLista() {
		return tpLista;
	}

	public void setTpLista(int tpLista) {
		this.tpLista = tpLista;
	}
	
	public String getTableName() {
		return "ML00" + this.getCodEmpresa() + String.format("%03d", this.getCodLista());
	}
	
}
