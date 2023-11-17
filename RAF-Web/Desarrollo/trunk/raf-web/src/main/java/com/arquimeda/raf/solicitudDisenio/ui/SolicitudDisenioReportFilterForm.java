package com.arquimeda.raf.solicitudDisenio.ui;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.arquimeda.daffy.container.qualifier.EntityContainer;
import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.raf.solicitudDisenio.biz.entity.IniciadoresSolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.GruposIiniciadoresSolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.SolicitudDisenio;
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

public class SolicitudDisenioReportFilterForm extends CustomComponent{
	
	private static final long serialVersionUID = 1L;
	private static final String TEXT_BOX_WIDTH = "220px";
	private static final String DATE_BOX_WIDTH = "220px";
	private static final String NULL_REPRESENTATION = "";
	
	@Inject @App
	Messages messages;
	
	@Inject @EntityContainer(entityClass=IniciadoresSolicitudDisenio.class)
	BeanItemContainer<IniciadoresSolicitudDisenio> colleagueContainer;
	
	@Inject @EntityContainer(entityClass=GruposIiniciadoresSolicitudDisenio.class)
	BeanItemContainer<GruposIiniciadoresSolicitudDisenio> colleagueGroupContainer;
	
	@PropertyId("creationDateDesde")
	private DateField creationDateDesdeDateField;
	
	@PropertyId("creationDateHasta")
	private DateField creationDateHastaDateField;

	@PropertyId("lastModificationDateDesde")
	private DateField lastModificationDateDesdeDateField;
	
	@PropertyId("lastModificationDateHasta")
	private DateField lastModificationDateHastaDateField;
	
	@PropertyId("currentState")
	private ComboBox currentStateComboBox;
	
	@PropertyId("requestant")
	private ComboBox requestantComboBox;
	
	@PropertyId("userGroup")
	private ComboBox userGroupComboBox;
	
	@PropertyId("nroSolicitudDesde")
	private TextField nroSolicitudDesdeTextField;

	@PropertyId("nroSolicitudHasta")
	private TextField nroSolicitudHastaTextField;
	
	@PropertyId("title")
	private TextField titleTextField;
	
	@PropertyId("changeReason")
	private TextField changeReasonTextField;
	
	@PropertyId("prActivos")
	private TextField prActivosTextField;

	@PostConstruct
	public void init(){
		
		creationDateDesdeDateField = new DateField();
		creationDateDesdeDateField.setResolution(Resolution.DAY);
		creationDateDesdeDateField.setDateFormat("dd/MM/yyyy");
		creationDateDesdeDateField.setWidth(DATE_BOX_WIDTH);
		creationDateDesdeDateField.setCaption(messages.getString("creationDateDesde"));
		creationDateDesdeDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		creationDateHastaDateField = new DateField();
		creationDateHastaDateField.setResolution(Resolution.DAY);
		creationDateHastaDateField.setDateFormat("dd/MM/yyyy");
		creationDateHastaDateField.setWidth(DATE_BOX_WIDTH);
		creationDateHastaDateField.setCaption(messages.getString("creationDateHasta"));
		creationDateHastaDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));

		lastModificationDateDesdeDateField = new DateField();
		lastModificationDateDesdeDateField.setResolution(Resolution.DAY);
		lastModificationDateDesdeDateField.setDateFormat("dd/MM/yyyy");
		lastModificationDateDesdeDateField.setWidth(DATE_BOX_WIDTH);
		lastModificationDateDesdeDateField.setCaption(messages.getString("lastModificationDateDesde"));
		lastModificationDateDesdeDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));

		lastModificationDateHastaDateField = new DateField();
		lastModificationDateHastaDateField.setResolution(Resolution.DAY);
		lastModificationDateHastaDateField.setDateFormat("dd/MM/yyyy");
		lastModificationDateHastaDateField.setWidth(DATE_BOX_WIDTH);
		lastModificationDateHastaDateField.setCaption(messages.getString("lastModificationDateHasta"));
		lastModificationDateHastaDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));

		requestantComboBox = new ComboBox(messages.getString("requestant"));
		requestantComboBox.setContainerDataSource(colleagueContainer);
		requestantComboBox.setImmediate(true);
		requestantComboBox.setNullSelectionAllowed(true);
		requestantComboBox.setWidth(TEXT_BOX_WIDTH);
		requestantComboBox.setFilteringMode(FilteringMode.CONTAINS);

		userGroupComboBox = new ComboBox(messages.getString(SolicitudDisenio.class, "userGroup"));
		userGroupComboBox.setContainerDataSource(colleagueGroupContainer);
		userGroupComboBox.setImmediate(true);
		userGroupComboBox.setNullSelectionAllowed(true);
		userGroupComboBox.setWidth(TEXT_BOX_WIDTH);
		userGroupComboBox.setFilteringMode(FilteringMode.CONTAINS);

		currentStateComboBox = new ComboBox(messages.getString(SolicitudDisenio.class, "currentState"));
		currentStateComboBox.setImmediate(true);
		currentStateComboBox.setNullSelectionAllowed(true);
		currentStateComboBox.setWidth(TEXT_BOX_WIDTH);
		currentStateComboBox.setFilteringMode(FilteringMode.CONTAINS);
		for (SolicitudDisenio.State state: SolicitudDisenio.State.values()) {
			currentStateComboBox.addItem(state);
			currentStateComboBox.setItemCaption(state, messages.getString(SolicitudDisenio.State.class, state.name()));
		}

		nroSolicitudDesdeTextField = new TextField(messages.getString("nroSolicitudDesde"));
		nroSolicitudDesdeTextField.setImmediate(true);
		nroSolicitudDesdeTextField.setWidth(TEXT_BOX_WIDTH);
		nroSolicitudDesdeTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		nroSolicitudHastaTextField = new TextField(messages.getString("nroSolicitudHasta"));
		nroSolicitudHastaTextField.setImmediate(true);
		nroSolicitudHastaTextField.setWidth(TEXT_BOX_WIDTH);
		nroSolicitudHastaTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		titleTextField = new TextField(messages.getString(SolicitudDisenio.class, "title"));
		titleTextField.setImmediate(true);
		titleTextField.setWidth(TEXT_BOX_WIDTH);
		titleTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		changeReasonTextField = new TextField(messages.getString(SolicitudDisenio.class, "changeReason"));
		changeReasonTextField.setImmediate(true);
		changeReasonTextField.setWidth(TEXT_BOX_WIDTH);
		changeReasonTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		prActivosTextField = new TextField(messages.getString(SolicitudDisenio.class, "prActivos"));
		prActivosTextField.setImmediate(true);
		prActivosTextField.setWidth(TEXT_BOX_WIDTH);
		prActivosTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		FormLayout form1 = new FormLayout();
		form1.addComponent(titleTextField);
		form1.addComponent(changeReasonTextField);
		form1.addComponent(prActivosTextField);
		form1.addComponent(currentStateComboBox);
		
		FormLayout form2 = new FormLayout();
		form2.addComponent(nroSolicitudDesdeTextField);
		form2.addComponent(creationDateDesdeDateField);
		form2.addComponent(lastModificationDateDesdeDateField);
		form2.addComponent(requestantComboBox);
		
		FormLayout form3 = new FormLayout();
		form3.addComponent(nroSolicitudHastaTextField);
		form3.addComponent(creationDateHastaDateField);
		form3.addComponent(lastModificationDateHastaDateField);
		form3.addComponent(userGroupComboBox);
		
		HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.addComponent(form1);
		horizontalLayout.addComponent(form2);
		horizontalLayout.addComponent(form3);
		horizontalLayout.setMargin(false);
		horizontalLayout.setSpacing(true);
		
		FormLayout compositionRoot = new FormLayout();
		compositionRoot.addComponent(horizontalLayout);
		compositionRoot.setMargin(false);
		setCompositionRoot(compositionRoot);		
		
		setHeight("230px");
		
	}
}
