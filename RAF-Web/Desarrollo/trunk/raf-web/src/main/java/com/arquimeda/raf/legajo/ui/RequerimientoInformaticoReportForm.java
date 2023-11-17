package com.arquimeda.raf.legajo.ui;

import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.raf.legajo.biz.entity.RequerimientoInformatico;
import com.vaadin.data.fieldgroup.PropertyId;
import com.vaadin.data.util.converter.Converter;
import com.vaadin.shared.ui.datefield.Resolution;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.DateField;
import com.vaadin.ui.FormLayout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.TextArea;
import com.vaadin.ui.TextField;

public class RequerimientoInformaticoReportForm extends CustomComponent{
	
	private static final long serialVersionUID = 1L;
	private static final String TEXT_BOX_WIDTH = "220px";
	private static final String NULL_REPRESENTATION = "";
	
	@Inject @App
	Messages messages;
	
	@PropertyId("nroSolicitud")
	private TextField nroSolicitudTextField;
	
	@PropertyId("pendiente")
	private TextField pendienteTextField;
	
	@PropertyId("fechaIngresoNecesaria")
	private DateField fechaIngresoNecDateField;
		
	@PropertyId("nombre")
	private TextField nombreTextField;
	
	@PropertyId("apellido")
	private TextField apellidoTextField;
	
	@PropertyId("gerencia")
	private TextField gerenciaTextField;
	
	@PropertyId("area")
	private TextField areaTextField;
	
	@PropertyId("sector")
	private TextField sectorTextField;
	
	@PropertyId("subSector")
	private TextField subSectorTextField;
	
	@PropertyId("centroCosto")
	private TextField centroCostoTextField;
	
	@PropertyId("reportaA")
	private TextField reportaATextField;
	
	@PropertyId("tipoPosicion")
	private TextField tipoPosicionTextField;
	
	@PropertyId("pea")
	private TextField peaTextField;
	
	@PropertyId("sede")
	private TextField sedeTextField;
	
	@PropertyId("ubicacionFisica")
	private TextField ubicacionFisicaTextField;
	
	@PropertyId("equipamientoRequerido")
	private TextArea equipamientoRequeridoTextArea;
	
	@PropertyId("usuarioQAD")
	private TextField usuarioQADTextField;
	
	@PropertyId("accesos")
	private TextArea accesosTextArea;
	
	@PropertyId("webmail")
	private TextField webmailTextField;
	
	@PropertyId("telefonia")
	private TextField telefoniaTextField;
			
	@SuppressWarnings("unchecked")
	@PostConstruct
	public void init(){
		
		nroSolicitudTextField = new TextField(messages.getString(RequerimientoInformatico.class, "nroSolicitud"));
		nroSolicitudTextField.setImmediate(true);
		nroSolicitudTextField.setWidth(TEXT_BOX_WIDTH);
		nroSolicitudTextField.setReadOnly(true);
		nroSolicitudTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		pendienteTextField = new TextField(messages.getString(RequerimientoInformatico.class, "pendiente"));
		pendienteTextField.setImmediate(true);
		pendienteTextField.setWidth(TEXT_BOX_WIDTH);
		pendienteTextField.setReadOnly(true);
		pendienteTextField.setNullRepresentation(NULL_REPRESENTATION);
		pendienteTextField.setConverter(new Converter() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object convertToModel(Object value, Class targetType, Locale locale) throws ConversionException {
				return Boolean.FALSE;
			}

			@Override
			public Object convertToPresentation(Object value, Class targetType, Locale locale) throws ConversionException {
				return value != null? (value.equals(Boolean.TRUE) ? "SI" : "NO") : "";
			}

			@Override
			public Class<Boolean> getModelType() {
				return Boolean.class;
			}

			@Override
			public Class<String> getPresentationType() {
				return String.class;
			}
		});
		
		fechaIngresoNecDateField = new DateField();
		fechaIngresoNecDateField.setResolution(Resolution.MONTH);
		fechaIngresoNecDateField.setDateFormat("MM/yyyy");
		fechaIngresoNecDateField.setWidth(TEXT_BOX_WIDTH);
		fechaIngresoNecDateField.setCaption(messages.getString(RequerimientoInformatico.class, "fechaIngresoNecesaria"));
		fechaIngresoNecDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		nombreTextField = new TextField(messages.getString(RequerimientoInformatico.class, "nombre"));
		nombreTextField.setImmediate(true);
		nombreTextField.setWidth(TEXT_BOX_WIDTH);
		nombreTextField.setReadOnly(true);
		nombreTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		apellidoTextField = new TextField(messages.getString(RequerimientoInformatico.class, "apellido"));
		apellidoTextField.setImmediate(true);
		apellidoTextField.setWidth(TEXT_BOX_WIDTH);
		apellidoTextField.setReadOnly(true);
		apellidoTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		gerenciaTextField = new TextField(messages.getString(RequerimientoInformatico.class, "gerencia"));
		gerenciaTextField.setImmediate(true);
		gerenciaTextField.setWidth(TEXT_BOX_WIDTH);
		gerenciaTextField.setReadOnly(true);
		gerenciaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		areaTextField = new TextField(messages.getString(RequerimientoInformatico.class, "area"));
		areaTextField.setImmediate(true);
		areaTextField.setWidth(TEXT_BOX_WIDTH);
		areaTextField.setReadOnly(true);
		areaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		sectorTextField = new TextField(messages.getString(RequerimientoInformatico.class, "sector"));
		sectorTextField.setImmediate(true);
		sectorTextField.setWidth(TEXT_BOX_WIDTH);
		sectorTextField.setReadOnly(true);
		sectorTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		subSectorTextField = new TextField(messages.getString(RequerimientoInformatico.class, "subSector"));
		subSectorTextField.setImmediate(true);
		subSectorTextField.setWidth(TEXT_BOX_WIDTH);
		subSectorTextField.setReadOnly(true);
		subSectorTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		centroCostoTextField = new TextField(messages.getString(RequerimientoInformatico.class, "centroCosto"));
		centroCostoTextField.setImmediate(true);
		centroCostoTextField.setWidth(TEXT_BOX_WIDTH);
		centroCostoTextField.setReadOnly(true);
		centroCostoTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		reportaATextField = new TextField(messages.getString(RequerimientoInformatico.class, "reportaA"));
		reportaATextField.setImmediate(true);
		reportaATextField.setWidth(TEXT_BOX_WIDTH);
		reportaATextField.setReadOnly(true);
		reportaATextField.setNullRepresentation(NULL_REPRESENTATION);
		
		tipoPosicionTextField = new TextField(messages.getString(RequerimientoInformatico.class, "tipoPosicion"));
		tipoPosicionTextField.setImmediate(true);
		tipoPosicionTextField.setWidth(TEXT_BOX_WIDTH);
		tipoPosicionTextField.setReadOnly(true);
		tipoPosicionTextField.setNullRepresentation(NULL_REPRESENTATION);
		tipoPosicionTextField.setConverter(new Converter() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object convertToModel(Object value, Class targetType, Locale locale) throws ConversionException {
				return "";
			}

			@Override
			public Object convertToPresentation(Object value, Class targetType, Locale locale) throws ConversionException {
				return value != null? (value.equals("puestoNuevo") ? "Puesto Nuevo" : "Reemplazo") : "";
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
		
		peaTextField = new TextField(messages.getString(RequerimientoInformatico.class, "pea"));
		peaTextField.setImmediate(true);
		peaTextField.setWidth(TEXT_BOX_WIDTH);
		peaTextField.setReadOnly(true);
		peaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		sedeTextField = new TextField(messages.getString(RequerimientoInformatico.class, "sede"));
		sedeTextField.setImmediate(true);
		sedeTextField.setWidth(TEXT_BOX_WIDTH);
		sectorTextField.setReadOnly(true);
		sectorTextField.setNullRepresentation(NULL_REPRESENTATION);		
		
		ubicacionFisicaTextField = new TextField(messages.getString(RequerimientoInformatico.class, "ubicacionFisica"));
		ubicacionFisicaTextField.setImmediate(true);
		ubicacionFisicaTextField.setWidth(TEXT_BOX_WIDTH);
		ubicacionFisicaTextField.setReadOnly(true);
		ubicacionFisicaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		equipamientoRequeridoTextArea = new TextArea(messages.getString(RequerimientoInformatico.class, "equipamientoRequerido"));
		equipamientoRequeridoTextArea.setImmediate(true);
		equipamientoRequeridoTextArea.setWidth(TEXT_BOX_WIDTH);
		equipamientoRequeridoTextArea.setReadOnly(true);
		equipamientoRequeridoTextArea.setNullRepresentation(NULL_REPRESENTATION);
		
		usuarioQADTextField = new TextField(messages.getString(RequerimientoInformatico.class, "usuarioQAD"));
		usuarioQADTextField.setImmediate(true);
		usuarioQADTextField.setWidth(TEXT_BOX_WIDTH);
		usuarioQADTextField.setReadOnly(true);
		usuarioQADTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		accesosTextArea = new TextArea(messages.getString(RequerimientoInformatico.class, "accesos"));
		accesosTextArea.setImmediate(true);
		accesosTextArea.setWidth(TEXT_BOX_WIDTH);
		accesosTextArea.setReadOnly(true);
		accesosTextArea.setNullRepresentation(NULL_REPRESENTATION);
		
		webmailTextField = new TextField(messages.getString(RequerimientoInformatico.class, "webmail"));
		webmailTextField.setImmediate(true);
		webmailTextField.setWidth(TEXT_BOX_WIDTH);
		webmailTextField.setReadOnly(true);
		webmailTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		telefoniaTextField = new TextField(messages.getString(RequerimientoInformatico.class, "telefonia"));
		telefoniaTextField.setImmediate(true);
		telefoniaTextField.setWidth(TEXT_BOX_WIDTH);	
		telefoniaTextField.setReadOnly(true);
		telefoniaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		FormLayout form1 = new FormLayout();
		form1.addComponent(nroSolicitudTextField);
		form1.addComponent(pendienteTextField);
		form1.addComponent(fechaIngresoNecDateField);
		form1.addComponent(nombreTextField);
		form1.addComponent(apellidoTextField);
		form1.addComponent(gerenciaTextField);
		form1.addComponent(areaTextField);
		form1.addComponent(sectorTextField);
		form1.addComponent(subSectorTextField);
		form1.addComponent(centroCostoTextField);
		form1.addComponent(reportaATextField);		
		
		FormLayout form2 = new FormLayout();
		form2.addComponent(tipoPosicionTextField);
		form2.addComponent(peaTextField);
		form2.addComponent(sedeTextField);
		form2.addComponent(ubicacionFisicaTextField);
		form2.addComponent(usuarioQADTextField);
		form2.addComponent(webmailTextField);
		form2.addComponent(telefoniaTextField);
		form2.addComponent(equipamientoRequeridoTextArea);
		form2.addComponent(accesosTextArea);
		
		HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.setSpacing(true);
		horizontalLayout.addComponent(form1);
		horizontalLayout.addComponent(form2);

		FormLayout compositionRoot = new FormLayout();
		compositionRoot.addComponent(horizontalLayout);
		setCompositionRoot(compositionRoot);		
		
		setWidth("915px");
		setHeight("620px");
		
	}
}
