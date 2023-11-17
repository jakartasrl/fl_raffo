package com.arquimeda.raf.lms.ui;

import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.daffy.vaadin.component.BigDecimalField;
import com.arquimeda.raf.lms.biz.entity.HistoricoLMS;
import com.vaadin.data.fieldgroup.PropertyId;
import com.vaadin.data.util.converter.Converter;
import com.vaadin.shared.ui.datefield.Resolution;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.DateField;
import com.vaadin.ui.FormLayout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.TextField;

public class HistoricoLMSReportForm extends CustomComponent{
	
	private static final long serialVersionUID = 1L;
	private static final String TEXT_BOX_WIDTH = "220px";
	private static final String NULL_REPRESENTATION = "";
	
	@Inject @App
	Messages messages;
	
	@PropertyId("matricula")
	private TextField matriculaTextField;
	
	@PropertyId("login")
	private TextField loginTextField;
	
	@PropertyId("nombre")
	private TextField nombreTextField;
	
	@PropertyId("apellido")
	private TextField apellidoTextField;
		
	@PropertyId("mail")
	private TextField mailTextField;
	
	@PropertyId("examen")
	private TextField examenTextField;
	
	@PropertyId("resultado")
	private TextField resultadoTextField;
	
	@PropertyId("puntaje")
	private BigDecimalField puntajeBigDecimalField;
	
	@PropertyId("fecha")
	private DateField fechaDateField;
	
	@SuppressWarnings("unchecked")
	@PostConstruct
	public void init(){
		
		matriculaTextField = new TextField(messages.getString(HistoricoLMS.class, "matricula"));
		matriculaTextField.setImmediate(true);
		matriculaTextField.setWidth(TEXT_BOX_WIDTH);
		matriculaTextField.setReadOnly(true);
		matriculaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		loginTextField = new TextField(messages.getString(HistoricoLMS.class, "login"));
		loginTextField.setImmediate(true);
		loginTextField.setWidth(TEXT_BOX_WIDTH);
		loginTextField.setReadOnly(true);
		loginTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		nombreTextField = new TextField(messages.getString(HistoricoLMS.class, "nombre"));
		nombreTextField.setImmediate(true);
		nombreTextField.setWidth(TEXT_BOX_WIDTH);
		nombreTextField.setReadOnly(true);
		nombreTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		apellidoTextField = new TextField(messages.getString(HistoricoLMS.class, "apellido"));
		apellidoTextField.setImmediate(true);
		apellidoTextField.setWidth(TEXT_BOX_WIDTH);
		apellidoTextField.setReadOnly(true);
		apellidoTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		mailTextField = new TextField(messages.getString(HistoricoLMS.class, "mail"));
		mailTextField.setImmediate(true);
		mailTextField.setWidth(TEXT_BOX_WIDTH);
		mailTextField.setReadOnly(true);
		mailTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		examenTextField = new TextField(messages.getString(HistoricoLMS.class, "examen"));
		examenTextField.setImmediate(true);
		examenTextField.setWidth(TEXT_BOX_WIDTH);
		examenTextField.setReadOnly(true);
		examenTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		resultadoTextField = new TextField(messages.getString(HistoricoLMS.class, "resultado"));
		resultadoTextField.setImmediate(true);
		resultadoTextField.setWidth(TEXT_BOX_WIDTH);
		resultadoTextField.setReadOnly(true);
		resultadoTextField.setNullRepresentation(NULL_REPRESENTATION);
		resultadoTextField.setConverter(new Converter() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object convertToModel(Object value, Class targetType, Locale locale) throws ConversionException {
				return "";
			}

			@Override
			public Object convertToPresentation(Object value, Class targetType, Locale locale) throws ConversionException {
								
				if(value != null){
					
					if(value.equals("SUCCESSFUL_POS_TEST"))
						return "APROBADO";
					if(value.equals("UNSUCCESSFUL_POS_TEST"))
						return "DESAPROBADO";
					else 
						return "";
					
				}
				return "";
				
			}

			@Override
			public Class<String> getModelType() {
				return String.class;
			}

			@Override
			public Class<String> getPresentationType() {
				return String.class;
			}
		});
		
		puntajeBigDecimalField = new BigDecimalField(messages.getString(HistoricoLMS.class, "puntaje"),messages.getString("puntaje.invalido"));
		puntajeBigDecimalField.setImmediate(true);
		puntajeBigDecimalField.setNullRepresentation(NULL_REPRESENTATION);
		puntajeBigDecimalField.setWidth(TEXT_BOX_WIDTH);
		
		fechaDateField = new DateField();
		fechaDateField.setResolution(Resolution.SECOND);
		fechaDateField.setDateFormat("dd/MM/yyyy HH:mm:ss");
		fechaDateField.setWidth(TEXT_BOX_WIDTH);
		fechaDateField.setCaption(messages.getString(HistoricoLMS.class, "fecha"));
		
		FormLayout form1 = new FormLayout();
		form1.addComponent(matriculaTextField);
		form1.addComponent(nombreTextField);	
		form1.addComponent(apellidoTextField);
		
		FormLayout form2 = new FormLayout();
		form2.addComponent(loginTextField);
		form2.addComponent(mailTextField);
		form2.addComponent(examenTextField);
		
		FormLayout form3 = new FormLayout();
		form3.addComponent(resultadoTextField);
		form3.addComponent(puntajeBigDecimalField);
		form3.addComponent(fechaDateField);
		
		HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.setSpacing(true);
		horizontalLayout.addComponent(form1);
		horizontalLayout.addComponent(form2);
		horizontalLayout.addComponent(form3);

		FormLayout compositionRoot = new FormLayout();
		compositionRoot.addComponent(horizontalLayout);
		setCompositionRoot(compositionRoot);		
		
		setWidth("960px");
		setHeight("220px");
		
	}
}
