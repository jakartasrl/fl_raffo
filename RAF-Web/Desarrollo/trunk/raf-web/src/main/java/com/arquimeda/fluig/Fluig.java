package com.arquimeda.fluig;

import java.util.HashMap;
import java.util.List;

import javax.ejb.EJB;

import com.totvs.technology.foundation.sdk.service.vo.UserVO;
import com.totvs.technology.foundation.security.service.SecurityService;
import com.totvs.technology.foundation.security.vo.FDNUserVO;

/**
 * Para acceder a las funcionalidades de fluig
 * @author nahuel.espindola
 *
 */
public class Fluig {
	
	@EJB(lookup=SecurityService.JNDI_REMOTE_NAME)
	private SecurityService securityService;

	
	public FDNUserVO getCurrentUser() {
		UserVO currentUser = securityService.getCurrentUser();
		return securityService.findUserByLogin(currentUser.getLogin());
	}
	
	public List<String> findAllGroupsOfUser(String userLogin) {
		return securityService.findAllGroupsOfLogin(userLogin);
	}
	
	public List<FDNUserVO> getUsers(){
		return securityService.findUsersByFilter(new HashMap<String, Object>());
	}
	
	public Boolean isUserInRole(String login, String role){
		return securityService.findRolesByLogin(login).contains(role);
	}
	
	public Boolean isUserInGroup(String login, String group){
		return securityService.findGroupsByLogin(login).contains(group);
	}

	/**
	 * Develve los datos de un usuario en particular
	 * 
	 * @param id
	 * @return
	 */
	public FDNUserVO getUser(String id){
		return securityService.findUserByCode(id);
	}
}
