package com.arquimeda.raf.MetaLista;

import static org.junit.Assert.*;

import org.junit.Test;

import com.arquimeda.fluig.MetaLista;

import junit.framework.Assert;

public class MetaListaTest {

	@Test
	public void elNombreDeLaTablaDeFluigCon2NumerosEsCorrecto() {
		
		MetaLista ml = new MetaLista();
		
		ml.setCodEmpresa(1);
		ml.setCodLista(42);
		
		Assert.assertEquals(ml.getTableName(), "ML001042");
	}
	
	@Test
	public void elNombreDeLaTablaDeFluigCon3NumerosEsCorrecto() {
		
		MetaLista ml = new MetaLista();
		
		ml.setCodEmpresa(1);
		ml.setCodLista(421);
		
		Assert.assertEquals(ml.getTableName(), "ML001421");
	}
	
	@Test
	public void elNombreDeLaTablaDeFluigCon1NumeroEsCorrecto() {
		
		MetaLista ml = new MetaLista();
		
		ml.setCodEmpresa(1);
		ml.setCodLista(1);
		
		Assert.assertEquals(ml.getTableName(), "ML001001");
	}

}
