
package com.arquimeda.raf.legajo.ui;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.arquimeda.daffy.container.qualifier.EntityContainer;
import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.raf.legajo.biz.entity.Empleado;
import com.arquimeda.raf.legajo.biz.entity.Puesto;
import com.arquimeda.raf.legajo.biz.entity.RequerimientoInformatico;
import com.arquimeda.raf.legajo.biz.entity.Sector;
import com.arquimeda.raf.legajo.biz.entity.Sede;
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

public class RequerimientoInformaticoReportFilterForm extends CustomComponent{
	
	private static final long serialVersionUID = 1L;
	private static final String TEXT_BOX_WIDTH = "220px";
	private static final String DATE_BOX_WIDTH = "220px";
	private static final String NULL_REPRESENTATION = "";
	
	@Inject @App
	Messages messages;
	
	@Inject @EntityContainer(entityClass=Empleado.class)
	BeanItemContainer<Empleado> empleadoContainer;
	
	@Inject @EntityContainer(entityClass=Puesto.class)
	BeanItemContainer<Puesto> puestoContainer;
	
	@Inject @EntityContainer(entityClass=Sector.class)
	BeanItemContainer<Sector> sectorContainer;
	
	@Inject @EntityContainer(entityClass=Sede.class)
	BeanItemContainer<Sede> sedeContainer;
	
	@PropertyId("fechaAltaDesde")
	private DateField fechaAltaDesdeDateField;
	
	@PropertyId("fechaAltaHasta")
	private DateField fechaAltaHastaDateField;
	
	@PropertyId("puesto")
	private ComboBox puestoComboBox;
	
	@PropertyId("sector")
	private ComboBox sectorComboBox;
	
	@PropertyId("reportaA")
	private ComboBox reportaAComboBox;
	
	@PropertyId("pendiente")
	private ComboBox pendienteComboBox;
	
	@PropertyId("sede")
	private ComboBox sedeComboBox;
	
	@PropertyId("nombre")
	private TextField nombreTextField;
	
	@PropertyId("apellido")
	private TextField apellidoTextField;
		
	@PostConstruct
	public void init(){
		
		fechaAltaDesdeDateField = new DateField();
		fechaAltaDesdeDateField.setResolution(Resolution.MONTH);
		fechaAltaDesdeDateField.setDateFormat("MM/yyyy");
		fechaAltaDesdeDateField.setWidth(DATE_BOX_WIDTH);
		fechaAltaDesdeDateField.setCaption(messages.getString("fechaAltaDesde"));
		fechaAltaDesdeDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		fechaAltaHastaDateField = new DateField();
		fechaAltaHastaDateField.setResolution(Resolution.MONTH);
		fechaAltaHastaDateField.setDateFormat("MM/yyyy");
		fechaAltaHastaDateField.setWidth(DATE_BOX_WIDTH);
		fechaAltaHastaDateField.setCaption(messages.getString("fechaAltaHasta"));
		fechaAltaHastaDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		puestoComboBox = new ComboBox(messages.getString(RequerimientoInformatico.class, "puesto"));
		puestoComboBox.setContainerDataSource(puestoContainer);
		puestoComboBox.setImmediate(true);
		puestoComboBox.setNullSelectionAllowed(true);
		puestoComboBox.setWidth(TEXT_BOX_WIDTH);
		puestoComboBox.setFilteringMode(FilteringMode.CONTAINS);
		
		sectorComboBox = new ComboBox(messages.getString(RequerimientoInformatico.class, "sector"));
		sectorComboBox.setContainerDataSource(sectorContainer);
		sectorComboBox.setImmediate(true);
		sectorComboBox.setNullSelectionAllowed(true);
		sectorComboBox.setWidth(TEXT_BOX_WIDTH);
		sectorComboBox.setFilteringMode(FilteringMode.CONTAINS);
		
		reportaAComboBox = new ComboBox(messages.getString(RequerimientoInformatico.class, "reportaA"));
		reportaAComboBox.setContainerDataSource(empleadoContainer);
		reportaAComboBox.setImmediate(true);
		reportaAComboBox.setNullSelectionAllowed(true);
		reportaAComboBox.setWidth(TEXT_BOX_WIDTH);
		reportaAComboBox.setFilteringMode(FilteringMode.CONTAINS);
		
		pendienteComboBox = new ComboBox(messages.getString(RequerimientoInformatico.class, "pendiente"));
		pendienteComboBox.setImmediate(true);
		pendienteComboBox.setNullSelectionAllowed(true);
		pendienteComboBox.setWidth(TEXT_BOX_WIDTH);
		pendienteComboBox.addItem(true);
		pendienteComboBox.addItem(false);
		pendienteComboBox.setItemCaption(true, "SI");
		pendienteComboBox.setItemCaption(false, "NO");
		
		sedeComboBox = new ComboBox(messages.getString(RequerimientoInformatico.class, "sede"));
		sedeComboBox.setContainerDataSource(sedeContainer);
		sedeComboBox.setImmediate(true);
		sedeComboBox.setNullSelectionAllowed(true);
		sedeComboBox.setWidth(TEXT_BOX_WIDTH);
		
		nombreTextField = new TextField(messages.getString(RequerimientoInformatico.class, "nombre"));
		nombreTextField.setImmediate(true);
		nombreTextField.setWidth(TEXT_BOX_WIDTH);
		nombreTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		apellidoTextField = new TextField(messages.getString(RequerimientoInformatico.class, "apellido"));
		apellidoTextField.setImmediate(true);
		apellidoTextField.setWidth(TEXT_BOX_WIDTH);
		apellidoTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		FormLayout form1 = new FormLayout();
		form1.addComponent(nombreTextField);
		form1.addComponent(apellidoTextField);
		form1.addComponent(puestoComboBox);
		
		FormLayout form2 = new FormLayout();
		form2.addComponent(fechaAltaDesdeDateField);
		form2.addComponent(fechaAltaHastaDateField);
		form2.addComponent(pendienteComboBox);
		
		FormLayout form3 = new FormLayout();
		form3.addComponent(reportaAComboBox);
		form3.addComponent(sectorComboBox);
		form3.addComponent(sedeComboBox);
		
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
		
		setHeight("125px");
		
	}
}
