package com.arquimeda.raf.solicitudDisenio.ui;

import java.util.List;	

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.slf4j.Logger;


import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.daffy.vaadin.component.DaffyFieldGroup.ItemDataSourceChangeListener;
import com.arquimeda.raf.solicitudDisenio.biz.boundary.SolicitudDisenioEJB;
import com.arquimeda.raf.solicitudDisenio.biz.entity.ProductosSolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.SolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.TiposNuevosProductosSolicitudDisenio;
import com.vaadin.data.Item;
import com.vaadin.data.fieldgroup.PropertyId;
import com.vaadin.data.util.BeanItem;
import com.vaadin.data.util.BeanItemContainer;
import com.vaadin.shared.ui.MarginInfo;
import com.vaadin.shared.ui.datefield.Resolution;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.DateField;
import com.vaadin.ui.FormLayout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.Table;
import com.vaadin.ui.TextArea;
import com.vaadin.ui.TextField;
import com.vaadin.ui.VerticalLayout;

public class SolicitudDisenioReportForm extends CustomComponent implements ItemDataSourceChangeListener{
	
	private static final long serialVersionUID = 1L;
	private static final String TEXT_BOX_WIDTH = "220px";
	private static final String NULL_REPRESENTATION = "";
	
	@Inject @App
	Messages messages;
	
	@Inject 
	SolicitudDisenioEJB solicitudEjb;
	
	@Inject
	Logger logger;
	
	@PropertyId("nroSolicitud")
	private TextField nroSolicitudTextField;
	
	@PropertyId("title")
	private TextField titleTextField;
	
	@PropertyId("changeReason")
	private TextArea changeReasonTextArea;
	
	@PropertyId("currentState")
	private TextField currentStateTextField;
	
	@PropertyId("creationDate")
	private DateField creationDateDateField;
	
	@PropertyId("requestantName")
	private TextField requestantTextField;
	
	@PropertyId("userGroup")
	private TextField userGroupTextField;
	
	@PropertyId("userGroupCode")
	private TextField userGroupCodeTextField;
		
	@PropertyId("breakDate")
	private TextField breakDateTextField;
	
	@PropertyId("implementationType")
	private TextField implementationTypeTextField;
	
	@PropertyId("comments")
	private TextArea commentsTextArea;

	@PropertyId("changeDetail")
	private TextArea changeDetailTextArea;
	
	@PropertyId("prActivos")
	private TextArea prActivosTextArea;
	
	@PropertyId("lastModificationDate")
	private DateField lastModificationDateDateField;
		
	@PropertyId("marcaNewProd")
	private TextField marcaNewProdTextField;
	
	@PropertyId("formaFarmaceuticaNewProd")
	private TextField formaFarmaceuticaNewProdTextField;
	
	@PropertyId("unidadesMedidasNewProd")
	private TextField unidadesMedidasNewProdTextField;
	
	@PropertyId("concentracionesNewProd")
	private TextField concentracionesNewProdTextField;

	@PropertyId("grupoNewProd")
	private TextField grupoNewProdTextField;
	
	@PropertyId("presentacionNewProd")
	private TextField presentacionNewProdTextField;
	
	@PropertyId("paisNewProd")
	private TextField paisNewProdTextField;

	@PropertyId("titularidadNewProd")
	private TextField titularidadNewProdTextField;
	
	@PropertyId("elaboradorNewProd")
	private TextField elaboradorNewProdTextField;
	
	@PropertyId("acondicionadorNewProd")
	private TextField acondicionadorNewProdTextField;
	
	@PropertyId("fichaTecnicaNewProd")
	private TextField fichaTecnicaNewProdTextField;
	
	@PropertyId("prActivo1NewProd")
	private TextField prActivo1NewProdTextField;
	
	@PropertyId("prActivo2NewProd")
	private TextField prActivo2NewProdTextField;
	
	@PropertyId("prActivo3NewProd")
	private TextField prActivo3NewProdTextField;
	
	@PropertyId("prActivo4NewProd")
	private TextField prActivo4NewProdTextField;
	
	@PropertyId("unidadMedida1NewProd")
	private TextField unidadMedida1NewProdTextField;
	
	@PropertyId("unidadMedida2NewProd")
	private TextField unidadMedida2NewProdTextField;
	
	@PropertyId("unidadMedida3NewProd")
	private TextField unidadMedida3NewProdTextField;
	
	@PropertyId("unidadMedida4NewProd")
	private TextField unidadMedida4NewProdTextField;
	
	@PropertyId("concentracion1NewProd")
	private TextField concentracion1NewProdTextField;
	
	@PropertyId("concentracion2NewProd")
	private TextField concentracion2NewProdTextField;
	
	@PropertyId("concentracion3NewProd")
	private TextField concentracion3NewProdTextField;
	
	@PropertyId("concentracion4NewProd")
	private TextField concentracion4NewProdTextField;
	
	private HorizontalLayout headerLanzamientoLayout;
	
	private HorizontalLayout bodyLanzamientoLayout;
	
	private HorizontalLayout footerLanzamientoLayout;
	
	private HorizontalLayout fichaLanzamientoLayout;
	
	private Table tableProductos;
	
	private Table tableTiposDeProductos;
	
	@SuppressWarnings("unchecked")
	@PostConstruct
	public void init(){
		
		nroSolicitudTextField = new TextField(messages.getString(SolicitudDisenio.class, "nroSolicitud"));
		nroSolicitudTextField.setImmediate(true);
		nroSolicitudTextField.setWidth(TEXT_BOX_WIDTH);
		nroSolicitudTextField.setReadOnly(true);
		nroSolicitudTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		titleTextField = new TextField(messages.getString(SolicitudDisenio.class, "title"));
		titleTextField.setImmediate(true);
		titleTextField.setWidth(TEXT_BOX_WIDTH);
		titleTextField.setReadOnly(true);
		titleTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		changeReasonTextArea = new TextArea(messages.getString(SolicitudDisenio.class, "changeReason"));
		changeReasonTextArea.setImmediate(true);
		changeReasonTextArea.setWidth(TEXT_BOX_WIDTH);
		changeReasonTextArea.setReadOnly(true);
		changeReasonTextArea.setNullRepresentation(NULL_REPRESENTATION);
		
		currentStateTextField = new TextField(messages.getString(SolicitudDisenio.class, "currentState"));
		currentStateTextField.setImmediate(true);
		currentStateTextField.setWidth(TEXT_BOX_WIDTH);
		currentStateTextField.setReadOnly(true);
		currentStateTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		creationDateDateField = new DateField();
		creationDateDateField.setResolution(Resolution.DAY);
		creationDateDateField.setDateFormat("dd/MM/yyyy");
		creationDateDateField.setWidth(TEXT_BOX_WIDTH);
		creationDateDateField.setCaption(messages.getString(SolicitudDisenio.class, "creationDate"));
		creationDateDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
		
		requestantTextField = new TextField(messages.getString(SolicitudDisenio.class, "requestantName"));
		requestantTextField.setImmediate(true);
		requestantTextField.setWidth(TEXT_BOX_WIDTH);
		requestantTextField.setReadOnly(true);
		requestantTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		userGroupTextField = new TextField(messages.getString(SolicitudDisenio.class, "userGroup"));
		userGroupTextField.setImmediate(true);
		userGroupTextField.setWidth(TEXT_BOX_WIDTH);
		userGroupTextField.setReadOnly(true);
		userGroupTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		userGroupCodeTextField = new TextField(messages.getString(SolicitudDisenio.class, "userGroupCode"));
		userGroupCodeTextField.setImmediate(true);
		userGroupCodeTextField.setWidth(TEXT_BOX_WIDTH);
		userGroupCodeTextField.setReadOnly(true);
		userGroupCodeTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		/* este campo lo ponemos invisible porque el cliente dice que "confunde" sin embargo puede utilizarse para ser parseado y mostrado de forma diferente
			ya que muestra la concatenacion de los pr activos en el caso de solicitud de diseño y en caso de lanzamiento muestra alguno de la tabla
		*/
		prActivosTextArea = new TextArea(messages.getString(SolicitudDisenio.class, "prActivos"));
		prActivosTextArea.setImmediate(true);
		prActivosTextArea.setWidth(TEXT_BOX_WIDTH);
		prActivosTextArea.setReadOnly(true);
		prActivosTextArea.setNullRepresentation(NULL_REPRESENTATION);
		prActivosTextArea.setVisible(false);

		lastModificationDateDateField = new DateField();
		lastModificationDateDateField.setResolution(Resolution.DAY);
		lastModificationDateDateField.setDateFormat("dd/MM/yyyy");
		lastModificationDateDateField.setWidth(TEXT_BOX_WIDTH);
		lastModificationDateDateField.setCaption(messages.getString(SolicitudDisenio.class, "lastModificationDate"));
		lastModificationDateDateField.setParseErrorMessage(messages.getString("parsingErrorMessage"));
	
		marcaNewProdTextField = new TextField("Marca");
		marcaNewProdTextField.setImmediate(true);
		marcaNewProdTextField.setWidth("50%");
		marcaNewProdTextField.setReadOnly(true);
		marcaNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		formaFarmaceuticaNewProdTextField = new TextField("Forma Farmaceutica");
		formaFarmaceuticaNewProdTextField.setImmediate(true);
		formaFarmaceuticaNewProdTextField.setWidth("50%");
		formaFarmaceuticaNewProdTextField.setReadOnly(true);
		formaFarmaceuticaNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		
		grupoNewProdTextField = new TextField("Grupo");
		grupoNewProdTextField.setImmediate(true);
		grupoNewProdTextField.setWidth("50%");
		grupoNewProdTextField.setReadOnly(true);
		grupoNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		grupoNewProdTextField.setVisible(false);
		
		presentacionNewProdTextField = new TextField("Presentacion");
		presentacionNewProdTextField.setImmediate(true);
		presentacionNewProdTextField.setWidth("50%");
		presentacionNewProdTextField.setReadOnly(true);
		presentacionNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		presentacionNewProdTextField.setVisible(false);
		
		paisNewProdTextField = new TextField("Pais");
		paisNewProdTextField.setImmediate(true);
		paisNewProdTextField.setWidth("50%");
		paisNewProdTextField.setReadOnly(true);
		paisNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		paisNewProdTextField.setVisible(false);
		
		titularidadNewProdTextField = new TextField("Titularidad");
		titularidadNewProdTextField.setImmediate(true);
		titularidadNewProdTextField.setWidth("50%");
		titularidadNewProdTextField.setReadOnly(true);
		titularidadNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		titularidadNewProdTextField.setVisible(false);
		
		elaboradorNewProdTextField = new TextField("Elaborador");
		elaboradorNewProdTextField.setImmediate(true);
		elaboradorNewProdTextField.setWidth("50%");
		elaboradorNewProdTextField.setReadOnly(true);
		elaboradorNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		elaboradorNewProdTextField.setVisible(false);
		
		acondicionadorNewProdTextField = new TextField("Acondicionador");
		acondicionadorNewProdTextField.setImmediate(true);
		acondicionadorNewProdTextField.setWidth("50%");
		acondicionadorNewProdTextField.setReadOnly(true);
		acondicionadorNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		acondicionadorNewProdTextField.setVisible(false);
		
		fichaTecnicaNewProdTextField = new TextField("Ficha Técnica");
		fichaTecnicaNewProdTextField.setImmediate(true);
		fichaTecnicaNewProdTextField.setWidth("90%");
		fichaTecnicaNewProdTextField.setReadOnly(true);
		fichaTecnicaNewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		fichaTecnicaNewProdTextField.setVisible(false);
		
		breakDateTextField = new TextField("Fecha de Corte");
		breakDateTextField.setImmediate(true);
		breakDateTextField.setWidth(TEXT_BOX_WIDTH);
		breakDateTextField.setReadOnly(true);
		breakDateTextField.setNullRepresentation(NULL_REPRESENTATION);
		breakDateTextField.setVisible(true);
		
		prActivo1NewProdTextField = new TextField("PR Activo 1");
		prActivo1NewProdTextField.setImmediate(true);
		prActivo1NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		prActivo1NewProdTextField.setReadOnly(true);
		prActivo1NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		prActivo1NewProdTextField.setVisible(true);

		prActivo2NewProdTextField = new TextField("PR Activo 2");
		prActivo2NewProdTextField.setImmediate(true);
		prActivo2NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		prActivo2NewProdTextField.setReadOnly(true);
		prActivo2NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		prActivo2NewProdTextField.setVisible(true);
		
		prActivo3NewProdTextField = new TextField("PR Activo 3");
		prActivo3NewProdTextField.setImmediate(true);
		prActivo3NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		prActivo3NewProdTextField.setReadOnly(true);
		prActivo3NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		prActivo3NewProdTextField.setVisible(true);
		
		prActivo4NewProdTextField = new TextField("PR Activo 4");
		prActivo4NewProdTextField.setImmediate(true);
		prActivo4NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		prActivo4NewProdTextField.setReadOnly(true);
		prActivo4NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		prActivo4NewProdTextField.setVisible(true);
		
		unidadMedida1NewProdTextField = new TextField("Unidad Medida 1");
		unidadMedida1NewProdTextField.setImmediate(true);
		unidadMedida1NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		unidadMedida1NewProdTextField.setReadOnly(true);
		unidadMedida1NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		unidadMedida1NewProdTextField.setVisible(true);

		unidadMedida2NewProdTextField = new TextField("Unidad Medida 2");
		unidadMedida2NewProdTextField.setImmediate(true);
		unidadMedida2NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		unidadMedida2NewProdTextField.setReadOnly(true);
		unidadMedida2NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		unidadMedida2NewProdTextField.setVisible(true);
		
		unidadMedida3NewProdTextField = new TextField("Unidad Medida 3");
		unidadMedida3NewProdTextField.setImmediate(true);
		unidadMedida3NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		unidadMedida3NewProdTextField.setReadOnly(true);
		unidadMedida3NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		unidadMedida3NewProdTextField.setVisible(true);
		
		unidadMedida4NewProdTextField = new TextField("Unidad Medida 4");
		unidadMedida4NewProdTextField.setImmediate(true);
		unidadMedida4NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		unidadMedida4NewProdTextField.setReadOnly(true);
		unidadMedida4NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		unidadMedida4NewProdTextField.setVisible(true);
		
		concentracion1NewProdTextField = new TextField("Concentración 1");
		concentracion1NewProdTextField.setImmediate(true);
		concentracion1NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		concentracion1NewProdTextField.setReadOnly(true);
		concentracion1NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		concentracion1NewProdTextField.setVisible(true);

		concentracion2NewProdTextField = new TextField("Concentración 2");
		concentracion2NewProdTextField.setImmediate(true);
		concentracion2NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		concentracion2NewProdTextField.setReadOnly(true);
		concentracion2NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		concentracion2NewProdTextField.setVisible(true);
		
		concentracion3NewProdTextField = new TextField("Concentración 3");
		concentracion3NewProdTextField.setImmediate(true);
		concentracion3NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		concentracion3NewProdTextField.setReadOnly(true);
		concentracion3NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		concentracion3NewProdTextField.setVisible(true);
		
		concentracion4NewProdTextField = new TextField("Concentración 4");
		concentracion4NewProdTextField.setImmediate(true);
		concentracion4NewProdTextField.setWidth(TEXT_BOX_WIDTH);
		concentracion4NewProdTextField.setReadOnly(true);
		concentracion4NewProdTextField.setNullRepresentation(NULL_REPRESENTATION);
		concentracion4NewProdTextField.setVisible(true);
		
		implementationTypeTextField = new TextField("Tipo de Implementación");
		implementationTypeTextField.setImmediate(true);
		implementationTypeTextField.setWidth(TEXT_BOX_WIDTH);
		implementationTypeTextField.setReadOnly(true);
		implementationTypeTextField.setNullRepresentation(NULL_REPRESENTATION);
		implementationTypeTextField.setVisible(true);
		
		commentsTextArea = new TextArea("Observaciones");
		commentsTextArea.setImmediate(true);
		commentsTextArea.setSizeFull();
		commentsTextArea.setReadOnly(true);
		commentsTextArea.setNullRepresentation(NULL_REPRESENTATION);
		commentsTextArea.setVisible(true);
		commentsTextArea.setRows(10);
		
		changeDetailTextArea = new TextArea("Detalle del cambio");
		changeDetailTextArea.setImmediate(true);
		changeDetailTextArea.setSizeFull();
		changeDetailTextArea.setReadOnly(true);
		changeDetailTextArea.setNullRepresentation(NULL_REPRESENTATION);
		changeDetailTextArea.setVisible(true);
		changeDetailTextArea.setRows(10);
				
		FormLayout form1 = new FormLayout();
		form1.addComponent(nroSolicitudTextField);
		form1.addComponent(titleTextField);
		form1.addComponent(breakDateTextField); 
		form1.addComponent(currentStateTextField);
		form1.addComponent(userGroupTextField);
		form1.addComponent(changeReasonTextArea);
		
		FormLayout form2 = new FormLayout();
		form2.addComponent(creationDateDateField);
		form2.addComponent(lastModificationDateDateField);
		form2.addComponent(requestantTextField);
		form2.addComponent(implementationTypeTextField);
		form2.addComponent(userGroupCodeTextField);
		form2.addComponent(prActivosTextArea);
		
		
		FormLayout form4 = new FormLayout();
		form4.addComponent(changeDetailTextArea);
		
		FormLayout form5 = new FormLayout();
		form5.addComponent(commentsTextArea);
		
		
		tableProductos = new Table();
		tableProductos.setCaption("Tabla productos:");;
		tableProductos.setSizeFull();
		tableProductos.setVisible(false);
 
		tableTiposDeProductos = new Table();
		tableTiposDeProductos.setCaption("Tabla tipos productos");
		tableTiposDeProductos.setSizeFull();
		tableTiposDeProductos.setVisible(false);
		
		FormLayout form6 = new FormLayout();
		form6.addComponent(tableProductos);  
		
		FormLayout form7 = new FormLayout();
		form7.addComponent(tableTiposDeProductos);
		
		//new prods arriba de concentraciones
		
		FormLayout formMarca = new FormLayout();
		formMarca.addComponent(marcaNewProdTextField);
		
		FormLayout formFormaFarmaceutica = new FormLayout();
		formFormaFarmaceutica.addComponent(formaFarmaceuticaNewProdTextField); 
		
		// new prods pr activos
		FormLayout formPRActivos = new FormLayout();
		formPRActivos.addComponent(prActivo1NewProdTextField);
		formPRActivos.addComponent(prActivo2NewProdTextField);
		formPRActivos.addComponent(prActivo3NewProdTextField);
		formPRActivos.addComponent(prActivo4NewProdTextField);
		
		FormLayout formConcentraciones = new FormLayout();
		formConcentraciones.addComponent(concentracion1NewProdTextField);
		formConcentraciones.addComponent(concentracion2NewProdTextField);
		formConcentraciones.addComponent(concentracion3NewProdTextField);
		formConcentraciones.addComponent(concentracion4NewProdTextField);
		
		FormLayout formUnidadesMedida = new FormLayout();
		formUnidadesMedida.addComponent(unidadMedida1NewProdTextField);
		formUnidadesMedida.addComponent(unidadMedida2NewProdTextField);
		formUnidadesMedida.addComponent(unidadMedida3NewProdTextField);
		formUnidadesMedida.addComponent(unidadMedida4NewProdTextField);
		
		//new prods (abajo de concentraciones) izquierda
		FormLayout formProdsLeft = new FormLayout();
		formProdsLeft.addComponent(grupoNewProdTextField); 
		formProdsLeft.addComponent(paisNewProdTextField);  
		formProdsLeft.addComponent(elaboradorNewProdTextField);
		
		// new prods (abajo de concentraciones) derecha
		FormLayout formProdsRight = new FormLayout();
		formProdsRight.addComponent(presentacionNewProdTextField); 
		formProdsRight.addComponent(titularidadNewProdTextField); 
		formProdsRight.addComponent(acondicionadorNewProdTextField); 
		
		
		// antes de tabla
		FormLayout formFichaTecnica = new FormLayout();
		formFichaTecnica.addComponent(fichaTecnicaNewProdTextField);
		
		HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.setMargin(new MarginInfo(false, true, false, true));
		horizontalLayout.addComponent(form1);
		horizontalLayout.addComponent(form2);
		horizontalLayout.setSizeFull();
		
		headerLanzamientoLayout = new HorizontalLayout();
		headerLanzamientoLayout.setMargin(new MarginInfo(false, true, false, true));
		headerLanzamientoLayout.addComponent(formMarca);
		headerLanzamientoLayout.addComponent(formFormaFarmaceutica);
		headerLanzamientoLayout.setSizeFull();
		
		bodyLanzamientoLayout = new HorizontalLayout();
		bodyLanzamientoLayout.setMargin(new MarginInfo(false, true, false, true));
		bodyLanzamientoLayout.addComponent(formPRActivos);
		bodyLanzamientoLayout.addComponent(formConcentraciones);
		bodyLanzamientoLayout.addComponent(formUnidadesMedida);
		bodyLanzamientoLayout.setSizeFull();
		
		footerLanzamientoLayout = new HorizontalLayout();
		footerLanzamientoLayout.setMargin(new MarginInfo(false, true, false, true));
		footerLanzamientoLayout.addComponent(formProdsLeft);
		footerLanzamientoLayout.addComponent(formProdsRight);
		footerLanzamientoLayout.setSizeFull();
		
		fichaLanzamientoLayout = new HorizontalLayout();
		fichaLanzamientoLayout.setMargin(new MarginInfo(false, true, false, true));
		fichaLanzamientoLayout.addComponent(formFichaTecnica);
		fichaLanzamientoLayout.setSizeFull();
		
		HorizontalLayout horizontalLayout2 = new HorizontalLayout();
		horizontalLayout2.setMargin(new MarginInfo(false, true, false, true));
		horizontalLayout2.addComponent(form4);
		horizontalLayout2.setWidth("96%");
		
		HorizontalLayout horizontalLayout3 = new HorizontalLayout();
		horizontalLayout3.setMargin(new MarginInfo(false, true, false, true));
		horizontalLayout3.addComponent(form5);
		horizontalLayout3.setWidth("96%");
		
		HorizontalLayout horizontalLayout4 = new HorizontalLayout();
		horizontalLayout4.setSpacing(true);
		horizontalLayout4.setMargin(new MarginInfo(false, true, false, true));
		horizontalLayout4.addComponent(form6);
		horizontalLayout4.setWidth("96%");
		
		HorizontalLayout horizontalLayout5 = new HorizontalLayout();
		horizontalLayout4.setMargin(new MarginInfo(false, true, false, true));
		horizontalLayout5.addComponent(form7);
		horizontalLayout5.setWidth("96%");
		
		
		VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.addComponent(horizontalLayout);
		verticalLayout.addComponent(headerLanzamientoLayout);
		verticalLayout.addComponent(bodyLanzamientoLayout);
		verticalLayout.addComponent(footerLanzamientoLayout);
		verticalLayout.addComponent(fichaLanzamientoLayout);
		verticalLayout.addComponent(horizontalLayout2);
		verticalLayout.addComponent(horizontalLayout3);
		verticalLayout.addComponent(horizontalLayout4);
		verticalLayout.addComponent(horizontalLayout5);
		
		
		FormLayout compositionRoot = new FormLayout();
		compositionRoot.addComponent(verticalLayout);
		setCompositionRoot(compositionRoot);		
		
		setSizeFull();
		setHeightUndefined();
	}

	@SuppressWarnings("unchecked")
	@Override
	public void onItemDataSourceChange(Item item) {
		// TODO Auto-generated method stub
		SolicitudDisenio itemReporte = ((BeanItem<SolicitudDisenio>)item).getBean();
		logger.error("*******" + itemReporte.getNroSolicitud().toString());
		if (itemReporte.getNroSolicitud() != null){
			List<ProductosSolicitudDisenio> productos = solicitudEjb.obtenerDetallesProductosSolicitudDisenio(itemReporte.getNroSolicitud());
			logger.error("*******productos.isEmpty : " + productos.isEmpty());
			logger.error("*******productos.size : " + productos.size());
			if (productos.isEmpty() == true){
				mostrar_ocultar_CamposNuevoProducto(true);
				List<TiposNuevosProductosSolicitudDisenio> tiposDeProductos = solicitudEjb.obtenerTiposDeNuevosProductosSolicitudDisenio(itemReporte.getNroSolicitud());
				tableTiposDeProductos.setContainerDataSource(new BeanItemContainer(TiposNuevosProductosSolicitudDisenio.class, tiposDeProductos));
				tableTiposDeProductos.setVisibleColumns("tipoNewProd");
				tableTiposDeProductos.setColumnHeaders("Tipo Del Nuevo Producto");
				tableTiposDeProductos.setVisible(true);
				setLanzamientoLayoutVisible(true);
				tableProductos.setVisible(false);
			}
			else{
				mostrar_ocultar_CamposNuevoProducto(false);
				tableProductos.setContainerDataSource(new BeanItemContainer(ProductosSolicitudDisenio.class, productos));
				tableProductos.setVisibleColumns("codigoProd","descProd","grupoProd","tipoProd","marcaProd","prActivosProd","paisProd");
				tableProductos.setColumnHeaders("Codigo","Descripción","Grupo","Tipo","Marca","Principios Activos","Pais");
				tableProductos.setVisible(true);
				setLanzamientoLayoutVisible(false);
				tableTiposDeProductos.setVisible(false);
			}
		}
		else{
			grupoNewProdTextField.setVisible(true);
			grupoNewProdTextField.setCaption("No entro al if");
		}
		
	}

	private void setLanzamientoLayoutVisible(Boolean bool) {
		headerLanzamientoLayout.setVisible(bool);
		bodyLanzamientoLayout.setVisible(bool);
		footerLanzamientoLayout.setVisible(bool);
		fichaLanzamientoLayout.setVisible(bool);
	}

	private void mostrar_ocultar_CamposNuevoProducto(boolean flag) {
		fichaTecnicaNewProdTextField.setVisible(flag);
		//unidadesMedidasNewProdTextField.setVisible(flag);
		//concentracionesNewProdTextField.setVisible(flag);
		grupoNewProdTextField.setVisible(flag);
		presentacionNewProdTextField.setVisible(flag);
		paisNewProdTextField.setVisible(flag);
		titularidadNewProdTextField.setVisible(flag);
		elaboradorNewProdTextField.setVisible(flag);
		acondicionadorNewProdTextField.setVisible(flag);
		fichaTecnicaNewProdTextField.setVisible(flag);	
		tableTiposDeProductos.setVisible(flag);
	}
	
	
}



