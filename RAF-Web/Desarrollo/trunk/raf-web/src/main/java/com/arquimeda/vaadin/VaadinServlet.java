package com.arquimeda.vaadin;

import javax.servlet.ServletException;

import com.vaadin.cdi.server.VaadinCDIServlet;
import com.vaadin.server.BootstrapFragmentResponse;
import com.vaadin.server.BootstrapListener;
import com.vaadin.server.BootstrapPageResponse;
import com.vaadin.server.SessionInitEvent;
import com.vaadin.server.SessionInitListener;

public class VaadinServlet extends VaadinCDIServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void servletInitialized() throws ServletException {
		super.servletInitialized();
		 getService().addSessionInitListener(new SessionInitListener() {

			private static final long serialVersionUID = 1L;

				@Override
	            public void sessionInit(SessionInitEvent event) {
	                event.getSession().addBootstrapListener(new BootstrapListener() {

						private static final long serialVersionUID = 1L;

						@Override
						public void modifyBootstrapPage(BootstrapPageResponse response) {
							response.getDocument().head().append("<link href=\"VAADIN/css/style.css\" rel=\"stylesheet\" type=\"text/css\" />");							
						}
						
						@Override
						public void modifyBootstrapFragment(BootstrapFragmentResponse response) {
														
						}
						
					});
	            }
				
		 });
		 
	}	

}
