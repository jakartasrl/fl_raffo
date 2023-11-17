package com.arquimeda.ic.producer;

import java.security.Principal;

import javax.ejb.Stateless;
import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;

import com.arquimeda.ic.fdn.entity.Usuario;

@Stateless
public class LoggedUserProducer {

	@PersistenceContext(unitName="defaultPU")
	EntityManager em;

	@Inject 
	Principal principal;

	@Inject
	Logger logger;

	@Produces @LoggedUser @SessionScoped 
	public Usuario getCurrentUser() {

		Usuario user;
		
		try {
			
			logger.info("getCurrentUser principal: " + principal);
			
			user = em.createQuery(
					"SELECT u" +
					"  FROM Usuario u" +
					" WHERE u.login = :login", Usuario.class)
					.setParameter("login", principal.getName())
					.getSingleResult();
			
			logger.info("getCurrentUser user: " + user);
			
		} catch (Exception e) {
			logger.error("Error buscando usuario ", e);
			logger.info("getCurrentUser usuario no encontrado: " + principal.getName());
			// guest
			user = new Usuario();
			user.setId(-1L);
			user.setCodigo("000000");
			user.setEmail("GUEST");
			user.setLogin("GUEST");
		}
		
		return user;
		
	}

}
