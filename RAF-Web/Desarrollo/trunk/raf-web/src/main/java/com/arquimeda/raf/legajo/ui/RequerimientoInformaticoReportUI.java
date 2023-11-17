package com.arquimeda.raf.legajo.ui;

import javax.inject.Inject;

import com.arquimeda.daffy.exception.TerminalErrorListener;
import com.vaadin.annotations.Theme;
import com.vaadin.cdi.CDIUI;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.UI;

@CDIUI("reporteRequerimientoInformatico")
@Theme("valo")
public class RequerimientoInformaticoReportUI extends UI {

	private static final long serialVersionUID = 1L;

	@Inject
	TerminalErrorListener errorHandler;

	@Inject
	RequerimientoInformaticoReportComponent component;
	
	@Override
	public void init(VaadinRequest request) {

		setErrorHandler(errorHandler);
		
		setContent(component);
		
	}
	
	@Override
	public String getEmbedId() {
		return null;
	}

}