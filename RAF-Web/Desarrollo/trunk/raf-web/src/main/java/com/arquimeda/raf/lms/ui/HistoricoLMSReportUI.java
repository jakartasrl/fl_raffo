package com.arquimeda.raf.lms.ui;

import javax.inject.Inject;

import com.arquimeda.daffy.exception.TerminalErrorListener;
import com.vaadin.annotations.Theme;
import com.vaadin.cdi.CDIUI;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.UI;

@CDIUI("reporteHistoricoLMS")
@Theme("valo")
public class HistoricoLMSReportUI extends UI {

	private static final long serialVersionUID = 1L;

	@Inject
	TerminalErrorListener errorHandler;

	@Inject
	HistoricoLMSReportComponent component;
	
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