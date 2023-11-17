package com.arquimeda.ic.fdn.boundary;

import java.text.DecimalFormat;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import com.arquimeda.ic.fdn.entity.Numerador;

@Stateless
public class NumeradorEJB {
	
	private static final DecimalFormat formatter = new DecimalFormat("0000");
	
	@PersistenceContext(name = "defaultPU")
	EntityManager em;
	

	public String getNextNumComprobante(String codigo, String anio) {
		
		Numerador numerador = null;
		
		try {
			numerador = em.createQuery(
					"SELECT n " +
					"  FROM Numerador n " +
					" WHERE n.codigo = :codigo", Numerador.class)
					.setLockMode(LockModeType.PESSIMISTIC_WRITE)
					.setParameter("codigo", codigo + "." + anio)
					.getSingleResult();
		} catch (NoResultException nre) {
			// Si no existe numerador lo creo
			numerador = new Numerador();
			numerador.setCodigo(codigo + "." + anio);
			em.persist(numerador);
		}
		
		return formatter.format(numerador.siguienteNumero()) + "-" + anio;
		
	}

}
