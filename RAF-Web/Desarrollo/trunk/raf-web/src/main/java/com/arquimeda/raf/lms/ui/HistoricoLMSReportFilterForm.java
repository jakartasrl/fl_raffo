package com.arquimeda.raf.lms.ui;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.arquimeda.daffy.container.qualifier.EntityContainer;
import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.raf.lms.biz.entity.Examen;
import com.arquimeda.raf.lms.biz.entity.HistoricoLMS;
import com.vaadin.data.fieldgroup.PropertyId;
import com.vaadin.data.util.BeanItemContainer;
import com.vaadin.shared.ui.combobox.FilteringMode;
import com.vaadin.shared.ui.datefield.Resolution;
import com.vaadin.ui.ComboBox;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.DateField;
import com.vaadin.ui.FormLayout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.TextField;

public class HistoricoLMSReportFilterForm extends CustomComponent{
	
	private static final long serialVersionUID = 1L;
	private static final String TEXT_BOX_WIDTH = "220px";
	private static final String DATE_BOX_WIDTH = "150px";
	private static final String NULL_REPRESENTATION = "";
	
	@Inject @App
	Messages messages;
	
	@Inject @EntityContainer(entityClass=Examen.class)
	BeanItemContainer<Examen> examenContainer;
	
	@PropertyId("fechaDesde")
	private DateField fechaDesdeDateField;
	
	@PropertyId("fechaHasta")
	private DateField fechaHastaDateField;
	
	@PropertyId("login")
	private TextField loginTextField;
	
	@PropertyId("examen")
	private ComboBox examenComboBox;	
		
	@PostConstruct
	public void init(){
		
		fechaDesdeDateField = new DateField();
		fechaDesdeDateField.setResolution(Resolution.DAY);
		fechaDesdeDateField.setDateFormat("dd/MM/yyyy");
		fechaDesdeDateField.setWidth(DATE_BOX_WIDTH);
		fechaDesdeDateField.setCaption(messages.getString("fechaDesde"));
		fechaDesdeDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		fechaHastaDateField = new DateField();
		fechaHastaDateField.setResolution(Resolution.DAY);
		fechaHastaDateField.setDateFormat("dd/MM/yyyy");
		fechaHastaDateField.setWidth(DATE_BOX_WIDTH);
		fechaHastaDateField.setCaption(messages.getString("fechaHasta"));
		fechaHastaDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		loginTextField = new TextField(messages.getString(HistoricoLMS.class, "login"));
		loginTextField.setImmediate(true);
		loginTextField.setWidth(TEXT_BOX_WIDTH);
		loginTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		examenComboBox = new ComboBox(messages.getString(HistoricoLMS.class, "examen"));
		examenComboBox.setContainerDataSource(examenContainer);
		examenComboBox.setImmediate(true);
		examenComboBox.setNullSelectionAllowed(true);
		examenComboBox.setWidth(TEXT_BOX_WIDTH);
		examenComboBox.setFilteringMode(FilteringMode.CONTAINS);
					
		FormLayout form1 = new FormLayout();
		form1.addComponent(fechaDesdeDateField);
		form1.addComponent(fechaHastaDateField);
		
		FormLayout form2 = new FormLayout();
		form2.addComponent(loginTextField);
		form2.addComponent(examenComboBox);
		
		HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.addComponent(form1);
		horizontalLayout.addComponent(form2);
		horizontalLayout.setMargin(false);
		horizontalLayout.setSpacing(true);
		
		FormLayout compositionRoot = new FormLayout();
		compositionRoot.addComponent(horizontalLayout);
		compositionRoot.setMargin(false);
		compositionRoot.setSpacing(true);
		setCompositionRoot(compositionRoot);		
		
		setHeight("75px");
		
	}
}
